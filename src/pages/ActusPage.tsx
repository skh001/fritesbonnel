import React, { useState } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';
import LightboxModal from '../components/LightboxModal';

// Force le chargement de toutes les images pour les catégories spécifiées
const imageModules = import.meta.glob([
    '/src/assets/PERSONNEL/*.{png,jpg,jpeg,svg}',
    '/src/assets/INGREDIENTS/*.{png,jpg,jpeg,svg}',
    '/src/assets/NOS FOOD TRUCKS/*.{png,jpg,jpeg,svg}',
    '/src/assets/EVENEMENT TRAITEUR/*.{png,jpg,jpeg,svg}',
    '/src/assets/NOS EVENEMENTS/*.{png,jpg,jpeg,svg}',
], { eager: true });

// Préparez l'objet de photos catégorisées une seule fois au début
const categorizedPhotos = {};

Object.keys(imageModules).sort().forEach(path => {
    const mod = imageModules[path];
    const url = mod.default;

    // Extrait le nom du dossier pour l'utiliser comme catégorie
    const folderName = path.split('/')[3]; 
    const fileName = path.split('/').pop().split('.')[0];
    const title = fileName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    
    // Utilise le nom du dossier comme clé de catégorie
    if (!categorizedPhotos[folderName]) {
        categorizedPhotos[folderName] = [];
    }
    categorizedPhotos[folderName].push({ title, url });
});

const ActusPage = () => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [currentCategoryPhotos, setCurrentCategoryPhotos] = useState([]);

    const openModal = (category) => (index) => {
        setCurrentCategoryPhotos(categorizedPhotos[category]);
        setSelectedPhotoIndex(index);
    };

    const closeModal = () => {
        setSelectedPhotoIndex(null);
        setCurrentCategoryPhotos([]);
    };
    
    const categories = Object.keys(categorizedPhotos);

    if (categories.length === 0) {
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

            {categories.map(category => (
                <section key={category} className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold text-red-600 mb-8 capitalize">
                        {category}
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {categorizedPhotos[category].map((photo, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => openModal(category)(index)}
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
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
                </section>
            ))}
            
            {selectedPhotoIndex !== null && currentCategoryPhotos.length > 0 && (
                <LightboxModal 
                    photos={currentCategoryPhotos}
                    initialIndex={selectedPhotoIndex} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default ActusPage;