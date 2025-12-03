import React from 'react';
// Import du hook de navigation de React Router
import { useNavigate } from 'react-router-dom'; 

// Ajout de l'icône Leaf pour l'environnement
import { Heart, Star, Users, Vote, Trophy, Medal, BookOpen, MousePointer2, Leaf } from 'lucide-react'; 
import vincentImg from '../assets/vincent.png';
import maleImg from '../assets/male.png'; 
import logohead from '../assets/logohead.png';
import arabesque1 from '../assets/arabesque1.png';
import arabesque2 from '../assets/arabesque2.png';
import bethune from '../assets/bethune.png';
import roseLogo from '../assets/rose.png';
import viradesLogo from '../assets/virades.png';

// IMPORTS DE VOS LOGOS (Assurez-vous que ces chemins sont corrects)
import mondialLogo from '../assets/mondialLogo.png'; 
import petitFuteLogo from '../assets/petitFuteLogo.png';
// NOUVEAUX IMPORTS : Ducs d'Angers et UFAB
import ducsAngersLogo from '../assets/ducsAngersLogo.png'; 
import ufabLogo from '../assets/ufabLogo.png'; 

// Nouveau composant pour afficher les logos

const PartnersLogos = () => {
  const partners = [
    { name: 'rose', img: roseLogo },
    { name: 'virades', img: viradesLogo },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
      {partners.map((partner, index) => (
        <div
          key={index}
          className="w-24 h-24 p-2 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-white shadow-sm transition-transform transform hover:scale-105"
        >
          <img
            src={partner.img}
            alt={`Logo de ${partner.name}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

// Suppression de la prop setCurrentPage
const AccueilPage = () => {
  const navigate = useNavigate(); // Initialisation de la navigation

  return (
    // Added w-full to the root component to ensure it spans the entire container.
    <div className="w-full space-y-16 font-sans text-gray-800">
      {/* Hero Banner: Removed max-width and set background. It will now stretch fully. */}
      <section className="bg-[#fffd67] text-gray-800 py-4 rounded-b-2xl shadow-lg relative overflow-hidden">
        <img
          src={arabesque1}
          alt="Arabesque décorative gauche"
          className="absolute left-0 top-0 h-20 w-auto object-cover opacity-70 z-0"
        />
        <img
          src={arabesque2}
          alt="Arabesque décorative droite"
          className="absolute right-0 top-0 h-20 w-auto object-cover opacity-70 z-0"
        />
        {/* This inner div handles the centered content and required horizontal padding (px-4). */}
        <div className="max-w-6xl mx-auto px-4 text-center relative z-20 mt-8"> 
          <img src={logohead} alt="Logo Frites Bonnel" className="w-full max-w-sm mx-auto" />
          <div className="text-center relative z-10">
            <img
              src={bethune}
              alt="Ville de Béthune"
              // The image itself is now full width relative to its parent (max-w-6xl container)
              className="w-full h-40 object-cover rounded-xl shadow-md"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>

      {/* Boutons d'Action (Réservation et Boutique) - MISE À JOUR AVEC NAVIGATE */}
      <div className="text-center mt-[-1rem] md:mt-[-2rem] relative z-20 flex flex-col sm:flex-row justify-center items-center gap-4">
        {/* Bouton de Réservation existant */}
        <button
          onClick={() => navigate('/evenements')} // Navigation vers le path /evenements
          className="bg-[#fffd67] text-red-600 px-10 py-4 rounded-xl font-semibold
                transition-all duration-300 transform hover:scale-105 hover:bg-[#fffd67]/80 hover:shadow-xl text-xl shadow-lg
                animate-pulse-slow" 
        >
          Réservez votre friterie<br />
          <span className="text-lg font-normal">Demander un devis </span> 
        </button>

        {/* NOUVEAU BOUTON : Accès à la Boutique */}
        <button
          onClick={() => navigate('/boutique')} // Navigation vers le path /boutique
          className="bg-red-600 text-[#fffd67] px-10 py-4 rounded-xl font-semibold
                transition-all duration-300 transform hover:scale-105 hover:bg-red-700 hover:shadow-xl text-xl shadow-lg
                animate-pulse-slow" 
        >
          La Nouveauté<br />
          <span className="text-lg font-normal">dans notre Cuisine </span>
        </button>
      </div>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-red-600 mb-6">Notre Histoire</h3>
            <div className="prose text-gray-700">
              <p className="text-lg mb-4">
                <strong>FRITES BONNEL</strong> a été créé en 2018 par <strong>Vincent Pécourt</strong>,
                passé par les traditions culinaires du Nord de la France.
              </p>
        <p className="mb-6" >
    <i>
      "Originaire des Hauts-de-France, nous avons la nostalgie des frites de notre enfance égouttées au torchon. 
      Dans chaque région de France traversée au cours de nos mutations professionnelles, 
      nous faisons le constat qu’il est rare de trouver des commerces ambulants proposant une alimentation de plaisir simple 
      basée sur des produits frais et peu chers."
    </i>
  </p>
  <p className="mb-6">
    <i>
      "Des frites préparées pour les amis, les clubs sportifs et les associations dans lesquelles nous sommes impliqués, 
      ils nous est venue l’idée de créer en Anjou une « baraque à frites » où chacun peut se restaurer en toute simplicité."
    </i>
  </p>
              <p>
                C’est ainsi que les <strong> FRITES BONNEL Bonnes & Belles </strong>  commencent leur activité en juin 2018 pour partager les bonnes saveurs des belles frites du Nord. Bonnel est le nom des arrière-grands-parents de Vincent qui possédaient une brasserie au début du siècle dernier près de Béthune dans le Pas-de-Calais (62).
              </p>
            </div>
          </div>
          <div className="bg-[#fffd67]/30 p-8 rounded-xl border-2 border-[#fffd67] shadow-md">
            <div className="w-50 h-50 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img
                src={vincentImg}
                alt="Vincent Pécourt"
                className="object-cover w-full h-full"
              />
            </div>
            <h4 className="text-xl font-semibold text-red-600 text-center mb-4">Vincent Pécourt</h4>
            <p className="text-gray-600 text-center">
              <strong>Fondateur</strong> et <strong>maître frites</strong>, spécialiste des traditions culinaires du Nord
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs - SECTION MISE À JOUR (4 COLONNES AVEC L'ENGAGEMENT ENVIRONNEMENTAL) */}
      <section className="bg-[#fffd67]/30 py-16 rounded-xl shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Valeurs</h3>
          {/* Changement de la grille pour md:grid-cols-4 */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Tradition",
                description: "Recettes authentiques du Nord, transmises de génération en génération"
              },
              {
                icon: Star,
                title: "Qualité",
                description: "Sélection rigoureuse des produits et préparation artisanale"
              },
              {
                icon: Users,
                title: "Authenticité",
                description: "L'esprit convivial et chaleureux des friteries traditionnelles"
              },
              {
                icon: Leaf, // Icône pour l'environnement
                title: "Éco-responsabilité",
                description: "Circuits courts, réduction des déchets, emballages écologiques"
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                {title === "Qualité" ? (
                  <div className="flex justify-center items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-red-600" strokeWidth={2.5} fill="none" />
                    ))}
                  </div>
                ) : (
                  // Utilisation d'une couleur verte pour l'icône Éco-responsabilité
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${title === "Éco-responsabilité" ? 'bg-green-600' : 'bg-red-600'}`}>
                    <Icon className={`w-8 h-8 ${title === "Éco-responsabilité" ? 'text-white' : 'text-[#fffd67]'}`} />
                  </div>
                )}
                <h4 className="text-xl font-semibold text-red-600 mb-3">{title}</h4>
                <p className="text-gray-600">{description}</p>
                {title === "Qualité" && (
                  <p className="text-sm font-bold text-red-600 mt-2">
                    <a href="" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    
                    </a>
                  </p>
                )}
                {/* Ajout du message d'objectif pour la carte Environnement */}
                {title === "Éco-responsabilité" && (
                  <div className="mt-4 p-2 bg-green-50 rounded-lg shadow-inner border border-green-200">
                    <p className="text-green-700 text-xs">
                      Objectif : Devenir la première friterie éco-responsable d'Angers.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Le bouton de vote a été déplacé dans la section "Ils aiment" */}
        </div>
      </section>

      {/* ILS AIMENT - NOUVELLE SECTION AVEC PHOTOS INTÉGRÉES */}
      <section className="bg-white py-16"> 
          <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Ils aiment</h3>
              <div className="grid md:grid-cols-3 gap-8">
              {[
                  {
                  // Case 1: Mondial de la frites 2023 Demi-finaliste - Photo intégrée
                  title: "Mondial de la frites 2023",
                  description: "Demi-finaliste",
                  logoSrc: mondialLogo, 
                  altText: "Logo Mondial de la Frite 2023"
                  },
                  {
                  // Case 2: 9ème meilleure friterie de France 2024 avec lien de classement - Icône
                  title: "Classement national des friteries",
                  description: "9ème meilleure friterie de France 2024",
                  icon: <Medal className="w-8 h-8 text-[#fffd67]" />, 
                  button: (
                      <a
                      href="https://www.les-friteries.com/classement-des-friteries"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 mt-4 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold
                                  hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-100 shadow-lg"
                      >
                      <MousePointer2 className="w-4 h-4" />
                      <span>Votez pour nous</span>
                      </a>
                  )
                  },
                  {
                  // Case 3: Le Petit Futé 2025 - Photo intégrée
                  title: "Le Petit Futé",
                  description: "2025",
                  logoSrc: petitFuteLogo,
                  altText: "Logo Le Petit Futé 2025"
                  }
              ].map((item, index) => (
                  <div key={index} className="text-center bg-[#fffd67]/30 p-6 rounded-xl border-2 border-[#fffd67] shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-between">
                  
                  {/* Logique d'affichage (Photo ou Icône) */}
                  {item.logoSrc ? (
                      // Affiche l'image importée
                      <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                          <img 
                              src={item.logoSrc} 
                              alt={item.altText} 
                              className="w-full h-full object-contain"
                          />
                      </div>
                  ) : (
                      // Affiche l'icône pour la carte centrale (classement)
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          {item.icon}
                      </div>
                  )}
                  
                  <div>
                      <h4 className="text-xl font-semibold text-red-600 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                  </div>
                  {item.button}
                  </div>
              ))}
              </div>
          </div>
      </section>
    
  {/* Notre Implication Locale (MISE À JOUR) */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Implication Locale</h3>
        {/* La grille a été simplifiée car il ne reste que la colonne de gauche */}
        <div className="grid md:grid-cols-1 gap-12"> 
          <div>
            {/* Le titre h4 était vide, je le laisse vide ou je le supprime */}
            <div className="space-y-6">
              {[
                {
                  title: "Soutien aux associations locales",
                  description: "Nous sommes fiers de nous impliquer activement dans les événements et les collectes de fonds, en partageant des partenariats avec les associations sportives et culturelles de la région.",
                  logos: [roseLogo, viradesLogo] // Logos des associations
                },
                {
                  title: "Partenaires des clubs sportifs", // Titre mis à jour
                  description: "Nous soutenons les clubs sportifs locaux.",
                  logos: [ducsAngersLogo, ufabLogo] // Nouveaux logos sportifs
                }
              ].map((action, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Heart className="w-6 h-6 text-[#fffd67]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-600 mb-2">{action.title}</h5>
                    <p className="text-gray-700 text-sm">{action.description}</p>
                    {/* Affichage générique des logos */}
                    <div className="mt-4 flex flex-wrap gap-4 items-center">
                      {action.logos.map((logo, i) => (
                          <div key={i} className="w-24 h-24 p-2 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-white shadow-sm transition-transform transform hover:scale-105">
                              <img 
                                  src={logo} 
                                  alt={`Logo partenaire ${i}`} 
                                  className="w-full h-full object-contain"
                              />
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccueilPage;