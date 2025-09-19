import React, { useState } from 'react';
import { XCircle, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

const LightboxModal = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPhoto = photos[currentIndex];
  
  // États pour la gestion du "swipe"
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Distance minimale pour valider le swipe

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : prevIndex));
  };

  // Logique du "swipe"
  const onTouchStart = (e) => {
    setTouchEnd(null); // On remet à zéro la fin du toucher
    setTouchStart(e.targetTouches[0].clientX); // On récupère la position de départ du doigt
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX); // On suit le mouvement du doigt
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!currentPhoto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
      // Ajout des gestionnaires d'événements tactiles
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="relative max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
          title="Fermer"
        >
          <XCircle size={36} />
        </button>
        
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="w-full max-h-[80vh] object-contain rounded-lg mb-4"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />

        <div className="text-center text-red-600">
          <h3 className="text-2xl font-bold">{currentPhoto.title}</h3>
        </div>
      </div>
      
      {/* Bouton pour aller à la photo précédente, toujours visible */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors z-10"
          title="Précédent"
        >
          <ArrowLeftCircle size={48} />
        </button>
      )}

      {/* Bouton pour aller à la photo suivante, toujours visible */}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors z-10"
          title="Suivant"
        >
          <ArrowRightCircle size={48} />
        </button>
      )}
    </div>
  );
};

export default LightboxModal;