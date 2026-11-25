// Modèle de BON DE COMMANDE à imprimer (une seule page A4), en deux parties :
//  - en haut, l'EXEMPLAIRE BOUTIQUE (complet, avec les photos des articles à cocher) ;
//  - en bas, détachable, le REÇU CLIENT (mêmes informations, en version minimaliste).
// Il se remplit à la main avec le client, ou peut être pré-rempli avant impression.
// Autonome : il n'est branché nulle part dans l'application. Exemple d'utilisation :
//   import { downloadOrderFormPdf } from './templates/orderFormPdf';
//   import { BLANK_ORDER_FORM } from './templates/orderFormSample';
//   await downloadOrderFormPdf(BLANK_ORDER_FORM); // bon vierge
import type { jsPDF as JsPDF } from 'jspdf';
import folksFontUrl from '../../../../fonts/ThatsFontFolks.ttf?url';
import { createQrMatrix } from './qrCode';

// ----------------------------------------------------------------------------
// Données
// ----------------------------------------------------------------------------

export interface OrderFormShop {
  name: string;
  subtitle?: string;
  phone: string;
  email: string;
  /** URL complète : affichée et encodée dans le QR code du reçu client */
  website: string;
  logoUrl?: string;
}

export interface OrderFormProduct {
  name: string;
  /** Prix unitaire TTC en euros */
  price: number;
  /** Tailles proposées (ex. ['S', 'M', 'L', 'XL'] ou ['Unique']) */
  sizes: string[];
  imageUrl?: string;
}

export const PAYMENT_METHODS = ['Espèces', 'Carte bancaire', 'Chèque'] as const;

export interface OrderFormData {
  shop: OrderFormShop;
  /** Articles proposés : chacun a sa ligne à cocher */
  products: OrderFormProduct[];
  /** Points de retrait proposés (cases à cocher) */
  pickupPoints: string[];
  notes?: {
    /** ex. « Retrait à partir du 16 décembre » */
    pickup?: string;
    /** ex. « À régler jusqu'au dimanche 6 décembre à 21h30 » */
    payment?: string;
  };
  /** Taux de TVA inclus dans les prix (défaut : 20 %) */
  vatRate?: number;

  // --- Pré-remplissage (facultatif) ---
  orderNumber?: string;
  date?: Date;
  customer?: { lastName?: string; firstName?: string; phone?: string; email?: string };
  /** Quantités par article puis par taille : { 'Nom article': { M: 1, L: 2 } } */
  quantities?: Record<string, Record<string, number>>;
  /** Doit correspondre exactement à une entrée de pickupPoints */
  pickupPoint?: string;
  payment?: { method?: string; amountPaid?: number };
}

// ----------------------------------------------------------------------------
// Mise en page (mm)
// ----------------------------------------------------------------------------

type Rgb = [number, number, number];
const INK: Rgb = [17, 24, 39];
const LABEL: Rgb = [55, 65, 81];
const WRITE_LINE: Rgb = [140, 147, 160];
const GRID: Rgb = [205, 209, 215];
const HEADER_FILL: Rgb = [238, 239, 241];
const PHOTO_FILL: Rgb = [247, 241, 232];
const RED: Rgb = [200, 30, 30];

const PAGE_WIDTH = 210;
const MARGIN = 12;
const RIGHT = PAGE_WIDTH - MARGIN;
const CONTENT_WIDTH = RIGHT - MARGIN;
const CUT_Y = 214;

// ----------------------------------------------------------------------------
// Outils
// ----------------------------------------------------------------------------

const euroFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
/** Les polices PDF standard ne gèrent pas les espaces fines d'Intl */
const clean = (value: string) => value.replace(/[  ]/g, ' ');
const euros = (amount: number) => clean(euroFormatter.format(amount));
const round = (amount: number) => Math.round(amount * 100) / 100;

type FontStyle = 'normal' | 'bold' | 'italic';
const setText = (doc: JsPDF, color: Rgb, size: number, style: FontStyle = 'normal') => {
  doc.setTextColor(...color);
  doc.setFontSize(size);
  doc.setFont('helvetica', style);
};

