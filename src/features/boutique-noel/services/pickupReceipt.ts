// Génération du bon de commande (PDF A4) à partir d'une commande confirmée.
// jsPDF est chargé à la demande : il n'alourdit pas les pages de la boutique.
import type { jsPDF as JsPDF } from 'jspdf';
import logoUrl from '../../../assets/logo.png';
import { PAYMENT_DEADLINE_TEXT, PICKUP_START_LABEL, SHOP_CONTACT_PHONE, sizeLabel } from '../config/shop';
import type { ConfirmedOrder } from '../types';
import { formatPrice } from '../utils/format';

const PAYMENT_METHOD = `Sur place, ${PAYMENT_DEADLINE_TEXT}`;
const VAT_NOTE = 'TVA 20 % incluse dans le tarif';
const THANK_YOU_MESSAGE = 'Merci pour votre commande.';
const CONTACT_EMAIL = 'fritesbonnel@gmail.com';

// Couleurs du site
const RED: [number, number, number] = [220, 38, 38];
const YELLOW: [number, number, number] = [255, 253, 103];
const GREEN: [number, number, number] = [21, 128, 61];
const DARK: [number, number, number] = [31, 41, 55];
const GREY: [number, number, number] = [107, 114, 128];
const LIGHT: [number, number, number] = [243, 244, 246];

// Mise en page A4 (mm)
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 16;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_TOP = PAGE_HEIGHT - 18;
const INFO_BOX_HEIGHT = 46;

// Colonnes du tableau des produits (bord droit pour les colonnes chiffrées)
const COLUMNS = {
  product: MARGIN + 3,
  size: MARGIN + 98,
  quantity: MARGIN + 120,
  unitPrice: MARGIN + 150,
  total: MARGIN + CONTENT_WIDTH - 3,
};

export const getReceiptFileName = (order: ConfirmedOrder) => `Bon-Commande-${order.reference}.pdf`;

/** Les polices standard des PDF ne gèrent pas les espaces fines insécables d'Intl */
const pdfText = (value: string) => value.replace(/[  ]/g, ' ');
const price = (amount: number) => pdfText(formatPrice(amount));

const loadImageAsDataUrl = async (url: string) => {
  const blob = await (await fetch(url)).blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};

