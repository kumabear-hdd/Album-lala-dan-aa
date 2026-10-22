import React from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { VIRTUAL_HUG_MESSAGE } from '../data/flowers';

interface VirtualHugModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualHugModal: React.FC<VirtualHugModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Peluk Virtual dari Aa"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#634B50]/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-white rounded-3xl p-6 md:p-8 text-center shadow-2xl border-4 border-[#F7C9D4] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup peluk virtual"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF9F2] hover:bg-[#F7C9D4] text-[#634B50] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Hug Avatar / Hearts */}
        <div className="relative my-3">
          <div className="w-20 h-20 rounded-full bg-[#F7C9D4] flex items-center justify-center text-4xl shadow-md animate-gentle-float">
            🫂
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#E25B74] flex items-center justify-center shadow">
            <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          </div>
        </div>

        <h3 className="font-handwritten text-3xl font-bold text-[#634B50] mt-2 mb-1">
          Peluk Hangat dari Aa 💗
        </h3>

        <p className="text-xs md:text-sm text-[#634B50]/80 leading-relaxed my-3 bg-[#FFF9F2] p-4 rounded-2xl border border-[#F7C9D4]/60">
          "{VIRTUAL_HUG_MESSAGE}"
        </p>

        <p className="text-[11px] text-[#634B50]/60 italic font-medium mb-4">
          Tarik napas panjang, tersenyum sedikit... Aa selalu bangga sama Lalaa.
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-2xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFF0B8]" />
          <span>Terima Peluknya 🥰</span>
        </button>
      </div>
    </div>
  );
};
