import React, { useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';

const ActusPage = () => {
  useEffect(() => {
    // Charger le SDK Facebook une seule fois
    if (!window.fbAsyncInit) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '269575157263587',
          xfbml: true,
          version: 'v23.0',
        });
      };

      // Charger le SDK
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.async = true;
        js.defer = true;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    } else {
      // Reparser les XFBML si SDK déjà chargé
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    }
  }, []);

  return (
    <div className="space-y-16">
      {/* Section Actualités */}
      <section className="bg-[#fffd67] text-red-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Actualités</h2>
          <p className="text-xl">
            Restez informé de nos dernières nouvelles et de notre engagement local
          </p>
        </div>
      </section>

      {/* Section réseaux sociaux */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-red-600 text-white p-12 rounded-xl text-center">
          <h3 className="text-3xl font-bold mb-6">Suivez-nous sur les réseaux sociaux !</h3>
          <p className="text-[#fffd67] text-lg mb-8">
            Pour ne rien manquer de nos aventures, de nos événements et de nos nouveautés,
            rejoignez-nous sur Facebook et Instagram.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://www.facebook.com/fritesbonnel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#fffd67] text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-[#fcec3d] transition-colors"
            >
              <Facebook size={24} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/frites_bonnel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#fffd67] text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-[#fcec3d] transition-colors"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fil d'Actualité Facebook */}
      <section className="w-full py-16 bg-gray-50">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">
          Notre Fil d'Actualité Facebook
        </h3>
        <p className="text-gray-700 text-center mb-8">
          Suivez nos dernières publications, événements et annonces directement depuis notre page Facebook.
        </p>

        <div className="flex justify-center w-full">
          <div
            className="fb-page"
            data-href="https://www.facebook.com/fritesbonnel"
            data-tabs="timeline"
            data-width="1200"
            data-height="1000"
            data-small-header="false"
            data-adapt-container-width="false"
            data-hide-cover="false"
            data-show-facepile="true"
            style={{
              width: '1200px',       // largeur fixe pour centrer
              maxWidth: '100%',      // responsive
              margin: '0 auto',      // centrer horizontalement
            }}
          >
            <blockquote
              cite="https://www.facebook.com/fritesbonnel"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/fritesbonnel">Frites Bonnel</a>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActusPage;
