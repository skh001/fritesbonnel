import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOP_ROUTES, SHOP_SEASON_LABEL } from '../../config/shop';
import illustration from '../../assets/illustration-give-me-more.png';
import { isPromoActive } from './promoStorage';
import '../../boutique-noel.css';

const DISPLAY_DELAY_MS = 800;

// Pages professionnelles (devis) : après les avoir visitées, plus de pop-up pendant la visite
const PRO_PAGES = ['/evenements'];

// Une fois par chargement du site : le pop-up revient à chaque visite ou rechargement,
// mais pas en revenant sur l'accueil via le menu juste après l'avoir fermé.
let popupDoneThisLoad = false;

/** Pop-up d'annonce affiché sur la page d'accueil, quelques secondes après l'arrivée */
const ChristmasShopPopup = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (PRO_PAGES.includes(pathname)) popupDoneThisLoad = true;
    if (pathname !== '/' || !isPromoActive() || popupDoneThisLoad) return;
    const timer = window.setTimeout(() => {
      popupDoneThisLoad = true;
      setOpen(true);
    }, DISPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  // Échap pour fermer, page bloquée en arrière-plan, focus sur le bouton principal
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    ctaRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  const discover = () => {
    close();
    navigate(SHOP_ROUTES.home);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="popup-noel-titre">
      <div className="bn-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={close} />

      <div className="bn-fade-in relative grid w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-2xl sm:grid-cols-2">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow-sm transition-colors hover:bg-[#fffd67] hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex h-52 items-center justify-center bg-white p-6 sm:h-auto sm:p-8">
          <img
            src={illustration}
            alt="Illustration « Give me more Frites Bonnel please !! »"
            className="h-full max-h-80 w-full object-contain"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-green-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            Nouveau
          </span>
        </div>

        <div className="flex flex-col justify-center bg-red-600 p-6 text-center text-white sm:p-8 sm:text-left">
          <span className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fffd67] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600 sm:mx-0">
            <Sparkles className="h-3 w-3" />
            {SHOP_SEASON_LABEL}
          </span>
          <p className="mt-4 font-folks text-2xl text-[#fffd67]">Joyeux Noël</p>
          <h2 id="popup-noel-titre" className="mt-1 font-arialnarrow7 text-3xl font-bold uppercase leading-none sm:text-4xl">
            La Boutique de Noël est ouverte
          </h2>
          <p className="mt-3 text-sm text-white/90">
            Hoodies, tee-shirts et tabliers Frites Bonnel. Commandez en ligne, payez sur place avant le 6 décembre, récupérez dès le 16 décembre.
          </p>
          <button
            ref={ctaRef}
            type="button"
            onClick={discover}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#fffd67] px-6 py-3.5 font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600"
          >
            Découvrir la boutique
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={close}
            className="mt-3 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChristmasShopPopup;
