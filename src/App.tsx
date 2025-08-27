import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Users, Heart, Utensils, Calendar, Newspaper, MessageCircle } from 'lucide-react';

type Page = 'accueil' | 'carte' | 'evenements' | 'actus' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');

  const Header = () => (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Utensils className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Frites Bonnel</h1>
              <p className="text-yellow-200 text-sm">Bonnes et belles</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {[
              { key: 'accueil', label: 'Accueil', icon: Heart },
              { key: 'carte', label: 'Notre Carte', icon: Utensils },
              { key: 'evenements', label: 'Événements', icon: Calendar },
              { key: 'actus', label: 'Actus', icon: Newspaper },
              { key: 'contact', label: 'Contact', icon: MessageCircle }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key as Page)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === key 
                    ? 'bg-yellow-400 text-red-600 font-semibold' 
                    : 'hover:bg-red-700 hover:text-yellow-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {[
            { key: 'accueil', label: 'Accueil' },
            { key: 'carte', label: 'Carte' },
            { key: 'evenements', label: 'Événements' },
            { key: 'actus', label: 'Actus' },
            { key: 'contact', label: 'Contact' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key as Page)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentPage === key 
                  ? 'bg-yellow-400 text-red-600 font-semibold' 
                  : 'bg-red-700 hover:bg-yellow-400 hover:text-red-600'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Frites Bonnel</h3>
                <p className="text-yellow-400 text-sm">Bonnes et belles</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Friterie traditionnelle du Nord, créée en 2018 par Vincent Picourt. 
              Spécialiste des frites authentiques et des recettes traditionnelles.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>02 41 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>contact@fritesbonnel.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Angers et sa région</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Mar-Sam 11h-22h</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">@</span>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">G</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>© 2024 Frites Bonnel - Friterie traditionnelle du Nord - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );

  const AccueilPage = () => (
    <div className="space-y-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Bonnes et belles</h2>
          <p className="text-xl text-yellow-200 mb-8">
            Les vraies frites du Nord, préparées selon la tradition depuis 2018
          </p>
          <button
            onClick={() => setCurrentPage('carte')}
            className="bg-yellow-400 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Voir notre carte
          </button>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-red-600 mb-6">Notre Histoire</h3>
            <div className="prose text-gray-700">
              <p className="text-lg mb-4">
                <strong>Frites Bonnel</strong> a été créée en 2018 par <strong>Vincent Picourt</strong>, 
                passionné par les traditions culinaires du Nord de la France.
              </p>
              <p className="mb-4">
                Spécialiste des frites authentiques, Vincent a voulu apporter à Angers 
                et sa région le goût authentique des vraies frites du Nord, préparées 
                selon les méthodes traditionnelles transmises de génération en génération.
              </p>
              <p>
                Chaque frite est préparée avec soin, dans le respect des recettes 
                ancestrales qui font la réputation de notre belle région du Nord.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-8 rounded-xl border-2 border-yellow-200">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-10 h-10 text-yellow-400" />
            </div>
            <h4 className="text-xl font-semibold text-red-600 text-center mb-4">Vincent Picourt</h4>
            <p className="text-gray-600 text-center">
              Fondateur et maître fritier, spécialiste des traditions culinaires du Nord
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Valeurs</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Tradition",
                description: "Recettes authentiques du Nord, transmises de génération en génération"
              },
              {
                icon: Star,
                title: "Qualité",
                description: "Sélection rigoureuse des produits et préparation artisanale"
              },
              {
                icon: Users,
                title: "Authenticité",
                description: "L'esprit convivial et chaleureux des friteries traditionnelles"
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-red-600 mb-3">{title}</h4>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Équipe</h3>
        <div className="space-y-8">
          {/* Patron au centre */}
          <div className="flex justify-center">
            <div className="bg-red-600 text-white p-6 rounded-xl text-center w-64">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold text-lg">Vincent Picourt</h4>
              <p className="text-yellow-200">Patron Fondateur</p>
            </div>
          </div>
          
          {/* Famille */}
          <div className="grid md:grid-cols-2 gap-6 justify-items-center">
            <div className="bg-yellow-400 text-red-600 p-4 rounded-lg text-center w-48">
              <h4 className="font-semibold">Hélène Picourt</h4>
              <p className="text-sm">Famille</p>
            </div>
            <div className="bg-yellow-400 text-red-600 p-4 rounded-lg text-center w-48">
              <h4 className="font-semibold">Elise Picourt</h4>
              <p className="text-sm">CDI - Famille</p>
            </div>
          </div>
          
          {/* Alternants */}
          <div className="grid md:grid-cols-2 gap-6 justify-items-center">
            <div className="bg-white border-2 border-red-600 p-4 rounded-lg text-center w-48">
              <h4 className="font-semibold text-red-600">Sandrine</h4>
              <p className="text-sm text-gray-600">Alternante</p>
            </div>
            <div className="bg-white border-2 border-red-600 p-4 rounded-lg text-center w-48">
              <h4 className="font-semibold text-red-600">Sofiane KH</h4>
              <p className="text-sm text-gray-600">Alternant</p>
            </div>
          </div>
          
          {/* CDI */}
          <div className="grid md:grid-cols-3 gap-4 justify-items-center">
            {['Dimitri', 'Anaelle', 'Eugenia'].map((name) => (
              <div key={name} className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center w-40">
                <h4 className="font-semibold text-red-600">{name}</h4>
                <p className="text-xs text-gray-600">CDI</p>
              </div>
            ))}
          </div>
          
          {/* Extra */}
          <div className="flex justify-center">
            <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-center w-32">
              <h4 className="font-semibold text-red-600">Agathe</h4>
              <p className="text-xs text-gray-600">Extra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-red-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Ils nous font confiance</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Les meilleures frites d'Angers ! Vincent et son équipe perpétuent 
                la vraie tradition du Nord avec un savoir-faire exceptionnel."
              </p>
              <p className="font-semibold text-red-600">- Marie D.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Accueil chaleureux et frites croustillantes à souhait ! 
                On retrouve l'authentique goût des friteries du Nord."
              </p>
              <p className="font-semibold text-red-600">- Jean-Paul M.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center space-x-2 bg-yellow-400 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <Star className="w-5 h-5" />
              <span>Voir tous nos avis Google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  const CartePage = () => (
    <div className="space-y-16">
      <section className="bg-yellow-400 text-red-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Notre Carte</h2>
          <p className="text-xl">Découvrez nos spécialités du Nord, préparées selon la tradition</p>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Pourquoi nous choisir ?</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Engagement Qualité</h4>
                <p className="text-gray-700">
                  Pommes de terre sélectionnées, huile de qualité supérieure, 
                  cuisson maîtrisée selon les méthodes traditionnelles du Nord.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Recettes Traditionnelles</h4>
                <p className="text-gray-700">
                  Sauces maison préparées selon les recettes ancestrales, 
                  accompagnements typiques de la région Nord.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-8 rounded-xl">
            <h4 className="text-xl font-semibold text-red-600 mb-4">Notre Secret</h4>
            <p className="text-gray-700">
              La double cuisson à l'ancienne : une première cuisson à basse température 
              pour cuire à cœur, puis une seconde à haute température pour obtenir 
              cette croûte dorée et croustillante si caractéristique des vraies frites du Nord.
            </p>
          </div>
        </div>
      </section>

      {/* Plats proposés */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Spécialités</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Frites Traditionnelles",
                items: [
                  "Frites classiques", 
                  "Frites à la graisse de bœuf", 
                  "Frites belges épaisses"
                ]
              },
              {
                category: "Accompagnements",
                items: [
                  "Fricadelle maison", 
                  "Boudin noir/blanc", 
                  "Merguez du Nord"
                ]
              },
              {
                category: "Sauces Maison",
                items: [
                  "Mayonnaise traditionnelle", 
                  "Sauce andalouse", 
                  "Sauce samouraï"
                ]
              },
              {
                category: "Spécialités du Nord",
                items: [
                  "Américain-frites", 
                  "Welsh complet", 
                  "Carbonade flamande"
                ]
              },
              {
                category: "Salades",
                items: [
                  "Salade ch'timi", 
                  "Salade du maroilles", 
                  "Salade flamande"
                ]
              },
              {
                category: "Boissons",
                items: [
                  "Bières du Nord", 
                  "Sodas artisanaux", 
                  "Café à l'ancienne"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-red-600 mb-4 border-b-2 border-yellow-300 pb-2">
                  {section.category}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Développement durable */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Engagement Durable</h3>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-3">Approvisionnement Local</h4>
              <p className="text-gray-700">
                Partenariat privilégié avec les producteurs locaux d'Angers et de la région. 
                Pommes de terre fraîches livrées directement des exploitations agricoles environnantes.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-3">Emballages Écologiques</h4>
              <p className="text-gray-700">
                Barquettes en carton recyclable, couverts en bois, sachets en papier kraft. 
                Réduction maximale des plastiques à usage unique.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-red-600 mb-3">Zéro Gaspillage</h4>
              <p className="text-gray-700">
                Gestion optimisée des stocks, valorisation des invendus, 
                compostage des déchets organiques avec les partenaires locaux.
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-green-600 mb-4">Notre Promesse</h4>
              <p className="text-green-700">
                Préserver l'environnement tout en maintenant la qualité traditionnelle 
                de nos frites du Nord. C'est notre engagement pour les générations futures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const EvenementsPage = () => (
    <div className="space-y-16">
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Événements & Partenariats</h2>
          <p className="text-xl text-yellow-200">
            Frites Bonnel vous accompagne dans tous vos événements
          </p>
        </div>
      </section>

      {/* Événements */}
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
              description: "Animation culinaire pour vos événements professionnels. Team building autour de la tradition.",
              features: ["Formules groupes", "Service sur site", "Animation dégustation"]
            },
            {
              icon: Calendar,
              title: "Marchés Locaux",
              description: "Retrouvez-nous sur les marchés d'Angers et des communes environnantes.",
              features: ["Présence régulière", "Produits frais", "Conseil personnalisé"]
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
              <h4 className="text-2xl font-semibold text-red-600 mb-6">Entreprises Collaboratrices</h4>
              <div className="space-y-4">
                {[
                  {
                    name: "Brasserie des Pays de Loire",
                    type: "Bières artisanales locales",
                    collaboration: "Accords mets-bières, événements conjoints"
                  },
                  {
                    name: "Ferme du Bocage Angevin", 
                    type: "Producteur de pommes de terre",
                    collaboration: "Approvisionnement direct, traçabilité"
                  },
                  {
                    name: "Mairie d'Angers",
                    type: "Collectivité locale",
                    collaboration: "Événements municipaux, marchés"
                  }
                ].map((partner, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                    <h5 className="font-semibold text-red-600">{partner.name}</h5>
                    <p className="text-sm text-gray-600 mb-1">{partner.type}</p>
                    <p className="text-sm text-gray-700">{partner.collaboration}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-semibold text-red-600 mb-6">Associations Partenaires</h4>
              <div className="space-y-4">
                {[
                  {
                    name: "Association Ch'ti d'Angers",
                    description: "Promotion de la culture nordiste dans la région"
                  },
                  {
                    name: "Comité des Fêtes",
                    description: "Participation aux événements festifs locaux"
                  },
                  {
                    name: "Club des Entrepreneurs",
                    description: "Réseau professionnel local et régional"
                  }
                ].map((association, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-red-600 mb-2">{association.name}</h5>
                    <p className="text-sm text-gray-700">{association.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration */}
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
                    <p className="text-sm text-gray-600">02 41 XX XX XX</p>
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
              <h4 className="text-xl font-semibold text-red-600 mb-6">Devis gratuit</h4>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option>Type d'événement</option>
                    <option>Mariage</option>
                    <option>Fête d'entreprise</option>
                    <option>Événement privé</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Décrivez votre projet..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-red-600 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Demander un devis gratuit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ActusPage = () => (
    <div className="space-y-16">
      <section className="bg-yellow-400 text-red-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Actualités</h2>
          <p className="text-xl">Restez informé de nos dernières nouvelles et de notre engagement local</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-red-600 text-white p-12 rounded-xl text-center">
          <h3 className="text-3xl font-bold mb-6">Newsletter Frites Bonnel</h3>
          <p className="text-yellow-200 text-lg mb-8">
            Recevez nos dernières actualités, nos nouveautés et nos offres spéciales
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                S'abonner
              </button>
            </div>
            <p className="text-yellow-200 text-sm mt-4">
              Pas de spam, promis ! Vous pouvez vous désinscrire à tout moment.
            </p>
          </form>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Dernières actualités</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              date: "15 Janvier 2024",
              title: "Nouvelle recette : Welsh du Nord authentique",
              description: "Découvrez notre nouvelle spécialité inspirée des traditions ch'timis, avec fromage du Nord et bière locale.",
              category: "Nouveauté"
            },
            {
              date: "8 Janvier 2024", 
              title: "Partenariat avec la Ferme du Bocage",
              description: "Approvisionnement direct en pommes de terre locales pour garantir la fraîcheur et soutenir l'agriculture régionale.",
              category: "Partenariat"
            },
            {
              date: "20 Décembre 2023",
              title: "Succès du marché de Noël d'Angers",
              description: "Merci pour votre accueil chaleureux ! Nos frites ont réchauffé les cœurs pendant les fêtes de fin d'année.",
              category: "Événement"
            },
            {
              date: "10 Décembre 2023",
              title: "Emballages 100% écologiques",
              description: "Passage complet aux emballages biodégradables et compostables pour réduire notre impact environnemental.",
              category: "Environnement"
            },
            {
              date: "25 Novembre 2023",
              title: "Formation de l'équipe aux traditions",
              description: "Session spéciale avec un maître fritier du Nord pour perfectionner nos techniques ancestrales.",
              category: "Formation"
            },
            {
              date: "18 Novembre 2023",
              title: "Ouverture du service traiteur",
              description: "Frites Bonnel propose désormais ses services pour vos événements privés et professionnels.",
              category: "Service"
            }
          ].map((article, index) => (
            <article key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <span className="px-3 py-1 bg-yellow-400 text-red-600 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">{article.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Implication locale */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Implication Locale</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-semibold text-red-600 mb-6">Actions Communautaires</h4>
              <div className="space-y-6">
                {[
                  {
                    title: "Soutien aux associations locales",
                    description: "Partenariat avec les associations sportives et culturelles d'Angers pour leurs événements et collectes de fonds."
                  },
                  {
                    title: "Emploi local",
                    description: "Priorité à l'embauche locale avec formation aux métiers de la restauration traditionnelle."
                  },
                  {
                    title: "Marchés et fêtes de quartier",
                    description: "Présence régulière sur les marchés locaux et participation aux événements de quartier."
                  }
                ].map((action, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">{action.title}</h5>
                      <p className="text-gray-700 text-sm">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-semibold text-red-600 mb-6">Engagement Environnemental</h4>
              <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">Circuits courts privilégiés</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">Réduction des déchets</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">Emballages écologiques</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-green-700 font-medium">Économies d'énergie</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-green-700 text-sm">
                    <strong>Notre objectif :</strong> Devenir la première friterie éco-responsable 
                    d'Angers tout en préservant l\'authenticité de nos traditions du Nord.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

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
                    <p className="text-lg font-bold text-gray-700">02 41 XX XX XX</p>
                    <p className="text-sm text-gray-600">Lun-Ven 9h-18h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-1">Email</h4>
                    <p className="text-lg font-bold text-gray-700">contact@fritesbonnel.fr</p>
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
                    <span className="text-gray-700">Mardi - Samedi</span>
                    <span className="font-semibold text-red-600">11h00 - 22h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Dimanche - Lundi</span>
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

      {/* Réseaux sociaux */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-red-600 mb-6">Suivez-nous sur les réseaux</h3>
          <p className="text-gray-600 mb-8">
            Retrouvez nos actualités, nos photos et nos bons plans sur nos réseaux sociaux
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { name: "Facebook", symbol: "f", description: "Photos et événements" },
              { name: "Instagram", symbol: "@", description: "Coulisses et créations" },
              { name: "Google", symbol: "G", description: "Avis et localisation" }
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-red-600 group-hover:bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <span className="text-2xl font-bold text-white group-hover:text-red-600">
                    {social.symbol}
                  </span>
                </div>
                <h4 className="font-semibold text-red-600 mb-2">{social.name}</h4>
                <p className="text-sm text-gray-600">{social.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <AccueilPage />;
      case 'carte': return <CartePage />;
      case 'evenements': return <EvenementsPage />;
      case 'actus': return <ActusPage />;
      case 'contact': return <ContactPage />;
      default: return <AccueilPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;