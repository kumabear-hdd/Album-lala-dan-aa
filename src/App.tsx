import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DesktopEnvironment } from './components/DesktopEnvironment';
import { WindowFrame } from './components/WindowFrame';
import { MemoryFileManager } from './components/MemoryFileManager';
import { LoveLetter } from './components/LoveLetter';
import { DigitalBouquet } from './components/DigitalBouquet';
import { MusicPlayer } from './components/MusicPlayer';
import { LittleSurprises } from './components/LittleSurprises';
import { VirtualHugModal } from './components/VirtualHugModal';
import { WindowId, WindowState, MemoryItem, SongTrack } from './types';
import {
  loadStoredMemories,
  saveUploadedMemory,
  toggleFavoriteInStorage,
  updateMemoryInStorage,
  deleteMemoryFromStorage,
  resetMemoriesToDefault
} from './data/memories';
import { PLAYLIST_TRACKS } from './data/music';
import { audioEngine } from './utils/audioEngine';
import { Sparkles, Heart, X } from 'lucide-react';

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  memories: {
    id: 'memories',
    title: 'Our Memories',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10
  },
  letter: {
    id: 'letter',
    title: 'Love Letter',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11
  },
  bouquet: {
    id: 'bouquet',
    title: 'Digital Bouquet',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12
  },
  soundtrack: {
    id: 'soundtrack',
    title: 'Our Soundtrack',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13
  },
  surprises: {
    id: 'surprises',
    title: 'Little Surprises',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14
  }
};

