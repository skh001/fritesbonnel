import { Check, Clock, MapPin, Phone, Wallet } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { PAYMENT_DEADLINE_TEXT, PICKUP_START_LABEL, SHOP_CONTACT_PHONE, SHOP_ROUTES, formatSize } from '../config/shop';
import { readLastOrder } from '../services/orderService';
import type { ConfirmedOrder } from '../types';
import { formatPrice, pluralize } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import DownloadReceiptButton from '../components/checkout/DownloadReceiptButton';
import FestiveLights from '../components/decor/FestiveLights';
import Snowfall from '../components/decor/Snowfall';

const ConfirmationPage = () => {
  useDocumentTitle('Commande confirmée');
  const location = useLocation();
  const order = (location.state as { order?: ConfirmedOrder } | null)?.order ?? readLastOrder();

  if (!order) return <Navigate to={SHOP_ROUTES.home} replace />;

  const { customer, pickupPoint } = order;
  const createdAt = new Date(order.createdAt);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-b-2xl bg-red-600 text-white shadow-lg">
        <Snowfall count={28} fallDistance={480} />
        <FestiveLights />
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-14 pt-20 text-center">
          <div className="bn-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fffd67] shadow-lg">
            <Check className="h-10 w-10 text-red-600" strokeWidth={3} />
          </div>
          <p className="bn-fade-in mt-6 font-folks text-3xl text-[#fffd67]" style={{ animationDelay: '150ms' }}>
            Merci {customer.firstName} !
          </p>
          <h2 className="bn-fade-in mt-2 text-4xl font-bold" style={{ animationDelay: '250ms' }}>
            Votre commande est enregistrée
          </h2>
          <p className="bn-fade-in mx-auto mt-4 max-w-xl text-lg text-white/90" style={{ animationDelay: '350ms' }}>
            Nous vous contacterons au <strong className="whitespace-nowrap">{customer.phone}</strong> dès que votre
            commande sera prête.
          </p>
          <p className="bn-fade-in mt-6 inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold tracking-wider" style={{ animationDelay: '450ms' }}>
            Commande n° {order.reference}
          </p>
          <div className="bn-fade-in mt-6" style={{ animationDelay: '550ms' }}>
            <DownloadReceiptButton order={order} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border-2 border-[#fffd67] bg-[#fffd67]/30 p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-red-600">Retrait</h3>
            <p className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-[#fffd67]">
              À partir du {PICKUP_START_LABEL}
            </p>
            <p className="flex items-center gap-2 font-semibold text-gray-800">
              <Clock className="h-4 w-4 text-red-600" />
              {pickupPoint.day} · {pickupPoint.period}
            </p>
            <p className="mt-2 flex items-start gap-2 text-gray-700">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-red-600" />
              <span>
                {pickupPoint.place}
                {pickupPoint.address && <span className="block text-sm text-gray-500">{pickupPoint.address}</span>}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
            <p className="flex items-center gap-2 font-semibold">
              <Wallet className="h-5 w-5" /> Paiement sur place, {PAYMENT_DEADLINE_TEXT}
            </p>
            <p className="mt-2 text-sm">
              Passez régler <strong>{formatPrice(order.total)}</strong> sur l’un de nos emplacements, au choix. Sans paiement
              à cette date, la commande est annulée, sauf si vous nous appelez au{" "}
                <span className="whitespace-nowrap">{SHOP_CONTACT_PHONE}</span>.
            </p>
          </div>

          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-red-600" />
            Une question ? Appelez-nous au{' '}
            <a href={`tel:${SHOP_CONTACT_PHONE.replace(/\s/g, '')}`} className="font-semibold text-red-600 hover:underline">
              {SHOP_CONTACT_PHONE}
            </a>
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg md:col-span-3">
          <div className="flex items-baseline justify-between border-b-2 border-[#fffd67] pb-3">
            <h3 className="text-lg font-semibold text-red-600">Récapitulatif</h3>
            <span className="text-sm text-gray-500">
              {createdAt.toLocaleDateString('fr-FR')} à{' '}
              {createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <ul className="divide-y divide-gray-100">
            {order.lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex items-center gap-4 py-4">
                <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#f7f1e8]">
                  {line.image && <img src={line.image} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="font-semibold text-gray-800">{line.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatSize(line.size)} · {line.quantity} × {formatPrice(line.unitPrice)}
                  </p>
                </div>
                <span className="font-semibold text-gray-800">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-baseline justify-between border-t-2 border-gray-100 pt-4">
            <span className="font-semibold text-gray-800">Total ({pluralize(order.itemCount, 'article')})</span>
            <span className="text-2xl font-bold text-red-600">{formatPrice(order.total)}</span>
          </div>
          {customer.comment && (
            <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm italic text-gray-600">« {customer.comment} »</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
        <Link
          to={SHOP_ROUTES.home}
          className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-[#fffd67] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700"
        >
          Retour à la boutique
        </Link>
        <Link
          to="/"
          className="rounded-xl border-2 border-gray-200 px-8 py-3.5 font-semibold text-gray-700 transition-colors hover:border-red-600 hover:text-red-600"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
