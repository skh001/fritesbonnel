import React from 'react';
import { Star, Heart } from 'lucide-react';

// --- IMPORT DES IMAGES LOCALES DEPUIS LE DOSSIER 'galerie' ---
// ATTENTION : Assurez-vous que tous ces fichiers (.png) existent bien dans 'src/assets/galerie/'
// avec ces noms et extensions exacts.
import classicBurgerImage from '../assets/galerie/classic.png';
import pouletBurgerImage from '../assets/galerie/poulet.png'; 
import baconBurgerImage from '../assets/galerie/bacon.png';   
import fishBurgerImage from '../assets/galerie/fish.png';     
import fritesImage from '../assets/galerie/frites.png';
import americainImage from '../assets/galerie/americain.png';
import noelBurgerImage from '../assets/galerie/noel.png';
import chtiBurgerImage from '../assets/galerie/chti.png';


const CartePage = () => (
  <div className="space-y-16">
    <section className="bg-[#fffd67] text-red-600 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Notre Carte</h2>
        <p className="text-xl">Découvrez nos recettes préparées avec des produits frais.</p>
      </div>
    </section>

    {/* Section 'Pourquoi nous' */}
    <section className="max-w-6xl mx-auto px-4">
      <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Ce que nous vous offrons</h3>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#fffd67] rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Engagement Qualité</h4>
              <p className="text-gray-700">
                Viandes fraîches sélectionnées, pains boulanger,
                frites coupées maison et cuisson traditionnelle.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#fffd67] rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Recettes </h4>
              <p className="text-gray-700">
On adapte notre recette en fonction des légumes de saison.              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-8 rounded-xl">
          <h4 className="text-xl font-semibold text-red-600 mb-4">Notre recettes</h4>
          <p className="text-gray-700">
            Frites fondantes à l’intérieur et croustillantes à l’extérieur grâce à une double cuisson.
          </p>
        </div>
      </div>
    </section>

    {/* Section des plats proposés */}
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Spécialités</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              category: "Nos Burgers",
              items: [
                { name: "Le Burger classic", imageSrc: classicBurgerImage },
                { name: "Burger au poulet pané", imageSrc: pouletBurgerImage },
                { name: "Le Burger au bacon", imageSrc: baconBurgerImage },
                { name: "Le Burger chti'mi", imageSrc: chtiBurgerImage },
                { name: " Burger Noël ''spécial fêtes'' ", imageSrc: noelBurgerImage },
              
              ]
            },
            {
              category: "Américains",
              items: [
                { name: "Américain Steak", imageSrc: americainImage },
                { name: "Américain Saucisse Nature" }, 
                { name: "Américain Saucisse aux Herbes" },
                { name: "Américain Merguez" }
              ]
            },
            {
              category: "Sandwichs",
              items: [
                { name: "Sandwich Steak" },
                { name: "Sandwich Saucisse Nature" },
                { name: "Sandwich Saucisse aux Herbes" },
                { name: "Sandwich Merguez" }
              ]
            },
            {
              category: "Frites",
              items: [
                { name: "Frites Classiques", imageSrc: fritesImage },
              ]
            },
            {
              category: "Sauces ",
              items: [
                { name: "Tuche" },
                { name: "Mayonnaise" },
                { name: "Ketchup" },
                { name: "Sauce Burger" },
                { name: "Bernaise" },
                { name: "Samouraï" },
                { name: "Poivre" },
                { name: "Blanche" },
                { name: "Chti" }
              ]
            },
            {
              category: "Boissons",
              items: [
                { name: "Coca-Cola" },
                { name: "Coca Zero" },
                { name: "Sprite" },
                { name: "Eau Plate" },
                { name: "Eau Gazeuse" },
                { name: "Orangina" },
                { name: "Tropico" },
                { name: "Minute Maid" },
                { name: "Café" }
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-red-600 mb-4 border-b-2 border-[#fffd67] pb-2 text-center">
                  {section.category}
                </h4>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-4">
                      {/* Affiche l'image uniquement si elle est définie */}
                      {item.imageSrc && (
                        <img 
                          src={item.imageSrc} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-full flex-shrink-0"
                        />
                      )}
                      <div className="flex-grow flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#fffd67] rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


  </div>
);

export default CartePage;