const drawHeader = (doc: JsPDF, order: ConfirmedOrder, logo: string | null) => {
  doc.setFillColor(...RED);
  doc.rect(0, 0, PAGE_WIDTH, 42, 'F');

  doc.setFillColor(...YELLOW);
  doc.circle(MARGIN + 13, 21, 13, 'F');
  if (logo) doc.addImage(logo, 'PNG', MARGIN + 3, 11, 20, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('FRITES BONNEL', MARGIN + 31, 20);
  doc.setTextColor(...YELLOW);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.text('Bonnes & Belles', MARGIN + 31, 27);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('BON DE COMMANDE', PAGE_WIDTH - MARGIN, 19, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Commande n° ${order.reference}`, PAGE_WIDTH - MARGIN, 26, { align: 'right' });
};

const drawStatus = (doc: JsPDF, order: ConfirmedOrder, y: number) => {
  doc.setFillColor(...GREEN);
  doc.roundedRect(MARGIN, y, 58, 9, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('COMMANDE CONFIRMÉE', MARGIN + 29, y + 6, { align: 'center' });

  const createdAt = new Date(order.createdAt);
  const date = createdAt.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const time = createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  doc.setTextColor(...GREY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`Commandé le ${date} à ${time}`, PAGE_WIDTH - MARGIN, y + 6, { align: 'right' });
  return y + 17;
};

/** Encadré titré avec des lignes de texte */
const drawInfoBox = (doc: JsPDF, title: string, lines: string[], x: number, y: number, width: number, height: number) => {
  doc.setDrawColor(...YELLOW);
  doc.setLineWidth(0.8);
  doc.setFillColor(255, 254, 224);
  doc.roundedRect(x, y, width, height, 2.5, 2.5, 'FD');

  doc.setTextColor(...RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(title, x + 5, y + 8);

  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let lineY = y + 15;
  lines.forEach((line) => {
    const wrapped: string[] = doc.splitTextToSize(pdfText(line), width - 10);
    doc.text(wrapped, x + 5, lineY);
    lineY += wrapped.length * 5;
  });
};

const drawCustomerAndPickup = (doc: JsPDF, order: ConfirmedOrder, y: number) => {
  const { customer, pickupPoint } = order;
  const boxWidth = (CONTENT_WIDTH - 6) / 2;
  const customerLines = [`${customer.lastName.toUpperCase()} ${customer.firstName}`, `Tél. : ${customer.phone}`];
  const pickupLines = [
    `À partir du ${PICKUP_START_LABEL}`,
    `${pickupPoint.day} · ${pickupPoint.period}`,
    pickupPoint.place,
    ...(pickupPoint.address ? [pickupPoint.address] : []),
  ];
  drawInfoBox(doc, 'Client', customerLines, MARGIN, y, boxWidth, INFO_BOX_HEIGHT);
  drawInfoBox(doc, 'Retrait', pickupLines, MARGIN + boxWidth + 6, y, boxWidth, INFO_BOX_HEIGHT);
  return y + INFO_BOX_HEIGHT + 8;
};

const drawTableHeader = (doc: JsPDF, y: number) => {
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 9, 'F');
  doc.setTextColor(...YELLOW);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Produit', COLUMNS.product, y + 6);
  doc.text('Taille', COLUMNS.size, y + 6, { align: 'center' });
  doc.text('Qté', COLUMNS.quantity, y + 6, { align: 'center' });
  doc.text('Prix unitaire', COLUMNS.unitPrice, y + 6, { align: 'right' });
  doc.text('Total', COLUMNS.total, y + 6, { align: 'right' });
  return y + 9;
};

const drawProducts = (doc: JsPDF, order: ConfirmedOrder, startY: number) => {
  let y = drawTableHeader(doc, startY);
  doc.setFontSize(10);

  order.lines.forEach((line, index) => {
    const name: string[] = doc.splitTextToSize(pdfText(line.name), COLUMNS.size - COLUMNS.product - 14);
    const rowHeight = Math.max(9, name.length * 5 + 4);

    // Saut de page si la ligne ne tient plus (en conservant l'en-tête du tableau)
    if (y + rowHeight > FOOTER_TOP - 50) {
      doc.addPage();
      y = drawTableHeader(doc, MARGIN);
      doc.setFontSize(10);
    }

    if (index % 2 === 1) {
      doc.setFillColor(...LIGHT);
      doc.rect(MARGIN, y, CONTENT_WIDTH, rowHeight, 'F');
    }
    const textY = y + 6;
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.text(name, COLUMNS.product, textY);
    doc.setFont('helvetica', 'normal');
    doc.text(sizeLabel(line.size), COLUMNS.size, textY, { align: 'center' });
    doc.text(String(line.quantity), COLUMNS.quantity, textY, { align: 'center' });
    doc.text(price(line.unitPrice), COLUMNS.unitPrice, textY, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(price(line.lineTotal), COLUMNS.total, textY, { align: 'right' });
    y += rowHeight;
  });

  doc.setDrawColor(...RED);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  return y;
};

const drawTotals = (doc: JsPDF, order: ConfirmedOrder, startY: number) => {
  let y = startY + 9;
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Total (${order.itemCount} article${order.itemCount > 1 ? 's' : ''})`, COLUMNS.unitPrice, y, { align: 'right' });
  doc.setTextColor(...RED);
  doc.setFontSize(15);
  doc.text(price(order.total), COLUMNS.total, y, { align: 'right' });

  y += 5;
  doc.setTextColor(...GREY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(VAT_NOTE, COLUMNS.total, y, { align: 'right' });

  y += 7;
  // Valeur alignée à droite, libellé placé juste avant selon sa largeur réelle
  doc.setFontSize(10);
  doc.setTextColor(...GREEN);
  doc.setFont('helvetica', 'bold');
  doc.text(PAYMENT_METHOD, COLUMNS.total, y, { align: 'right' });
  const paymentWidth = doc.getTextWidth(PAYMENT_METHOD);
  doc.setTextColor(...GREY);
  doc.setFont('helvetica', 'normal');
  doc.text('Mode de paiement :', COLUMNS.total - paymentWidth - 2, y, { align: 'right' });

  y += 5.5;
  doc.setFontSize(8.5);
  const paymentNote: string[] = doc.splitTextToSize(
    `Paiement sur n’importe lequel de nos emplacements. Sans paiement à cette date, commande annulée (sauf appel au ${SHOP_CONTACT_PHONE}).`,
    CONTENT_WIDTH,
  );
  doc.text(paymentNote, COLUMNS.total, y, { align: 'right' });
  y += (paymentNote.length - 1) * 4;

  if (order.customer.comment) {
    y += 10;
    doc.setTextColor(...GREY);
    doc.setFont('helvetica', 'italic');
    const comment: string[] = doc.splitTextToSize(`Votre commentaire : « ${order.customer.comment} »`, CONTENT_WIDTH);
    doc.text(comment, MARGIN, y);
    y += (comment.length - 1) * 5;
  }
  return y + 10;
};

const drawThankYou = (doc: JsPDF, startY: number) => {
  let y = startY;
  if (y + 22 > FOOTER_TOP - 4) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFillColor(...YELLOW);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 20, 3, 3, 'F');
  doc.setTextColor(...RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  const message: string[] = doc.splitTextToSize(THANK_YOU_MESSAGE, CONTENT_WIDTH - 16);
  doc.text(message, PAGE_WIDTH / 2, y + 12 - (message.length - 1) * 2.5, { align: 'center' });
};

const drawFooters = (doc: JsPDF, order: ConfirmedOrder) => {
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, FOOTER_TOP, PAGE_WIDTH - MARGIN, FOOTER_TOP);
    doc.setTextColor(...GREY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(
      `Frites Bonnel · Friterie traditionnelle du Nord · ${SHOP_CONTACT_PHONE} · ${CONTACT_EMAIL}`,
      MARGIN,
      FOOTER_TOP + 6,
    );
    doc.text(`${order.reference} · Page ${page}/${pageCount}`, PAGE_WIDTH - MARGIN, FOOTER_TOP + 6, { align: 'right' });
  }
};

/** Génère le bon de commande et déclenche son téléchargement */
export const downloadPickupReceipt = async (order: ConfirmedOrder) => {
  const [{ jsPDF }, logo] = await Promise.all([
    import('jspdf'),
    loadImageAsDataUrl(logoUrl).catch(() => null), // le bon reste valable sans logo
  ]);

  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  doc.setProperties({ title: `Bon de commande — ${order.reference}`, author: 'Frites Bonnel' });

  drawHeader(doc, order, logo);
  let y = drawStatus(doc, order, 52);
  y = drawCustomerAndPickup(doc, order, y);
  y = drawProducts(doc, order, y);
  y = drawTotals(doc, order, y);
  drawThankYou(doc, y);
  drawFooters(doc, order);

  doc.save(getReceiptFileName(order));
};
