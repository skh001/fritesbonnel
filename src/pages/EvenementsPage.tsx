import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Users, Heart, Utensils, Calendar, Newspaper, MessageCircle, Cake, Send } from 'lucide-react';

// Importation des images depuis le dossier assets
import viradesImage from '../assets/virades.png';
import roseImage from '../assets/rose.png';
import ducsImage from '../assets/ducs.png';
import ufabImage from '../assets/ufab.png';

  const EvenementsPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);
      const form = e.currentTarget;

      try {
        const response = await fetch("https://formsubmit.co/ggbrocs@gmail.com", {
          method: "POST",
          body: new FormData(form),
        });

        if (response.ok) {
          form.reset();
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
        } else {
          console.error("Échec de l'envoi du formulaire :", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Détails de l'erreur :", errorText);
          setSubmitError("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur réseau lors de l'envoi du formulaire:", error);
        setSubmitError("Connexion impossible. Vérifiez votre connexion internet et réessayez.");
      }
    };

    return (
      <div className="space-y-16">
        <section className="bg-red-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Événements & Partenariats</h2>
            <p className="text-xl text-yellow-200">
              Frites Bonnel vous accompagne dans tous vos événements
            </p>
          </div>
        </section>

        {/* Nos Services Événementiels */}
        <section className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Services Événementiels</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Mariages",
                description: "Stand de frites fraîches pour vos réceptions. Service traiteur avec nos spécialités du Nord.",
                features: ["Service continu", "Présentation soignée", "Menu personnalisé"]
              },
              {
                icon: Users,
                title: "Fêtes d'Entreprise",
                description: "Service de restauration pour vos événements professionnels. Des desserts sont également disponibles.",
                features: ["Service sur site", "Options variées", "Desserts inclus"]
              },
              {
                icon: Cake,
                title: "Fêtes Scolaires et Locales",
                description: "Frites Bonnel pour les fêtes d'école, le 14 juillet, événements communaux et autres festivités.",
                features: ["Ambiance conviviale", "Adapté à tous les âges", "Grand choix de plats"]
            }
          ].map(({ icon: Icon, title, description, features }, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold text-red-600 text-center mb-4">{title}</h4>
              <p className="text-gray-700 text-center mb-6">{description}</p>
              <ul className="space-y-2">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

        {/* Partenariats */}
        <section className="bg-yellow-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Partenaires Locaux</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-semibold text-red-600 mb-6">Nous Sponsorisons</h4>
                <div className="space-y-4">
                  {[
                    {
                      name: "UFAB des baskets",
                      type: "Club de basketball",
                      collaboration: "Soutien sportif, événements",
                      image: ufabImage
                    },
                    {
                      name: "Les Ducs d'Angers",
                      type: "Club de hockey sur glace",
                      collaboration: "Soutien sportif, événements",
                      image: ducsImage
                    }
                  ].map((partner, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-red-600 flex items-center">
                      {partner.image && (
                          <img
                            src={partner.image}
                            alt={`Logo de ${partner.name}`}
                            className="w-24 h-24 mr-4"
                          />
                        )}
                        <div>
                          <h5 className="font-semibold text-red-600">{partner.name}</h5>
                          <p className="text-sm text-gray-600 mb-1">{partner.type}</p>
                          <p className="text-sm text-gray-700">{partner.collaboration}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-semibold text-red-600 mb-6">Nous Soutenons</h4>
                <div className="space-y-4">
                  {[
                    {
                      name: "Les Virades de l’Espoir",
                      description: "La lutte contre la mucoviscidose",
                      image: viradesImage
                    },
                    {
                      name: "Octobre Rose avec la Ville d’Angers",
                      description: "Soutien à la campagne de lutte contre le cancer du sein",
                      image: roseImage
                    },
                    {
                      name: "",
                      description: ""
                    }
                  ].map((association, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <h5 className="font-semibold text-red-600">{association.name}</h5>
                        {association.image && (
                          <img 
                            src={association.image} 
                            alt={`Logo de ${association.name}`} 
                            className="w-24 h-24 ml-2" 
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{association.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration (retournée en bas) */}
        <section className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Collaborer avec nous</h3>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-semibold text-red-600 mb-6">Comment nous contacter ?</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Appelez-nous</p>
                      <p className="text-sm text-gray-600">06 11 52 16 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Écrivez-nous</p>
                      <p className="text-sm text-gray-600">evenements@fritesbonnel.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Rencontrez-nous</p>
                      <p className="text-sm text-gray-600">Sur rendez-vous à Angers</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-red-600 mb-6">Demander un devis gratuit</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Erreur !</strong>
                      <span className="block sm:inline"> {submitError}</span>
                    </div>
                  )}
                  <div className="mb-4">
                    <input
                      type="text"
                      name="event_client_name"
                      placeholder="Votre nom *" // Indication obligatoire
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="event_client_email"
                      placeholder="Votre email *" // Indication obligatoire
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="event_client_phone"
                      placeholder="Votre numéro de téléphone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      name="event_type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Type d'événement *</option> {/* Indication obligatoire */}
                      <option value="Mariage">Mariage</option>
                      <option value="Fete d'entreprise">Fête d'entreprise</option>
                      <option value="Evenement prive">Événement privé</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  {/* NOUVEAU CHAMP : Date de l'événement */}
                  <div className="mb-4">
                    <input
                      type="date"
                      name="event_date"
                      // Pour les inputs de type 'date', le placeholder n'est pas toujours affiché de la même manière
                      // mais 'required' assure la validation. On peut ajouter un libellé si besoin.
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required // CHAMP OBLIGATOIRE
                    />
                    <label htmlFor="event_date" className="block text-sm text-gray-600 mt-1">Date de l'événement *</label> {/* Ajout d'un libellé */}
                  </div>

                  <div className="mb-4">
                    <input
                      type="number"
                      name="nombre_convives"
                      placeholder="Nombre de convives *" // Indication obligatoire
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      name="repas_souhaite"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="" disabled selected>Repas souhaité *</option> {/* DISABLED, SELECTED et Indication obligatoire */}
                      <option value="burger_frites">Burger + Frites</option>
                      <option value="hotdog_frites">Hot-dog + Frites</option>
                      <option value="americain_frites">Américain (sandwich saucisse ou merguez) + Frites</option>
                      <option value="autre_repas">Autre (préciser dans la description)</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <textarea
                      name="adresse_facturation"
                      placeholder="Adresse de facturation complète"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                  </div>
                  <div>
                    <textarea
                      name="event_description"
                      placeholder="Décrivez votre projet..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                  </div>
                  <input type="hidden" name="_captcha" value="false" />
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-red-600 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Demander un devis gratuit</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Popup de confirmation */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-bounce">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                Merci pour votre demande !
              </h3>
              <p className="text-gray-700">
                Votre demande de devis a bien été envoyée.
                Nous reviendrons vers vous très vite !
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default EvenementsPage;
