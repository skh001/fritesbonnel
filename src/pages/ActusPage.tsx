import React, { useState, useEffect } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';
import LightboxModal from '../components/LightboxModal';

const imageModules = import.meta.glob('/src/assets/gag/*.{png,jpg,jpeg,svg}');
const PHOTOS_PER_LOAD = 6;

const ActusPage = () => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); 

  useEffect(() => {
    const importAllPhotos = async () => {
      const photosArray = [];
      const keys = Object.keys(imageModules);
      
      for (const path of keys) {
        const mod = await imageModules[path]();
        const url = mod.default;
        const fileName = path.split('/').pop().split('.')[0];
        const title = fileName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

        photosArray.push({
          title: title,
          url: url
        });
      }

      photosArray.sort((a, b) => a.title.localeCompare(b.title));
      setAllPhotos(photosArray);
      setDisplayedPhotos(photosArray.slice(0, PHOTOS_PER_LOAD));
      setIsLoading(false);
    };

    importAllPhotos();
  }, []);

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

  const openModal = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#fffd67] text-red-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Galerie Photo</h2>
          <p className="text-xl">
            Découvrez nos moments spéciaux, nos produits et nos événements en images.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openModal(index)}
              onContextMenu={(e) => e.preventDefault()} // Empêche le clic droit
              onDragStart={(e) => e.preventDefault()} // Empêche le glisser-déposer
            >
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
      
      {selectedPhotoIndex !== null && (
        <LightboxModal 
          photos={allPhotos} 
          initialIndex={selectedPhotoIndex} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default ActusPage;