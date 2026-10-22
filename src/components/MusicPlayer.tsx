import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Disc,
  Info,
  Sparkles,
  Heart,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { SongTrack } from '../types';
import { PLAYLIST_TRACKS, MUSIC_PLAYER_NOTE } from '../data/music';
import { audioEngine } from '../utils/audioEngine';
import {
  saveTrackAudioBlob,
  loadAllStoredAudioTracks,
  deleteTrackAudio
} from '../utils/audioStorage';

interface MusicPlayerProps {
  currentTrack: SongTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectTrack: (track: SongTrack) => void;
  onAudioAttached?: (trackId: string, url: string) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSelectTrack,
  onAudioAttached
}) => {
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [customTrackUrls, setCustomTrackUrls] = useState<Record<string, string>>({});

  // Load persistently stored custom audio files on mount
  useEffect(() => {
    loadAllStoredAudioTracks().then((map) => {
      const urls: Record<string, string> = {};
      for (const [id, data] of Object.entries(map)) {
        urls[id] = data.url;
        if (onAudioAttached) {
          onAudioAttached(id, data.url);
        }
      }
      setCustomTrackUrls(urls);
    });
  }, [onAudioAttached]);

  useEffect(() => {
    audioEngine.onTimeUpdate((sec) => {
      setPlaybackSeconds(Math.floor(sec) % (currentTrack.duration || 180));
    });
  }, [currentTrack]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    audioEngine.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume || 0.5);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const handleCustomAudioUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    trackId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const blobUrl = await saveTrackAudioBlob(trackId, file, file.name);
        setCustomTrackUrls((prev) => ({ ...prev, [trackId]: blobUrl }));
        audioEngine.play(currentTrack.synthTheme || '1000x', blobUrl);
        if (onAudioAttached) {
          onAudioAttached(trackId, blobUrl);
        }
      } catch {
        const fallbackUrl = URL.createObjectURL(file);
        setCustomTrackUrls((prev) => ({ ...prev, [trackId]: fallbackUrl }));
        audioEngine.play(currentTrack.synthTheme || '1000x', fallbackUrl);
        if (onAudioAttached) {
          onAudioAttached(trackId, fallbackUrl);
        }
      }
    }
  };

  const handleRemoveCustomAudio = async (trackId: string) => {
    await deleteTrackAudio(trackId);
    setCustomTrackUrls((prev) => {
      const copy = { ...prev };
      delete copy[trackId];
      return copy;
    });
    audioEngine.play(currentTrack.synthTheme || '1000x');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const hasCustomAudio = !!customTrackUrls[currentTrack.id];
  const activeAudioSrc = customTrackUrls[currentTrack.id] || currentTrack.audioSrc;
  const hasAudioSource = !!activeAudioSrc;

  return (
    <div className="h-full bg-[#FFF9F2] overflow-y-auto p-4 md:p-6 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F7C9D4]/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFF0B8] flex items-center justify-center text-sm shadow-sm">
            🎵
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#634B50]">Our Soundtrack</h3>
            <p className="text-[11px] text-[#634B50]/60">4 Lagu Pilihan Aa &amp; Lalaa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* File input button for current track */}
          <label className="cursor-pointer px-2.5 py-1 rounded-xl bg-white border border-[#F7C9D4] text-[11px] font-bold text-[#634B50] hover:bg-[#F7C9D4]/40 transition-colors flex items-center gap-1.5 shadow-sm">
            <Upload className="w-3.5 h-3.5 text-[#EBA7BA]" />
            <span className="hidden sm:inline">
              {hasCustomAudio ? 'Ganti File MP3' : 'Unggah File MP3'}
            </span>
            <span className="sm:hidden">MP3</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => handleCustomAudioUpload(e, currentTrack.id)}
            />
          </label>

          <button
            onClick={() => setShowGuide(!showGuide)}
            aria-label="Petunjuk Musik"
            className="px-2.5 py-1 rounded-xl bg-white border border-[#F7C9D4] text-[11px] font-bold text-[#634B50] hover:bg-[#F7C9D4]/30 transition-colors flex items-center gap-1 shadow-sm"
          >
            <Info className="w-3.5 h-3.5 text-[#EBA7BA]" />
            <span className="hidden sm:inline">Panduan Lagu</span>
          </button>
        </div>
      </div>

      {/* Guide Note Box */}
      {showGuide && (
        <div className="my-3 p-3.5 rounded-2xl bg-white border-2 border-[#F7C9D4] text-xs text-[#634B50] shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between mb-1.5 font-bold">
            <span className="flex items-center gap-1 text-[#E25B74]">
              <Sparkles className="w-3.5 h-3.5" /> 4 Lagu Pilihan Khusus untuk Kita
            </span>
            <button
              onClick={() => setShowGuide(false)}
              className="text-[#634B50]/50 hover:text-[#634B50]"
            >
              ✕
            </button>
          </div>
          <p className="leading-relaxed text-[11px] text-[#634B50]/80 mb-2">
            Website ini sudah dikonfigurasikan khusus untuk 4 lagu pilihan kalian:
          </p>
          <ul className="text-[11px] text-[#634B50] space-y-1 mb-2.5 list-disc list-inside">
            <li><strong>1000x</strong> — Ghea Indrawari</li>
            <li><strong>Jadian Yuk</strong> — Chloe Pawapuwa</li>
            <li><strong>Kita Usahakan Rumah Itu</strong> — Sal Priadi</li>
            <li><strong>Night Changes</strong> — One Direction</li>
          </ul>
          <p className="leading-relaxed text-[11px] text-[#634B50]/80">
            Kamu bisa langsung klik <strong>"Unggah File MP3"</strong> di atas untuk memutar file rekaman audio asli dari komputermu, atau menaruh filenya di folder proyek <code className="bg-[#FFF0B8]/60 px-1 py-0.5 rounded font-mono">public/music/</code>. Jika belum diunggah, melodi piano akustik yang lembut akan otomatis dimainkan!
          </p>
        </div>
      )}

      {/* Center Scrapbook Vinyl & Player Deck */}
      <div className="my-auto py-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Animated Vinyl Record Graphic */}
        <div className="relative w-44 h-44 md:w-52 md:h-52 shrink-0">
          {/* Vinyl Disc */}
          <div
            className={`w-full h-full rounded-full bg-[#2C2426] shadow-2xl flex items-center justify-center border-4 border-[#4A3C3E] relative transition-transform duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Grooves */}
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-12 rounded-full border border-white/10" />

            {/* Center Label */}
            <div className="w-20 h-20 rounded-full bg-[#F7C9D4] border-4 border-[#FFF9F2] flex flex-col items-center justify-center shadow-inner text-center p-1">
              <span className="text-xl">{currentTrack.coverArt}</span>
              <span className="text-[8px] font-extrabold text-[#634B50] uppercase tracking-tighter mt-0.5">
                Aa &amp; Lalaa
              </span>
            </div>
            {/* Center Spindle Hole */}
            <div className="absolute w-3.5 h-3.5 rounded-full bg-[#2C2426] border border-white/30" />
          </div>

          {/* Tiny Tonearm Needle Decor */}
          <div
            className={`absolute -top-3 right-0 w-16 h-20 pointer-events-none transition-transform duration-500 origin-top-right ${
              isPlaying ? 'rotate-12' : '-rotate-12'
            }`}
          >
            <div className="w-2 h-16 bg-[#D4C0AF] rounded-full mx-auto shadow" />
            <div className="w-4 h-5 bg-[#634B50] rounded-sm mx-auto -mt-1 shadow" />
          </div>
        </div>

        {/* Track Info & Scrubber */}
        <div className="flex-1 max-w-sm w-full flex flex-col justify-center">
          <div className="text-center md:text-left mb-3">
            <div className="flex items-center justify-center md:justify-start gap-1.5 mb-1.5 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7DDF8] text-[#634B50]">
                Playing Now 🎵
              </span>
              {hasCustomAudio ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> MP3 Kustom
                </span>
              ) : hasAudioSource ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Lagu Terpasang 🎵
                </span>
              ) : (
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF0B8] text-[#634B50] border border-[#FFE082]">
                  Melodi Akustik
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg md:text-xl text-[#634B50] line-clamp-1">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-[#634B50]/70 font-medium mt-0.5">
              {currentTrack.artist}
            </p>
          </div>

          {/* Memory Caption Quote */}
          <p className="text-xs font-handwritten text-lg text-[#634B50] leading-snug bg-white/70 p-3 rounded-2xl border border-[#F7C9D4] mb-4 text-center md:text-left">
            "{currentTrack.caption || MUSIC_PLAYER_NOTE}"
          </p>

          {/* Progress Bar with Seek */}
          <div className="space-y-1">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const targetSec = Math.floor(pos * (currentTrack.duration || 180));
                audioEngine.seek(targetSec);
                setPlaybackSeconds(targetSec);
              }}
              title="Klik untuk melompat ke bagian lagu ini"
              className="relative w-full h-2 rounded-full bg-[#F7C9D4]/50 overflow-hidden cursor-pointer group"
            >
              <div
                className="h-full bg-[#E25B74] group-hover:bg-[#d94863] rounded-full transition-all duration-200"
                style={{
                  width: `${(playbackSeconds / (currentTrack.duration || 180)) * 100}%`
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#634B50]/60 font-semibold px-0.5">
              <span>{formatTime(playbackSeconds)}</span>
              <span>{formatTime(currentTrack.duration || 180)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={onPrevTrack}
              aria-label="Lagu sebelumnya"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F7C9D4]/40 text-[#634B50] flex items-center justify-center shadow-sm border border-[#F7C9D4] transition-transform active:scale-90"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Jeda lagu' : 'Putar lagu'}
              className="w-14 h-14 rounded-full bg-[#EBA7BA] hover:bg-[#E25B74] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNextTrack}
              aria-label="Lagu berikutnya"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F7C9D4]/40 text-[#634B50] flex items-center justify-center shadow-sm border border-[#F7C9D4] transition-transform active:scale-90"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-2 mt-4 px-4">
            <button
              onClick={handleToggleMute}
              aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
              className="text-[#634B50]/60 hover:text-[#634B50]"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Pengatur volume musik"
              className="w-24 h-1.5 bg-[#F7C9D4] rounded-lg appearance-none cursor-pointer accent-[#E25B74]"
            />
          </div>
        </div>
      </div>

      {/* Playlist Tray */}
      <div className="pt-3 border-t border-[#F7C9D4]/60">
        <div className="text-xs font-bold text-[#634B50]/60 uppercase tracking-wider mb-2">
          Daftar Playlist Kenangan
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PLAYLIST_TRACKS.map((track) => {
            const isSelected = track.id === currentTrack.id;
            const hasAudio = !!customTrackUrls[track.id] || !!track.audioSrc;
            return (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#EBA7BA] shadow-sm'
                    : 'bg-white/40 border-transparent hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0">{track.coverArt}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-xs text-[#634B50] truncate">
                        {track.title}
                      </h5>
                      {hasAudio && (
                        <span className="shrink-0 px-1.5 py-0.2 text-[8px] font-bold bg-emerald-100 text-emerald-800 rounded">
                          MP3
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#634B50]/60 truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {/* Upload button for this specific track */}
                  <label
                    onClick={(e) => e.stopPropagation()}
                    title="Unggah audio untuk lagu ini"
                    className="p-1 rounded-lg hover:bg-[#F7C9D4]/40 text-[#634B50]/60 hover:text-[#634B50] cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => handleCustomAudioUpload(e, track.id)}
                    />
                  </label>

                  {isSelected && isPlaying && (
                    <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#F7C9D4] text-[9px] font-bold text-[#634B50]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E25B74] animate-ping" />
                      Playing
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
