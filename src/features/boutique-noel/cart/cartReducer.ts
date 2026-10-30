// Logique pure du panier : aucune dépendance à React, facilement testable.
import { MAX_QUANTITY_PER_LINE } from '../config/shop';
import type { CartLine, Size } from '../types';

export type CartAction =
  | { type: 'add'; productId: string; size: Size; quantity: number }
  | { type: 'setQuantity'; productId: string; size: Size; quantity: number }
  | { type: 'remove'; productId: string; size: Size }
  | { type: 'clear' }
  | { type: 'replace'; lines: CartLine[] };

const clampQuantity = (quantity: number) =>
  Math.min(MAX_QUANTITY_PER_LINE, Math.max(1, Math.floor(quantity)));

const isSameLine = (line: CartLine, productId: string, size: Size) =>
  line.productId === productId && line.size === size;

export const cartReducer = (lines: CartLine[], action: CartAction): CartLine[] => {
  switch (action.type) {
    case 'add': {
      const existing = lines.find((line) => isSameLine(line, action.productId, action.size));
      if (!existing) {
        return [...lines, { productId: action.productId, size: action.size, quantity: clampQuantity(action.quantity) }];
      }
      return lines.map((line) =>
        line === existing ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) } : line,
      );
    }
    case 'setQuantity':
      if (action.quantity < 1) {
        return lines.filter((line) => !isSameLine(line, action.productId, action.size));
      }
      return lines.map((line) =>
        isSameLine(line, action.productId, action.size) ? { ...line, quantity: clampQuantity(action.quantity) } : line,
      );
    case 'remove':
      return lines.filter((line) => !isSameLine(line, action.productId, action.size));
    case 'clear':
      return [];
    case 'replace':
      return action.lines;
    default:
      return lines;
  }
};

/** Valide des données inconnues (localStorage) et ne garde que les lignes correctes */
export const sanitizeCartLines = (value: unknown, productSizes: ReadonlyMap<string, readonly Size[]>): CartLine[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item): CartLine[] => {
    if (typeof item !== 'object' || item === null) return [];
    const { productId, size, quantity } = item as Record<string, unknown>;
    if (
      typeof productId !== 'string' ||
      // Produit inconnu ou taille qui n'existe pas (plus) pour ce produit
      !productSizes.get(productId)?.includes(size as Size) ||
      typeof quantity !== 'number' ||
      !Number.isFinite(quantity) ||
      quantity < 1
    ) {
      return [];
    }
    return [{ productId, size: size as Size, quantity: clampQuantity(quantity) }];
  });
};