/** Aligne à droite ou centre un texte espacé (jsPDF n'inclut pas l'espacement dans l'alignement) */
const textAligned = (doc: JsPDF, text: string, x: number, y: number, align: 'right' | 'center', charSpace = 0) => {
  const width = doc.getTextWidth(text) + charSpace * Math.max(text.length - 1, 0);
  doc.text(text, align === 'right' ? x - width : x - width / 2, y, { charSpace });
};

/** Réduit la taille de police jusqu'à ce que le texte tienne dans la largeur donnée */
const fitFontSize = (doc: JsPDF, text: string, maxWidth: number, size: number, minSize = 6) => {
  let current = size;
  doc.setFontSize(current);
  while (current > minSize && doc.getTextWidth(text) > maxWidth) {
    current -= 0.25;
    doc.setFontSize(current);
  }
};

const line = (doc: JsPDF, x1: number, y1: number, x2: number, y2: number, color: Rgb, width = 0.3) => {
  doc.setDrawColor(...color);
  doc.setLineWidth(width);
  doc.line(x1, y1, x2, y2);
};

const sectionTitle = (doc: JsPDF, title: string, x: number, y: number, size = 8) => {
  setText(doc, INK, size, 'bold');
  doc.text(title.toUpperCase(), x, y, { charSpace: 0.5 });
};

/** Champ en ligne : « Libellé ______ » (valeur imprimée sur la ligne si fournie) */
const inlineField = (
  doc: JsPDF,
  label: string,
  value: string | undefined,
  x: number,
  y: number,
  width: number,
  size = 8,
) => {
  setText(doc, LABEL, size, 'bold');
  doc.text(label, x, y);
  const start = x + doc.getTextWidth(label) + 1.5;
  line(doc, start, y + 0.8, x + width, y + 0.8, WRITE_LINE);
  if (value && value.trim()) {
    const text = clean(value);
    setText(doc, INK, size + 1.5);
    fitFontSize(doc, text, x + width - start - 1, size + 1.5);
    doc.text(text, start + 0.5, y - 0.2);
  }
};

/** Montant : « Libellé ______ € » ou valeur imprimée */
const amountField = (
  doc: JsPDF,
  label: string,
  amount: number | undefined,
  x: number,
  y: number,
  width: number,
  size = 8,
  bold = false,
) => {
  setText(doc, bold ? INK : LABEL, size, 'bold');
  doc.text(label, x, y);
  const right = x + width;
  if (amount !== undefined) {
    setText(doc, INK, size + 1.5, 'bold');
    doc.text(euros(amount), right, y, { align: 'right' });
  } else {
    const start = Math.max(x + doc.getTextWidth(label) + 2, right - 30);
    line(doc, start, y + 0.8, right - 4, y + 0.8, WRITE_LINE);
    setText(doc, INK, size + 1);
    doc.text('€', right, y, { align: 'right' });
  }
};

/** Case à cocher ; contient une croix ou une quantité si fournie */
const box = (doc: JsPDF, x: number, baseline: number, size: number, content?: string) => {
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.3);
  doc.rect(x, baseline - size + 0.5, size, size, 'S');
  if (!content) return;
  if (content === 'x') {
    line(doc, x + 0.7, baseline - size + 1.2, x + size - 0.7, baseline - 0.2, INK, 0.45);
    line(doc, x + size - 0.7, baseline - size + 1.2, x + 0.7, baseline - 0.2, INK, 0.45);
  } else {
    setText(doc, INK, size * 1.9, 'bold');
    doc.text(content, x + size / 2, baseline - 0.4, { align: 'center' });
  }
};

/**
 * Rangée « S □  M □  L □ … » : se resserre automatiquement pour tenir dans maxWidth,
 * quel que soit le nombre de tailles (jusqu'à XXXL).
 */
const drawSizeBoxes = (
  doc: JsPDF,
  sizes: string[],
  quantities: Record<string, number>,
  x: number,
  baseline: number,
  maxWidth: number,
  base: { font: number; box: number; labelGap: number; itemGap: number; drop: number },
) => {
  setText(doc, INK, base.font, 'bold');
  const natural =
    sizes.reduce((sum, size) => sum + doc.getTextWidth(size) + base.labelGap + base.box + base.itemGap, 0) - base.itemGap;
  const k = Math.min(1, maxWidth / natural);
  const boxSize = base.box * k;
  let cursor = x;
  sizes.forEach((size) => {
    setText(doc, INK, base.font * k, 'bold');
    doc.text(size, cursor, baseline);
    const boxX = cursor + doc.getTextWidth(size) + base.labelGap * k;
    box(doc, boxX, baseline + base.drop, boxSize, sizeContent(quantities[size]));
    cursor = boxX + boxSize + base.itemGap * k;
  });
};

