import { Fragment, useState } from 'react';
import { ArrowRight, Gift, Snowflake, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SHOP_ROUTES } from '../../config/shop';
import { dismissPromo, isPromoActive, isPromoDismissed } from './promoStorage';
import '../../boutique-noel.css';

const MESSAGES = [
  'La Boutique de Noël est ouverte !',
  'Hoodies, tee-shirts et tabliers Frites Bonnel',
  'Commandez en ligne et payez sur place avant le 6 décembre',
  'Retrait à partir du 16 décembre',
];

// Nombre de répétitions par moitié de piste : assez pour couvrir les écrans les plus larges
const REPEAT = 3;

const MarqueeGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="flex flex-shrink-0 items-center" aria-hidden={hidden || undefined}>
    {Array.from({ length: REPEAT }, (_, repeat) => (
      <Fragment key={repeat}>
        {MESSAGES.map((message, index) => (
          <span key={message} className="flex items-center whitespace-nowrap">
            {index === 0 ? (
              <Gift className="mx-4 h-4 w-4 text-[#fffd67]" aria-hidden="true" />
            ) : (
              <Snowflake className="mx-4 h-3.5 w-3.5 text-white/60" aria-hidden="true" />
            )}
            <span className={index === 0 ? 'font-semibold' : ''}>{message}</span>
          </span>
        ))}
        <span className="ml-4 inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[#fffd67]">
          Découvrir
          <ArrowRight className="h-4 w-4" />
        </span>
      </Fragment>
    ))}
  </div>
);

/** Bandeau d'annonce défilant, affiché au-dessus du menu sur toutes les pages hors boutique */
const ChristmasAnnouncementBar = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(() => isPromoActive() && !isPromoDismissed('bandeau'));

  if (!visible || pathname.startsWith(SHOP_ROUTES.home)) return null;

  const close = () => {
    dismissPromo('bandeau');
    setVisible(false);
  };

  return (
    <div className="relative bg-green-700 text-sm text-white">
      <Link
        to={SHOP_ROUTES.home}
        aria-label="La Boutique de Noël est ouverte : découvrir la boutique"
        className="bn-marquee-container block overflow-hidden py-2 pr-10 [mask-image:linear-gradient(to_right,transparent,black_4%,black_92%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#fffd67]"
      >
        {/* Deux moitiés identiques : la piste défile de 50 % pour une boucle sans à-coup */}
        <div className="bn-marquee">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </Link>
      <button
        type="button"
        onClick={close}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-700 p-1.5 text-white/80 transition-colors hover:bg-green-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffd67]"
        aria-label="Fermer l’annonce"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ChristmasAnnouncementBar;
