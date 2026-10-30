import { ArrowDown, Sparkles } from 'lucide-react';
import { SHOP_SEASON_LABEL } from '../../config/shop';
import type { Product } from '../../types';
import FestiveLights from '../decor/FestiveLights';
import Snowfall from '../decor/Snowfall';

interface ShopHeroProps {
  featuredProduct: Product;
  onDiscover: () => void;
  onHowItWorks: () => void;
}

const ShopHero = ({ featuredProduct, onDiscover, onHowItWorks }: ShopHeroProps) => {
  const image = featuredProduct.images[0];

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-red-600 text-white shadow-lg">
      {/* Halos lumineux chauds */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#fffd67]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-red-900/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-green-700/25 blur-3xl" aria-hidden="true" />

      <Snowfall />
      <FestiveLights />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-20 md:grid-cols-2 md:pb-24 md:pt-24">
        <div className="bn-fade-in text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fffd67] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Nouvelle collection · {SHOP_SEASON_LABEL}
          </span>
          <p className="mt-6 font-folks text-3xl text-[#fffd67] md:text-4xl">Joyeux Noël</p>
          <h2 className="mt-2 font-arialnarrow7 text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            La Boutique
            <br />
            de Noël
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-white/90 md:mx-0">
            Hoodies, tee-shirts et tabliers aux couleurs de Frites Bonnel. Commandez en ligne, réglez sur l’un de
            nos emplacements avant le 6 décembre et récupérez vos articles dès le 16 décembre.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <button
              type="button"
              onClick={onDiscover}
              className="flex items-center gap-2 rounded-xl bg-[#fffd67] px-8 py-4 text-lg font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#fffd67]/90 hover:shadow-xl"
            >
              Découvrir la collection
              <ArrowDown className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onHowItWorks}
              className="rounded-xl border-2 border-white/40 px-6 py-3.5 font-semibold text-white transition-colors hover:border-[#fffd67] hover:text-[#fffd67]"
            >
              Comment ça marche ?
            </button>
          </div>
        </div>

        {/* Visuel : produit vedette présenté comme une carte cadeau */}
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="bn-float relative rounded-2xl bg-white p-4 shadow-2xl">
            <div className="overflow-hidden rounded-xl bg-[#f7f1e8]">
              <img src={image.src} alt={image.alt} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="flex items-center justify-between px-1 pt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Pièce phare</p>
                <p className="font-semibold text-red-600">{featuredProduct.name}</p>
              </div>
              <span className="font-folks text-2xl text-red-600">Bonnes &amp; Belles</span>
            </div>
            {/* Étiquette cadeau */}
            <span className="absolute -right-3 -top-4 rotate-6 rounded-lg bg-green-700 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
              Idée cadeau
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
