import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle, Trash2, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { FolderId, MemoryFolder, MemoryItem } from '../types';

interface EditPhotoModalProps {
  memory: MemoryItem | null;
  folders: MemoryFolder[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMemory: MemoryItem) => void;
  onDelete: (memoryId: string) => void;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  memory,
  folders,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [folderId, setFolderId] = useState<FolderId>('our-first-memories');
  const [category, setCategory] = useState<MemoryItem['category']>('Sweet');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (memory) {
      setTitle(memory.title);
      setCaption(memory.caption);
      setFolderId(memory.folderId);
      setCategory(memory.category);
      setDate(memory.date || '');
      setNote(memory.note || '');
      setImagePreview(memory.imageUrl);
      setError(null);
      setConfirmDelete(false);
    }
  }, [memory, isOpen]);

  if (!isOpen || !memory) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Format file tidak didukung. Mohon pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file terlalu besar (maksimal 10 MB).');
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
    if (!title.trim()) {
      setError('Judul memori tidak boleh kosong.');
      return;
    }
    if (!imagePreview) {
      setError('Foto memori tidak boleh kosong.');
      return;
    }

    onSave({
      ...memory,
      title: title.trim(),
      caption: caption.trim() || memory.caption,
      folderId,
      category,
      date: date.trim() || undefined,
      note: note.trim() || undefined,
      imageUrl: imagePreview
    });

    onClose();
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(memory.id);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Ubah Memori: ${memory.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#634B50]/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#FFF9F2] rounded-3xl p-5 md:p-7 shadow-2xl border-4 border-[#F7C9D4] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup edit memori"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#F7C9D4] text-[#634B50] flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0B8] flex items-center justify-center text-xl shadow-xs">
            ✏️
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#634B50]">Edit Kenangan</h3>
            <p className="text-xs text-[#634B50]/70">Ubah foto, pesan, atau catatan kenangan ini</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Preview & Replace */}
          <div>
            <label className="block text-xs font-bold text-[#634B50] mb-1.5">
              Foto Kenangan
            </label>
            <div className="relative border-2 border-dashed border-[#EBA7BA] hover:border-[#634B50] rounded-2xl p-3 text-center bg-white/70 transition-colors flex flex-col items-center justify-center cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                aria-label="Ganti gambar kenangan"
              />
              <div className="relative w-full max-h-48 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-100 border border-[#F7C9D4]/40">
                <img
                  src={imagePreview}
                  alt={title}
                  className="max-h-48 object-contain rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <Upload className="w-6 h-6 mb-1 text-white" />
                  <span className="text-xs font-bold">Klik untuk ganti foto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="edit-title" className="block text-xs font-bold text-[#634B50] mb-1">
              Judul Memori *
            </label>
            <input
              id="edit-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-sm text-[#634B50]"
            />
          </div>

          {/* Folder & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-folder" className="block text-xs font-bold text-[#634B50] mb-1">
                Pindah Folder
              </label>
              <select
                id="edit-folder"
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
              <label htmlFor="edit-category" className="block text-xs font-bold text-[#634B50] mb-1">
                Kategori
              </label>
              <select
                id="edit-category"
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

          {/* Caption (Pesan) */}
          <div>
            <label htmlFor="edit-caption" className="block text-xs font-bold text-[#634B50] mb-1">
              Pesan / Keterangan Foto (Caption)
            </label>
            <textarea
              id="edit-caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
            />
          </div>

          {/* Date & Secret Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-date" className="block text-xs font-bold text-[#634B50] mb-1">
                Waktu / Tanggal
              </label>
              <input
                id="edit-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              />
            </div>
            <div>
              <label htmlFor="edit-note" className="block text-xs font-bold text-[#634B50] mb-1">
                Catatan Rahasia dari Aa
              </label>
              <input
                id="edit-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Pesan kecil khusus..."
                className="w-full px-3 py-2 rounded-xl border border-[#F7C9D4] focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] bg-white text-xs text-[#634B50]"
              />
            </div>
          </div>

          {/* Bottom Actions: Delete + Cancel + Save */}
          <div className="pt-3 border-t border-[#F7C9D4]/50 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleDelete}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                confirmDelete
                  ? 'bg-red-500 text-white shadow-md animate-pulse'
                  : 'bg-white border border-red-200 text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmDelete ? 'Yakin Hapus?' : 'Hapus Foto'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white border border-[#F7C9D4] text-xs font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
