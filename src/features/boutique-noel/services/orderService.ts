// Création et envoi des commandes via Web3Forms
// (même service et même compte que le formulaire de devis de la page Événements).
import { formatPickupPoint } from '../config/pickupPoints';
import { PAYMENT_SUMMARY, WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, formatSize } from '../config/shop';
import type { ConfirmedOrder, CustomerDetails, PickupPoint, ResolvedCartLine } from '../types';
import { formatPrice, pluralize } from '../utils/format';

const LAST_ORDER_KEY = 'frites-bonnel:boutique-noel:derniere-commande';

/** Référence courte et lisible, ex. « BN-261028-K7Q2 » */
const createOrderReference = (date: Date) => {
  const datePart = [date.getFullYear() % 100, date.getMonth() + 1, date.getDate()]
    .map((n) => String(n).padStart(2, '0'))
    .join('');
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0');
  return `BN-${datePart}-${randomPart}`;
};

export const buildOrder = (
  customer: CustomerDetails,
  pickupPoint: PickupPoint,
  lines: ResolvedCartLine[],
  total: number,
): ConfirmedOrder => {
  const now = new Date();
  return {
    reference: createOrderReference(now),
    createdAt: now.toISOString(),
    customer: {
      lastName: customer.lastName.trim(),
      firstName: customer.firstName.trim(),
      phone: customer.phone.trim(),
      comment: customer.comment.trim(),
    },
    pickupPoint,
    lines: lines.map((line) => ({
      productId: line.productId,
      name: line.product.name,
      size: line.size,
      quantity: line.quantity,
      unitPrice: line.product.price,
      lineTotal: line.lineTotal,
      image: line.product.images[0]?.src ?? '',
    })),
    itemCount: lines.reduce((count, line) => count + line.quantity, 0),
    total,
  };
};

const formatOrderLines = (order: ConfirmedOrder) =>
  order.lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.name}\n` +
        `   ${formatSize(line.size)} | Quantité : ${line.quantity} | Prix unitaire : ${formatPrice(line.unitPrice)} | Sous-total : ${formatPrice(line.lineTotal)}`,
    )
    .join('\n\n');

/** Champs envoyés à Web3Forms : chaque clé devient une ligne de l'e-mail reçu */
const toWeb3FormsPayload = (order: ConfirmedOrder) => {
  const createdAt = new Date(order.createdAt);
  const { customer } = order;
  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `[COMMANDE NOËL] ${order.reference} — ${customer.lastName} ${customer.firstName} — ${formatPrice(order.total)}`,
    from_name: 'Boutique de Noël — Frites Bonnel',
    botcheck: '',
    'Référence commande': order.reference,
    Date: createdAt.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    Heure: createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    Nom: customer.lastName,
    Prénom: customer.firstName,
    Téléphone: customer.phone,
    'Point de retrait': formatPickupPoint(order.pickupPoint),
    Commande: formatOrderLines(order),
    "Nombre d'articles": pluralize(order.itemCount, 'article'),
    'TOTAL à régler sur place': formatPrice(order.total),
    'Commentaire du client': customer.comment || '(aucun)',
    Paiement: PAYMENT_SUMMARY,
  };
};

export class OrderSubmissionError extends Error {}

export const submitOrder = async (order: ConfirmedOrder) => {
  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toWeb3FormsPayload(order)),
    });
  } catch {
    throw new OrderSubmissionError('Connexion impossible. Vérifiez votre connexion internet puis réessayez.');
  }

  const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!response.ok || !result?.success) {
    console.error('Échec de l’envoi de la commande (Web3Forms) :', result);
    throw new OrderSubmissionError('Votre commande n’a pas pu être envoyée. Merci de réessayer dans quelques instants.');
  }
};

// La dernière commande est gardée le temps de la session pour que la page
// de confirmation reste affichée si le client la recharge.
export const saveLastOrder = (order: ConfirmedOrder) => {
  try {
    window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    // Stockage indisponible : la confirmation reste affichée via l'état de navigation
  }
};

export const readLastOrder = (): ConfirmedOrder | null => {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as ConfirmedOrder) : null;
  } catch {
    return null;
  }
};
