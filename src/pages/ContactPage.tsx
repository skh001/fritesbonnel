import React, { useEffect } from 'react';
import { Clock, MapPin, Facebook } from 'lucide-react';

const NousTrouverPage = () => {
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
      {/* Section Bannière */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Où nous trouver</h2>
          <p className="text-xl text-white">
            Retrouvez-nous à nos emplacements habituels et sur nos événements !
          </p>
        </div>
      </section>

      {/* Horaires et Emplacements */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Horaires d'ouverture */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-red-600 mb-6 flex items-center space-x-3">
              <Clock className="w-8 h-8" />
              <span>Nos Horaires</span>
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Nous sommes heureux de vous accueillir !
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Mardi</span>
                <span className="font-bold text-red-600">11h30 - 13h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Mercredi</span>
                <span className="font-bold text-red-600">11h30 - 13h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Jeudi</span>
                <span className="font-bold text-red-600">11h30 - 13h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Vendredi</span>
                <span className="font-bold text-red-600">18h30 - 21h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Samedi</span>
                <span className="font-bold text-red-600">18h30 - 21h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Dimanche</span>
                <span className="font-bold text-red-600">18h30 - 21h45</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Lundi</span>
                <span className="font-bold text-red-600">Fermé</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-[#fffd67] shadow-inner">
              <p className="text-sm text-gray-600">
                <strong>Note :</strong> Ces horaires peuvent être étendus lors d'événements spéciaux.
              </p>
            </div>
          </div>

          {/* Carte de localisation */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-red-600 mb-6 flex items-center space-x-3">
              <MapPin className="w-8 h-8" />
              <span>Notre Emplacement</span>
            </h3>
            <div className="h-64 rounded-lg mb-4">
              <iframe
                title="Carte interactive de la zone de service"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111241.69747833591!2d-0.6586616422321487!3d47.46824968858204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f10.5!3m3!1m2!1s0x480874c7e6c387b9%3A0x6b77bb24f2b1c4b7!2sAngers%2C%20France!5e0!3m2!1sen!2sus!4v1694086650500!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="w-full h-full rounded-lg border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Notre friterie est mobile ! Consultez notre page Facebook pour connaître notre emplacement du jour.
            </p>
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
            className="fb-page w-full max-w-4xl"
            data-href="https://www.facebook.com/fritesbonnel"
            data-tabs="timeline"
            data-height="1000"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
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

export default NousTrouverPage;
