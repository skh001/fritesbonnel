import React, { useState } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';

const allPhotos = [
  { title: "Préparation des frites", url: "https://placehold.co/600x400/fffd67/red?text=PREPARATION" },
  { title: "Notre food truck", url: "https://placehold.co/600x400/fffd67/red?text=FOOD+TRUCK" },
  { title: "Nos burgers gourmands", url: "https://placehold.co/600x400/fffd67/red?text=BURGERS" },
  { title: "Frites Bonnel en fête", url: "https://placehold.co/600x400/fffd67/red?text=FETE" },
  { title: "Clients au marché", url: "https://placehold.co/600x400/fffd67/red?text=CLIENTS" },
  { title: "Équipe souriante", url: "https://placehold.co/600x400/fffd67/red?text=EQUIPE" },
  { title: "Ingrédients frais", url: "https://placehold.co/600x400/fffd67/red?text=INGREDIENTS" },
  { title: "Frites à emporter", url: "https://placehold.co/600x400/fffd67/red?text=A+EMPORTER" },
  { title: "Événement de mariage", url: "https://placehold.co/600x400/fffd67/red?text=MARIAGE" },
  { title: "Partenariat local", url: "https://placehold.co/600x400/fffd67/red?text=PARTENAIRE" },
  { title: "Soirée d'entreprise", url: "https://placehold.co/600x400/fffd67/red?text=ENTREPRISE" },
  { title: "Plat du jour", url: "https://placehold.co/600x400/fffd67/red?text=PLAT+DU+JOUR" },
];

const PHOTOS_PER_LOAD = 6;

const ActusPage = () => {
  const [displayedPhotos, setDisplayedPhotos] = useState(allPhotos.slice(0, PHOTOS_PER_LOAD));
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentCount = displayedPhotos.length;
      const nextPhotos = allPhotos.slice(currentCount, currentCount + PHOTOS_PER_LOAD);
      setDisplayedPhotos([...displayedPhotos, ...nextPhotos]);
      setIsLoading(false);
    }, 500);
  };

  const hasMorePhotos = displayedPhotos.length < allPhotos.length;

  return (
    <div className="min-h-screen">
      {/* Section Galerie */}
      <section className="bg-[#fffd67] text-red-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Galerie Photo</h2>
          <p className="text-xl">
            Découvrez nos moments spéciaux, nos produits et nos événements en images.
          </p>
        </div>
      </section>

      {/* Galerie de photos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedPhotos.map((photo, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-64 sm:h-56 md:h-64 lg:h-72">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-70 text-white p-4">
                  <h4 className="font-semibold text-lg">{photo.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {hasMorePhotos && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-red-600 text-[#fffd67] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCcw className="animate-spin" size={20} />
                  <span>Chargement...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Camera size={20} />
                  <span>Charger plus de photos</span>
                </div>
              )}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ActusPage;
