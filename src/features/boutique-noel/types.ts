// Types partagés de la Boutique de Noël

/** 'TU' = taille unique (ex. tablier) */
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'TU';

export type ProductCategory = 'hoodie' | 'tee-shirt' | 'tablier';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  /** Identifiant unique, utilisé dans le panier (ne pas modifier une fois en ligne) */
  id: string;
  /** Segment d'URL : /boutique-noel/<slug> */
  slug: string;
  name: string;
  category: ProductCategory;
  /** Accroche courte affichée sur la carte produit */
  tagline: string;
  /** Description complète affichée sur la page produit */
  description: string;
  /** Points forts listés sur la page produit */
  details: string[];
  /** Prix TTC en euros */
  price: number;
  sizes: readonly Size[];
  /** La première image est l'image principale */
  images: ProductImage[];
  /** Petit badge facultatif (« Best-seller », « Édition Noël »…) */
  badge?: string;
}

export interface PickupGroup {
  id: string;
  label: string;
  description?: string;
}

export interface PickupPoint {
  id: string;
  groupId: PickupGroup['id'];
  /** Jour / créneau mis en avant (« Mercredi », « Du mercredi au dimanche »…) */
  day: string;
  /** Moment de la journée (« Midi », « Soir ») */
  period: string;
  /** Nom du lieu */
  place: string;
  address?: string;
}

export interface CartLine {
  productId: Product['id'];
  size: Size;
  quantity: number;
}

/** Ligne de panier enrichie avec les données du catalogue */
export interface ResolvedCartLine extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface CustomerDetails {
  lastName: string;
  firstName: string;
  phone: string;
  comment: string;
  pickupPointId: PickupPoint['id'];
}

/** Commande figée au moment de la validation (affichée sur la confirmation) */
export interface ConfirmedOrder {
  reference: string;
  createdAt: string;
  customer: Omit<CustomerDetails, 'pickupPointId'>;
  pickupPoint: PickupPoint;
  lines: {
    productId: string;
    name: string;
    size: Size;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    image: string;
  }[];
  itemCount: number;
  total: number;
}
