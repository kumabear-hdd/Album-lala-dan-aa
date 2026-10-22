import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Info, X } from 'lucide-react';
import { BOUQUET_FLOWERS, BOUQUET_TITLE, BOUQUET_SUBTITLE } from '../data/flowers';
import { FlowerItem, FlowerType } from '../types';
import { VirtualHugModal } from './VirtualHugModal';
import { audioEngine } from '../utils/audioEngine';

export const DigitalBouquet: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerItem | null>(null);
  const [hoveredFlower, setHoveredFlower] = useState<FlowerItem | null>(null);
  const [isHugModalOpen, setIsHugModalOpen] = useState(false);

  const activeFlower = hoveredFlower || selectedFlower;

  const handleSelectFlower = (flower: FlowerItem) => {
    setSelectedFlower(flower);
    audioEngine.playChimeNote(880, 0.4, 0.2);
  };

  const handleTriggerHug = () => {
    setIsHugModalOpen(true);
    audioEngine.triggerSweetChime();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F7C9D4', '#EBA7BA', '#FFF0B8', '#DCE8D5']
    });
  };

  return (
    <div className="h-full bg-[#FFF9F2] overflow-y-auto p-4 md:p-6 flex flex-col items-center justify-between select-none relative">
      {/* Background Floating Petals Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <span className="absolute top-10 left-8 text-2xl animate-gentle-float">🌸</span>
        <span className="absolute top-24 right-12 text-xl animate-gentle-float" style={{ animationDelay: '1.5s' }}>🍃</span>
        <span className="absolute bottom-20 left-16 text-lg animate-gentle-float" style={{ animationDelay: '2.5s' }}>✨</span>
        <span className="absolute bottom-32 right-16 text-xl animate-gentle-float" style={{ animationDelay: '0.8s' }}>🌸</span>
      </div>

      {/* Header Titles */}
      <div className="text-center max-w-lg mb-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7C9D4]/60 text-xs font-bold text-[#634B50] mb-2 shadow-sm">
          <span>💐 Buket Bunga Interaktif</span>
        </div>
        <h2 className="font-handwritten text-3xl md:text-4xl font-bold text-[#634B50]">
          {BOUQUET_TITLE}
        </h2>
        <p className="text-xs md:text-sm text-[#634B50]/75 mt-1 font-medium">
          {BOUQUET_SUBTITLE}
        </p>
        <p className="text-[11px] text-[#634B50]/50 italic mt-0.5">
          Sentuh atau arahkan kursor ke tiap bunga untuk membaca artinya 💗
        </p>
      </div>

      {/* Main Bouquet SVG Container */}
      <div className="relative w-full max-w-xs md:max-w-sm h-64 md:h-72 flex items-center justify-center my-0.5 shrink-0">
        <svg
          viewBox="0 0 500 550"
          className="w-full h-full drop-shadow-xl overflow-visible"
        >
          <defs>
            <linearGradient id="kraftWrap" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5ECE5" />
              <stop offset="100%" stopColor="#E6D5C7" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F7C9D4" />
              <stop offset="100%" stopColor="#EBA7BA" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#EBA7BA" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Stems & Leaves Layer */}
          <g stroke="#8BA888" strokeWidth="4" strokeLinecap="round" fill="none">
            {/* Rose Stem */}
            <path d="M 180 230 Q 210 320 250 430" />
            {/* Sunflower Stem */}
            <path d="M 290 170 Q 270 300 250 430" strokeWidth="5" />
            {/* Tulip Stem */}
            <path d="M 370 230 Q 320 330 250 430" />
            {/* Daisy Stem */}
            <path d="M 230 250 Q 240 340 250 430" />
            {/* Lily Stem */}
            <path d="M 140 260 Q 200 350 250 430" />
            {/* Baby's Breath Stems */}
            <path d="M 320 270 Q 290 350 250 430" strokeDasharray="3 3" />
          </g>

          {/* Botanical Leaves */}
          <g fill="#A3C2A0" opacity="0.85">
            <ellipse cx="205" cy="300" rx="20" ry="8" transform="rotate(-35 205 300)" />
            <ellipse cx="285" cy="310" rx="22" ry="9" transform="rotate(25 285 310)" />
            <ellipse cx="170" cy="330" rx="18" ry="7" transform="rotate(-40 170 330)" />
            <ellipse cx="320" cy="340" rx="20" ry="8" transform="rotate(30 320 340)" />
          </g>

          {/* Wrapping Paper Background Cone */}
          <path
            d="M 140 370 L 250 510 L 360 370 C 330 395 170 395 140 370 Z"
            fill="url(#kraftWrap)"
            stroke="#D4C0AF"
            strokeWidth="2"
          />
          {/* Wrapping Paper Fold Accents */}
          <path
            d="M 120 340 Q 250 380 380 340 L 310 470 L 190 470 Z"
            fill="#EADACF"
            opacity="0.9"
          />

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 1. ROSE                         */}
          {/* ============================================================== */}
          <g
            id="flower-rose"
            tabIndex={0}
            role="button"
            aria-label="Bunga Mawar"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[175px_170px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[0])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[0])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="175" cy="170" r="38" fill="transparent" />
            {/* Petals */}
            <g filter={activeFlower?.id === 'rose' ? 'url(#glowEffect)' : undefined}>
              <circle cx="175" cy="170" r="28" fill="#E25B74" />
              <path d="M 160 160 C 160 148 190 148 190 160 C 190 172 160 172 160 160 Z" fill="#F27D95" />
              <path d="M 152 170 C 152 185 180 185 188 170 C 188 158 152 158 152 170 Z" fill="#D64560" />
              <path d="M 168 165 C 168 158 182 158 182 165 C 182 172 168 172 168 165 Z" fill="#FFA5B8" />
              <circle cx="175" cy="166" r="5" fill="#FFE5EC" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 2. SUNFLOWER                    */}
          {/* ============================================================== */}
          <g
            id="flower-sunflower"
            tabIndex={0}
            role="button"
            aria-label="Bunga Matahari"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[285px_140px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[3])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[3])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="285" cy="140" r="48" fill="transparent" />
            <g filter={activeFlower?.id === 'sunflower' ? 'url(#glowEffect)' : undefined}>
              {/* Petals radiating around */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <ellipse
                  key={deg}
                  cx="285"
                  cy="140"
                  rx="9"
                  ry="30"
                  fill="#FFB800"
                  transform={`rotate(${deg} 285 140)`}
                />
              ))}
              {/* Inner Petal Ring */}
              {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
                <ellipse
                  key={`in-${deg}`}
                  cx="285"
                  cy="140"
                  rx="7"
                  ry="24"
                  fill="#FFC72C"
                  transform={`rotate(${deg} 285 140)`}
                />
              ))}
              {/* Seed Center */}
              <circle cx="285" cy="140" r="17" fill="#6B4B3E" />
              <circle cx="285" cy="140" r="12" fill="#543A2F" stroke="#875E4B" strokeWidth="1.5" strokeDasharray="2 2" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 3. TULIP                        */}
          {/* ============================================================== */}
          <g
            id="flower-tulip"
            tabIndex={0}
            role="button"
            aria-label="Bunga Tulip"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[365px_190px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[1])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[1])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="365" cy="190" r="36" fill="transparent" />
            <g filter={activeFlower?.id === 'tulip' ? 'url(#glowEffect)' : undefined}>
              <path
                d="M 345 210 C 335 170 355 155 365 170 C 375 155 395 170 385 210 C 375 225 355 225 345 210 Z"
                fill="#F78DA7"
              />
              <path
                d="M 353 210 C 347 180 365 165 365 185 C 365 165 383 180 377 210 Z"
                fill="#FFAAC1"
              />
              <path
                d="M 360 215 C 358 195 372 195 370 215 Z"
                fill="#FFE0E9"
              />
            </g>
          </g>

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 4. DAISY                        */}
          {/* ============================================================== */}
          <g
            id="flower-daisy"
            tabIndex={0}
            role="button"
            aria-label="Bunga Daisy"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[230px_230px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[2])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[2])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="230" cy="230" r="36" fill="transparent" />
            <g filter={activeFlower?.id === 'daisy' ? 'url(#glowEffect)' : undefined}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse
                  key={deg}
                  cx="230"
                  cy="230"
                  rx="6"
                  ry="22"
                  fill="#FFFFFF"
                  stroke="#E8ECE9"
                  strokeWidth="1"
                  transform={`rotate(${deg} 230 230)`}
                />
              ))}
              <circle cx="230" cy="230" r="10" fill="#FFC72C" stroke="#FFA000" strokeWidth="1" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 5. LILY                         */}
          {/* ============================================================== */}
          <g
            id="flower-lily"
            tabIndex={0}
            role="button"
            aria-label="Bunga Lily"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[135px_240px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[5])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[5])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="135" cy="240" r="36" fill="transparent" />
            <g filter={activeFlower?.id === 'lily' ? 'url(#glowEffect)' : undefined}>
              <path
                d="M 135 240 Q 100 200 115 190 Q 135 220 135 240 Z"
                fill="#FDFBF7"
                stroke="#E2DCD2"
                strokeWidth="1.2"
              />
              <path
                d="M 135 240 Q 135 180 145 180 Q 145 220 135 240 Z"
                fill="#FFFFFF"
                stroke="#E2DCD2"
                strokeWidth="1.2"
              />
              <path
                d="M 135 240 Q 170 200 155 190 Q 135 220 135 240 Z"
                fill="#FAF7EE"
                stroke="#E2DCD2"
                strokeWidth="1.2"
              />
              <circle cx="135" cy="235" r="4" fill="#E8D288" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* INDIVIDUAL INTERACTIVE FLOWER: 6. BABY'S BREATH               */}
          {/* ============================================================== */}
          <g
            id="flower-babys-breath"
            tabIndex={0}
            role="button"
            aria-label="Bunga Baby's Breath"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none origin-[330px_250px]"
            onClick={() => handleSelectFlower(BOUQUET_FLOWERS[4])}
            onMouseEnter={() => setHoveredFlower(BOUQUET_FLOWERS[4])}
            onMouseLeave={() => setHoveredFlower(null)}
          >
            <circle cx="330" cy="250" r="34" fill="transparent" />
            <g filter={activeFlower?.id === 'babys_breath' ? 'url(#glowEffect)' : undefined}>
              <circle cx="320" cy="240" r="6" fill="#FFFFFF" stroke="#DCE8D5" strokeWidth="1" />
              <circle cx="335" cy="235" r="5" fill="#FFFFFF" stroke="#DCE8D5" strokeWidth="1" />
              <circle cx="345" cy="248" r="6" fill="#FFFFFF" stroke="#DCE8D5" strokeWidth="1" />
              <circle cx="328" cy="260" r="5" fill="#FFFFFF" stroke="#DCE8D5" strokeWidth="1" />
              <circle cx="315" cy="255" r="4" fill="#FFFFFF" stroke="#DCE8D5" strokeWidth="1" />
              <circle cx="338" cy="252" r="2.5" fill="#FFF0B8" />
            </g>
          </g>

          {/* Front Wrapping Paper Overlap */}
          <path
            d="M 150 400 L 250 510 L 350 400 Q 250 430 150 400 Z"
            fill="url(#kraftWrap)"
            stroke="#D4C0AF"
            strokeWidth="2"
          />

          {/* Ribbon Bow Banner */}
          <g>
            {/* Ribbon Loop Left */}
            <path d="M 250 440 C 200 420 180 460 250 450 Z" fill="url(#ribbonGrad)" />
            {/* Ribbon Loop Right */}
            <path d="M 250 440 C 300 420 320 460 250 450 Z" fill="url(#ribbonGrad)" />
            {/* Ribbon Tails */}
            <path d="M 245 448 L 225 485 L 240 480 L 248 450 Z" fill="#EBA7BA" />
            <path d="M 255 448 L 275 485 L 260 480 L 252 450 Z" fill="#EBA7BA" />
            {/* Center Knot */}
            <ellipse cx="250" cy="445" rx="14" ry="10" fill="#E25B74" />
          </g>

          {/* Ribbon Tag / Label */}
          <rect x="155" y="492" width="190" height="26" rx="13" fill="#FFF9F2" stroke="#EBA7BA" strokeWidth="1.5" />
          <text
            x="250"
            y="509"
            fontFamily="'Nunito', sans-serif"
            fontWeight="800"
            fontSize="11"
            fill="#634B50"
            textAnchor="middle"
          >
            A Little Bouquet for Lalaa 🎀
          </text>
        </svg>
      </div>

      {/* Flower Details & Symbolic Meaning Card (Interactive Tooltip / Panel) */}
      <div className="w-full max-w-lg min-h-[105px] mt-2 relative z-10">
        {activeFlower ? (
          <div className="p-4 rounded-2xl bg-white border-2 border-[#F7C9D4] shadow-md animate-fadeIn flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: activeFlower.hexColor }}
                />
                <h4 className="font-bold text-sm text-[#634B50]">
                  {activeFlower.name}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-[#EBA7BA] bg-[#F7C9D4]/30 px-2 py-0.5 rounded-full">
                {activeFlower.symbolism}
              </span>
            </div>

            <p className="font-handwritten text-lg text-[#634B50] leading-snug">
              "{activeFlower.message}"
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white/70 border border-dashed border-[#F7C9D4] text-center flex items-center justify-center gap-2 text-xs text-[#634B50]/70">
            <Info className="w-4 h-4 text-[#EBA7BA]" />
            <span>Pilih salah satu bunga di buket untuk membaca pesan tersiratnya ✨</span>
          </div>
        )}
      </div>

      {/* Bottom Action: Kirim Peluk Virtual */}
      <div className="mt-3 flex items-center justify-center relative z-10 pb-1">
        <button
          onClick={handleTriggerHug}
          aria-label="Kirim Peluk Virtual"
          className="px-6 py-3 rounded-2xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white font-bold text-xs md:text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-2 active:scale-95 transform hover:-translate-y-0.5"
        >
          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          <span>Kirim Peluk Virtual 💗</span>
        </button>
      </div>

      {/* Virtual Hug Modal */}
      <VirtualHugModal
        isOpen={isHugModalOpen}
        onClose={() => setIsHugModalOpen(false)}
      />
    </div>
  );
};
