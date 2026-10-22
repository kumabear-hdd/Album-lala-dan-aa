import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle, Info } from 'lucide-react';
import { FolderId, MemoryFolder, MemoryItem } from '../types';

interface UploadPhotoModalProps {
  folders: MemoryFolder[];
  defaultFolderId: FolderId;
  isOpen: boolean;
  onClose: () => void;
  onSave: (memory: Omit<MemoryItem, 'id'>) => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  folders,
  defaultFolderId,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [folderId, setFolderId] = useState<FolderId>(defaultFolderId);
  const [category, setCategory] = useState<MemoryItem['category']>('Sweet');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Format file tidak didukung. Mohon pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Ukuran file terlalu besar (maksimal 8 MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.onerror = () => {
      setError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setError('Silakan pilih foto terlebih dahulu.');
      return;
    }
    if (!title.trim()) {
      setError('Judul memori tidak boleh kosong.');
      return;
    }

    onSave({
      folderId,
      title: title.trim(),
      caption: caption.trim() || 'Kenangan manis yang ingin disimpan.',
      date: date.trim() || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      imageUrl: imagePreview,
      category,
      note: note.trim() || undefined,
      isFavorite: false,
      tapeColor: '#FFF0B8'
    });

    // Reset and close
    setTitle('');
    setCaption('');
    setDate('');
    setNote('');
    setImagePreview(null);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tambah Foto Memori Baru"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#634B50]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#FFF9F2] rounded-3xl p-5 md:p-7 shadow-2xl border-4 border-[#F7C9D4] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup form"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#F7C9D4] text-[#634B50] flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#F7C9D4] flex items-center justify-center text-xl">
            📸
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#634B50]">Tambah Foto Memori</h3>
            <p className="text-xs text-[#634B50]/70">Simpan momen indah baru ke dalam semesta kita</p>
          </div>
        </div>

        {/* Informative Note About Local Storage Persistence */}
        <div className="mb-4 p-3 rounded-2xl bg-[#E7DDF8]/40 border border-[#E7DDF8] text-xs text-[#634B50] flex items-start gap-2">
          <Info className="w-4 h-4 text-[#EBA7BA] shrink-0 mt-0.5" />
          <span>
            Foto yang kamu tambahkan di sini tersimpan di browser perangkat ini. Untuk menambahkan foto permanen ke aplikasi, file bisa ditaruh di folder <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono">public/photos/</code>.
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-[#634B50] mb-1.5">
              Pilih Foto
            </label>
            <div className="relative border-2 border-dashed border-[#EBA7BA] hover:border-[#634B50] rounded-2xl p-4 text-center bg-white/70 transition-colors flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                aria-label="Unggah berkas gambar"
              />
              {imagePreview ? (
                <div className="relative w-full max-h-48 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-100">
                  <img
                    src={imagePreview}
                    alt="Pratinjau foto yang dipilih"
                    className="max-h-48 object-contain rounded-xl"
                  />
                  <span className="absolute bottom-2 bg-white/90 text-[#634B50] text-[11px] font-bold px-2 py-0.5 rounded-full shadow">
                    Klik untuk ganti foto
                  </span>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <Upload className="w-8 h-8 text-[#EBA7BA] mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-[#634B50]">
                    Pilih foto dari perangkatmu
                  </span>
                  <span className="text-[11px] text-[#634B50]/60 mt-0.5">
                    Mendukung JPG, PNG, atau WebP
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="photo-title" className="block text-xs font-bold text-[#634B50] mb-1">
              Judul Memori *
            </label>
            <input
              id="photo-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Kencan Minggu Sore"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-sm text-[#634B50]"
            />
          </div>

          {/* Folder & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="folder-select" className="block text-xs font-bold text-[#634B50] mb-1">
                Pilih Folder
              </label>
              <select
                id="folder-select"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value as FolderId)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              >
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.icon} {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category-select" className="block text-xs font-bold text-[#634B50] mb-1">
                Kategori
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryItem['category'])}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              >
                <option value="First Dates">First Dates</option>
                <option value="Silly">Silly Moments</option>
                <option value="Traveling">Traveling / Jalan-jalan</option>
                <option value="Chats">Screenshots & Chats</option>
                <option value="Sweet">Sweet Moments</option>
                <option value="Special">Special For Lalaa</option>
              </select>
            </div>
          </div>

          {/* Caption */}
          <div>
            <label htmlFor="photo-caption" className="block text-xs font-bold text-[#634B50] mb-1">
              Keterangan Foto (Caption)
            </label>
            <textarea
              id="photo-caption"
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ceritakan sedikit tentang momen ini..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
            />
          </div>

          {/* Date & Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="photo-date" className="block text-xs font-bold text-[#634B50] mb-1">
                Waktu / Tanggal
              </label>
              <input
                id="photo-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Contoh: Sore Berangin"
                className="w-full px-3 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              />
            </div>
            <div>
              <label htmlFor="photo-note" className="block text-xs font-bold text-[#634B50] mb-1">
                Catatan Kecil Rahasia (Opsional)
              </label>
              <input
                id="photo-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Pesan kecil dari hati..."
                className="w-full px-3 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#F7C9D4] text-xs font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              Simpan ke Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
