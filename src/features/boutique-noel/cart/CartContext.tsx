import { useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { PRODUCTS, findProductById } from '../config/products';
import type { ResolvedCartLine, Size } from '../types';
import { roundPrice } from '../utils/format';
import { CartContext, type CartContextValue } from './cartContextValue';
import { cartReducer, sanitizeCartLines } from './cartReducer';

const STORAGE_KEY = 'frites-bonnel:boutique-noel:panier:v1';
const PRODUCT_SIZES = new Map(PRODUCTS.map((product) => [product.id, product.sizes]));

const readStoredLines = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeCartLines(JSON.parse(raw), PRODUCT_SIZES) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [rawLines, dispatch] = useReducer(cartReducer, undefined, readStoredLines);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Persistance : le panier survit au rechargement de la page
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      // Stockage indisponible (navigation privée…) : le panier reste en mémoire
    }
  }, [rawLines]);

  // Synchronisation entre plusieurs onglets ouverts
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) dispatch({ type: 'replace', lines: readStoredLines() });
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const lines = useMemo(
    () =>
      rawLines.flatMap((line): ResolvedCartLine[] => {
        const product = findProductById(line.productId);
        return product ? [{ ...line, product, lineTotal: roundPrice(product.price * line.quantity) }] : [];
      }),
    [rawLines],
  );

  const addItem = useCallback((productId: string, size: Size, quantity: number) => {
    dispatch({ type: 'add', productId, size, quantity });
  }, []);
  const setQuantity = useCallback((productId: string, size: Size, quantity: number) => {
    dispatch({ type: 'setQuantity', productId, size, quantity });
  }, []);
  const removeItem = useCallback((productId: string, size: Size) => {
    dispatch({ type: 'remove', productId, size });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((count, line) => count + line.quantity, 0),
      total: roundPrice(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [lines, isDrawerOpen, openDrawer, closeDrawer, addItem, setQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
