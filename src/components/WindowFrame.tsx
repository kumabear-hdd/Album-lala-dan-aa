import React from 'react';
import { X, Minus, Square, Maximize2, Minimize2 } from 'lucide-react';
import { WindowId, WindowState } from '../types';

interface WindowFrameProps {
  windowState: WindowState;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximizeToggle: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximizeToggle,
  onFocus
}) => {
  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label={`Jendela ${windowState.title}`}
      onMouseDown={() => onFocus(windowState.id)}
      style={{
        zIndex: windowState.zIndex
      }}
      className={`fixed transition-all duration-200 flex flex-col overflow-hidden bg-[#FFF9F2] border-2 border-[#EBA7BA]/60 rounded-3xl window-shadow ${
        windowState.isMaximized
          ? 'inset-2 md:inset-4 pb-14' // fills viewport except taskbar
          : 'inset-2 md:inset-auto md:top-14 md:left-1/2 md:-translate-x-1/2 md:w-[92vw] md:max-w-4xl md:h-[80vh] pb-14 md:pb-0'
      }`}
    >
      {/* Title Bar */}
      <div
        className="h-11 px-4 bg-[#FFF0F4] border-b border-[#F7C9D4] flex items-center justify-between select-none cursor-pointer shrink-0"
        onDoubleClick={() => onMaximizeToggle(windowState.id)}
      >
        {/* Left Mac/Retro Pastel Window Dots */}
        <div className="flex items-center gap-2">
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            aria-label={`Tutup jendela ${windowState.title}`}
            className="w-3.5 h-3.5 rounded-full bg-[#FF8080] hover:brightness-90 flex items-center justify-center transition-transform active:scale-75 group"
          >
            <X className="w-2.5 h-2.5 text-[#634B50] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Minimize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(windowState.id);
            }}
            aria-label={`Minimalkan jendela ${windowState.title}`}
            className="w-3.5 h-3.5 rounded-full bg-[#FFD166] hover:brightness-90 flex items-center justify-center transition-transform active:scale-75 group"
          >
            <Minus className="w-2.5 h-2.5 text-[#634B50] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Maximize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximizeToggle(windowState.id);
            }}
            aria-label={`${windowState.isMaximized ? 'Pulihkan' : 'Maksimalkan'} ukuran jendela ${windowState.title}`}
            className="w-3.5 h-3.5 rounded-full bg-[#06D6A0] hover:brightness-90 flex items-center justify-center transition-transform active:scale-75 group hidden sm:flex"
          >
            {windowState.isMaximized ? (
              <Minimize2 className="w-2 h-2 text-[#634B50] opacity-0 group-hover:opacity-100" />
            ) : (
              <Maximize2 className="w-2 h-2 text-[#634B50] opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Center Title & Icon */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#634B50] truncate px-2">
          <span className="text-base">{icon}</span>
          <span>{windowState.title}</span>
        </div>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            aria-label={`Tutup ${windowState.title}`}
            className="p-1 rounded-lg hover:bg-[#F7C9D4]/50 text-[#634B50] md:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-hidden relative bg-[#FFF9F2]">
        {children}
      </div>
    </div>
  );
};
