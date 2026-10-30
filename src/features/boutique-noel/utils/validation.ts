import { findPickupPoint } from '../config/pickupPoints';
import type { CustomerDetails } from '../types';

export type CustomerErrors = Partial<Record<keyof CustomerDetails, string>>;

export const COMMENT_MAX_LENGTH = 500;

// Numéros français : 06 12 34 56 78, 0612345678, +33 6 12 34 56 78, 0033…
const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

const NAME_REGEX = /^[\p{L}][\p{L}\s'’-]*$/u;

export const validateCustomer = (values: CustomerDetails): CustomerErrors => {
  const errors: CustomerErrors = {};
  const lastName = values.lastName.trim();
  const firstName = values.firstName.trim();
  const phone = values.phone.trim();

  if (!lastName) errors.lastName = 'Merci d’indiquer votre nom.';
  else if (!NAME_REGEX.test(lastName) || lastName.length > 60) errors.lastName = 'Ce nom ne semble pas valide.';

  if (!firstName) errors.firstName = 'Merci d’indiquer votre prénom.';
  else if (!NAME_REGEX.test(firstName) || firstName.length > 60) errors.firstName = 'Ce prénom ne semble pas valide.';

  if (!phone) errors.phone = 'Votre numéro nous permet de vous prévenir quand la commande est prête.';
  else if (!FRENCH_PHONE_REGEX.test(phone)) errors.phone = 'Format attendu : 06 12 34 56 78.';

  if (!values.pickupPointId) errors.pickupPointId = 'Choisissez où récupérer votre commande.';
  else if (!findPickupPoint(values.pickupPointId)) errors.pickupPointId = 'Ce point de retrait n’est plus disponible.';

  if (values.comment.length > COMMENT_MAX_LENGTH) {
    errors.comment = `${COMMENT_MAX_LENGTH} caractères maximum.`;
  }

  return errors;
};
