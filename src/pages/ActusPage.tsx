import React, { useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';

const ActusPage = () => {
    useEffect(() => {
      // Ce code est maintenu pour le widget de fil d'actualité Facebook
      if (window.FB) {
        window.FB.XFBML.parse();
      } else {
        window.addEventListener('fbload', () => {
          if (window.FB) {
            window.FB.XFBML.parse();
          }
        });
      }
    }, []);

    return (
        <div className="space-y-16">
          <section className="bg-yellow-400 text-red-600 py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">Actualités</h2>
              <p className="text-xl">Restez informé de nos dernières nouvelles et de notre engagement local</p>
            </div>
          </section>

          {/* Boutons d'abonnement aux réseaux sociaux */}
          <section className="max-w-6xl mx-auto px-4">
            <div className="bg-red-600 text-white p-12 rounded-xl text-center">
              <h3 className="text-3xl font-bold mb-6">Suivez-nous sur les réseaux sociaux !</h3>
              <p className="text-yellow-200 text-lg mb-8">
                Pour ne rien manquer de nos aventures, de nos événements et de nos nouveautés,
                rejoignez-nous sur Facebook et Instagram.
              </p>
              
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.facebook.com/fritesbonnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-yellow-400 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  <Facebook size={24} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/fritesbonnel" // Remplacer par l'URL de votre page Instagram
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-yellow-400 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  <Instagram size={24} />
                  <span>Instagram</span>
                </a>
              </div>

            </div>
          </section>

          {/* Fil d'Actualité Facebook */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Notre Fil d'Actualité Facebook</h3>
            <p className="text-gray-700 text-center mb-8">
              Suivez nos dernières publications, événements et annonces directement depuis notre page Facebook.
            </p>
            <div className="flex justify-center w-full">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/fritesbonnel"
                data-tabs="timeline"
                data-width="800"
                data-height="1000"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote cite="https://www.facebook.com/fritesbonnel" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/fritesbonnel">Frites Bonnel</a>
                </blockquote>
              </div>
            </div>
          </section>
        </div>
    );
};

export default ActusPage;
