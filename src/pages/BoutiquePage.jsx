import React from 'react';
import { ChefHat, Award, ExternalLink, Star } from 'lucide-react'; 

const BurgerNouveautePage = () => {
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4"> 
      
      {/* SECTION 1 : L'attente (Ton Artisanal) */}
      <div className="max-w-3xl w-full text-center mb-12">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-50 rounded-full border border-gray-200">
                <ChefHat className="w-12 h-12 text-gray-800" />
            </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          Une nouvelle création en préparation
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        Nos équipes préparent notre prochaine recette. Comme la qualité prend du temps, nous travaillons sur chaque détail pour vous offrir un vrai plaisir.
        </p>
      </div>

      {/* SECTION 2 : L'Appel au Vote (Ton Professionnel) */}
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        <div className="bg-gray-900 py-4 px-6 flex items-center justify-center space-x-2">
            <Award className="text-yellow-500 w-5 h-5" />
            <span className="text-white font-semibold tracking-wide uppercase text-sm">
                Excellence & Tradition
            </span>
        </div>

        <div className="p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Valorisez notre savoir-faire
            </h3>
            
            <p className="text-gray-600 mb-8 text-sm md:text-base">
                Votre satisfaction est notre meilleure récompense. Si vous appréciez la qualité de nos produits et notre service, nous vous invitons à soutenir notre établissement sur le portail de référence des friteries.
            </p>

            <a 
                href="https://www.les-friteries.com/site/frites-bonnel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <span>VOTEZ POUR FRITES BONNEL</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="mt-8 flex items-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                Merci de votre confiance
            </p>
        </div>
      </div>
      
    </div>
  );
};

export default BurgerNouveautePage;