import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/useCart';
import { SHOP_ROUTES } from '../../config/shop';
import { formatPrice, pluralize } from '../../utils/format';
import CartLineItem from '../cart/CartLineItem';
import ClearCartButton from '../cart/ClearCartButton';

/** Récapitulatif modifiable du panier, affiché à côté du formulaire de commande */
const OrderSummary = () => {
  const { lines, itemCount, total } = useCart();

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-baseline justify-between border-b-2 border-[#fffd67] pb-3">
        <h4 className="text-xl font-semibold text-red-600">Votre panier</h4>
        <span className="text-sm text-gray-500">{pluralize(itemCount, 'article')}</span>
      </div>

      <ul className="divide-y divide-gray-100">
        {lines.map((line) => (
          <CartLineItem key={`${line.productId}-${line.size}`} line={line} />
        ))}
      </ul>

      <div className="space-y-3 border-t-2 border-gray-100 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
        </div>
        <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800">
          <Wallet className="h-4 w-4 flex-shrink-0" />À régler sur l’un de nos emplacements avant le 6 décembre.
        </p>
        <div className="flex items-center justify-between pt-1">
          <Link
            to={SHOP_ROUTES.home}
            className="text-sm font-semibold text-gray-700 underline-offset-4 hover:text-red-600 hover:underline"
          >
            Continuer mes achats
          </Link>
          <ClearCartButton />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
