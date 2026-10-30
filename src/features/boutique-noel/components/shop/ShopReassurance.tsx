import { MapPin, MousePointerClick, Wallet } from 'lucide-react';

// Mêmes pastilles jaunes / icônes rouges que la page Click & Collect
const ITEMS = [
  {
    icon: MousePointerClick,
    title: 'Commande en ligne',
    description: 'Choisissez vos pièces et vos tailles en quelques clics, sans créer de compte.',
  },
  {
    icon: MapPin,
    title: 'Retrait sur nos emplacements',
    description: 'Récupérez votre commande à Angers et alentours, le jour qui vous arrange.',
  },
  {
    icon: Wallet,
    title: 'Paiement sur place',
    description: 'Aucun paiement en ligne : réglez sur l’un de nos emplacements avant le 6 décembre.',
  },
];

const ShopReassurance = () => (
  <div className="grid gap-8 text-center md:grid-cols-3 md:gap-12">
    {ITEMS.map(({ icon: Icon, title, description }) => (
      <div key={title} className="space-y-3">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fffd67] shadow-sm">
          <Icon className="h-8 w-8 text-red-600" />
        </div>
        <h4 className="font-semibold text-red-600">{title}</h4>
        <p className="mx-auto max-w-xs text-gray-700">{description}</p>
      </div>
    ))}
  </div>
);

export default ShopReassurance;
