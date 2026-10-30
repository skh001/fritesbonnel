import { useEffect, useRef, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../cart/useCart';
import { formatPrice } from '../../utils/format';

/** Bouton panier flottant, positionné au-dessus du bouton « retour en haut » du site */
const CartButton = () => {
  const { itemCount, total, openDrawer } = useCart();
  const [bump, setBump] = useState(false);
  const previousCount = useRef(itemCount);

  // Petite animation quand un article est ajouté
  useEffect(() => {
    if (itemCount > previousCount.current) {
      setBump(true);
      const timer = window.setTimeout(() => setBump(false), 400);
      previousCount.current = itemCount;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = itemCount;
  }, [itemCount]);

  return (
    <button
      type="button"
      onClick={openDrawer}
      className={`fixed bottom-20 right-6 z-50 flex items-center gap-3 rounded-full bg-red-600 py-3 pl-4 pr-5 text-[#fffd67] shadow-xl ring-4 ring-white/70 transition-all duration-300 hover:scale-105 hover:bg-red-700 ${
        bump ? 'scale-110' : ''
      }`}
      aria-label={`Ouvrir le panier (${itemCount} article${itemCount > 1 ? 's' : ''})`}
    >
      <span className="relative">
        <ShoppingBag className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fffd67] px-1 text-xs font-bold text-red-600">
            {itemCount}
          </span>
        )}
      </span>
      {itemCount > 0 && <span className="hidden font-semibold sm:inline">{formatPrice(total)}</span>}
    </button>
  );
};

export default CartButton;
