// Points de retrait proposés au client.
// Pour ajouter un emplacement : ajoutez une entrée dans PICKUP_POINTS
// (et un groupe dans PICKUP_GROUPS si besoin). Rien d'autre à modifier.
import type { PickupGroup, PickupPoint } from '../types';

export const PICKUP_GROUPS: PickupGroup[] = [
  {
    id: 'hebdo',
    label: 'Nos emplacements réguliers',
    description: 'Retrouvez-nous chaque semaine, le midi (11h30 – 13h30).',
  },
  {
    id: 'pathe',
    label: 'Pathé Angers',
    description: 'Du mercredi au dimanche, midi et soir.',
  },
];

export const PICKUP_POINTS: PickupPoint[] = [
  {
    id: 'mercredi-saint-laud',
    groupId: 'hebdo',
    day: 'Mercredi',
    period: 'Midi · 11h30 – 13h30',
    place: 'Cours Saint-Laud',
    address: 'Boulevard Yvonne Poirel, Angers',
  },
  {
    id: 'jeudi-saint-barthelemy',
    groupId: 'hebdo',
    day: 'Jeudi',
    period: 'Midi · 11h30 – 13h30',
    place: 'Brasserie La Bestiole',
    address: "38 Rue du Patis, 49124 Saint-Barthélemy-d'Anjou",
  },
  {
    id: 'vendredi-beaucouze',
    groupId: 'hebdo',
    day: 'Vendredi',
    period: 'Midi · 11h30 – 13h30',
    place: 'La Minute Blonde',
    address: '32 Avenue du Pin, 49070 Beaucouzé',
  },
  {
    id: 'pathe-midi',
    groupId: 'pathe',
    day: 'Du mercredi au vendredi',
    period: 'Midi · 11h30 – 13h45',
    place: 'Pathé Angers',
  },
  {
    id: 'pathe-soir',
    groupId: 'pathe',
    day: 'Du vendredi au dimanche',
    period: 'Soir · 18h30 – 21h30',
    place: 'Pathé Angers',
  },
];

export const findPickupPoint = (id: string) => PICKUP_POINTS.find((point) => point.id === id);

export const formatPickupPoint = (point: PickupPoint) =>
  `${point.day} ${point.period.toLowerCase()} — ${point.place}${point.address ? `, ${point.address}` : ''}`;
