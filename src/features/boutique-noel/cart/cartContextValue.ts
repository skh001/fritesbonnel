// Objet de contexte isolé dans son propre module : le fichier du Provider
// n'exporte ainsi qu'un composant (compatible avec le rechargement à chaud de Vite).
import { createContext } from 'react';
import type { ResolvedCartLine, Size } from '../types';

export interface CartContextValue {
  lines: ResolvedCartLine[];
  itemCount: number;
  total: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, size: Size, quantity: number) => void;
  setQuantity: (productId: string, size: Size, quantity: number) => void;
  removeItem: (productId: string, size: Size) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
