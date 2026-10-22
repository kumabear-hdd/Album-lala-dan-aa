import React, { useEffect } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Calendar, Tag, BookOpen, Pencil } from 'lucide-react';
import { MemoryItem } from '../types';

interface PhotoLightboxProps {
  memory: MemoryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onToggleFavorite: (id: string) => void;
  onEdit?: (memory: MemoryItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  memory,
  onClose,
  onPrev,
  onNext,
  onToggleFavorite,
  onEdit
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!memory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#634B50]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#FFF9F2] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F7C9D4] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup foto"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#634B50] hover:bg-[#F7C9D4] transition-colors flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Area */}
        <div className="relative flex-1 bg-[#F5ECE5] flex items-center justify-center p-4 min-h-[260px] md:min-h-[420px] select-none">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-md border-2 border-white"
          />

          {/* Previous / Next Navigation Buttons */}
          {onPrev && (
            <button
              onClick={onPrev}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#634B50] flex items-center justify-center shadow-md transition-all hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#634B50] flex items-center justify-center shadow-md transition-all hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Memory Details / Story Card */}
        <div className="w-full md:w-80 p-5 md:p-6 flex flex-col justify-between overflow-y-auto bg-[#FFF9F2] border-t md:border-t-0 md:border-l border-[#F7C9D4]/60">
          <div>
            <div className="flex items-center justify-between mb-3 pr-8 flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E7DDF8] text-[#634B50]">
                <Tag className="w-3 h-3 text-[#EBA7BA]" />
                {memory.category}
              </span>

              <div className="flex items-center gap-1.5">
                {onEdit && (
                  <button
                    onClick={() => onEdit(memory)}
                    aria-label={`Ubah isi memori ${memory.title}`}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#FFF0B8] border border-[#F7C9D4] text-[#634B50] transition-colors"
                  >
                    <Pencil className="w-3 h-3 text-[#EBA7BA]" />
                    <span>Ubah</span>
                  </button>
                )}

                <button
                  onClick={() => onToggleFavorite(memory.id)}
                  aria-label={memory.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    memory.isFavorite
                      ? 'bg-[#F7C9D4] text-[#634B50]'
                      : 'bg-white hover:bg-[#F7C9D4]/40 text-[#634B50]/70'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      memory.isFavorite ? 'fill-[#EBA7BA] text-[#EBA7BA]' : ''
                    }`}
                  />
                  {memory.isFavorite ? 'Favorit' : 'Suka'}
                </button>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#634B50] font-rounded mb-2">
              {memory.title}
            </h3>

            {memory.date && (
              <div className="flex items-center gap-1.5 text-xs text-[#634B50]/70 mb-3 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#EBA7BA]" />
                {memory.date}
              </div>
            )}

            <p className="text-sm text-[#634B50]/90 leading-relaxed mb-4 bg-white/70 p-3 rounded-xl border border-[#F7C9D4]/50">
              "{memory.caption}"
            </p>

            {memory.note && (
              <div className="p-3.5 rounded-2xl bg-[#FFF0B8]/40 border border-[#FFF0B8] text-xs text-[#634B50] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-[#634B50]">
                  <BookOpen className="w-3.5 h-3.5 text-[#EBA7BA]" />
                  Catatan dari Aa:
                </div>
                <p className="font-handwritten text-lg leading-snug text-[#634B50]">
                  {memory.note}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[#F7C9D4]/40 text-center">
            <span className="text-[11px] text-[#634B50]/60 font-medium">
              Gunakan panah keyboard (← / →) untuk navigasi • Tekan Esc untuk menutup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
