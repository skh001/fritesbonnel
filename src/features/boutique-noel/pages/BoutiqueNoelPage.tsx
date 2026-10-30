import { useMemo, useRef, useState, type RefObject } from 'react';
import { Snowflake } from 'lucide-react';
import { PRODUCTS } from '../config/products';
import { CATEGORY_LABELS, ORDER_DEADLINE_LABEL, PICKUP_START_LABEL } from '../config/shop';
import type { ProductCategory } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Reveal from '../components/decor/Reveal';
import ProductCard from '../components/product/ProductCard';
import CategoryFilter, { type CategoryFilterValue } from '../components/shop/CategoryFilter';
import HowItWorks from '../components/shop/HowItWorks';
import PickupPointsOverview from '../components/shop/PickupPointsOverview';
import ShopHero from '../components/shop/ShopHero';
import ShopReassurance from '../components/shop/ShopReassurance';

const SectionTitle = ({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    {kicker && <p className="mb-2 font-folks text-2xl text-red-600">{kicker}</p>}
    <h3 className="text-3xl font-bold text-red-600">{title}</h3>
    {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">{subtitle}</p>}
  </div>
);

const BoutiqueNoelPage = () => {
  useDocumentTitle('Boutique de Noël');
  const [category, setCategory] = useState<CategoryFilterValue>('all');
  const collectionRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);

  const filterOptions = useMemo(() => {
    const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];
    return [
      { value: 'all' as const, label: 'Toute la collection', count: PRODUCTS.length },
      ...categories
        .map((value) => ({
          value,
          label: CATEGORY_LABELS[value],
          count: PRODUCTS.filter((product) => product.category === value).length,
        }))
        .filter((option) => option.count > 0),
    ];
  }, []);

  const visibleProducts = useMemo(
    () => (category === 'all' ? PRODUCTS : PRODUCTS.filter((product) => product.category === category)),
    [category],
  );

  const scrollTo = (ref: RefObject<HTMLElement>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="space-y-16">
      <ShopHero
        featuredProduct={PRODUCTS[0]}
        onDiscover={() => scrollTo(collectionRef)}
        onHowItWorks={() => scrollTo(howItWorksRef)}
      />

      <section className="mx-auto max-w-6xl px-4">
        <Reveal>
          <ShopReassurance />
        </Reveal>
      </section>

      <section ref={collectionRef} className="scroll-mt-6 bg-gray-50 py-16" aria-labelledby="collection-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <p className="mb-2 font-folks text-2xl text-red-600">Sous le sapin cette année</p>
            <h3 id="collection-title" className="text-3xl font-bold text-red-600">
              La Collection
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
              Des créations croustillantes... sans passer à la friteuse.
            </p>
          </div>

          <div className="mb-10 flex justify-center">
            <CategoryFilter options={filterOptions} value={category} onChange={setCategory} />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product, index) => (
              // La clé inclut le filtre pour rejouer l'animation à chaque changement
              <Reveal key={`${category}-${product.id}`} delay={(index % 3) * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section ref={howItWorksRef} className="mx-auto max-w-6xl scroll-mt-6 px-4">
        <SectionTitle kicker="Simple comme bonjour" title="Comment ça marche ?" />
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="Où récupérer votre commande ?"
          subtitle="Vous choisirez votre point de retrait au moment de valider votre panier."
        />
        <PickupPointsOverview />
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-red-600 px-6 py-12 text-center text-white shadow-lg">
            <Snowflake className="absolute -left-6 -top-6 h-32 w-32 text-white/10" aria-hidden="true" />
            <Snowflake className="absolute -bottom-8 -right-8 h-40 w-40 text-white/10" aria-hidden="true" />
            <p className="font-folks text-3xl text-[#fffd67]">Bonnes &amp; Belles fêtes</p>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
              Édition limitée : pour l’avoir sous le sapin, commandez jusqu’au {ORDER_DEADLINE_LABEL} inclus ! Vos
              articles exclusifs sont imprimés à la demande, rien que pour vous, et à récupérer à partir du{' '}
              {PICKUP_START_LABEL}.
            </p>
            <button
              type="button"
              onClick={() => scrollTo(collectionRef)}
              className="mt-8 rounded-xl bg-[#fffd67] px-8 py-4 font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Je choisis mes articles
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default BoutiqueNoelPage;
