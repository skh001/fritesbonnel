const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export const formatPrice = (amount: number) => priceFormatter.format(amount);

/** Arrondi au centime pour éviter les erreurs de virgule flottante */
export const roundPrice = (amount: number) => Math.round(amount * 100) / 100;

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count > 1 ? plural : singular}`;
