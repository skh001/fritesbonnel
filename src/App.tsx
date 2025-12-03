import React, { useState, useEffect } from 'react';
// Imports de React Router pour la navigation et la détection de l'URL
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'; 

import { Phone, Mail, MapPin, Clock, Heart, Utensils, Calendar, Newspaper, MessageCircle, ShoppingBag, Instagram, ArrowUp } from 'lucide-react';
import AccueilPage from './pages/AccueilPage';
import CartePage from './pages/CartePage';
import EvenementsPage from './pages/EvenementsPage';
import ActusPage from './pages/ActusPage';
import ContactPage from './pages/ContactPage';
import ClickAndCollect from './pages/ClickAndCollect';
import BoutiquePage from './pages/BoutiquePage';
import MentionsLegalesPage from './pages/MentionsLegalesPage'; 
import logo from './assets/logo.png';
import { Analytics } from "@vercel/analytics/next"

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

function App() {
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Hooks de React Router
  const navigate = useNavigate(); 
  const location = useLocation(); 

  // Gère le défilement vers le haut après chaque changement d'URL
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Initialisation du SDK Facebook
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '269575157263587',
        xfbml: true,
        version: 'v23.0'
      });
      window.dispatchEvent(new Event('fbload'));
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/fr_FR/sdk.js";
       fjs.parentNode?.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Gestion du bouton de défilement vers le haut
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Tableau du menu avec les PATHS d'URL standard (minuscules, tirets)
  const menuItems = [
    { key: 'accueil', label: 'Accueil', icon: Heart, path: '/' },
    { key: 'ou-nous-trouver', label: 'Où Nous Trouver ?', icon: MessageCircle, path: '/ou-nous-trouver' },
    { key: 'carte', label: 'Notre Carte', icon: Utensils, path: '/carte' },
    { key: 'commander', label: 'Click&Collect', icon: ShoppingBag, path: '/commander' },
    { key: 'evenements', label: 'Événements / Devis', icon: Calendar, path: '/evenements' },
    { key: 'actus', label: 'Galerie', icon: Newspaper, path: '/actus' },
    { key: 'boutique', label: 'Nouveauté', icon: ShoppingBag, path: '/boutique' }
  ];

  // Le composant Header utilise NavLink et useNavigate
  const Header = () => (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate('/')} // Navigation vers la racine
          >
            <div className="w-20 h-20 bg-[#fffd67] rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo Frites Bonnel" className="object-contain w-20 h-20" />
            </div>
            <div>
              <h1 className="text-2xl font-arialnarrow7">FRITES BONNEL</h1>
              <p className="font-folks text-[#fffd67] text-sm">Bonnes & Belles</p>
            </div>
          </div>

          {/* Version desktop du menu, avec NavLink */}
          <nav className="hidden md:flex flex-wrap justify-end gap-x-6 gap-y-2">
            {menuItems.map(({ key, label, icon: Icon, path }) => (
              <NavLink
                key={key}
                to={path} // Le chemin d'URL
                className={({ isActive }) => `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-[#fffd67] text-red-600 font-semibold' : 'hover:bg-red-700 hover:text-[#fffd67]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bouton pour le menu mobile */}
          <button
            className="md:hidden bg-[#fffd67] text-red-600 p-2 rounded-md shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕ Fermer' : '☰ Menu'}
          </button>
        </div>

        {/* Menu mobile (NavLink) */}
        <div
          className={`md:hidden mt-4 flex flex-col gap-2 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {menuItems.map(({ key, label, path }) => (
            <NavLink
              key={key}
              to={path}
              onClick={() => setMobileMenuOpen(false)} // Ferme le menu après le clic
              className={({ isActive }) => `px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-[#fffd67] text-red-600 font-semibold' : 'bg-red-700 hover:bg-[#fffd67] hover:text-red-600'
              }`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-15 h-15 bg-[#fffd67] rounded-full flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo Frites Bonnel" className="object-contain w-10 h-10" />
              </div>
              <div>
                <h3 className="font-arialnarrow7 text-lg">Frites Bonnel</h3>
                <p className="font-folks text-[#fffd67] text-sm">Bonnes & Belles</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Friterie traditionnelle du Nord, créée en 2018 par Vincent Pécourt.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fffd67]">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-[#fffd67]" /><span>06 11 52 16 89</span></div>
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4 text-[#fffd67]" /><span>fritesbonnel@gmail.com</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-[#fffd67]" /><span>Angers et sa région</span></div>
              
              {/* Lien Mentions Légales avec NavLink */}
              <NavLink
                to="/mentions-legales"
                className="text-gray-300 hover:text-red-400 transition-colors block text-left pt-1"
              >
                Mentions Légales
              </NavLink>

            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fffd67]">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/fritesbonnel" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="https://www.instagram.com/frites_bonnel/?hl=fr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="mailto:fritesbonnel@gmail.com" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>© 2025 Frites Bonnel - Friterie traditionnelle du Nord - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
  
  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Header />
      <main className="flex-grow pb-32">
        {/* Définition des Routes : Le coeur du routage */}
        <Routes>
          <Route path="/" element={<AccueilPage />} />
          <Route path="/carte" element={<CartePage />} />
          <Route path="/evenements" element={<EvenementsPage />} />
          <Route path="/actus" element={<ActusPage />} />
          <Route path="/ou-nous-trouver" element={<ContactPage />} />
          <Route path="/commander" element={<ClickAndCollect />} />
          <Route path="/boutique" element={<BoutiquePage/>} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          {/* Route de secours (404) : renvoie à l'Accueil */}
          <Route path="*" element={<AccueilPage />} /> 
        </Routes>
      </main>
      <div id="fb-root"></div>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-[#fffd67] text-red-600 p-3 rounded-full shadow-lg flex items-center justify-center z-50 transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        title="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;