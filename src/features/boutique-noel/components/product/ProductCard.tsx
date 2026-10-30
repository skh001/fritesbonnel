import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, SHOP_ROUTES, formatSize, sizeLabel } from '../../config/shop';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/format';
import ProductBadge from './ProductBadge';

const ProductCard = ({ product }: { product: Product }) => {
  const [image, hoverImage] = product.images;
  const href = SHOP_ROUTES.product(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={href}
        className="relative block aspect-[3/4] overflow-hidden bg-[#f7f1e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
        aria-label={`Voir ${product.name}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Seconde vue (ex. face) affichée au survol */}
        {hoverImage && (
          <img
            src={hoverImage.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        {product.badge && <ProductBadge label={product.badge} className="absolute left-3 top-3" />}
        <span className="absolute inset-x-4 bottom-4 hidden translate-y-3 items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-[#fffd67] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          {/* Taille unique : rien à choisir, on invite simplement à voir l'article */}
          {product.sizes.length === 1 ? 'Voir l’article' : 'Choisir ma taille'} <ArrowRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="flex flex-grow flex-col p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h4 className="text-lg font-semibold leading-snug text-red-600">
          <Link to={href} className="hover:underline focus:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h4>
        <p className="mt-1 text-sm text-gray-600">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span className="text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
          <span className="flex gap-1" aria-label={`Tailles disponibles : ${product.sizes.map(sizeLabel).join(', ')}`}>
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500"
              >
                {product.sizes.length === 1 ? formatSize(size) : size}
              </span>
            ))}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
