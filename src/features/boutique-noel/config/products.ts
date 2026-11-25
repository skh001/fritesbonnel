// Catalogue de la Boutique de Noël.
// Pour modifier un produit : changez simplement ses champs ci-dessous.
// Pour remplacer une image : remplacez le fichier importé (ou changez l'import).
// La première image est affichée sur la carte produit, la seconde apparaît au survol.
import type { Product } from '../types';
import { ALL_SIZES, HOODIE_SIZES, ONE_SIZE } from './shop';

import hoodieNoirDos from '../assets/products/hoodie-noir-dos.jpg';
import hoodieNoirFace from '../assets/products/hoodie-noir-face.jpg';
import hoodieGrisDos from '../assets/products/hoodie-gris-dos.jpg';
import hoodieGrisFace from '../assets/products/hoodie-gris-face.jpg';
import teeBlancDos from '../assets/products/tee-shirt-blanc-dos.jpg';
import teeBlancFace from '../assets/products/tee-shirt-blanc-face.jpg';
import teeNoirDos from '../assets/products/tee-shirt-noir-dos.jpg';
import teeNoirFace from '../assets/products/tee-shirt-noir-face.jpg';
import tablierNoir from '../assets/products/tablier-noir.jpg';

const HOODIE_DETAILS = [
  'Molleton 290 g/m²',
  'Impression en sérigraphie',
  'Logo Frites Bonnel devant, illustration « Give me more » au dos',
  'Capuche avec cordons et poche kangourou',
];

const TEE_DETAILS = ['100 % coton, 190 g/m²', 'Impression en sérigraphie', 'Logo devant, illustration « Give me more » au dos'];

export const PRODUCTS: Product[] = [
  {
    id: 'hoodie-give-me-more-noir',
    slug: 'hoodie-give-me-more-noir',
    name: 'Hoodie « Give me more » Noir',
    category: 'hoodie',
    tagline: 'Sérigraphie jaune, illustration XXL au dos.',
    description:
      'Notre hoodie noir signé Frites Bonnel : logo jaune côté cœur et grande illustration « Give me more Frites Bonnel please !! » au dos. Un molleton épais de 290 g pour affronter l’hiver avec gourmandise.',
    details: HOODIE_DETAILS,
    price: 45,
    sizes: HOODIE_SIZES,
    images: [
      { src: hoodieNoirDos, alt: 'Hoodie noir Frites Bonnel, vu de dos avec l’illustration « Give me more »' },
      { src: hoodieNoirFace, alt: 'Hoodie noir Frites Bonnel, vu de face avec le logo jaune' },
    ],
    badge: 'Édition Noël 2026',
  },
  {
    id: 'hoodie-give-me-more-gris',
    slug: 'hoodie-give-me-more-gris',
    name: 'Hoodie « Give me more » Gris chiné',
    category: 'hoodie',
    tagline: 'Gris chiné et rouge Bonnel, le duo cocooning.',
    description:
      'La version gris chiné de notre hoodie, sérigraphiée en rouge Bonnel : logo devant, illustration « Give me more Frites Bonnel please !! » au dos. Molleton épais de 290 g, doux et chaud.',
    details: HOODIE_DETAILS,
    price: 45,
    sizes: HOODIE_SIZES,
    images: [
      { src: hoodieGrisDos, alt: 'Hoodie gris chiné Frites Bonnel, vu de dos avec l’illustration rouge « Give me more »' },
      { src: hoodieGrisFace, alt: 'Hoodie gris chiné Frites Bonnel, vu de face avec le logo rouge' },
    ],
  },
  {
    id: 'tee-shirt-give-me-more-blanc',
    slug: 'tee-shirt-give-me-more-blanc',
    name: 'Tee-shirt « Give me more » Blanc',
    category: 'tee-shirt',
    tagline: '100 % coton, sérigraphie rouge Bonnel.',
    description:
      'Le tee-shirt blanc incontournable : logo Frites Bonnel rouge devant et grande illustration « Give me more Frites Bonnel please !! » au dos. 100 % coton, 190 g, pour un tombé agréable et durable.',
    details: TEE_DETAILS,
    price: 25,
    sizes: ALL_SIZES,
    images: [
      { src: teeBlancDos, alt: 'Tee-shirt blanc Frites Bonnel, vu de dos avec l’illustration rouge « Give me more »' },
      { src: teeBlancFace, alt: 'Tee-shirt blanc Frites Bonnel, vu de face avec le logo rouge' },
    ],
  },
  {
    id: 'tee-shirt-give-me-more-noir',
    slug: 'tee-shirt-give-me-more-noir',
    name: 'Tee-shirt « Give me more » Noir',
    category: 'tee-shirt',
    tagline: '100 % coton, sérigraphie jaune.',
    description:
      'Le tee-shirt noir aux couleurs de la friterie : logo Frites Bonnel jaune devant et grande illustration « Give me more Frites Bonnel please !! » au dos. 100 % coton, 190 g, pour un tombé agréable et durable.',
    details: TEE_DETAILS,
    price: 25,
    sizes: ALL_SIZES,
    images: [
      { src: teeNoirDos, alt: 'Tee-shirt noir Frites Bonnel, vu de dos avec l’illustration jaune « Give me more »' },
      { src: teeNoirFace, alt: 'Tee-shirt noir Frites Bonnel, vu de face avec le logo jaune' },
    ],
  },
  {
    id: 'tablier-give-me-more-noir',
    slug: 'tablier-give-me-more-noir',
    name: 'Tablier « Give me more » Noir',
    category: 'tablier',
    tagline: 'Pour cuisiner comme à la friterie.',
    description:
      'Le tablier noir sérigraphié en jaune « Give me more Frites Bonnel please !! », pour transformer chaque repas de fête en moment Bonnel. Avec sa grande poche ventrale, il vous suit des fourneaux au barbecue.',
    details: ['Impression en sérigraphie', 'Bretelle de cou réglable', 'Grande poche ventrale'],
    price: 30,
    sizes: ONE_SIZE,
    images: [{ src: tablierNoir, alt: 'Tablier noir Frites Bonnel avec l’illustration jaune « Give me more »' }],
    badge: 'Nouveau',
  },
];

export const findProductById = (id: string) => PRODUCTS.find((product) => product.id === id);

export const findProductBySlug = (slug: string) => PRODUCTS.find((product) => product.slug === slug);
