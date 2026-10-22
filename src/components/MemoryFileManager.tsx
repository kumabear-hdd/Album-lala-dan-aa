import React, { useState, useMemo } from 'react';
import {
  Folder,
  FolderOpen,
  Search,
  Grid,
  List,
  Sparkles,
  Plus,
  ArrowLeft,
  Heart,
  Calendar,
  Layers,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { MemoryFolder, MemoryItem, FolderId } from '../types';
import { MEMORY_FOLDERS } from '../data/memories';
import { PhotoCard } from './PhotoCard';
import { PhotoLightbox } from './PhotoLightbox';
import { UploadPhotoModal } from './UploadPhotoModal';
import { EditPhotoModal } from './EditPhotoModal';
import { ResetDatabaseModal } from './ResetDatabaseModal';
import {
  filterAndSortMemories,
  pickRandomMemory,
  countMemoriesByFolder,
  SortOption,
  CategoryFilter
} from '../utils/memoryUtils';

interface MemoryFileManagerProps {
  memories: MemoryItem[];
  onToggleFavorite: (id: string) => void;
  onAddMemory: (memory: Omit<MemoryItem, 'id'>) => void;
  onUpdateMemory: (memory: MemoryItem) => void;
  onDeleteMemory: (id: string) => void;
  onResetToDefault?: () => void;
  onClearDatabase?: () => void;
}

export const MemoryFileManager: React.FC<MemoryFileManagerProps> = ({
  memories,
  onToggleFavorite,
  onAddMemory,
  onUpdateMemory,
  onDeleteMemory,
  onResetToDefault,
  onClearDatabase
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId | 'all'>('our-first-memories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<MemoryItem | null>(null);

  // Folder counts
  const folderCounts = useMemo(() => countMemoriesByFolder(memories), [memories]);

  // Current folder details
  const currentFolder = useMemo(() => {
    if (selectedFolderId === 'all') return null;
    return MEMORY_FOLDERS.find((f) => f.id === selectedFolderId) || null;
  }, [selectedFolderId]);

  // Filtered and sorted items
  const filteredMemories = useMemo(() => {
    return filterAndSortMemories(memories, {
      folderId: selectedFolderId,
      searchQuery,
      category: selectedCategory,
      sortBy,
      onlyFavorites
    });
  }, [memories, selectedFolderId, searchQuery, selectedCategory, sortBy, onlyFavorites]);

  const activeLightboxMemory = activeLightboxIndex !== null ? filteredMemories[activeLightboxIndex] : null;

  const handleOpenRandom = () => {
    const random = pickRandomMemory(filteredMemories);
    if (random) {
      const idx = filteredMemories.findIndex((m) => m.id === random.id);
      if (idx !== -1) setActiveLightboxIndex(idx);
    }
  };

  const handleNextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredMemories.length);
    }
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredMemories.length) % filteredMemories.length
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFF9F2] text-[#634B50] select-none">
      {/* Top Breadcrumb & Action Header */}
      <div className="px-4 py-3 bg-white/70 border-b border-[#F7C9D4]/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-[#634B50]/70 overflow-x-auto py-1">
          <button
            onClick={() => setSelectedFolderId('all')}
            className="hover:text-[#EBA7BA] transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Our Universe</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#634B50]/40 shrink-0" />
          <button
            onClick={() => setSelectedFolderId('all')}
            className="hover:text-[#EBA7BA] transition-colors shrink-0"
          >
            Our Memories
          </button>
          {currentFolder && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#634B50]/40 shrink-0" />
              <span className="text-[#634B50] font-bold shrink-0 bg-[#F7C9D4]/50 px-2.5 py-0.5 rounded-full">
                {currentFolder.icon} {currentFolder.name}
              </span>
            </>
          )}
        </nav>

        {/* Action Buttons: Reset Database + Random Memory + Upload Photo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsResetModalOpen(true)}
            aria-label="Reset dan kosongkan database"
            title="Pengaturan & Reset Database"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Database</span>
            <span className="sm:hidden">Reset</span>
          </button>

          <button
            onClick={handleOpenRandom}
            aria-label="Buka memori acak"
            className="px-3 py-1.5 rounded-xl bg-[#FFF0B8] hover:bg-[#FFE58F] text-[#634B50] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="hidden sm:inline">Random Memory</span>
            <span className="sm:hidden">Acak</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            aria-label="Tambah foto baru"
            className="px-3 py-1.5 rounded-xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Foto</span>
          </button>
        </div>
      </div>

      {/* Main Content Body: Sidebar + Gallery */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Folder Navigation Sidebar */}
        <div className="w-full md:w-64 bg-[#FFF6EE]/90 border-b md:border-b-0 md:border-r border-[#F7C9D4]/60 p-3 md:p-4 overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
          <div className="hidden md:flex items-center justify-between text-xs font-bold text-[#634B50]/60 uppercase tracking-wider mb-2 px-2">
            <span>Folder Kenangan</span>
            <span className="text-[10px] font-semibold">{memories.length} item</span>
          </div>

          <div className="flex md:flex-col gap-1.5 w-full overflow-x-auto pb-1 md:pb-0">
            {/* All Photos View */}
            <button
              onClick={() => setSelectedFolderId('all')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 md:shrink text-left ${
                selectedFolderId === 'all'
                  ? 'bg-white shadow-sm text-[#634B50] border-2 border-[#EBA7BA]'
                  : 'text-[#634B50]/80 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EBA7BA]" />
                <span>Semua Foto</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#634B50]/10 text-[#634B50] font-semibold">
                {memories.length}
              </span>
            </button>

            {/* Folder List */}
            {MEMORY_FOLDERS.map((f) => {
              const count = folderCounts[f.id] || 0;
              const isSelected = selectedFolderId === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolderId(f.id)}
                  style={{
                    borderLeftColor: isSelected ? f.color : 'transparent'
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 md:shrink text-left ${
                    isSelected
                      ? 'bg-white shadow-sm text-[#634B50] border-l-4 md:border-2 md:border-[#EBA7BA]'
                      : 'text-[#634B50]/80 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{f.icon}</span>
                    <span className="truncate max-w-[130px]">{f.name}</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: `${f.color}80` }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Workspace Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FFF9F2]">
          {/* Filter, Search & View Controls Bar */}
          <div className="p-3 md:p-4 bg-white/40 border-b border-[#F7C9D4]/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#634B50]/40" />
              <input
                type="text"
                placeholder="Cari kenangan, caption, atau waktu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#F7C9D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#EBA7BA] text-[#634B50]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#634B50]/40 hover:text-[#634B50]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filters: Favorites toggle + Sort + View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                aria-label="Filter favorit saja"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  onlyFavorites
                    ? 'bg-[#F7C9D4] border-[#EBA7BA] text-[#634B50] shadow-sm'
                    : 'bg-white border-[#F7C9D4] text-[#634B50]/70 hover:bg-[#F7C9D4]/20'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    onlyFavorites ? 'fill-[#EBA7BA] text-[#EBA7BA]' : ''
                  }`}
                />
                <span className="hidden sm:inline">Favorit</span>
              </button>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Urutkan kenangan"
                className="px-2.5 py-1.5 rounded-xl border border-[#F7C9D4] bg-white text-xs font-semibold text-[#634B50] focus:outline-none"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="title">Judul (A-Z)</option>
                <option value="favorites">Paling Favorit</option>
              </select>

              {/* View Switcher (Grid / List) */}
              <div className="flex items-center bg-white rounded-xl border border-[#F7C9D4] p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Tampilan grid polaroid"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#F7C9D4] text-[#634B50]'
                      : 'text-[#634B50]/60 hover:text-[#634B50]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="Tampilan list rincian"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#F7C9D4] text-[#634B50]'
                      : 'text-[#634B50]/60 hover:text-[#634B50]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Folder Description Header */}
          {currentFolder && (
            <div className="px-5 py-3 bg-white/30 border-b border-[#F7C9D4]/30 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#634B50] flex items-center gap-1.5">
                  <span>{currentFolder.icon}</span>
                  <span>{currentFolder.name}</span>
                </h3>
                <p className="text-xs text-[#634B50]/70 mt-0.5 font-medium">
                  {currentFolder.description}
                </p>
              </div>
              <div className="text-xs text-[#634B50]/60 font-bold shrink-0">
                {filteredMemories.length} Foto
              </div>
            </div>
          )}

          {/* Gallery Items Grid / List Area */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {memories.length === 0 ? (
              <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6 rounded-3xl border-2 border-dashed border-[#F7C9D4] bg-white/50 max-w-md mx-auto my-auto">
                <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-3xl mb-3 shadow-sm">
                  📂
                </div>
                <h4 className="font-bold text-base md:text-lg text-[#634B50] mb-1">
                  Database Masih Kosong
                </h4>
                <p className="text-xs text-[#634B50]/70 max-w-sm mb-4 leading-relaxed">
                  Database telah dikosongkan. Kamu bisa menambahkan foto kenangan baru bersama pasangan atau memulihkan 12 cerita kenangan awal bawaan kapan saja.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#EBA7BA] hover:bg-[#E25B74] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto Baru</span>
                  </button>
                  {onResetToDefault && (
                    <button
                      onClick={onResetToDefault}
                      className="px-4 py-2 rounded-xl bg-[#FFF0B8] hover:bg-[#FFE082] text-[#634B50] text-xs font-bold transition-all border border-[#FFE082] shadow-sm flex items-center gap-1.5 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>Pulihkan Kenangan Awal</span>
                    </button>
                  )}
                </div>
              </div>
            ) : filteredMemories.length === 0 ? (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 rounded-3xl border-2 border-dashed border-[#F7C9D4] bg-white/40">
                <div className="w-14 h-14 rounded-full bg-[#FFF0B8] flex items-center justify-center text-2xl mb-3 shadow-sm">
                  🔍
                </div>
                <h4 className="font-bold text-base text-[#634B50] mb-1">
                  Tidak Ada Kenangan yang Cocok
                </h4>
                <p className="text-xs text-[#634B50]/70 max-w-sm mb-4">
                  Coba ganti kata kunci pencarian, ubah filter folder, atau tambahkan foto baru ke album ini.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setOnlyFavorites(false);
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F7C9D4] hover:bg-[#EBA7BA] text-[#634B50] text-xs font-bold transition-all shadow-sm"
                >
                  Reset Filter
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 pb-8">
                {filteredMemories.map((memory, idx) => (
                  <PhotoCard
                    key={memory.id}
                    memory={memory}
                    onClick={() => setActiveLightboxIndex(idx)}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(memory.id);
                    }}
                    onEdit={(e, mem) => {
                      e.stopPropagation();
                      setEditingMemory(mem);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-2 pb-8">
                {filteredMemories.map((memory, idx) => (
                  <div
                    key={memory.id}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="p-3 bg-white/80 hover:bg-white rounded-2xl border border-[#F7C9D4]/60 hover:border-[#EBA7BA] shadow-sm hover:shadow transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-12 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0 border border-[#F5ECE5]">
                        <img
                          src={memory.imageUrl}
                          alt={memory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs md:text-sm text-[#634B50] group-hover:text-[#EBA7BA] transition-colors">
                          {memory.title}
                        </h4>
                        <p className="text-xs text-[#634B50]/70 line-clamp-1">
                          {memory.caption}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {memory.date && (
                        <span className="text-[11px] text-[#634B50]/60 hidden sm:inline mr-1">
                          {memory.date}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingMemory(memory);
                        }}
                        aria-label={`Ubah ${memory.title}`}
                        className="p-1.5 rounded-lg hover:bg-[#FFF0B8] text-[#634B50]/60 hover:text-[#634B50] transition-colors"
                        title="Ubah foto atau pesan"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(memory.id);
                        }}
                        aria-label={memory.isFavorite ? 'Hapus favorit' : 'Suka'}
                        className="p-1.5 rounded-full hover:bg-[#F7C9D4]/30"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            memory.isFavorite
                              ? 'fill-[#EBA7BA] text-[#EBA7BA]'
                              : 'text-[#634B50]/40'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <PhotoLightbox
        memory={activeLightboxMemory}
        onClose={() => setActiveLightboxIndex(null)}
        onPrev={filteredMemories.length > 1 ? handlePrevLightbox : undefined}
        onNext={filteredMemories.length > 1 ? handleNextLightbox : undefined}
        onToggleFavorite={onToggleFavorite}
        onEdit={(mem) => setEditingMemory(mem)}
      />

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        folders={MEMORY_FOLDERS}
        defaultFolderId={selectedFolderId === 'all' ? 'our-first-memories' : selectedFolderId}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={onAddMemory}
      />

      {/* Edit Photo Modal */}
      <EditPhotoModal
        memory={editingMemory}
        folders={MEMORY_FOLDERS}
        isOpen={editingMemory !== null}
        onClose={() => setEditingMemory(null)}
        onSave={(updated) => {
          onUpdateMemory(updated);
          setEditingMemory(null);
        }}
        onDelete={(id) => {
          onDeleteMemory(id);
          setEditingMemory(null);
          setActiveLightboxIndex(null);
        }}
      />

      {/* Reset Database Confirmation Modal */}
      <ResetDatabaseModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onClearAll={() => {
          if (onClearDatabase) onClearDatabase();
        }}
        onRestoreDefault={() => {
          if (onResetToDefault) onResetToDefault();
        }}
      />
    </div>
  );
};
