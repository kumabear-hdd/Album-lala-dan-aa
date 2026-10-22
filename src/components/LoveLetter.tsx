import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, Printer, RotateCcw, Check, BookOpen } from 'lucide-react';
import { LOVE_LETTER_CONTENT } from '../data/letter';
import { audioEngine } from '../utils/audioEngine';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    audioEngine.triggerSweetChime();

    // Trigger sweet heart confetti burst
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F7C9D4', '#EBA7BA', '#FFF0B8', '#E7DDF8']
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = [
      LOVE_LETTER_CONTENT.salutation,
      '',
      ...LOVE_LETTER_CONTENT.paragraphs,
      '',
      LOVE_LETTER_CONTENT.signOff
    ].join('\n\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className={`h-full bg-[#FFF9F2] overflow-y-auto p-4 md:p-8 flex flex-col items-center ${
      isOpen ? 'justify-start' : 'justify-center'
    } select-text`}>
      {!isOpen ? (
        /* Envelope Initial View */
        <div className="max-w-md w-full flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-white border-2 border-[#F7C9D4] paper-shadow">
          {/* Vintage Stamp and Mail Header */}
          <div className="w-full flex justify-between items-start mb-6">
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#634B50]/50 tracking-wider uppercase">
                Untuk
              </span>
              <h3 className="font-handwritten text-2xl font-bold text-[#634B50]">
                Lalaa Tersayang 💗
              </h3>
            </div>

            {/* Stamp decoration */}
            <div className="w-14 h-16 rounded-md border-2 border-dashed border-[#EBA7BA] bg-[#FFF0B8]/50 flex flex-col items-center justify-center p-1 rotate-3 shadow-sm">
              <span className="text-lg">💌</span>
              <span className="text-[9px] font-bold text-[#634B50]">SPECIAL</span>
            </div>
          </div>

          {/* Envelope SVG Graphic with Wax Seal */}
          <div className="relative w-64 h-44 my-4 group cursor-pointer" onClick={handleOpenLetter}>
            {/* Envelope body */}
            <div className="w-full h-full bg-[#FAF3EA] rounded-2xl border-2 border-[#EBA7BA] shadow-md flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105">
              {/* Envelope flap lines */}
              <div
                className="absolute inset-0 border-t-[80px] border-t-[#F7C9D4]/70 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent pointer-events-none"
              />
              <div
                className="absolute inset-0 border-b-[90px] border-b-[#FFF5EE] border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent pointer-events-none"
              />

              {/* Heart Wax Seal */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#E25B74] shadow-lg flex items-center justify-center border-2 border-white/80 animate-pulse-subtle">
                <Heart className="w-8 h-8 fill-white text-white drop-shadow-sm" />
              </div>
            </div>
          </div>

          <p className="font-handwritten text-2xl text-[#634B50] my-3">
            "Ada surat kecil dari Aa buat Lalaa..."
          </p>

          <button
            onClick={handleOpenLetter}
            aria-label="Buka Suratnya"
            className="mt-2 px-8 py-3.5 rounded-2xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#FFF0B8]" />
            <span>Buka Suratnya 💌</span>
          </button>
        </div>
      ) : (
        /* Unfolded Letter View */
        <div className="max-w-2xl w-full flex flex-col items-center">
          {/* Action Toolbar */}
          <div className="w-full flex items-center justify-between mb-4 px-2 print:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#F7C9D4] text-xs font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Lipat Surat Kembali</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#F7C9D4] text-xs font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#F7C9D4] text-xs font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Simpan / Cetak 🖨️</span>
              </button>
            </div>
          </div>

          {/* Paper Letter Document */}
          <div className="w-full bg-[#FFFDF9] rounded-3xl p-7 md:p-12 shadow-xl border-4 border-[#F7C9D4] relative paper-shadow print:border-none print:shadow-none">
            {/* Washi tape at top center */}
            <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#FFF0B8]/80 rounded shadow-sm print:hidden" />

            {/* Letter Header */}
            <div className="flex items-center justify-between border-b border-[#F7C9D4]/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EBA7BA]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#634B50]/60">
                  {LOVE_LETTER_CONTENT.dateStr}
                </span>
              </div>
              <span className="text-sm">🌸</span>
            </div>

            {/* Salutation */}
            <h2 className="font-handwritten text-3xl md:text-4xl font-bold text-[#634B50] mb-6">
              {LOVE_LETTER_CONTENT.salutation}
            </h2>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 text-[#634B50] leading-relaxed text-sm md:text-base font-medium">
              {LOVE_LETTER_CONTENT.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign Off */}
            <div className="mt-8 pt-6 border-t border-[#F7C9D4]/60 flex flex-col items-end">
              <p className="font-handwritten text-2xl md:text-3xl font-bold text-[#E25B74]">
                {LOVE_LETTER_CONTENT.signOff}
              </p>
              <span className="text-xs text-[#634B50]/50 mt-1 italic font-serif-romantic">
                "{LOVE_LETTER_CONTENT.footerQuote}"
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
