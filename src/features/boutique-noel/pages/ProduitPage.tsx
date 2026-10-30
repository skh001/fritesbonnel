import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Gift, MapPin, ShoppingBag, Wallet } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useCart } from '../cart/useCart';
import { PRODUCTS, findProductBySlug } from '../config/products';
import { CATEGORY_LABELS, ORDER_DEADLINE_LABEL, SHOP_ROUTES, isOrderingOpen } from '../config/shop';
import type { Product, Size } from '../types';
import { formatPrice } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Reveal from '../components/decor/Reveal';
import ProductBadge from '../components/product/ProductBadge';
import ProductCard from '../components/product/ProductCard';
import QuantityStepper from '../components/product/QuantityStepper';
import SizeHelp from '../components/product/SizeHelp';
import SizeSelector from '../components/product/SizeSelector';

const REASSURANCE = [
  { icon: MapPin, text: 'Retrait sur l’un de nos emplacements' },
  { icon: Wallet, text: 'Paiement sur place avant le 6 décembre' },
  { icon: Gift, text: 'L’idée cadeau 100 % Frites Bonnel' },
];

/** Produits suggérés : même catégorie d'abord, puis le reste de la collection */
const getRelatedProducts = (product: Product, limit = 3) =>
  [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category),
    ...PRODUCTS.filter((p) => p.category !== product.category),
  ].slice(0, limit);

const ProductDetails = ({ product }: { product: Product }) => {
  useDocumentTitle(product.name);
  const { addItem, openDrawer } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  // Taille unique : pré-sélectionnée, le client n'a rien à choisir
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState<string>();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 2500);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const handleSizeChange = (next: Size) => {
    setSize(next);
    setSizeError(undefined);
  };

  const orderingOpen = isOrderingOpen();

  const handleAddToCart = () => {
    if (!orderingOpen) return;
    if (!size) {
      setSizeError('Choisissez une taille pour continuer.');
      return;
    }
    addItem(product.id, size, quantity);
    setJustAdded(true);
    setQuantity(1);
    openDrawer();
  };

  const image = product.images[activeImage] ?? product.images[0];

  return (
    <div className="space-y-16">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-500" aria-label="Fil d’Ariane">
          <Link to={SHOP_ROUTES.home} className="inline-flex items-center gap-1 font-semibold text-red-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Boutique de Noël
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{CATEGORY_LABELS[product.category]}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Visuels */}
          <div className="bn-fade-in">
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-[#f7f1e8] shadow-lg">
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="bn-fade-in aspect-[3/4] w-full object-cover"
              />
              {product.badge && <ProductBadge label={product.badge} className="absolute left-4 top-4" />}
            </div>
            {product.images.length > 1 && (
              <div className="mx-auto mt-4 flex max-w-lg gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-24 w-[4.5rem] overflow-hidden rounded-lg border-2 bg-[#f7f1e8] transition-colors ${
                      index === activeImage ? 'border-red-600' : 'border-transparent hover:border-gray-300'
                    }`}
                    aria-label={`Afficher l’image ${index + 1}`}
                  >
                    <img src={img.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations et achat */}
          <div className="bn-fade-in flex flex-col" style={{ animationDelay: '120ms' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-red-600 md:text-4xl">{product.name}</h2>
            <p className="mt-3 text-2xl font-bold text-gray-800">{formatPrice(product.price)}</p>
            <p className="mt-6 leading-relaxed text-gray-700">{product.description}</p>

            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <SizeSelector sizes={product.sizes} value={size} onChange={handleSizeChange} error={sizeError} />
                {product.sizes.length > 1 && <SizeHelp />}
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-gray-800">Quantité</p>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!orderingOpen}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none ${
                  justAdded ? 'bg-green-700 text-white' : 'bg-red-600 text-[#fffd67] hover:bg-red-700'
                }`}
              >
                {!orderingOpen ? (
                  `Commandes closes depuis le ${ORDER_DEADLINE_LABEL}`
                ) : justAdded ? (
                  <>
                    <Check className="h-5 w-5" /> Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" /> Ajouter au panier · {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>

            <ul className="mt-8 space-y-3 rounded-xl border-2 border-[#fffd67] bg-[#fffd67]/30 p-5">
              {REASSURANCE.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                    <Icon className="h-4 w-4 text-[#fffd67]" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {product.details.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 border-b-2 border-[#fffd67] pb-2 font-semibold text-red-600">Détails</h3>
                <ul className="space-y-2">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-gray-700">
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#fffd67] ring-1 ring-red-200" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="mb-12 text-center text-3xl font-bold text-red-600">Vous aimerez aussi</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {getRelatedProducts(product).map((related, index) => (
              <Reveal key={related.id} delay={index * 100}>
                <ProductCard product={related} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProduitPage = () => {
  const { slug = '' } = useParams();
  const product = findProductBySlug(slug);

  if (!product) return <Navigate to={SHOP_ROUTES.home} replace />;

  // La clé réinitialise taille / quantité quand on passe d'un produit à l'autre
  return <ProductDetails key={product.id} product={product} />;
};

export default ProduitPage;
