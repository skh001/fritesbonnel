import React from 'react';
import { Utensils, Star, AlertTriangle, Info } from 'lucide-react'; 
// Note : Tous les autres imports (panier, envoi, PDF, Merch, etc.) sont retirés.

// --- IMPORTATION POUR LE BURGER DE NOËL ---
// Assurez-vous que ce chemin est correct pour votre image
import burgerNoelImage from '../assets/burgers/burger_noel.jpg'; 
// -------------------------------------------------

// --- CONFIGURATION DU BURGER DE NOËL ---
const BURGER_INFO = { 
    name: "Le Burger de Noël 🎄", 
    description: "Pain burger, steak haché , confiture de figue, quartiers de pomme, foie gras, mâche au vinaigre balsamique et confit d’oignons.", 
    price: 15.30, // Prix à titre d'exemple
    image: burgerNoelImage, 
};
// --- FIN CONFIGURATION ---


const BurgerNouveautePage = () => {

  // Composant de carte de produit simplifié pour la présentation
  const ProductCard = ({ info }) => {
    const priceDisplay = (info.price).toFixed(2).replace('.', ',');

    return (
      <div className={`bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center border-4 border-red-600 bg-red-50 transition-colors duration-300`}> 
        
        {/* BLOC IMAGE */}
        <div 
            className="w-full h-64 relative overflow-hidden rounded-xl mb-6 shadow-lg"
        >
            <img 
                src={info.image} 
                alt={info.name} 
                className="w-full h-full object-cover" // Utiliser object-cover pour un meilleur look sur une carte
            />
        </div>

        <h4 className="text-3xl font-bold text-red-600 text-center mb-2">{info.name}</h4>
        <span className='inline-flex items-center px-4 py-1 bg-yellow-400 text-red-800 text-sm font-bold rounded-full mb-4 shadow-md'>
            <Star className='w-4 h-4 mr-1'/> LA NOUVEAUTÉ DU MOMENT
        </span>
        <p className="text-gray-700 text-center mb-6 text-lg leading-relaxed">{info.description}</p>
        
        <div className="w-full text-center text-3xl font-extrabold text-red-700 mb-4">{priceDisplay} €</div>
        
        {/* SECTION D'INFORMATION POUR SAVOIR OÙ COMMANDER */}
        <div className="w-full mt-4 p-4 bg-red-100 border border-red-400 rounded-lg text-center">
            <p className="font-semibold text-red-800 flex items-center justify-center space-x-2">
                <Info className='w-5 h-5'/> <span>Où commander ?</span>
            </p>
            <p className="text-sm text-gray-700 mt-2">
                Le Burger de Noël est disponible directement dans nos friteries.
            </p>
        </div>
        
      </div>
    );
  };
  
  // Rendu principal du composant
  return (
    <div className="space-y-16 bg-white min-h-screen"> 
      
      {/* Bannière de la NOUVEAUTÉ */}
      <section className="bg-red-600 text-white py-16 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-4 flex items-center justify-center space-x-4">
            <Utensils className="w-8 h-8 text-yellow-300" /> 
            <span>La Nouveauté dans notre Cuisine</span>
            <Utensils className="w-8 h-8 text-yellow-300" />
          </h2>
          <p className="text-xl text-red-100">
            Découvrez notre Burger de Noël, maintenant disponible à la friterie !
          </p>
        </div>
      </section>
      
      {/* SECTION : Mise en avant du Burger (centré) */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Le Burger de Noël est Arrivé !</h3>
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <ProductCard info={BURGER_INFO} />
          </div>
        </div>
      </section>
      
      {/* SECTION : Rappel simple des emplacements (optionnel mais utile) */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-lg flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-1">Nos Points de Vente</h3>
                <p className="text-sm text-gray-700">
                    Retrouvez le Burger de Noël sur nos différents emplacements :
                    <ul className='list-disc list-inside ml-2 mt-2 space-y-1'>
                        <li>Pathé cinéma Angers - Du mardi au vendredi midi, et du vendredi au dimanche soir.</li>
                        <li>La Bestiole Angers - Jeudi midi</li>
                        <li>La Minute Blonde Angers - Vendredi midi</li>
                        <li>Cours Saint Laud à Angers - Mercredi midi</li>
                    </ul>
                </p>
            </div>
        </div>
      </section>
      
    </div>
  );
};

export default BurgerNouveautePage;