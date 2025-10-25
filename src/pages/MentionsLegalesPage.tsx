import React from 'react';

const MentionsLegalesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold text-red-600 mb-8 border-b pb-4">
        Mentions Légales – Frites Bonnel S.A.R.L VHelp
      </h1>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
        1. Éditeur du site
      </h2>
      <div className="space-y-2 text-gray-700 ml-4 border-l-4 border-yellow-300 pl-4 py-1">
        <p>
          <strong>Nom commercial :</strong> Frites Bonnel
        </p>
        <p>
          <strong>Forme juridique :</strong> S.A.R.L VHelp
        </p>
        <p>
          <strong>Siège social :</strong> 11 Rue Denis Papin, 49070 Saint-Lambert-la-Potherie, France
        </p>
        <p>
          <strong>Téléphone :</strong> 06 11 52 16 89
        </p>
        <p>
          <strong>Email :</strong> fritesbonnel@gmail.com
        </p>
        <p>
          <strong>SIRET :</strong> 838 199 362 00016 – <strong>RCS :</strong> Angers
        </p>
        <p>
          <strong>Gérant :</strong> Vincent Pécourt
        </p>
        <p>
          <strong>Responsable de la publication :</strong> Sofiane Khenchelaoui
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
        2. Hébergement du site
      </h2>
      <div className="text-gray-700 ml-4 border-l-4 border-red-300 pl-4 py-1">
        <p>
          Le site est hébergé gratuitement par :
        </p>
        <p className="mt-2 text-lg font-mono bg-gray-100 inline-block px-2 py-1 rounded">
          GitHub, Inc.
        </p>
        <p>
          88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis
        </p>
        <p>
          Lien : <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">https://github.com</a>
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
        3. Nature du site
      </h2>
      <p className="text-gray-700 ml-4 pl-4 border-l-4 border-yellow-300 py-1">
        Le présent site est un site vitrine destiné à présenter l’activité du food truck Frites Bonnel.
        <br />
        <strong className='text-red-600'>Important :</strong> Bien qu'un système de réservation soit présent, aucune donnée personnelle sensible n’est stockée à long terme. Aucune fonction de paiement en ligne direct (carte bancaire) n’est proposée.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
        4. Propriété intellectuelle
      </h2>
      <p className="text-gray-700 ml-4 pl-4 border-l-4 border-red-300 py-1">
        L’ensemble du contenu du site (textes, photos, logo, graphismes, etc.) est la propriété exclusive de Frites Bonnel, sauf mention contraire.
        <br />
        Toute reproduction ou diffusion sans autorisation est strictement interdite.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
        5. Responsabilité
      </h2>
      <p className="text-gray-700 ml-4 pl-4 border-l-4 border-yellow-300 py-1">
        Frites Bonnel s’efforce d’assurer l’exactitude des informations diffusées, mais ne peut être tenue responsable d’éventuelles erreurs ou interruptions du service.
        <br />
        L’utilisation du site se fait sous la seule responsabilité de l’utilisateur.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
        6. Contact
      </h2>
      <p className="text-gray-700 ml-4 pl-4 border-l-4 border-red-300 py-1">
        Pour toute question relative au site ou à son contenu, vous pouvez nous contacter à :
        <br />
        <strong className="text-red-600">📧 fritesbonnel@gmail.com</strong>
      </p>
    </div>
  );
};

export default MentionsLegalesPage;