export default function App() {
  const [hasEntered, setHasEntered] = useState(() => {
    // Autostart support for automated testing or query parameter
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [highestZIndex, setHighestZIndex] = useState(20);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isHugModalOpen, setIsHugModalOpen] = useState(false);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  // Initialize memories from storage & defaults
  useEffect(() => {
    setMemories(loadStoredMemories());
  }, []);

  const currentTrack: SongTrack = PLAYLIST_TRACKS[currentTrackIndex] || PLAYLIST_TRACKS[0];

  const handleEnterUniverse = () => {
    setHasEntered(true);
    setWelcomeToast('Halooo, Lalaa! Aa punya dunia kecil buat kamu. 💗');
    setTimeout(() => {
      setWelcomeToast(null);
    }, 6000);
  };

  const bringToFront = (id: WindowId) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  const handleOpenWindow = (id: WindowId) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  const handleCloseWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
  };

  const handleToggleMinimize = (id: WindowId) => {
    setWindows((prev) => {
      const target = prev[id];
      if (target.isMinimized) {
        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        return {
          ...prev,
          [id]: {
            ...target,
            isMinimized: false,
            zIndex: nextZ
          }
        };
      } else {
        // If window is not top-most, bring it to front first
        if (target.zIndex < highestZIndex) {
          const nextZ = highestZIndex + 1;
          setHighestZIndex(nextZ);
          return {
            ...prev,
            [id]: {
              ...target,
              zIndex: nextZ
            }
          };
        }
        return {
          ...prev,
          [id]: {
            ...target,
            isMinimized: true
          }
        };
      }
    });
  };

  const handleMaximizeToggle = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setMemories((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedStatus = toggleFavoriteInStorage(id, !!item.isFavorite);
          return { ...item, isFavorite: updatedStatus };
        }
        return item;
      })
    );
  };

  const handleAddMemory = (memoryData: Omit<MemoryItem, 'id'>) => {
    const saved = saveUploadedMemory(memoryData);
    setMemories((prev) => [saved, ...prev]);
  };

  const handleUpdateMemory = (updated: MemoryItem) => {
    updateMemoryInStorage(updated);
    setMemories((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleDeleteMemory = (id: string) => {
    deleteMemoryFromStorage(id);
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleResetMemories = () => {
    const defaultList = resetMemoriesToDefault();
    setMemories(defaultList);
  };

  // Music controls
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      audioEngine.pause();
      setIsPlayingMusic(false);
    } else {
      audioEngine.play(currentTrack.synthTheme || 'twilight', currentTrack.audioSrc);
      setIsPlayingMusic(true);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    const nextSong = PLAYLIST_TRACKS[nextIdx];
    if (isPlayingMusic) {
      audioEngine.play(nextSong.synthTheme || 'twilight', nextSong.audioSrc);
    }
  };

  const handlePrevTrack = () => {
    const prevIdx =
      (currentTrackIndex - 1 + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    const prevSong = PLAYLIST_TRACKS[prevIdx];
    if (isPlayingMusic) {
      audioEngine.play(prevSong.synthTheme || 'twilight', prevSong.audioSrc);
    }
  };

  const handleSelectTrack = (track: SongTrack) => {
    const idx = PLAYLIST_TRACKS.findIndex((t) => t.id === track.id);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      audioEngine.play(track.synthTheme || 'twilight', track.audioSrc);
      setIsPlayingMusic(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FFF9F2] font-rounded text-[#634B50]">
      {/* Welcome Screen Cover */}
      {!hasEntered && <WelcomeScreen onEnter={handleEnterUniverse} />}

      {/* Main Desktop Space & Taskbar */}
      {hasEntered && (
        <>
          <DesktopEnvironment
            windows={windows}
            onOpenWindow={handleOpenWindow}
            onToggleMinimize={handleToggleMinimize}
            onTriggerHug={() => setIsHugModalOpen(true)}
            currentTrack={currentTrack}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={handleToggleMusic}
          />

          {/* Welcome Toast Notification */}
          {welcomeToast && (
            <div
              role="alert"
              className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-white border-2 border-[#EBA7BA] shadow-xl flex items-center gap-2.5 animate-bounce"
            >
              <div className="w-8 h-8 rounded-full bg-[#F7C9D4] flex items-center justify-center text-base">
                💗
              </div>
              <span className="font-bold text-xs md:text-sm text-[#634B50]">
                {welcomeToast}
              </span>
              <button
                onClick={() => setWelcomeToast(null)}
                className="text-[#634B50]/50 hover:text-[#634B50] p-1"
                aria-label="Tutup pemberitahuan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Windows Layer */}
          {/* 1. Our Memories Window */}
          <WindowFrame
            windowState={windows.memories}
            icon="📷"
            onClose={handleCloseWindow}
            onMinimize={handleToggleMinimize}
            onMaximizeToggle={handleMaximizeToggle}
            onFocus={bringToFront}
          >
            <MemoryFileManager
              memories={memories}
              onToggleFavorite={handleToggleFavorite}
              onAddMemory={handleAddMemory}
              onUpdateMemory={handleUpdateMemory}
              onDeleteMemory={handleDeleteMemory}
              onResetToDefault={handleResetMemories}
            />
          </WindowFrame>

          {/* 2. Love Letter Window */}
          <WindowFrame
            windowState={windows.letter}
            icon="💌"
            onClose={handleCloseWindow}
            onMinimize={handleToggleMinimize}
            onMaximizeToggle={handleMaximizeToggle}
            onFocus={bringToFront}
          >
            <LoveLetter />
          </WindowFrame>

          {/* 3. Digital Bouquet Window */}
          <WindowFrame
            windowState={windows.bouquet}
            icon="💐"
            onClose={handleCloseWindow}
            onMinimize={handleToggleMinimize}
            onMaximizeToggle={handleMaximizeToggle}
            onFocus={bringToFront}
          >
            <DigitalBouquet />
          </WindowFrame>

          {/* 4. Our Soundtrack Window */}
          <WindowFrame
            windowState={windows.soundtrack}
            icon="🎵"
            onClose={handleCloseWindow}
            onMinimize={handleToggleMinimize}
            onMaximizeToggle={handleMaximizeToggle}
            onFocus={bringToFront}
          >
            <MusicPlayer
              currentTrack={currentTrack}
              isPlaying={isPlayingMusic}
              onTogglePlay={handleToggleMusic}
              onNextTrack={handleNextTrack}
              onPrevTrack={handlePrevTrack}
              onSelectTrack={handleSelectTrack}
            />
          </WindowFrame>

          {/* 5. Little Surprises Window */}
          <WindowFrame
            windowState={windows.surprises}
            icon="🎁"
            onClose={handleCloseWindow}
            onMinimize={handleToggleMinimize}
            onMaximizeToggle={handleMaximizeToggle}
            onFocus={bringToFront}
          >
            <LittleSurprises
              memories={memories}
              onOpenRandomMemory={() => {
                handleOpenWindow('memories');
              }}
              onReturnToDesktop={() => {
                handleCloseWindow('surprises');
              }}
            />
          </WindowFrame>

          {/* Standalone Virtual Hug Modal */}
          <VirtualHugModal
            isOpen={isHugModalOpen}
            onClose={() => setIsHugModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
