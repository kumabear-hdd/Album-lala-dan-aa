import React from 'react';
import { Heart, Calendar, Pencil } from 'lucide-react';
import { MemoryItem } from '../types';

interface PhotoCardProps {
  memory: MemoryItem;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onEdit: (e: React.MouseEvent, memory: MemoryItem) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  memory,
  onClick,
  onToggleFavorite,
  onEdit
}) => {
  const rotation = memory.rotation || 0;
  const tapeColor = memory.tapeColor || '#FFF0B8';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Lihat memori: ${memory.title}`}
      style={{
        transform: `rotate(${rotation}deg)`
      }}
      className="group relative bg-white p-3 pb-5 rounded-2xl polaroid-shadow transition-all duration-300 hover:rotate-0 hover:scale-[1.03] hover:z-20 cursor-pointer flex flex-col border border-[#EBA7BA]/20 hover:border-[#EBA7BA]/60"
    >
      {/* Washi Tape Accent */}
      <div
        className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm z-10 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: tapeColor,
          transform: `rotate(${-rotation * 0.8}deg)`
        }}
      />

      {/* Image Container with Polaroid border */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FAF6F0] mb-3 border border-[#F5ECE5]">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Edit Button */}
        <button
          onClick={(e) => onEdit(e, memory)}
          aria-label={`Ubah memori ${memory.title}`}
          title="Ubah foto atau pesan"
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-[#634B50] flex items-center justify-center shadow-sm backdrop-blur-sm transition-transform active:scale-90 z-10"
        >
          <Pencil className="w-3.5 h-3.5 text-[#634B50]/70 hover:text-[#E25B74]" />
        </button>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(e, memory.id)}
          aria-label={memory.isFavorite ? 'Hapus favorit' : 'Suka foto'}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#634B50] flex items-center justify-center shadow-sm backdrop-blur-sm transition-transform active:scale-90 z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              memory.isFavorite ? 'fill-[#EBA7BA] text-[#EBA7BA]' : 'text-[#634B50]/60'
            }`}
          />
        </button>

        {/* Category tag badge */}
        <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#634B50]/60 text-white backdrop-blur-md">
          {memory.category}
        </span>
      </div>

      {/* Bottom Polaroid Chin with Handwritten Caption & Date */}
      <div className="px-1 flex flex-col justify-between flex-1">
        <h4 className="font-bold text-sm text-[#634B50] line-clamp-1 group-hover:text-[#EBA7BA] transition-colors">
          {memory.title}
        </h4>

        <p className="font-handwritten text-base text-[#634B50]/80 line-clamp-2 leading-tight my-1">
          {memory.caption}
        </p>

        {memory.date && (
          <div className="flex items-center gap-1 text-[11px] text-[#634B50]/50 font-medium mt-1">
            <Calendar className="w-3 h-3 text-[#EBA7BA]" />
            <span>{memory.date}</span>
          </div>
        )}
      </div>
    </div>
  );
};
