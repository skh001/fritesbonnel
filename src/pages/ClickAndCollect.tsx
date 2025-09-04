import React from 'react';
import { ShoppingBag, Tablet, Truck } from 'lucide-react';

const ClickAndCollect = () => (
  <div className="space-y-16">
    <section className="bg-[#fffd67] text-red-600 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Click & Collect</h2>
        <p className="text-xl">Commandez en ligne et récupérez votre commande à la Friterie !</p>
      </div>
    </section>

    {/* Pourquoi commander en ligne */}
    <section className="max-w-6xl mx-auto px-4">
      <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Les avantages du Click & Collect</h3>
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[#fffd67] rounded-full flex items-center justify-center mx-auto">
            <Tablet className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="font-semibold text-red-600 mb-2">Simplicité & Rapidité</h4>
          <p className="text-gray-700">
            Parcourez notre menu en ligne, ajoutez vos articles au panier en quelques clics et payez en toute sécurité.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[#fffd67] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="font-semibold text-red-600 mb-2">Plus d'attente</h4>
          <p className="text-gray-700">
            Finies les files d'attente ! Une fois votre commande passée, il ne vous reste plus qu'à venir la récupérer a la friterie.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[#fffd67] rounded-full flex items-center justify-center mx-auto">
            <Truck className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="font-semibold text-red-600 mb-2">Commande prête</h4>
          <p className="text-gray-700">
            Votre commande est préparée juste à temps pour votre arrivée, vous garantissant fraîcheur et qualité.
          </p>
        </div>
      </div>
    </section>

    {/* Comment ça marche */}
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Comment ça marche ?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-red-600 mb-2">1</div>
            <h4 className="text-lg font-semibold text-red-600 mb-4">Choisissez vos produits</h4>
            <p className="text-gray-700">
              Explorez notre menu complet, des burgers aux frites, en passant par les boissons et les desserts.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-red-600 mb-2">2</div>
            <h4 className="text-lg font-semibold text-red-600 mb-4">Passez votre commande</h4>
            <p className="text-gray-700">
              Validez votre panier, indiquez l'heure à laquelle vous souhaitez récupérer votre commande et payez en ligne.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-red-600 mb-2">3</div>
            <h4 className="text-lg font-semibold text-red-600 mb-4">Récupérez votre commande</h4>
            <p className="text-gray-700">
              Rendez-vous à notre restaurant à l'heure choisie. Votre commande vous attendra, prête à être emportée.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Call to action */}
    <section className="max-w-6xl mx-auto px-4 text-center pb-32">
      <h3 className="text-3xl font-bold text-red-600 mb-6">Prêt à commander ?</h3>
      <p className="text-xl text-gray-700 mb-8">
        Simplifiez-vous la vie et profitez de nos délicieux plats en un clin d'œil.
      </p>
      <a 
        href="https://commande-en-ligne.laddition.com/commande-en-ligne/fritesbonnel2?fbclid=IwY2xjawMdCtJleHRuA2FlbQIxMABicmlkETBQdEVoVzhkTFFpaXhpeW9TAR6sATWf0p1U29ZrpF8PrsCmywxEME9NouHKcvksezY2KvQStI9p9U_N03SQ4Q_aem_d7Iz_9kUgrqGAC_dbLy2Hg" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-red-700 transition-colors duration-300">
        Commander maintenant
      </a>
    </section>
  </div>
);

export default ClickAndCollect;
