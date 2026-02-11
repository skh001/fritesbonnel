import React from 'react';
import { Flame, Check, MapPin, Calendar } from 'lucide-react';

const BurgerChtimiSimple = () => {
  
  const photoBurger = "https://i.postimg.cc/fL9XWyV3/biquette.png";

  const planning = [
    { jour: "Mercredi MIDI", lieu: "Bd Yvonne Poirel, Angers (Cours Saint Laud)" },
    { jour: "Jeudi MIDI", lieu: "8 Rue du Patis, Saint-Barthélemy-d'Anjou (La Bestiole)" },
    { jour: "Vendredi MIDI", lieu: "2 Av. du Pin, Beaucouzé (La Minute Blonde)" },
    { jour: "Samedi MIDI", lieu: "La Galerie Espace Anjou" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans"> 
      
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
            
        {/* Partie Gauche : Titre et Photo */}
        <div className="md:w-5/12 bg-red-600 p-8 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl font-extrabold uppercase tracking-wider mb-2">
                Le Biquette
            </h1>
            <span className="bg-yellow-400 text-red-900 px-4 py-1 rounded font-bold text-sm uppercase mb-8 shadow-sm">
                Nouveau
            </span>

            <div className="relative w-72 h-72 mb-6 group">
                <img 
                    src={photoBurger} 
                    alt="Burger Biquette" 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>

        {/* Partie Droite : Ingrédients et Planning */}
        <div className="md:w-7/12 p-8 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Flame className="text-orange-500" />
                Ingrédients
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8">
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Pain Buns</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 font-bold">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Steak Haché Frais</span>
                    </li>
                    <li className="flex items-center gap-2 text-red-600 font-bold">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Fromage de chèvre</span>
                    </li>
                </ul>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Oignons confits</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Chou Rouge / Salade</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Sauce Barbecue</span>
                    </li>
                </ul>
            </div>

            {/* Section Planning Hebdomadaire */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="text-red-600 w-5 h-5" />
                    Nos emplacements hebdomadaires :
                </h3>
                <div className="space-y-3">
                    {planning.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs font-bold uppercase text-red-600 w-32">
                                {item.jour}
                            </span>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 leading-tight">{item.lieu}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BurgerChtimiSimple;