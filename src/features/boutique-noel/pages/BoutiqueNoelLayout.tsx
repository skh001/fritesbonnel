import { Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from '../cart/CartContext';
import CartButton from '../components/cart/CartButton';
import CartDrawer from '../components/cart/CartDrawer';
import { SHOP_ROUTES } from '../config/shop';
import '../boutique-noel.css';

// Pages sans bouton panier flottant (le récapitulatif y est déjà affiché)
const PAGES_WITHOUT_CART_BUTTON: string[] = [SHOP_ROUTES.checkout, SHOP_ROUTES.confirmation];

/** Enveloppe commune à toutes les pages de la Boutique de Noël */
const BoutiqueNoelLayout = () => {
  const { pathname } = useLocation();
  const showCartButton = !PAGES_WITHOUT_CART_BUTTON.includes(pathname.replace(/\/$/, ''));

  return (
    <CartProvider>
      <Outlet />
      {showCartButton && <CartButton />}
      <CartDrawer />
    </CartProvider>
  );
};

export default BoutiqueNoelLayout;
