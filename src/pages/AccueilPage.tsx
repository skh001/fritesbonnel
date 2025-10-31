import React from 'react';
import { Heart, Star, Users, Vote } from 'lucide-react';
import vincentImg from '../assets/vincent.png';
import maleImg from '../assets/male.png'; // Import de la nouvelle image
import logohead from '../assets/logohead.png';
import arabesque1 from '../assets/arabesque1.png';
import arabesque2 from '../assets/arabesque2.png';
import bethune from '../assets/bethune.png';
import roseLogo from '../assets/rose.png';
import viradesLogo from '../assets/virades.png';

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

const AccueilPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
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

    {/* Bouton de réservation */}
    <div className="text-center mt-[-1rem] md:mt-[-2rem] relative z-20">
      <button
        onClick={() => setCurrentPage('evenements')}
        className="bg-[#fffd67] text-red-600 px-14 py-6 rounded-xl font-semibold
               transition-all duration-300 transform hover:scale-105 hover:bg-[#fffd67]/80 hover:shadow-xl text-xl"
      >
        Réserver notre friterie
      </button>
    </div>

    {/* Notre Histoire */}
    <section className="max-w-6xl mx-auto px-4 mt-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-red-600 mb-6">Notre Histoire</h3>
          <div className="prose text-gray-700">
            <p className="text-lg mb-4">
              <strong>Frites Bonnel</strong> a été créé en 2018 par <strong>Vincent Pécourt</strong>,
              passé par les traditions culinaires du Nord de la France.
            </p>
      <p className="mb-6" >
  <i>
    "Originaire des Hauts-de-France, nous avons la nostalgie des frites de notre enfance égouttées au torchon. 
    Dans chaque région de France traversée au cours de nos mutations professionnelles, 
    nous faisons le constat qu’il est rare de trouver des commerces ambulants proposant une alimentation de plaisir simple, 
    basée sur des produits frais et peu chers."
  </i>
</p>
<p className="mb-6">
  <i>
    "Des frites préparées pour les amis, les clubs sportifs et les associations dans lesquelles nous sommes impliqués . 
    ils nous est venue l’idée de créer en Anjou une « baraque à frites » où chacun pourra se restaurer en toute simplicité."
  </i>
</p>
            <p>
              C’est ainsi que les <strong> FRITES BONNEL Bonnes & Belles </strong>  commencent leur activité en juin 2018 pour partager les bonnes saveurs , des belles frites du Nord. Bonnel est le nom des arrière-grands-parents de Vincent qui possédaient une brasserie au début du siècle dernier près de Béthune dans le Pas-de-Calais (62).
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
            <strong>Fondateur</strong> et <strong>maître fritier</strong>, spécialiste des traditions culinaires du Nord
          </p>
        </div>
      </div>
    </section>

    {/* Nos Valeurs */}
    {/* This section now also stretches its background across the full width. */}
    <section className="bg-[#fffd67]/30 py-16 rounded-xl shadow-inner">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Valeurs</h3>
        <div className="grid md:grid-cols-3 gap-8">
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
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#fffd67]" />
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
            </div>
          ))}
        </div>

        {/* Bouton pour voter */}
        <div className="text-center mt-12 mb-8">
          <p className="text-xl font-bold text-gray-700 mb-4">
            <span className="text-red-600">Faites-nous savoir que vous aimez nos frites !</span>
            <br />
          </p>
          <a
            href="https://www.les-friteries.com/site/frites-bonnel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-red-600 text-white px-8 py-4 rounded-xl font-bold
                       hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-100 shadow-lg"
          >
            <Vote className="w-6 h-6 animate-bounce" />
            <span>Votez pour Frites Bonnel !</span>
          </a>
        </div>
      </div>
    </section>

   
{/* Notre Implication Locale */}
    <section className="max-w-6xl mx-auto px-4 mt-16">
      <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Implication Locale</h3>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-2xl font-semibold text-red-600 mb-6">Actions Communautaires</h4>
          <div className="space-y-6">
            {[
              {
                title: "Soutien aux associations locales",
                description: "Nous sommes fiers de nous impliquer activement dans les événements et les collectes de fonds, en partageant des partenariats avec les associations sportives et culturelles de la région."
              },
              {
                title: "Fêtes de quartier",
                description: "Nous soutenons des initiatives locales qui favorisent les rencontres et le partage entre habitants."
              }
            ].map((action, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-6 h-6 text-[#fffd67]" />
                </div>
                <div>
                  <h5 className="font-semibold text-red-600 mb-2">{action.title}</h5>
                  <p className="text-gray-700 text-sm">{action.description}</p>
                  {action.title === "Soutien aux associations locales" && (
                    <div className="mt-4 flex flex-wrap gap-4 items-center">
                      <img src={roseLogo} alt="Logo Rose" className="w-40 h-40 object-contain" />
                      <img src={viradesLogo} alt="Logo Virades" className="w-40 h-40 object-contain" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-red-600 mb-6">Engagement Environnemental</h4>
          <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200 shadow-lg">
            <div className="space-y-4">
              {["Circuits courts privilégiés", "Réduction des déchets", "Emballages écologiques", "Économies d'énergie"].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-green-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
              <p className="text-green-700 text-sm">
                <strong>Notre objectif :</strong> Devenir la première friterie éco-responsable d'Angers tout en préservant l'authenticité de nos traditions du Nord.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AccueilPage;