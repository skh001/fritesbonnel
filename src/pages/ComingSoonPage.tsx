import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Mail } from 'lucide-react';

const ComingSoonPage = () => {
  const targetDate = new Date('2025-10-31T23:59:59'); // Remplacez par la date de lancement de la boutique !

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timerEnded, setTimerEnded] = useState(false); 

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setTimerEnded(true); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Message pré-rempli dans l'e-mail
  const emailBody = encodeURIComponent("Bonjour Frites Bonnel, je souhaite être prévenu par e-mail dès le lancement de votre boutique. Merci d'avance !");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer bg-gray-100 p-8 text-center">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center space-y-6">
        <ShoppingBag className="w-16 h-16 text-red-600 animate-bounce" />
        <h1 className="text-4xl font-semibold text-red-600">Boutique Frites Bonnel</h1>
        <p className="text-xl font-semibold text-gray-800">
          Arrive très bientôt !
        </p>

        {timerEnded ? ( 
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full" role="alert">
            <p className="font-bold">C'est le grand jour !</p>
            <p>La boutique est maintenant disponible. <a href="/boutique" className="underline font-bold hover:text-green-800">Cliquez ici pour y accéder !</a></p>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center space-x-4 font-bold text-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl text-[#ff0000]">{timeRemaining.days}</span>
                <span className="text-xs sm:text-sm">JOURS</span>
              </div>
              <span className="text-3xl">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl text-[#ff0000]">{timeRemaining.hours}</span>
                <span className="text-xs sm:text-sm">HEURES</span>
              </div>
              <span className="text-3xl">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl text-[#ff0000]">{timeRemaining.minutes}</span>
                <span className="text-xs sm:text-sm">MIN</span>
              </div>
              <span className="text-3xl">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl text-[#ff0000]">{timeRemaining.seconds}</span>
                <span className="text-xs sm:text-sm">SEC</span>
              </div>
            </div>
            
            <a 
                href={`mailto:fritesbonnel@gmail.com?subject=Prévenez-moi du lancement de la boutique Frites Bonnel&body=${emailBody}`}
                className="mt-6 w-full sm:w-auto px-6 py-2 bg-red-600 text-[#fffd67] font-semibold rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
                <Mail size={20} />
                <span>Prévenez-moi</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ComingSoonPage;