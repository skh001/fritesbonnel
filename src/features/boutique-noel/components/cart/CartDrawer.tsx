import { useEffect, useRef } from 'react';
import { Gift, ShoppingBag, Wallet, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/useCart';
import { SHOP_ROUTES } from '../../config/shop';
import { formatPrice, pluralize } from '../../utils/format';
import CartLineItem from './CartLineItem';
import ClearCartButton from './ClearCartButton';

/** Panier latéral : s'ouvre après chaque ajout et depuis le bouton panier */
const CartDrawer = () => {
  const { lines, itemCount, total, isDrawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fermeture automatique lors d'un changement de page
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Échap pour fermer, blocage du défilement de la page, focus sur le bouton fermer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const goTo = (path: string) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${isDrawerOpen ? 'visible' : 'invisible'}`}
      // Masquage différé à la fermeture pour laisser l'animation se terminer
      style={{ transition: `visibility 0s linear ${isDrawerOpen ? 0 : 300}ms` }}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeDrawer}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Votre panier"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b-2 border-[#fffd67] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-red-600">Votre panier</h2>
            <p className="text-sm text-gray-500">{itemCount > 0 ? pluralize(itemCount, 'article') : 'Aucun article'}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-[#fffd67] hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-grow flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fffd67]">
              <Gift className="h-9 w-9 text-red-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800">Votre panier est vide</p>
            <p className="mt-2 text-sm text-gray-500">Il reste de la place sous le sapin…</p>
            <button
              type="button"
              onClick={() => goTo(SHOP_ROUTES.home)}
              className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-[#fffd67] shadow-md transition-all hover:scale-105 hover:bg-red-700"
            >
              Découvrir la collection
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-grow divide-y divide-gray-100 overflow-y-auto overscroll-contain px-6">
              {lines.map((line) => (
                <CartLineItem key={`${line.productId}-${line.size}`} line={line} onNavigate={closeDrawer} />
              ))}
            </ul>

            <footer className="space-y-4 border-t border-gray-100 bg-gray-50 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
              </div>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <Wallet className="h-4 w-4 flex-shrink-0 text-green-700" />
                Aucun paiement en ligne : réglez sur l’un de nos emplacements avant le 6 décembre.
              </p>
              <button
                type="button"
                onClick={() => goTo(SHOP_ROUTES.checkout)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-lg font-semibold text-[#fffd67] shadow-md transition-all hover:bg-red-700 hover:shadow-lg active:scale-[0.99]"
              >
                <ShoppingBag className="h-5 w-5" />
                Valider ma commande
              </button>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="text-sm font-semibold text-gray-700 underline-offset-4 hover:text-red-600 hover:underline"
                >
                  Continuer mes achats
                </button>
                <ClearCartButton />
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
