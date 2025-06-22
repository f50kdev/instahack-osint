import React, { useEffect, useState } from "react";
import profileImage from "../Profile (1).png";

const WelcomePop = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('f50hack_welcome_shown')) {
      setShow(true);
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setLocation(`${data.city || ''}${data.region ? ', ' + data.region : ''}${data.country_name ? ', ' + data.country_name : ''}`);
        });
      localStorage.setItem('f50hack_welcome_shown', '1');
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-xs w-full flex flex-col items-center relative">
        <button className="absolute top-2 right-2 text-white/80 hover:text-orange-400 text-2xl" onClick={() => setShow(false)} aria-label="Fechar">×</button>
        <img src={profileImage} alt="Bem-vindo" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white/30 shadow-lg" />
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Deja bem-vindo ao <span className="text-orange-400">F50HACK</span></h2>
        <p className="text-white/80 text-center mb-4">Use com responsabilidade.</p>
        <div className="text-xs text-gray-200 text-center mt-2">
          {location ? (
            <span>🌍 Sua localização: <span className="font-semibold text-orange-300">{location}</span></span>
          ) : (
            <span>Detectando localização...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePop; 