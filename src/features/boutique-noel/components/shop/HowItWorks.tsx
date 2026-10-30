import { PAYMENT_DEADLINE_TEXT, PICKUP_START_LABEL } from '../../config/shop';
import Reveal from '../decor/Reveal';

const STEPS = [
  {
    title: 'Composez votre panier',
    description: 'Choisissez vos articles, vos tailles et vos quantités.',
  },
  {
    title: 'Validez votre commande',
    description: 'Indiquez vos coordonnées et votre point de retrait.',
  },
  {
    title: 'Payez sur place',
    description: `Passez régler sur l’un de nos emplacements ${PAYMENT_DEADLINE_TEXT}.`,
  },
  {
    title: 'Récupérez vos articles',
    description: `À partir du ${PICKUP_START_LABEL}, sur le point de retrait choisi lors de la commande.`,
  },
];

// Reprend la présentation « Comment ça marche ? » de la page Click & Collect
const HowItWorks = () => (
  <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
    {STEPS.map((step, index) => (
      <Reveal key={step.title} delay={index * 120}>
        <div className="relative h-full rounded-xl bg-white p-6 shadow-md">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-[#fffd67]">
            {index + 1}
          </div>
          <h4 className="mb-3 text-lg font-semibold text-red-600">{step.title}</h4>
          <p className="text-gray-700">{step.description}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

export default HowItWorks;
