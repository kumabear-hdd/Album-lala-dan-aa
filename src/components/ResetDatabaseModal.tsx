import React from 'react';
import { AlertTriangle, Trash2, RotateCcw, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ResetDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
  onRestoreDefault: () => void;
}

export const ResetDatabaseModal: React.FC<ResetDatabaseModalProps> = ({
  isOpen,
  onClose,
  onClearAll,
  onRestoreDefault
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFDF9] rounded-3xl p-6 md:p-7 shadow-2xl border-4 border-[#F7C9D4] relative paper-shadow text-[#634B50]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Washi Tape */}
        <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#FFE082]/80 rounded shadow-xs" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup dialog reset"
          className="absolute top-4 right-4 text-[#634B50]/50 hover:text-[#634B50] p-1.5 rounded-full hover:bg-[#F7C9D4]/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h3 id="reset-modal-title" className="font-bold text-base md:text-lg text-[#634B50] leading-tight">
              Reset &amp; Kosongkan Database
            </h3>
            <p className="text-xs text-[#634B50]/70 font-medium">
              Pengaturan penyimpanan data lokal semesta kita
            </p>
          </div>
        </div>

        {/* Explanation Box */}
        <div className="p-3.5 bg-[#FFF9F2] rounded-2xl border border-[#F7C9D4] text-xs leading-relaxed mb-5">
          <p className="mb-2 text-[#634B50]/90 font-medium">
            Pilih tindakan yang ingin kamu lakukan untuk database aplikasi:
          </p>
          <ul className="space-y-1.5 text-[11px] text-[#634B50]/80 list-disc list-inside">
            <li>
              <strong>Kosongkan Database:</strong> Menghapus seluruh foto kenangan, pesan yang tersimpan, dan file lagu kustom sehingga database benar-benar bersih dan kosong.
            </li>
            <li>
              <strong>Pulihkan Default:</strong> Mengembalikan album ke 12 foto &amp; cerita kenangan awal bawaan Aa &amp; Lalaa.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClearAll();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-98 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Kosongkan Semua Data (Bersih Total)</span>
          </button>

          <button
            onClick={() => {
              onRestoreDefault();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-[#FFF0B8] hover:bg-[#FFE082] active:scale-98 text-[#634B50] font-bold text-xs md:text-sm border border-[#FFE082] shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span>Pulihkan Kenangan Awal (Default Aa &amp; Lalaa)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-[#F7C9D4]/30 text-[#634B50]/70 hover:text-[#634B50] font-bold text-xs border border-[#F7C9D4] transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
