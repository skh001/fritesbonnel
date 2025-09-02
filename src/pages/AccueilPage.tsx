import React from 'react';
import { Utensils, Heart, Star, Users } from 'lucide-react';
import vincentImg from '../assets/vincent.png';
import vincentPhoto from '../assets/vincent.png';
import fb1Image from '../assets/fb11.png';
import fb2Image from '../assets/fb22.png';

const AccueilPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
    <div className="space-y-16 font-sans text-gray-800">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto px-4 text-center relative flex flex-col md:flex-row items-center justify-center">
          <div className="absolute left-0 md:relative md:left-auto mb-4 md:mb-0 mr-0 md:mr-8 flex justify-center w-full md:w-auto">
            <img 
              src={fb1Image} 
              alt="Image frites 1" 
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-folks mb-6">Bonnes & belles</h2>
            <p className="text-xl text-yellow-200 mb-8">
              Les vraies frites du Nord, préparées selon la tradition depuis 2018
            </p>
            <button
              onClick={() => setCurrentPage('evenements')}
              className="bg-yellow-400 text-red-600 px-10 py-4 rounded-lg font-semibold 
                         transition-all duration-300 transform hover:scale-105 hover:bg-yellow-300 hover:shadow-xl text-lg"
            >
              Réserver notre friterie
            </button>
          </div>

          <div className="absolute right-0 md:relative md:right-auto mt-4 md:mt-0 ml-0 md:ml-8 flex justify-center w-full md:w-auto">
            <img 
              src={fb2Image} 
              alt="Image frites 2" 
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-red-600 mb-6">Notre Histoire</h3>
            <div className="prose text-gray-700">
              <p className="text-lg mb-4">
                <strong>Frites Bonnel</strong> a été créée en 2018 par <strong>Vincent Pécourt</strong>, 
                passé par les traditions culinaires du Nord de la France.
              </p>
              <p className="mb-6">
               Originaire des Hauts-de-France, nous avons la nostalgie des
frites de notre enfance égouttées au torchon. Dans chaque
région de France traversée au cours de nos mutations
professionnelles, nous faisons le constat qu’il est rare de
trouver des commerces ambulants proposant une alimentation
de plaisir simple, basée sur des produits frais et peu chers.
              </p>
              <p className="mb-6">
                Des frites préparées pour les amis, les clubs sportifs et les
associations dans lesquelles nous sommes impliqués, nous est
venue l’idée de créer en Anjou une « baraque à frites » où
chacun pourra se restaurer en toute simplicité.
              </p>
              <p>
            
C’est ainsi que les <strong> FRITES BONNEL Bonnes & Belles </strong> commencent
leur activité en juin 2018 pour partager les bonnes saveurs des
belles frites du Nord.
Bonnel est le nom des arrière-grands-parents de Vincent qui
possédaient une brasserie au début du siècle dernier près de
Béthune dans le Pas-de-Calais (62).
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-8 rounded-xl border-2 border-yellow-200 shadow-md">
            <div className="w-50 h-50 bg-red-0 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img
                src={vincentImg}
                alt="Vincent Pécourt"
                className="object-cover w-full h-full"
              />
            </div>
            <h4 className="text-xl font-semibold text-red-600 text-center mb-4">Vincent Pécourt</h4>
            <p className="text-gray-600 text-center">
              Fondateur et maître fritier, spécialiste des traditions culinaires du Nord
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs & Implication Locale */}
      <section className="bg-yellow-50 py-16 rounded-xl shadow-inner">
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
    {title === "Qualité" ? (
      <div className="w-36 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-400" />
          ))}
        </div>
      </div>
    ) : (
      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-yellow-400" />
      </div>
    )}
    <h4 className="text-xl font-semibold text-red-600 mb-3">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
))}
          </div>

          {/* Implication locale ajoutée ici */}
          <div className="mt-16">
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
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
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
                <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-green-700 font-medium">Circuits courts privilégiés</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-green-700 font-medium">Réduction des déchets</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-green-700 font-medium">Emballages écologiques</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-green-700 font-medium">Économies d'énergie</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
                    <p className="text-green-700 text-sm">
                      <strong>Notre objectif :</strong> Devenir la première friterie éco-responsable 
                      d'Angers tout en préservant l'authenticité de nos traditions du Nord.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="max-w-6xl mx-auto px-4">
  <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Équipe</h3>
  <div className="grid md:grid-cols-5 gap-6 justify-items-center">
    <div className="bg-red-600 text-white p-6 rounded-xl text-center w-48 shadow-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
        <img src={vincentPhoto} alt="Vincent Pécourt" className="object-cover w-full h-full" />
      </div>
      <h4 className="font-bold text-lg">Vincent Pécourt</h4>
      <p className="text-yellow-200">Fondateur</p>
    </div>
    <div className="bg-yellow-400 text-red-600 p-6 rounded-xl text-center w-48 shadow-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
      </div>
      <h4 className="font-semibold">Hélène Pécourt</h4>
      <p className="text-sm">Famille</p>
    </div>
    <div className="bg-yellow-400 text-red-600 p-6 rounded-xl text-center w-48 shadow-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
      </div>
      <h4 className="font-semibold">Elise Pécourt</h4>
      <p className="text-sm">CDI - Famille</p>
    </div>
    <div className="bg-white border-2 border-red-600 p-6 rounded-xl text-center w-48 shadow-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
      </div>
      <h4 className="font-semibold text-red-600">Sandrine</h4>
      <p className="text-sm text-gray-600">Alternante</p>
    </div>
    <div className="bg-white border-2 border-red-600 p-6 rounded-xl text-center w-48 shadow-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
      </div>
      <h4 className="font-semibold text-red-600">Sofiane KH</h4>
      <p className="text-sm text-gray-600">Alternant</p>
    </div>
  </div>
  <div className="grid md:grid-cols-3 gap-4 justify-items-center mt-8">
    {['Dimitri', 'Anaelle', 'Eugenia'].map((name) => (
      <div key={name} className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center w-40 shadow-sm">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
        </div>
        <h4 className="font-semibold text-red-600">{name}</h4>
        <p className="text-xs text-gray-600">CDI</p>
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-8">
    <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-center w-32 shadow-sm">
      <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">?</div>
      </div>
      <h4 className="font-semibold text-red-600">Agathe</h4>
      <p className="text-xs text-gray-600">Extra</p>
    </div>
  </div>
</section>

      {/* Témoignages */}
      <section className="bg-red-50 py-16 rounded-xl shadow-inner">
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
                "J’ai enfin pût goûter à ses frites si bien réputées sur Angers ! Je me suis régaler ! Le burger était super bon, la viande de qualité, les frites au top, sans parler de l’équipe très chaleureuse et accueillante ! Je recommande"
              </p>
              <p className="font-semibold text-red-600">- Margot.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "On avait déjà entendu que les frites Bonnel étaient réputées. C'est plus que confirmé. Sandwich, frites, boisson : 10,70€ donc bon rapport qualité prix. La quantité est suffisante, le chef est sympa. Rien de mieux avant d'aller voir les ducs d'Angers !"
              </p>
              <p className="font-semibold text-red-600">- Etienne</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/maps/place/FRITES+BONNEL/@47.4796997,-0.553666,17z/data=!3m1!4b1!4m6!3m5!1s0x480879e8f302056d:0x498abbd82bd8c340!8m2!3d47.4796961!4d-0.5510911!16s%2Fg%2F11gmysbc3m?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              rel="noopener noreferrer"
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
export default AccueilPage;
