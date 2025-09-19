import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Send } from 'lucide-react';

// Tableau de données de vos produits (merchandising)
const products = [
  {
    name: "T-shirt Frites Bonnel",
    description: "T-shirt 100% coton avec le logo Frites Bonnel. Style décontracté et coupe unisexe.",
    price: "20,00 €",
    options: ["Taille (S, M, L, XL)", "Couleur (Noir, Blanc)"],
    image: "/src/assets/merch/t-shirt.jpg", // Mettez ici le chemin de votre image
  },
  {
    name: "Sweat à Capuche",
    description: "Sweat à capuche chaud et confortable. Parfait pour les soirées fraîches.",
    price: "45,00 €",
    options: ["Taille (S, M, L, XL)", "Couleur (Gris, Bleu Marine)"],
    image: "/src/assets/merch/sweat.jpg",
  },
  {
    name: "Mug Frites Bonnel",
    description: "Mug en céramique de haute qualité pour votre café du matin, avec une illustration unique.",
    price: "15,00 €",
    options: [], // Pas d'options de taille ou couleur pour un mug
    image: "/src/assets/merch/mug.jpg",
  },
  {
    name: "Sac Tote Bag",
    description: "Sac réutilisable en toile pour faire vos courses ou transporter vos affaires. Écologique et stylé !",
    price: "10,00 €",
    options: [],
    image: "/src/assets/merch/tote-bag.jpg",
  },
  // Ajoutez d'autres produits ici
];

const BoutiquePage = () => {
  const [submitError, setSubmitError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;

    try {
      // N'OUBLIEZ PAS DE REMPLACER L'ADRESSE CI-DESSOUS PAR VOTRE VRAI E-MAIL !
      const response = await fetch("https://formsubmit.co/votre-email@gmail.com", {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        console.error("Échec de l'envoi du formulaire :", response.status, response.statusText);
        setSubmitError("Une erreur est survenue lors de l'envoi de votre commande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'envoi du formulaire:", error);
      setSubmitError("Connexion impossible. Vérifiez votre connexion internet et réessayez.");
    }
  };

  return (
    <div className="space-y-16">
      {/* Bannière de la boutique */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Notre Merch Officiel</h2>
          <p className="text-xl text-white">
            Découvrez nos produits dérivés et commandez-les pour les récupérer au food truck !
          </p>
        </div>
      </section>

      {/* Catalogue de produits */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Collection Frites Bonnel</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h4 className="text-xl font-semibold text-red-600 text-center mb-2">{product.name}</h4>
              <p className="text-gray-700 text-center mb-4">{product.description}</p>
              <div className="w-full text-center text-lg font-bold text-red-600 mt-auto">
                {product.price}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Formulaire de commande */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Réserver vos articles</h3>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Erreur !</strong>
                <span className="block sm:inline"> {submitError}</span>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="client_name"
                placeholder="Votre nom *"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="tel"
                name="client_phone"
                placeholder="Votre numéro de téléphone *"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            
            <h4 className="text-xl font-semibold text-red-600 pt-4">Votre commande :</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {products.map((product, index) => (
                <div key={index} className="flex flex-col space-y-2 border border-gray-300 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-700">{product.name} ({product.price})</label>
                  <div className="flex space-x-2 items-center">
                    <input
                      type="number"
                      name={`quantity_${product.name.replace(/\s/g, '_')}`}
                      defaultValue="0"
                      min="0"
                      className="w-16 px-2 py-1 text-center border rounded-lg"
                    />
                    {product.options.length > 0 && (
                      <textarea
                        name={`options_${product.name.replace(/\s/g, '_')}`}
                        placeholder="Précisez taille/couleur"
                        rows={1}
                        className="flex-grow px-2 py-1 text-sm border rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <textarea
                name="details"
                placeholder="Commentaires (ex: point de rendez-vous...)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            
            <input type="hidden" name="_captcha" value="false" />
            
            <button
              type="submit"
              className="w-full bg-[#fffd67] text-red-600 py-3 rounded-lg font-semibold hover:bg-[#fefc4c] transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Réserver mes articles</span>
            </button>
          </form>
        </div>
      </section>

      {/* Popup de confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-bounce">
            <h3 className="text-2xl font-bold text-red-600 mb-2">
              Réservation envoyée !
            </h3>
            <p className="text-gray-700">
              Votre commande a bien été reçue. Nous la mettons de côté pour vous !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoutiquePage;