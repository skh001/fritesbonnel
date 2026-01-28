import React from 'react';
import { Flame, Check } from 'lucide-react';

const BurgerChtimiSimple = () => {
  
  // URL de votre photo
  const photoBurger = "https://i.postimg.cc/4xzRCSzf/Burger-Chti-V2.jpg";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans"> 
      
      {/* Carte Principale */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
            
        {/* Partie Gauche : Titre et Photo */}
        <div className="md:w-5/12 bg-red-600 p-8 flex flex-col justify-center items-center text-white text-center">
            
            <h1 className="text-4xl font-extrabold uppercase tracking-wider mb-2">
                Le Ch'timi
            </h1>
            
            <span className="bg-yellow-400 text-red-900 px-4 py-1 rounded font-bold text-sm uppercase mb-8 shadow-sm">
                Nouveau
            </span>

            {/* --- ZONE PHOTO AGRANDIE ICI --- */}
            {/* J'ai changé w-48 h-48 en w-72 h-72 pour agrandir l'image */}
            <div className="relative w-72 h-72 mb-6 group">
                <img 
                    src={photoBurger} 
                    alt="Burger Ch'timi" 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            {/* ----------------------------- */}
            
            <p className="text-lg font-medium opacity-90">
                {/* Espace pour une petite phrase si besoin */}
            </p>
        </div>

        {/* Partie Droite : La Liste des Ingrédients */}
        <div className="md:w-7/12 p-8 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Flame className="text-orange-500" />
                Qu'est-ce qu'il y a dedans ?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Colonne 1 */}
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Pain Buns </span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="font-bold">Steak Haché Frais</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="font-bold text-red-600">Maroilles</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Lard </span>
                    </li>
                </ul>

                {/* Colonne 2 */}
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Oignons confits</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Chou Rouge</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Salade fraîche</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Sauce Burger</span>
                    </li>
                </ul>
            </div>

            {/* Bouton ou appel simple */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center sm:text-left">
                <p className="text-gray-900 text-lg font-bold">
                    Disponible dès aujourd'hui
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BurgerChtimiSimple;