/** Case à cocher + libellé ; renvoie la largeur occupée */
const checkOption = (doc: JsPDF, label: string, x: number, y: number, checked: boolean, size = 7.5, maxWidth?: number) => {
  const boxSize = 3.2;
  box(doc, x, y, boxSize, checked ? 'x' : undefined);
  setText(doc, INK, size);
  if (maxWidth) fitFontSize(doc, label, maxWidth - boxSize - 1.5, size);
  doc.text(label, x + boxSize + 1.5, y);
  return boxSize + 1.5 + doc.getTextWidth(label);
};

const loadImage = async (url: string, maxSize: number, format: 'PNG' | 'JPEG') => {
  const image = new Image();
  image.src = url;
  await image.decode();
  const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas indisponible');
  if (format === 'JPEG') {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return {
    data: canvas.toDataURL(format === 'PNG' ? 'image/png' : 'image/jpeg', 0.85),
    ratio: canvas.width / canvas.height,
  };
};
const tryLoadImage = (url: string | undefined, maxSize: number, format: 'PNG' | 'JPEG') =>
  url ? loadImage(url, maxSize, format).catch(() => null) : Promise.resolve(null);

const registerBrandFont = async (doc: JsPDF) => {
  try {
    const bytes = new Uint8Array(await (await fetch(folksFontUrl)).arrayBuffer());
    let binary = '';
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    doc.addFileToVFS('ThatsFontFolks.ttf', btoa(binary));
    doc.addFont('ThatsFontFolks.ttf', 'Folks', 'normal');
    return true;
  } catch {
    return false;
  }
};

const useBrandFont = (doc: JsPDF, enabled: boolean, size: number) => {
  if (enabled) {
    doc.setFont('Folks', 'normal');
    doc.setFontSize(size);
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(size * 0.75);
  }
  doc.setTextColor(...RED);
};

const drawQrCode = (doc: JsPDF, url: string, x: number, y: number, size: number) => {
  const matrix = createQrMatrix(url);
  const cell = size / matrix.length;
  doc.setFillColor(0, 0, 0);
  matrix.forEach((row, r) =>
    row.forEach((dark, c) => {
      if (dark) doc.rect(x + c * cell, y + r * cell, cell + 0.02, cell + 0.02, 'F');
    }),
  );
};

type LoadedImage = { data: string; ratio: number } | null;
interface Assets {
  logo: LoadedImage;
  photos: LoadedImage[];
  brandFont: boolean;
}

/** Totaux calculés à partir des quantités pré-remplies (undefined si rien n'est renseigné) */
const computeTotals = (data: OrderFormData) => {
  const quantities = data.quantities ?? {};
  const lineQuantity = (product: OrderFormProduct) =>
    Object.values(quantities[product.name] ?? {}).reduce((sum, qty) => sum + qty, 0);
  const hasSelection = data.products.some((product) => lineQuantity(product) > 0);
  const total = hasSelection
    ? round(data.products.reduce((sum, product) => sum + lineQuantity(product) * product.price, 0))
    : undefined;
  const paid = data.payment?.amountPaid !== undefined ? round(data.payment.amountPaid) : undefined;
  const remaining = total !== undefined && paid !== undefined ? round(Math.max(total - paid, 0)) : undefined;
  return { lineQuantity, hasSelection, total, paid, remaining };
};

/** Contenu d'une case de taille : croix si 1 pièce, nombre si plusieurs */
const sizeContent = (qty: number | undefined) => (qty ? (qty === 1 ? 'x' : String(qty)) : undefined);

const formatDate = (date?: Date) =>
  date?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

// ----------------------------------------------------------------------------
// Exemplaire boutique (partie haute)
// ----------------------------------------------------------------------------

const drawShopCopy = (doc: JsPDF, data: OrderFormData, assets: Assets) => {
  const { shop } = data;
  const totals = computeTotals(data);

  // --- En-tête ---
  if (assets.logo) doc.addImage(assets.logo.data, 'PNG', MARGIN, 10, 16, 16 / assets.logo.ratio);
  const textX = MARGIN + 19;
  setText(doc, INK, 13, 'bold');
  doc.text(shop.name.toUpperCase(), textX, 15, { charSpace: 0.4 });
  if (shop.subtitle) {
    useBrandFont(doc, assets.brandFont, 11);
    doc.text(shop.subtitle, textX, 20.5);
  }
  setText(doc, LABEL, 7.5);
  doc.text(`Tél. ${shop.phone}  ·  ${shop.email}`, textX, 25);

  setText(doc, INK, 14, 'bold');
  textAligned(doc, 'BON DE COMMANDE', RIGHT, 15, 'right', 0.6);
  setText(doc, RED, 7, 'bold');
  textAligned(doc, 'EXEMPLAIRE BOUTIQUE', RIGHT, 19.5, 'right', 0.6);
  inlineField(doc, 'N°', data.orderNumber, RIGHT - 82, 26, 46);
  inlineField(doc, 'Date', formatDate(data.date), RIGHT - 31, 26, 31);
  line(doc, MARGIN, 30, RIGHT, 30, INK, 0.4);

  // --- Client ---
  sectionTitle(doc, 'Client', MARGIN, 36);
  const customer = data.customer ?? {};
  inlineField(doc, 'Nom', customer.lastName?.toUpperCase(), MARGIN, 43, 60);
  inlineField(doc, 'Prénom', customer.firstName, MARGIN + 64, 43, 56);
  inlineField(doc, 'Téléphone', customer.phone, MARGIN + 124, 43, CONTENT_WIDTH - 124);
  inlineField(doc, 'Email', customer.email, MARGIN, 50, CONTENT_WIDTH);

  // --- Articles à cocher ---
  const tableTop = 56;
  const headerH = 6;
  const rowsTop = tableTop + headerH;
  const rowsBottom = 140;
  const rowH = Math.min(16, (rowsBottom - rowsTop) / Math.max(data.products.length, 1));
  const tableBottom = rowsTop + rowH * data.products.length;
  const col = { name: MARGIN + 15, sizes: MARGIN + 64, qty: MARGIN + 140, total: MARGIN + 154 };

  doc.setFillColor(...HEADER_FILL);
  doc.rect(MARGIN, tableTop, CONTENT_WIDTH, headerH, 'F');
  setText(doc, INK, 6.8, 'bold');
  const hy = tableTop + 4.1;
  doc.text('ARTICLE', MARGIN + 2, hy, { charSpace: 0.3 });
  doc.text('TAILLE  (cochez, ou notez la quantité)', col.sizes, hy, { charSpace: 0.2 });
  textAligned(doc, 'QTÉ', (col.qty + col.total) / 2, hy, 'center', 0.3);
  textAligned(doc, 'TOTAL', RIGHT - 2, hy, 'right', 0.3);

  data.products.forEach((product, index) => {
    const top = rowsTop + index * rowH;
    const mid = top + rowH / 2;
    const quantities = data.quantities?.[product.name] ?? {};
    const qty = totals.lineQuantity(product);

    // Photo (contenue dans la vignette)
    const thumbH = rowH - 2;
    const thumbW = 11;
    doc.setFillColor(...PHOTO_FILL);
    doc.rect(MARGIN + 1, top + 1, thumbW, thumbH, 'F');
    const photo = assets.photos[index];
    if (photo) {
      const w = Math.min(thumbW, thumbH * photo.ratio);
      const h = w / photo.ratio;
      doc.addImage(photo.data, 'JPEG', MARGIN + 1 + (thumbW - w) / 2, top + 1 + (thumbH - h) / 2, w, h);
    }

    // Nom + prix
    setText(doc, INK, 8.8, 'bold');
    fitFontSize(doc, clean(product.name), col.sizes - col.name - 3, 8.8);
    doc.text(clean(product.name), col.name, mid - 0.6);
    setText(doc, LABEL, 7.5);
    doc.text(`${euros(product.price)} TTC`, col.name, mid + 3.6);

    // Tailles
    drawSizeBoxes(doc, product.sizes, quantities, col.sizes, mid + 1.6, col.qty - 2 - col.sizes, {
      font: 7.5,
      box: 4.2,
      labelGap: 1,
      itemGap: 2.6,
      drop: 0.6,
    });

    // Quantité totale + total de la ligne
    doc.setDrawColor(...INK);
    doc.setLineWidth(0.3);
    doc.rect(col.qty + 2, mid - 3, 10, 6, 'S');
    if (qty > 0) {
      setText(doc, INK, 9, 'bold');
      doc.text(String(qty), col.qty + 7, mid + 1.2, { align: 'center' });
      doc.text(euros(qty * product.price), RIGHT - 2, mid + 1.2, { align: 'right' });
    } else {
      line(doc, col.total + 4, mid + 1.8, RIGHT - 6, mid + 1.8, WRITE_LINE);
      setText(doc, INK, 8.5);
      doc.text('€', RIGHT - 2, mid + 1.6, { align: 'right' });
    }

    if (index < data.products.length - 1) line(doc, MARGIN, top + rowH, RIGHT, top + rowH, GRID, 0.25);
  });
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.4);
  doc.rect(MARGIN, tableTop, CONTENT_WIDTH, tableBottom - tableTop, 'S');
  line(doc, MARGIN, rowsTop, RIGHT, rowsTop, INK, 0.4);

  // --- Total ---
  const totalY = tableBottom + 7;
  amountField(doc, 'TOTAL TTC', totals.total, RIGHT - 70, totalY, 70, 10, true);
  setText(doc, LABEL, 6.8);
  doc.text(`TVA ${Math.round((data.vatRate ?? 0.2) * 100)} % incluse dans le tarif`, RIGHT, totalY + 4, {
    align: 'right',
  });

  // --- Point de retrait ---
  const pickupTop = totalY + 9;
  sectionTitle(doc, 'Point de retrait', MARGIN, pickupTop);
  if (data.notes?.pickup) {
    setText(doc, RED, 7.5, 'bold');
    doc.text(data.notes.pickup, RIGHT, pickupTop, { align: 'right' });
  }
  const pickupColW = CONTENT_WIDTH / 2;
  data.pickupPoints.forEach((point, index) => {
    const x = MARGIN + (index % 2) * pickupColW;
    const y = pickupTop + 6 + Math.floor(index / 2) * 5.5;
    checkOption(doc, clean(point), x, y, data.pickupPoint === point, 7.8, pickupColW - 3);
  });
  const pickupRows = Math.ceil(data.pickupPoints.length / 2);

  // --- Paiement ---
  const paymentTop = pickupTop + 6 + pickupRows * 5.5 + 3;
  sectionTitle(doc, 'Paiement', MARGIN, paymentTop);
  if (data.notes?.payment) {
    setText(doc, RED, 7.5, 'bold');
    doc.text(data.notes.payment, RIGHT, paymentTop, { align: 'right' });
  }
  const method = data.payment?.method?.trim();
  const isKnown = PAYMENT_METHODS.some((m) => m === method);
  let px = MARGIN;
  const methodY = paymentTop + 6;
  PAYMENT_METHODS.forEach((option) => {
    px += checkOption(doc, option, px, methodY, method === option, 8) + 6;
  });
  px += checkOption(doc, 'Autre :', px, methodY, Boolean(method) && !isKnown, 8) + 1.5;
  line(doc, px, methodY + 0.8, MARGIN + 118, methodY + 0.8, WRITE_LINE);
  if (method && !isKnown) {
    setText(doc, INK, 8.5);
    doc.text(clean(method), px + 0.5, methodY - 0.2);
  }
  amountField(doc, 'Montant payé', totals.paid, MARGIN + 124, methodY, CONTENT_WIDTH - 124);
  amountField(doc, 'Reste à payer', totals.remaining, MARGIN + 124, methodY + 6.5, CONTENT_WIDTH - 124, 8, true);

  // --- Signatures ---
  const signTop = methodY + 10;
  const signW = (CONTENT_WIDTH - 6) / 2;
  const signH = CUT_Y - 4 - signTop;
  [
    ['Signature du client', MARGIN],
    ['Signature du vendeur', MARGIN + signW + 6],
  ].forEach(([label, left]) => {
    doc.setDrawColor(...INK);
    doc.setLineWidth(0.3);
    doc.rect(left as number, signTop, signW, signH, 'S');
    setText(doc, LABEL, 6.8, 'bold');
    doc.text((label as string).toUpperCase(), (left as number) + 2.5, signTop + 4, { charSpace: 0.3 });
  });
};

