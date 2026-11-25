// Configuration générale de la Boutique de Noël
import type { ProductCategory, Size } from '../types';

export const SHOP_SEASON_LABEL = 'Noël 2026';

// --- Calendrier de la saison ---
// Les articles sont imprimés à la commande : les commandes ferment à cette date (incluse)
export const ORDER_DEADLINE = new Date('2026-12-06T23:59:59');
export const ORDER_DEADLINE_LABEL = 'dimanche 6 décembre';
/** Date à partir de laquelle les commandes peuvent être retirées */
export const PICKUP_START_LABEL = '16 décembre';

export const isOrderingOpen = () => new Date() <= ORDER_DEADLINE;

// Paiement : sur n'importe lequel de nos emplacements, au plus tard à la date de fin des commandes
export const PAYMENT_DEADLINE_TEXT = `jusqu’au ${ORDER_DEADLINE_LABEL} à 21h30`;
export const PAYMENT_SUMMARY = `Sur place, sur l’un de nos emplacements, ${PAYMENT_DEADLINE_TEXT}`;

/** Le bandeau et le pop-up d'annonce disparaissent automatiquement à la fermeture des commandes */
export const SHOP_PROMO_END_DATE = ORDER_DEADLINE;

export const SHOP_ROUTES = {
  home: '/boutique-noel',
  checkout: '/boutique-noel/commande',
  confirmation: '/boutique-noel/confirmation',
  product: (slug: string) => `/boutique-noel/${slug}`,
} as const;

export const ALL_SIZES: readonly Size[] = ['S', 'M', 'L', 'XL'];
/** Tailles des sweats (jusqu'au XXXL) */
export const HOODIE_SIZES: readonly Size[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
/** Taille unique (ex. tablier) : sélectionnée automatiquement sur la page produit */
export const ONE_SIZE: readonly Size[] = ['TU'];

const SIZE_LABELS: Record<Size, string> = { S: 'S', M: 'M', L: 'L', XL: 'XL', XXL: 'XXL', XXXL: 'XXXL', TU: 'Unique' };
/** Libellé court : « M », « Unique » */
export const sizeLabel = (size: Size) => SIZE_LABELS[size];
/** Libellé complet : « Taille M », « Taille unique » */
export const formatSize = (size: Size) => (size === 'TU' ? 'Taille unique' : `Taille ${size}`);

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  hoodie: 'Hoodies',
  'tee-shirt': 'Tee-shirts',
  tablier: 'Tabliers',
};

/** Quantité maximale par ligne (produit + taille) */
export const MAX_QUANTITY_PER_LINE = 10;

export const SHOP_CONTACT_PHONE = '06 11 52 16 89';

// --- Web3Forms (même service que le formulaire de devis) ---
// La clé Web3Forms est conçue pour être publique : elle permet seulement d'envoyer
// un e-mail vers l'adresse associée au compte, jamais de lire des données.
// Elle peut être surchargée par la variable d'environnement VITE_WEB3FORMS_ACCESS_KEY.
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '31e46569-d884-49d6-ac4f-aac7e07a78c3';
