import React from 'react';
import { MessageCircle, Newspaper, Calendar, Utensils, Heart, Users, Star,Clock, MapPin, Mail, Phone } from 'lucide-react';
const ContactPage = () => (
    <div className="space-y-16">
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
          <p className="text-xl text-yellow-200">
            Une question ? Un événement à organiser ? Nous sommes là pour vous !
          </p>
        </div>
      </section>

      {/* Contact principal */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-8">Nos coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-1">Téléphone</h4>
                    <p className="text-lg font-bold text-gray-700">0 6 11 52 16 89</p>
                    <p className="text-sm text-gray-600"></p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-1">Email</h4>
                    <p className="text-lg font-bold text-gray-700">fritesbonnel@gmail.com</p>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-1">Localisation</h4>
                    <p className="text-lg font-bold text-gray-700">Angers et sa région</p>
                    <p className="text-sm text-gray-600">Service à domicile et événements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-4">Horaires d'ouverture</h4>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Mardi - Dimanche</span>
                    <span className="font-semibold text-red-600">11h00 - 22h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Lundi</span>
                    <span className="text-red-600">Fermé</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded border-l-4 border-yellow-400">
                  <p className="text-sm text-gray-600">
                    <strong>Note :</strong> Horaires étendus lors des événements et marchés locaux
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-red-600 mb-8">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="votre@email.fr"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="06 XX XX XX XX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Choisir un sujet</option>
                  <option>Commande / Réservation</option>
                  <option>Événement privé</option>
                  <option>Partenariat</option>
                  <option>Information générale</option>
                  <option>Réclamation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Décrivez votre demande..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-400 text-red-600 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Carte et zone de service */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre zone de service</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-6">Angers et environs</h4>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Carte interactive d'Angers</p>
                    <p className="text-sm">Zone de livraison et services</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Service disponible dans un rayon de 30km autour d'Angers. 
                  Frais de déplacement selon la distance.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-6">Communes desservies</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Angers Centre", "Avrillé", "Beaucouzé", "Bouchemaine",
                  "Brissac", "Cholet", "Les Ponts-de-Cé", "Montreuil-Juigné",
                  "Saint-Barthélemy", "Saint-Jean-de-Linières", "Sainte-Gemmes", "Trélazé"
                ].map((commune, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg text-center border border-yellow-300">
                    <span className="text-sm font-medium text-red-600">{commune}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-600 mb-2">Service spécial</h5>
                <p className="text-sm text-gray-700">
                  Votre commune n'est pas dans la liste ? Contactez-nous ! 
                  Nous étudions toutes les demandes pour étendre notre zone de service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
    export default ContactPage ;
