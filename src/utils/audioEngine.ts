/**
 * Web Audio Synthesizer & Audio Player Engine
 * Provides charming romantic lo-fi music box/piano notes out of the box
 * without requiring external network files, plus graceful playback of custom audio files.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentTrackId = 'track-1';
  private step = 0;
  private volume = 0.6;
  private masterGain: GainNode | null = null;
  private onTimeUpdateCallback: ((seconds: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private currentSeconds = 0;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Play a gentle bell / music box note
  public playChimeNote(freq: number, duration = 1.2, gainScale = 0.3) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + triangle blend
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(this.volume * gainScale, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio autoplay policy guard
    }
  }

  public currentTheme:
    | '1000x'
    | 'jadian_yuk'
    | 'rumah_itu'
    | 'night_changes'
    | 'twilight'
    | 'melody'
    | 'waltz'
    | 'cozy' = '1000x';

  // Melodic sequence for the ambient background
  private getNoteFrequencies(
    theme:
      | '1000x'
      | 'jadian_yuk'
      | 'rumah_itu'
      | 'night_changes'
      | 'twilight'
      | 'melody'
      | 'waltz'
      | 'cozy'
  ): number[] {
    switch (theme) {
      case '1000x':
        // Ghea Indrawari - 1000x (E Major / C#m acoustic ballad vibe)
        return [659.25, 739.99, 830.61, 987.77, 830.61, 739.99, 659.25, 554.37, 493.88, 659.25];
      case 'jadian_yuk':
        // Chloe Pawapuwa - Jadian Yuk (sweet playful pop acoustic)
        return [440.00, 554.37, 659.25, 880.00, 830.61, 659.25, 739.99, 554.37, 659.25, 440.00];
      case 'rumah_itu':
        // Sal Priadi - Kita Usahakan Rumah Itu (warm reflective acoustic progression)
        return [523.25, 659.25, 587.33, 440.00, 493.88, 523.25, 659.25, 392.00, 440.00, 523.25];
      case 'night_changes':
        // One Direction - Night Changes (nostalgic acoustic arpeggio melody)
        return [587.33, 659.25, 587.33, 440.00, 493.88, 440.00, 392.00, 440.00, 493.88, 587.33];
      case 'melody':
        return [523.25, 659.25, 783.99, 880.00, 1046.50, 783.99, 659.25, 587.33];
      case 'waltz':
        return [349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00];
      case 'cozy':
        return [392.00, 493.88, 587.33, 659.25, 783.99, 587.33, 493.88, 440.00];
      case 'twilight':
      default:
        return [659.25, 783.99, 880.00, 1046.50, 987.77, 783.99, 880.00, 659.25];
    }
  }

  public play(
    theme:
      | '1000x'
      | 'jadian_yuk'
      | 'rumah_itu'
      | 'night_changes'
      | 'twilight'
      | 'melody'
      | 'waltz'
      | 'cozy' = '1000x',
    customUrl?: string
  ) {
    this.currentTheme = theme;
    this.initContext();

    if (customUrl) {
      if (this.customAudio) {
        // If resuming the currently loaded audio url
        const currentSrc = this.customAudio.src;
        if (currentSrc && (currentSrc.endsWith(customUrl) || currentSrc === customUrl)) {
          this.customAudio.volume = this.volume;
          this.customAudio.play().catch(() => {
            this.startSynthLoop();
          });
          this.isPlaying = true;
          return;
        }
        this.customAudio.pause();
        this.customAudio = null;
      }

      if (this.timerId !== null) {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      const audio = new Audio(customUrl);
      this.customAudio = audio;
      audio.volume = this.volume;

      audio.addEventListener('timeupdate', () => {
        if (this.customAudio === audio && this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(audio.currentTime);
        }
      });

      audio.addEventListener('ended', () => {
        if (this.onEndCallback) {
          this.onEndCallback();
        } else {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
      });

      audio.addEventListener('error', () => {
        if (this.customAudio === audio) {
          this.startSynthLoop();
        }
      });

      audio.play().catch(() => {
        // Fall back to theme-matching synth loop if external file fails autoplay policy
        this.startSynthLoop();
      });
      this.isPlaying = true;
      return;
    }

    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    this.startSynthLoop();
  }

  public seek(seconds: number) {
    if (this.customAudio) {
      this.customAudio.currentTime = Math.max(0, seconds);
    }
    this.currentSeconds = seconds;
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(seconds);
    }
  }

  private startSynthLoop() {
    this.isPlaying = true;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }

    const notes = this.getNoteFrequencies(this.currentTheme);
    const intervalMs = 600; // gentle pacing

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying) return;

      const freq = notes[this.step % notes.length];
      // Play root note
      this.playChimeNote(freq, 1.4, 0.22);

      // Play soft harmonizing bass note every 4 steps
      if (this.step % 4 === 0) {
        this.playChimeNote(freq * 0.5, 2.0, 0.18);
      }

      this.step++;
      this.currentSeconds += intervalMs / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentSeconds);
      }
    }, intervalMs);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public stop() {
    this.pause();
    this.step = 0;
    this.currentSeconds = 0;
    if (this.customAudio) {
      this.customAudio.currentTime = 0;
    }
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public onTimeUpdate(cb: (seconds: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public onEnd(cb: () => void) {
    this.onEndCallback = cb;
  }

  public triggerSweetChime() {
    // Quick pleasant two-note sparkle for buttons / interactions
    this.playChimeNote(880.00, 0.6, 0.25);
    setTimeout(() => {
      this.playChimeNote(1046.50, 0.8, 0.25);
    }, 120);
  }
}

export const audioEngine = new RomanticAudioEngine();
