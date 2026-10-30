// Mémorise (par navigateur) les annonces que le visiteur a déjà fermées
import { SHOP_PROMO_END_DATE } from '../../config/shop';

export type PromoKey = 'bandeau';

const storageKey = (key: PromoKey) => `frites-bonnel:boutique-noel:annonce-${key}-fermee`;

export const isPromoActive = () => new Date() <= SHOP_PROMO_END_DATE;

export const isPromoDismissed = (key: PromoKey) => {
  try {
    return window.localStorage.getItem(storageKey(key)) === '1';
  } catch {
    return false;
  }
};

export const dismissPromo = (key: PromoKey) => {
  try {
    window.localStorage.setItem(storageKey(key), '1');
  } catch {
    // Stockage indisponible : l'annonce réapparaîtra simplement à la prochaine visite
  }
};