// ----------------------------------------------------------------------------
// Ligne de découpe
// ----------------------------------------------------------------------------

const drawCutLine = (doc: JsPDF) => {
  doc.setDrawColor(...LABEL);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1.6, 1.2], 0);
  doc.line(MARGIN + 10, CUT_Y, RIGHT, CUT_Y);
  doc.setLineDashPattern([], 0);

  // Ciseaux dessinés (deux anneaux + deux lames croisées)
  const x = MARGIN + 2;
  const y = CUT_Y;
  doc.setLineWidth(0.35);
  doc.circle(x, y - 1.5, 1.1, 'S');
  doc.circle(x, y + 1.5, 1.1, 'S');
  doc.line(x + 0.9, y - 0.9, x + 6, y + 1.2);
  doc.line(x + 0.9, y + 0.9, x + 6, y - 1.2);

  setText(doc, LABEL, 6.3);
  doc.text('Découper ici — partie à remettre au client', RIGHT, CUT_Y - 1.5, { align: 'right' });
};

// ----------------------------------------------------------------------------
// Reçu client (partie basse, minimaliste)
// ----------------------------------------------------------------------------

const drawCustomerCopy = (doc: JsPDF, data: OrderFormData, assets: Assets) => {
  const { shop } = data;
  const totals = computeTotals(data);
  const top = CUT_Y + 5;

  // --- En-tête ---
  if (assets.logo) doc.addImage(assets.logo.data, 'PNG', MARGIN, top, 11, 11 / assets.logo.ratio);
  setText(doc, INK, 10.5, 'bold');
  doc.text(shop.name.toUpperCase(), MARGIN + 13.5, top + 4.5, { charSpace: 0.4 });
  if (shop.subtitle) {
    useBrandFont(doc, assets.brandFont, 9.5);
    doc.text(shop.subtitle, MARGIN + 13.5, top + 9);
  }
  setText(doc, INK, 12, 'bold');
  textAligned(doc, 'REÇU CLIENT', RIGHT, top + 4.5, 'right', 0.6);
  setText(doc, RED, 6.5, 'bold');
  textAligned(doc, 'À CONSERVER ET À PRÉSENTER AU RETRAIT', RIGHT, top + 8.5, 'right', 0.4);

  const customer = data.customer ?? {};
  const infoY = top + 16;
  inlineField(doc, 'N°', data.orderNumber, MARGIN, infoY, 44);
  inlineField(doc, 'Nom', customer.lastName?.toUpperCase(), MARGIN + 48, infoY, 50);
  inlineField(doc, 'Prénom', customer.firstName, MARGIN + 102, infoY, 44);
  inlineField(doc, 'Date', formatDate(data.date), MARGIN + 150, infoY, CONTENT_WIDTH - 150);

  // --- Articles (sans photos) ---
  const listTop = infoY + 4;
  const listW = 114;
  const headerH = 5;
  const rowH = Math.min(5.6, 30 / Math.max(data.products.length, 1));
  const listBottom = listTop + headerH + rowH * data.products.length;
  doc.setFillColor(...HEADER_FILL);
  doc.rect(MARGIN, listTop, listW, headerH, 'F');
  setText(doc, INK, 6.3, 'bold');
  doc.text('ARTICLE', MARGIN + 1.5, listTop + 3.4, { charSpace: 0.3 });
  doc.text('TAILLE / QTÉ', MARGIN + 43, listTop + 3.4, { charSpace: 0.3 });
  textAligned(doc, 'TOTAL', MARGIN + listW - 1.5, listTop + 3.4, 'right', 0.3);

  data.products.forEach((product, index) => {
    const baseline = listTop + headerH + index * rowH + rowH / 2 + 1.2;
    const quantities = data.quantities?.[product.name] ?? {};
    setText(doc, INK, 7, 'bold');
    fitFontSize(doc, clean(product.name), 40, 7);
    doc.text(clean(product.name), MARGIN + 1.5, baseline);
    drawSizeBoxes(doc, product.sizes, quantities, MARGIN + 43, baseline, listW - 22 - 43, {
      font: 6,
      box: 3.1,
      labelGap: 0.7,
      itemGap: 2,
      drop: 0.4,
    });
    const qty = totals.lineQuantity(product);
    if (qty > 0) {
      setText(doc, INK, 7.5, 'bold');
      doc.text(euros(qty * product.price), MARGIN + listW - 1.5, baseline, { align: 'right' });
    } else {
      line(doc, MARGIN + listW - 20, baseline + 0.6, MARGIN + listW - 5, baseline + 0.6, WRITE_LINE);
      setText(doc, INK, 7.5);
      doc.text('€', MARGIN + listW - 1.5, baseline, { align: 'right' });
    }
    if (index < data.products.length - 1) {
      const y = listTop + headerH + (index + 1) * rowH;
      line(doc, MARGIN, y, MARGIN + listW, y, GRID, 0.2);
    }
  });
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.35);
  doc.rect(MARGIN, listTop, listW, listBottom - listTop, 'S');

  // --- Récapitulatif (droite) ---
  const boxX = MARGIN + listW + 5;
  const boxW = RIGHT - boxX;
  doc.rect(boxX, listTop, boxW, listBottom - listTop, 'S');
  inlineField(doc, 'Retrait :', data.pickupPoint, boxX + 2.5, listTop + 5.5, boxW - 5, 7.5);
  if (data.notes?.pickup) {
    setText(doc, RED, 6.8, 'bold');
    doc.text(data.notes.pickup, boxX + 2.5, listTop + 10.5);
  }
  amountField(doc, 'Total TTC', totals.total, boxX + 2.5, listTop + 17, boxW - 5, 7.5, true);
  amountField(doc, 'Payé', totals.paid, boxX + 2.5, listTop + 23, boxW - 5, 7.5);
  amountField(doc, 'Reste à payer', totals.remaining, boxX + 2.5, listTop + 29, boxW - 5, 7.5, true);

  // --- Pied ---
  const footY = listBottom + 6;
  useBrandFont(doc, assets.brandFont, 11);
  doc.text('Merci pour votre confiance.', MARGIN, footY);
  setText(doc, LABEL, 6.8);
  if (data.notes?.payment) doc.text(data.notes.payment, MARGIN, footY + 4.2);
  const website = shop.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
  doc.text(`Tél. ${shop.phone}  ·  ${shop.email}  ·  ${website}`, MARGIN, footY + 8);
  const qrSize = 12;
  drawQrCode(doc, shop.website, RIGHT - qrSize, footY - 4, qrSize);
};

