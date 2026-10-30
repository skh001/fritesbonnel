import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOP_ROUTES, formatSize } from '../../config/shop';
import type { ResolvedCartLine } from '../../types';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../cart/useCart';
import QuantityStepper from '../product/QuantityStepper';

interface CartLineItemProps {
  line: ResolvedCartLine;
  /** Appelé lors d'un clic sur le produit (ex. fermer le tiroir) */
  onNavigate?: () => void;
}

const CartLineItem = ({ line, onNavigate }: CartLineItemProps) => {
  const { setQuantity, removeItem } = useCart();
  const { product, size, quantity, lineTotal } = line;
  const image = product.images[0];

  return (
    <li className="bn-fade-in flex gap-4 py-4">
      <Link
        to={SHOP_ROUTES.product(product.slug)}
        onClick={onNavigate}
        className="h-24 w-[4.5rem] flex-shrink-0 overflow-hidden rounded-lg bg-[#f7f1e8] sm:h-28 sm:w-[5.25rem]"
      >
        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
      </Link>

      <div className="flex min-w-0 flex-grow flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={SHOP_ROUTES.product(product.slug)}
              onClick={onNavigate}
              className="block font-semibold leading-snug text-gray-800 hover:text-red-600"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-gray-500">
              {formatSize(size)} · {formatPrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id, size)}
            className="-mr-1 rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label={`Retirer ${product.name} (taille ${size}) du panier`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            size="sm"
            value={quantity}
            onChange={(next) => setQuantity(product.id, size, next)}
            label={`Quantité pour ${product.name}`}
          />
          <span className="font-bold text-gray-800">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </li>
  );
};

export default CartLineItem;
