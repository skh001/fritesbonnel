import React from 'react';
import { ShoppingBag, Tablet, Truck, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ClickAndCollect.css'; // Créez ce fichier pour les styles personnalisés si besoin

// Correction pour les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ClickAndCollect = () => {
  // Coordonnées de vos emplacements
  const locations = [
    {
      id: 1,
      name: 'Brasserie La Bestiole',
      position: [47.473058503430025, -0.5121722903459813], // Remplacez par les vraies coordonnées d'Angers
      address: '8 Rue du Patis, 49124 Saint-Barthélemy-dAnjou LE JEUDI MIDI',
    },
    {
      id: 2,
      name: 'La Minute Blonde Beaucouzé',
      position: [47.46889427044336, -0.624637234541803], // Autre emplacement, par exemple un food truck
      address: '2 Av. du Pin, 49070 Beaucouzé',
    },
    {
      id: 2,
      name: 'Cr Saint-Laud',
      position: [47.465520671057035, -0.5600271082071009], // Autre emplacement, par exemple un food truck
      address: 'Bd Yvonne Poirel, Angers',
    },
  ];

  const defaultPosition = locations[0].position;

  return (
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
      
      {/* Nouvelle section de la carte */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-6">Nos points de Click & Collect</h3>
        <p className="text-lg text-gray-700 text-center mb-8">
          Retrouvez-nous facilement sur la carte et planifiez votre passage.
        </p>
        <div className="relative w-full h-[500px] rounded-xl shadow-lg overflow-hidden">
          <MapContainer 
            center={defaultPosition} 
            zoom={12} 
            scrollWheelZoom={false}
            className="w-full h-full z-0 map-animation"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={loc.position}>
                <Popup>
                  <strong className="text-red-600">{loc.name}</strong><br />
                  {loc.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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
};

export default ClickAndCollect;