// ----------------------------------------------------------------------------
// API publique
// ----------------------------------------------------------------------------

/** Construit le bon de commande (vierge ou pré-rempli) sur une seule page A4 */
export const createOrderFormPdf = async (data: OrderFormData): Promise<JsPDF> => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  doc.setProperties({
    title: data.orderNumber ? `Bon de commande ${data.orderNumber}` : 'Bon de commande',
    author: data.shop.name,
  });

  const [logo, photos, brandFont] = await Promise.all([
    tryLoadImage(data.shop.logoUrl, 300, 'PNG'),
    Promise.all(data.products.map((product) => tryLoadImage(product.imageUrl, 240, 'JPEG'))),
    registerBrandFont(doc),
  ]);
  const assets: Assets = { logo, photos, brandFont };

  drawShopCopy(doc, data, assets);
  drawCutLine(doc);
  drawCustomerCopy(doc, data, assets);
  return doc;
};

/** Construit le bon de commande et lance son téléchargement */
export const downloadOrderFormPdf = async (data: OrderFormData, fileName?: string) => {
  const doc = await createOrderFormPdf(data);
  doc.save(fileName ?? (data.orderNumber ? `Bon-Commande-${data.orderNumber}.pdf` : 'Bon-Commande-vierge.pdf'));
};
