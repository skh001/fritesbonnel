import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ChevronDown, Gift, Loader2, Lock, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/useCart';
import { findPickupPoint } from '../config/pickupPoints';
import {
  ORDER_DEADLINE_LABEL,
  PAYMENT_DEADLINE_TEXT,
  PICKUP_START_LABEL,
  SHOP_CONTACT_PHONE,
  SHOP_ROUTES,
  isOrderingOpen,
} from '../config/shop';
import { OrderSubmissionError, buildOrder, saveLastOrder, submitOrder } from '../services/orderService';
import type { CustomerDetails } from '../types';
import { formatPrice, pluralize } from '../utils/format';
import { COMMENT_MAX_LENGTH, validateCustomer, type CustomerErrors } from '../utils/validation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FormField, INPUT_CLASS, INPUT_ERROR_CLASS, TextInput } from '../components/checkout/FormField';
import OrderSummary from '../components/checkout/OrderSummary';
import PickupPointPicker from '../components/checkout/PickupPointPicker';

const INITIAL_VALUES: CustomerDetails = {
  lastName: '',
  firstName: '',
  phone: '',
  comment: '',
  pickupPointId: '',
};

const FIELD_ORDER: (keyof CustomerDetails)[] = ['lastName', 'firstName', 'phone', 'pickupPointId', 'comment'];

const StepTitle = ({ step, title }: { step: number; title: string }) => (
  <h4 className="mb-5 flex items-center gap-3 text-xl font-semibold text-red-600">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fffd67] text-base font-bold text-red-600">
      {step}
    </span>
    {title}
  </h4>
);

