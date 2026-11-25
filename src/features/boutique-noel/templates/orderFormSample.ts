// Données prêtes à l'emploi pour le modèle de bon de commande.
// Les articles, prix, tailles et points de retrait viennent de la configuration de la boutique.
// L'exemple client est fictif.
import logo from '../../../assets/logo.png';
import { PICKUP_POINTS } from '../config/pickupPoints';
import { PRODUCTS } from '../config/products';
import { PAYMENT_DEADLINE_TEXT, PICKUP_START_LABEL, sizeLabel } from '../config/shop';
import type { OrderFormData } from './orderFormPdf';

/** « Mercredi midi (11h30 – 13h30) — Cours Saint-Laud » */
const PICKUP_LABELS = PICKUP_POINTS.map((point) => {
  const [period, hours] = point.period.split(' · ');
  return `${point.day} ${period.toLowerCase()}${hours ? ` (${hours})` : ''} — ${point.place}`;
});

const BASE: OrderFormData = {
  shop: {
    name: 'Frites Bonnel',
    subtitle: 'Boutique de Noël',
    phone: '06 11 52 16 89',
    email: 'accueil.fritesbonnel@gmail.com',
    website: 'https://fritesbonnel.com',
    logoUrl: logo,
  },
  products: PRODUCTS.map((product) => ({
    name: product.name,
    price: product.price,
    sizes: product.sizes.map(sizeLabel),
    imageUrl: product.images[0]?.src,
  })),
  pickupPoints: PICKUP_LABELS,
  notes: {
    pickup: `Retrait à partir du ${PICKUP_START_LABEL}`,
    payment: `À régler ${PAYMENT_DEADLINE_TEXT}`,
  },
};

/** Bon vierge, à imprimer et remplir à la main */
export const BLANK_ORDER_FORM: OrderFormData = BASE;

/** Exemple de bon pré-rempli avant impression */
export const SAMPLE_ORDER_FORM: OrderFormData = {
  ...BASE,
  orderNumber: 'BN-261110-K7Q2',
  date: new Date('2026-11-10T14:32:00'),
  customer: { lastName: 'Dupont', firstName: 'Camille', phone: '06 12 34 56 78', email: 'camille.dupont@email.fr' },
  quantities: {
    [PRODUCTS[0].name]: { M: 1 },
    [PRODUCTS[2].name]: { L: 2 },
    [PRODUCTS[4].name]: { Unique: 1 },
  },
  pickupPoint: PICKUP_LABELS[0],
  payment: { method: 'Espèces', amountPaid: 100 },
};
