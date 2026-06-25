import React from 'react';
import { ChefHat, Check, Utensils, Mail, Phone } from 'lucide-react';

const PrivatisationTraiteur = () => {
  
  // Photo à remplacer par votre camion sur un événement ou un de vos buffets
  const photoPrestation = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans"> 
      
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
            
        {/* Partie Gauche : Titre et Photo */}
        <div className="md:w-5/12 bg-red-600 p-8 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl font-extrabold uppercase tracking-wider mb-2">
                Traiteur
            </h1>
            <span className="bg-yellow-400 text-red-900 px-4 py-1 rounded font-bold text-sm uppercase mb-8 shadow-sm">
                Sur Mesure
            </span>

            <div className="relative w-72 h-72 mb-6 group">
                <img 
                    src={photoPrestation} 
                    alt="Prestation Traiteur" 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>

        {/* Partie Droite : Détails et Prestations */}
        <div className="md:w-7/12 p-8 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ChefHat className="text-orange-500" />
                Notre savoir-faire chez vous
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Pour vos réceptions privées ou professionnelles, nous déplaçons notre cuisine et notre exigence artisanale. Nous gérons l'organisation pour vous offrir un moment de qualité.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {/* Colonne 1 : Les événements */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-3 border-b-2 border-red-100 pb-1 inline-block">Vos réceptions</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Réceptions de mariage</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Retours de mariage</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Événements d'entreprise</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">Repas de famille</span>
                        </li>
                    </ul>
                </div>

                {/* Colonne 2 : Ce qu'on fournit */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-3 border-b-2 border-red-100 pb-1 inline-block">Notre accompagnement</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700">
                            <Utensils className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">Dressage de buffets artisanaux</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Utensils className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">Mise en place (tables & nappages)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Utensils className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">Fourniture de la vaisselle</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <Utensils className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm">Desserts maison & Service café</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section Contact */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
                    Demander un devis sur mesure :
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <a href="mailto:fritesbonnel@gmail.com" className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-colors font-bold shadow-md">
                        <Mail className="w-5 h-5" />
                        Nous écrire
                    </a>
                    <a href="tel:+33600000000" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-xl transition-colors font-bold border border-gray-200">
                        <Phone className="w-5 h-5" />
                        06 11 52 16 89
                    </a>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PrivatisationTraiteur;