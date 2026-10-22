import React, { useState, useEffect } from 'react';
import {
  FolderHeart,
  Mail,
  Flower2,
  Music,
  Gift,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Minus,
  Sparkles,
  Layers,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { WindowId, WindowState, SongTrack } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface DesktopEnvironmentProps {
  windows: Record<WindowId, WindowState>;
  onOpenWindow: (id: WindowId) => void;
  onToggleMinimize: (id: WindowId) => void;
  onTriggerHug: () => void;
  currentTrack: SongTrack;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onTriggerResetModal?: () => void;
}

export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = ({
  windows,
  onOpenWindow,
  onToggleMinimize,
  onTriggerHug,
  currentTrack,
  isPlayingMusic,
  onToggleMusic
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showStickyNote, setShowStickyNote] = useState(true);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      );
      setCurrentDateStr(
        now.toLocaleDateString('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const desktopIcons = [
    {
      id: 'memories' as WindowId,
      name: 'Our Memories',
      subtext: 'Album Kenangan',
      icon: '📷',
      color: '#F7C9D4'
    },
    {
      id: 'letter' as WindowId,
      name: 'Love Letter',
      subtext: 'Surat dari Aa',
      icon: '💌',
      color: '#EBA7BA'
    },
    {
      id: 'bouquet' as WindowId,
      name: 'Digital Bouquet',
      subtext: 'Taman Bunga',
      icon: '💐',
      color: '#FFF0B8'
    },
    {
      id: 'soundtrack' as WindowId,
      name: 'Our Soundtrack',
      subtext: 'Lagu Cerita Kita',
      icon: '🎵',
      color: '#E7DDF8'
    },
    {
      id: 'surprises' as WindowId,
      name: 'Little Surprises',
      subtext: 'Kotak Kejutan',
      icon: '🎁',
      color: '#DCE8D5'
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FFF9F2] select-none flex flex-col justify-between">
      {/* Aesthetic Wallpaper Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft pastel gradients */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F7C9D4]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E7DDF8]/35 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FFF0B8]/25 blur-3xl" />

        {/* Floating Doodled Stars & Hearts */}
        <div className="absolute top-16 left-20 text-xl text-[#EBA7BA]/40 animate-gentle-float">
          🌸
        </div>
        <div className="absolute top-28 right-32 text-lg text-[#FFB800]/50 animate-gentle-float" style={{ animationDelay: '1.2s' }}>
          ✨
        </div>
        <div className="absolute bottom-28 left-40 text-xl text-[#E25B74]/35 animate-gentle-float" style={{ animationDelay: '2.4s' }}>
          💗
        </div>
        <div className="absolute bottom-36 right-20 text-lg text-[#8BA888]/40 animate-gentle-float" style={{ animationDelay: '0.6s' }}>
          🌿
        </div>

        {/* Central Subtle Watermark Motif */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-15">
          <span className="font-serif-romantic text-6xl md:text-8xl font-bold text-[#634B50]">
            Aa &amp; Lalaa
          </span>
          <span className="font-handwritten text-3xl md:text-4xl text-[#EBA7BA] mt-2">
            Our Little Universe
          </span>
        </div>
      </div>

      {/* Main Desktop Space */}
      <div className="relative flex-1 p-4 md:p-8 flex flex-col md:flex-row justify-between items-start pointer-events-auto">
        {/* Left: Desktop Application Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 md:gap-6 w-full sm:w-auto">
          {desktopIcons.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                audioEngine.playChimeNote(659.25, 0.25, 0.15);
                onOpenWindow(item.id);
              }}
              aria-label={`Buka ${item.name}`}
              className="group flex items-center sm:flex-col sm:items-center text-left sm:text-center p-2.5 rounded-2xl hover:bg-white/70 active:bg-white/90 transition-all cursor-pointer backdrop-blur-xs w-full sm:w-28"
            >
              {/* Cute Icon Card */}
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-md border-2 border-white transition-transform group-hover:scale-110 group-active:scale-95 shrink-0 mr-3 sm:mr-0 sm:mb-2"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>

              <div>
                <span className="block font-bold text-xs md:text-sm text-[#634B50] group-hover:text-[#E25B74] transition-colors leading-tight">
                  {item.name}
                </span>
                <span className="block text-[10px] text-[#634B50]/60 font-medium">
                  {item.subtext}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Right / Center: Cute Sticky Note - positioned in front of windows so it is read first */}
        {showStickyNote && (
          <div className="fixed top-16 right-4 sm:right-6 md:top-18 md:right-10 z-[35] max-w-xs w-[85vw] sm:w-80 bg-[#FFF0B8] rounded-2xl p-5 shadow-2xl border-2 border-[#FFE082] rotate-2 paper-shadow animate-fadeIn">
            {/* Washi tape at top */}
            <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#F7C9D4] rounded" />

            {/* Close Sticky Note */}
            <button
              onClick={() => setShowStickyNote(false)}
              aria-label="Tutup catatan memo"
              className="absolute top-2 right-2 text-[#634B50]/50 hover:text-[#634B50] p-1 rounded-full hover:bg-[#FFE082]/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">📌</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#634B50]/70">
                Catatan Kecil untuk Lalaa
              </span>
            </div>

            <p className="font-handwritten text-xl text-[#634B50] leading-snug">
              "Halooo Lalaa! 💗 Selamat datang di dunia kecil kita. Jangan lupa buka buket bunga dan dengarkan musiknya yaa! - Aa"
            </p>

            <div className="mt-3 pt-2 border-t border-[#FFE082] flex items-center justify-between text-[10px] text-[#634B50]/60 font-semibold">
              <span>Satu dunia kecil, cerita kita</span>
              <span className="text-[#E25B74]">✨</span>
            </div>
          </div>
        )}
      </div>

      {/* Start Menu Popup */}
      {showStartMenu && (
        <div
          role="menu"
          aria-label="Menu Utama"
          className="fixed bottom-14 left-4 z-40 w-72 bg-white/95 rounded-3xl p-4 shadow-2xl border-2 border-[#F7C9D4] backdrop-blur-md animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F7C9D4]/60 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#F7C9D4] flex items-center justify-center text-xl shadow-sm">
              💑
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#634B50]">Aa &amp; Lalaa</h4>
              <p className="text-[10px] text-[#634B50]/60">Our Little Universe</p>
            </div>
          </div>

          <div className="space-y-1">
            {desktopIcons.map((item) => (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => {
                  onOpenWindow(item.id);
                  setShowStartMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-[#FFF9F2] transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="font-bold text-xs text-[#634B50]">{item.name}</div>
                  <div className="text-[10px] text-[#634B50]/60">{item.subtext}</div>
                </div>
              </button>
            ))}

            <div className="pt-2 border-t border-[#F7C9D4]/40 mt-2">
              <button
                onClick={() => {
                  onTriggerHug();
                  setShowStartMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left bg-[#F7C9D4]/40 hover:bg-[#F7C9D4] text-[#634B50] transition-colors"
              >
                <Heart className="w-4 h-4 fill-[#E25B74] text-[#E25B74]" />
                <span className="font-bold text-xs">Kirim Peluk Virtual 💗</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Taskbar */}
      <footer className="relative z-40 h-12 bg-white/85 border-t border-[#F7C9D4] backdrop-blur-md px-3 md:px-5 flex items-center justify-between shadow-lg shrink-0">
        {/* Left: Start Button + Open Windows */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {/* Start Menu Button */}
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            aria-label="Menu Mulai"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              showStartMenu
                ? 'bg-[#EBA7BA] text-white'
                : 'bg-[#F7C9D4] hover:bg-[#EBA7BA] text-[#634B50]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Aa &amp; Lalaa</span>
            <span className="sm:hidden">Start</span>
          </button>

          {/* Active Windows Tabs in Taskbar */}
          <div className="flex items-center gap-1.5">
            {Object.values(windows).map((win) => {
              if (!win.isOpen) return null;
              const isMinimized = win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => onToggleMinimize(win.id)}
                  aria-label={`${win.title} ${isMinimized ? '(diminimalkan)' : '(aktif)'}`}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isMinimized
                      ? 'bg-white/60 border-transparent text-[#634B50]/60 hover:bg-white'
                      : 'bg-white border-[#EBA7BA] text-[#634B50] shadow-sm'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#E25B74]" />
                  <span className="truncate max-w-[90px] md:max-w-[120px]">{win.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Mini Music Widget + System Clock & Peluk Shortcut */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Mini Music Widget in Taskbar */}
          <div className="hidden sm:flex items-center gap-2 bg-[#FFF9F2] px-2.5 py-1 rounded-xl border border-[#F7C9D4] shadow-xs">
            <button
              onClick={onToggleMusic}
              aria-label={isPlayingMusic ? 'Jeda musik latar' : 'Putar musik latar'}
              className="text-[#634B50] hover:text-[#E25B74] transition-colors"
            >
              {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span
              onClick={() => onOpenWindow('soundtrack')}
              className="text-[11px] font-bold text-[#634B50] truncate max-w-[100px] cursor-pointer hover:underline"
            >
              {currentTrack.title}
            </span>
          </div>

          {/* Peluk Shortcut */}
          <button
            onClick={onTriggerHug}
            aria-label="Kirim Peluk Virtual Cepat"
            className="p-1.5 rounded-xl bg-[#F7C9D4]/50 hover:bg-[#F7C9D4] text-[#E25B74] transition-colors"
          >
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </button>

          {/* Live Date & Clock Display */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#634B50]">
            <Clock className="w-3.5 h-3.5 text-[#EBA7BA]" />
            <span className="hidden md:inline font-normal text-[#634B50]/70">
              {currentDateStr} •
            </span>
            <span>{currentTimeStr}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
