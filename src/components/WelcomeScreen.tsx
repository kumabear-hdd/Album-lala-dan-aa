import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, BookOpen, Stars } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenUniverse = () => {
    setIsOpening(true);
    audioEngine.triggerSweetChime();

    // Trigger romantic confetti burst
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F7C9D4', '#EBA7BA', '#FFF0B8', '#E7DDF8', '#DCE8D5']
    });

    // Gentle transition timeout
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFF9F2] overflow-hidden transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Doodled Floral & Star Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
        <span className="absolute top-12 left-16 text-3xl animate-gentle-float">🌸</span>
        <span className="absolute top-20 right-20 text-3xl animate-gentle-float" style={{ animationDelay: '1s' }}>✨</span>
        <span className="absolute bottom-20 left-24 text-2xl animate-gentle-float" style={{ animationDelay: '2s' }}>🎀</span>
        <span className="absolute bottom-16 right-24 text-4xl animate-gentle-float" style={{ animationDelay: '1.5s' }}>💌</span>
        <span className="absolute top-1/2 left-8 text-2xl animate-gentle-float" style={{ animationDelay: '2.5s' }}>⭐</span>
        <span className="absolute top-1/3 right-10 text-2xl animate-gentle-float" style={{ animationDelay: '3s' }}>🌻</span>
      </div>

      {/* Scrapbook Album Cover Book */}
      <div className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-[#F7C9D4] paper-shadow flex flex-col items-center text-center">
        {/* Washi Tape at corners */}
        <div className="washi-tape absolute -top-3 left-10 w-24 h-6 bg-[#FFF0B8] rounded rotate-[-3deg] shadow-sm" />
        <div className="washi-tape absolute -top-3 right-10 w-24 h-6 bg-[#E7DDF8] rounded rotate-[4deg] shadow-sm" />

        {/* Vintage Stamp / Badge */}
        <div className="absolute top-6 right-6 w-14 h-16 rounded-md border-2 border-dashed border-[#EBA7BA] bg-[#FFF0B8]/40 flex flex-col items-center justify-center p-1 rotate-6 shadow-sm hidden sm:flex">
          <span className="text-xl">🪐</span>
          <span className="text-[8px] font-extrabold text-[#634B50] uppercase">SPECIAL</span>
        </div>

        {/* Illustrated Polaroid on Book Cover */}
        <div className="relative w-44 md:w-52 aspect-square bg-white p-3 pb-6 rounded-2xl polaroid-shadow border border-[#EBA7BA]/30 rotate-[-2deg] my-2 transition-transform hover:rotate-0">
          <div className="washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#F7C9D4] rounded" />
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#F7C9D4] via-[#FFF0B8] to-[#E7DDF8] flex flex-col items-center justify-center p-3 text-center">
            <span className="text-4xl mb-1">💑</span>
            <span className="font-handwritten text-xl font-bold text-[#634B50]">
              Aa &amp; Lalaa
            </span>
            <span className="text-[9px] font-bold text-[#634B50]/60 uppercase tracking-widest mt-0.5">
              Forever Memories
            </span>
          </div>
        </div>

        {/* Title & Subtitles */}
        <div className="mt-4 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E7DDF8] text-[#634B50] mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#EBA7BA]" />
            Dunia Kecil Khusus Untukmu
          </span>

          <h1 className="font-serif-romantic text-3xl md:text-5xl font-bold text-[#634B50] tracking-tight">
            Our Little Universe
          </h1>

          <h2 className="font-handwritten text-2xl md:text-3xl font-bold text-[#E25B74] mt-1">
            Aa &amp; Lalaa
          </h2>

          <p className="font-handwritten text-xl md:text-2xl text-[#634B50]/80 mt-2">
            "Satu dunia kecil, berisi cerita kita."
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleOpenUniverse}
          aria-label="Buka Dunia Kita"
          className="px-8 py-4 rounded-2xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 active:translate-y-0 group cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          <span>Buka Dunia Kita 💗</span>
          <Sparkles className="w-4 h-4 text-[#FFF0B8] group-hover:rotate-12 transition-transform" />
        </button>

        <p className="text-[11px] text-[#634B50]/50 mt-4 font-medium">
          Dibuat dengan cinta, doa, dan kenangan indah untuk wanita hebatnya Aa.
        </p>
      </div>
    </div>
  );
};
