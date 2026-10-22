import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Star,
  Heart,
  Gift,
  Smile,
  Compass,
  ArrowRight,
  Eye,
  Shuffle
} from 'lucide-react';
import { MemoryItem } from '../types';
import { COMPLIMENT_MESSAGES, SECRET_STAR_NOTE } from '../data/surprises';
import { audioEngine } from '../utils/audioEngine';

interface LittleSurprisesProps {
  memories: MemoryItem[];
  onOpenRandomMemory: () => void;
  onReturnToDesktop: () => void;
}

export const LittleSurprises: React.FC<LittleSurprisesProps> = ({
  memories,
  onOpenRandomMemory,
  onReturnToDesktop
}) => {
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [stickerHeartsCount, setStickerHeartsCount] = useState(0);

  const handleNextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % COMPLIMENT_MESSAGES.length);
    audioEngine.playChimeNote(784, 0.4, 0.2);
  };

  const handleRevealSecret = () => {
    setIsSecretRevealed(!isSecretRevealed);
    audioEngine.triggerSweetChime();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFF0B8', '#F7C9D4', '#EBA7BA']
    });
  };

  const handleTapHeartSticker = (e: React.MouseEvent) => {
    setStickerHeartsCount((prev) => prev + 1);
    audioEngine.playChimeNote(1046.5, 0.3, 0.25);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x, y },
      colors: ['#E25B74', '#F7C9D4', '#EBA7BA']
    });
  };

  const currentCompliment = COMPLIMENT_MESSAGES[complimentIndex];

  return (
    <div className="h-full bg-[#FFF9F2] overflow-y-auto p-4 md:p-8 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="text-center max-w-md mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0B8] text-xs font-bold text-[#634B50] mb-2 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>Kejutan Kecil untuk Lalaa</span>
        </div>
        <h2 className="font-handwritten text-3xl md:text-4xl font-bold text-[#634B50]">
          Kotak Kejutan &amp; Doa 🎁
        </h2>
        <p className="text-xs text-[#634B50]/70 mt-1 font-medium">
          Sentuh stiker atau tombol di bawah untuk menemukan pesan-pesan manis
        </p>
      </div>

      {/* Grid of Surprises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full my-auto">
        {/* 1. Tiny Compliment Generator */}
        <div className="p-5 rounded-3xl bg-white border-2 border-[#F7C9D4] paper-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="washi-tape absolute -top-3 left-6 w-16 h-5 bg-[#FFF0B8] rounded" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{currentCompliment.emoji}</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#634B50]/60">
                Pesan Hangat Hari Ini
              </h4>
            </div>

            <p className="font-handwritten text-2xl text-[#634B50] leading-snug my-2 min-h-[64px] flex items-center">
              "{currentCompliment.text}"
            </p>
          </div>

          <button
            onClick={handleNextCompliment}
            aria-label="Ambil doa atau pesan lain"
            className="mt-3 px-4 py-2 rounded-xl bg-[#FFF0B8] hover:bg-[#FFE58F] text-[#634B50] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 self-start"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Pesan Baru ✨</span>
          </button>
        </div>

        {/* 2. Secret Star Note */}
        <div className="p-5 rounded-3xl bg-white border-2 border-[#E7DDF8] paper-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="washi-tape absolute -top-3 right-6 w-16 h-5 bg-[#E7DDF8] rounded" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#634B50]/60">
                  Bintang Rahasia
                </h4>
              </div>
              <span className="text-[10px] text-[#634B50]/50 font-medium">Klik bintang</span>
            </div>

            {isSecretRevealed ? (
              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#F7C9D4] text-xs text-[#634B50] animate-fadeIn">
                <p className="font-handwritten text-xl text-[#E25B74] font-bold mb-1">
                  {SECRET_STAR_NOTE.title}
                </p>
                <p className="font-handwritten text-lg text-[#634B50] leading-snug">
                  "{SECRET_STAR_NOTE.message}"
                </p>
              </div>
            ) : (
              <div
                onClick={handleRevealSecret}
                role="button"
                tabIndex={0}
                aria-label="Buka pesan rahasia"
                className="py-6 flex flex-col items-center justify-center cursor-pointer group bg-[#FFF9F2] rounded-2xl border border-dashed border-[#EBA7BA]/60"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF0B8] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm animate-gentle-float">
                  ⭐
                </div>
                <span className="text-xs font-bold text-[#634B50] mt-2 group-hover:text-[#E25B74]">
                  Ketuk untuk Membuka Rahasia
                </span>
              </div>
            )}
          </div>

          {isSecretRevealed && (
            <button
              onClick={() => setIsSecretRevealed(false)}
              className="mt-3 text-[11px] font-semibold text-[#634B50]/60 hover:text-[#634B50] self-start"
            >
              Sembunyikan kembali
            </button>
          )}
        </div>

        {/* 3. Random Memory Fortune */}
        <div className="p-5 rounded-3xl bg-white border-2 border-[#DCE8D5] paper-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="washi-tape absolute -top-3 left-8 w-16 h-5 bg-[#DCE8D5] rounded" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📷</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#634B50]/60">
                Random Memory
              </h4>
            </div>
            <p className="text-xs text-[#634B50]/80 leading-relaxed my-2">
              Buka satu momen secara acak dari album kenangan kita dan ingat kembali tawa hari itu.
            </p>
          </div>

          <button
            onClick={onOpenRandomMemory}
            aria-label="Buka foto acak"
            className="mt-2 px-4 py-2.5 rounded-xl bg-[#DCE8D5] hover:bg-[#C8DEC0] text-[#634B50] text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95 self-start"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Memori Acak</span>
          </button>
        </div>

        {/* 4. Heart Stickers Burst */}
        <div className="p-5 rounded-3xl bg-white border-2 border-[#F7C9D4] paper-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="washi-tape absolute -top-3 right-8 w-16 h-5 bg-[#F7C9D4] rounded" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💖</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#634B50]/60">
                Stiker Cinta ({stickerHeartsCount})
              </h4>
            </div>
            <p className="text-xs text-[#634B50]/80 leading-relaxed my-2">
              Klik stiker di bawah sebanyak mungkin untuk mengirim taburan hati ke semesta kita!
            </p>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleTapHeartSticker}
              aria-label="Kirim hati"
              className="w-11 h-11 rounded-2xl bg-[#F7C9D4] hover:bg-[#EBA7BA] flex items-center justify-center text-xl shadow-sm transition-transform active:scale-75 hover:scale-105"
            >
              💗
            </button>
            <button
              onClick={handleTapHeartSticker}
              aria-label="Kirim bunga cinta"
              className="w-11 h-11 rounded-2xl bg-[#FFF0B8] hover:bg-[#FFE58F] flex items-center justify-center text-xl shadow-sm transition-transform active:scale-75 hover:scale-105"
            >
              🌸
            </button>
            <button
              onClick={handleTapHeartSticker}
              aria-label="Kirim peluk"
              className="w-11 h-11 rounded-2xl bg-[#E7DDF8] hover:bg-[#D5C4F0] flex items-center justify-center text-xl shadow-sm transition-transform active:scale-75 hover:scale-105"
            >
              🥰
            </button>
          </div>
        </div>
      </div>

      {/* Return to Our Universe Action */}
      <div className="mt-6 flex justify-center pb-2">
        <button
          onClick={onReturnToDesktop}
          aria-label="Kembali ke Desktop"
          className="px-6 py-2.5 rounded-2xl bg-white hover:bg-[#F7C9D4]/40 border-2 border-[#F7C9D4] text-xs font-bold text-[#634B50] shadow-sm hover:shadow transition-all flex items-center gap-2"
        >
          <Compass className="w-4 h-4 text-[#EBA7BA]" />
          <span>Kembali ke Desktop Semesta Kita</span>
        </button>
      </div>
    </div>
  );
};