const CommandePage = () => {
  useDocumentTitle('Finaliser ma commande');
  const navigate = useNavigate();
  const { lines, itemCount, total, clearCart } = useCart();
  const [values, setValues] = useState<CustomerDetails>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const updateField = <K extends keyof CustomerDetails>(field: K, value: CustomerDetails[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Après une première tentative, les erreurs se mettent à jour en direct
    if (submitted) setErrors(validateCustomer(next));
  };

  const handleChange =
    (field: 'lastName' | 'firstName' | 'phone' | 'comment') =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(field, event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || !isOrderingOpen()) return;

    // Pot de miel anti-spam : un humain ne remplit jamais ce champ invisible
    const honeypot = new FormData(event.currentTarget).get('botcheck');
    if (honeypot) return;

    setSubmitted(true);
    setSubmitError(undefined);
    const validationErrors = validateCustomer(values);
    setErrors(validationErrors);

    const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field]);
    if (firstInvalid) {
      const target = document.getElementById(firstInvalid === 'pickupPointId' ? 'pickup-section' : firstInvalid);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) target.focus({ preventScroll: true });
      return;
    }

    const pickupPoint = findPickupPoint(values.pickupPointId);
    if (!pickupPoint || lines.length === 0) return;

    const order = buildOrder(values, pickupPoint, lines, total);
    setSubmitting(true);
    try {
      await submitOrder(order);
      saveLastOrder(order);
      navigate(SHOP_ROUTES.confirmation, { state: { order }, replace: true });
      clearCart();
    } catch (error) {
      setSubmitError(
        error instanceof OrderSubmissionError ? error.message : 'Une erreur inattendue est survenue. Merci de réessayer.',
      );
      setSubmitting(false);
    }
  };

  if (!isOrderingOpen() && !submitting) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fffd67]">
          <Gift className="h-9 w-9 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-red-600">Les commandes sont closes</h2>
        <p className="mt-3 text-gray-700">
          Les commandes de la Boutique de Noël étaient ouvertes jusqu’au {ORDER_DEADLINE_LABEL}. Merci à tous ! Les
          commandes passées sont à récupérer à partir du {PICKUP_START_LABEL}.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-xl bg-red-600 px-8 py-4 font-semibold text-[#fffd67] shadow-lg transition-all hover:scale-105 hover:bg-red-700"
        >
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  if (lines.length === 0 && !submitting) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fffd67]">
          <Gift className="h-9 w-9 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-red-600">Votre panier est vide</h2>
        <p className="mt-3 text-gray-700">Ajoutez quelques pièces de la collection avant de passer commande.</p>
        <Link
          to={SHOP_ROUTES.home}
          className="mt-8 rounded-xl bg-red-600 px-8 py-4 font-semibold text-[#fffd67] shadow-lg transition-all hover:scale-105 hover:bg-red-700"
        >
          Découvrir la Boutique de Noël
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="bg-[#fffd67] py-16 text-red-600">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">Finaliser ma commande</h2>
          <p className="text-xl">Plus qu’une étape : dites-nous qui vous êtes et où vous souhaitez récupérer vos cadeaux.</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-5">
        {/* Mobile : rappel du panier, le récapitulatif détaillé étant sous le formulaire */}
        <a
          href="#recapitulatif"
          className="flex items-center justify-between rounded-xl border-2 border-[#fffd67] bg-[#fffd67]/30 px-5 py-4 shadow-sm lg:hidden"
        >
          <span className="text-sm text-gray-700">
            Votre panier · <strong>{pluralize(itemCount, 'article')}</strong>
          </span>
          <span className="flex items-center gap-1 font-bold text-red-600">
            {formatPrice(total)}
            <ChevronDown className="h-4 w-4" />
          </span>
        </a>

        <form onSubmit={handleSubmit} noValidate className="space-y-10 rounded-xl bg-white p-6 shadow-lg sm:p-8 lg:col-span-3">
          {/* Pot de miel anti-spam (Web3Forms) */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <fieldset>
            <legend className="sr-only">Vos coordonnées</legend>
            <StepTitle step={1} title="Vos coordonnées" />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="lastName" label="Votre Nom" required error={errors.lastName}>
                <TextInput
                  id="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                  error={errors.lastName}
                />
              </FormField>
              <FormField id="firstName" label="Votre Prénom" required error={errors.firstName}>
                <TextInput
                  id="firstName"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  error={errors.firstName}
                />
              </FormField>
              <div className="sm:col-span-2">
                <FormField
                  id="phone"
                  label="Votre Numéro de téléphone"
                  required
                  error={errors.phone}
                  hint="Nous vous appelons ou vous envoyons un SMS dès que votre commande est prête."
                >
                  <TextInput
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="06 12 34 56 78"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    error={errors.phone}
                  />
                </FormField>
              </div>
            </div>
          </fieldset>

          <fieldset id="pickup-section" className="scroll-mt-6">
            <legend className="sr-only">Point de retrait</legend>
            <StepTitle step={2} title="Point de retrait" />
            <PickupPointPicker
              value={values.pickupPointId}
              onChange={(id) => updateField('pickupPointId', id)}
              error={errors.pickupPointId}
            />
          </fieldset>

          <fieldset>
            <legend className="sr-only">Commentaire</legend>
            <StepTitle step={3} title="Un petit mot ?" />
            <FormField
              id="comment"
              label="Commentaire (facultatif)"
              error={errors.comment}
              hint={`${values.comment.length}/${COMMENT_MAX_LENGTH} — ex. « Je passe vers 12h30 », « Emballage cadeau »…`}
            >
              <textarea
                id="comment"
                name="comment"
                rows={4}
                maxLength={COMMENT_MAX_LENGTH}
                value={values.comment}
                onChange={handleChange('comment')}
                placeholder="Je passe vers 12h30, emballage cadeau…"
                className={`${INPUT_CLASS} ${errors.comment ? INPUT_ERROR_CLASS : ''} resize-y`}
              />
            </FormField>
          </fieldset>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <Wallet className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <p>
                <strong>Aucun paiement en ligne.</strong> Passez régler votre commande sur l’un de nos emplacements, au
                choix, <strong>{PAYMENT_DEADLINE_TEXT}</strong>. Sans paiement à cette date, la commande est annulée,
                sauf si vous nous appelez au{" "}
                <span className="whitespace-nowrap">{SHOP_CONTACT_PHONE}</span>.
                <br />
                <strong>Retrait à partir du {PICKUP_START_LABEL}</strong> sur le point de retrait choisi ci-dessus (vos
                articles sont imprimés à la commande). Aucune livraison n’est proposée.
              </p>
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
                <strong className="font-bold">Oups !</strong> {submitError} Si le problème persiste, appelez-nous au{' '}
                <a href={`tel:${SHOP_CONTACT_PHONE.replace(/\s/g, '')}`} className="font-semibold underline">
                  {SHOP_CONTACT_PHONE}
                </a>
                .
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-lg font-semibold text-[#fffd67] shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Envoi de votre commande…
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" /> Confirmer ma commande
                  <span className="hidden sm:inline">· {formatPrice(total)}</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500">
              En confirmant, vous vous engagez à venir régler votre commande {PAYMENT_DEADLINE_TEXT}, puis à la retirer au point de retrait choisi.
            </p>
          </div>
        </form>

        <aside id="recapitulatif" className="scroll-mt-6 lg:sticky lg:top-6 lg:col-span-2">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
};

export default CommandePage;
