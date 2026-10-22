export type FolderId =
  | 'our-first-memories'
  | 'silly-moments'
  | 'favorite-photos'
  | 'little-adventures'
  | 'screenshots-chats'
  | 'moments-to-keep'
  | 'for-lalaa-only';

export interface MemoryFolder {
  id: FolderId;
  name: string;
  description: string;
  color: string;
  icon: string;
  badgeCount?: number;
}

export interface MemoryItem {
  id: string;
  folderId: FolderId;
  title: string;
  caption: string;
  date?: string;
  imageUrl: string;
  isFavorite?: boolean;
  category: 'First Dates' | 'Silly' | 'Traveling' | 'Chats' | 'Sweet' | 'Special';
  note?: string;
  rotation?: number; // degrees for polaroid tilt (-4 to 4)
  tapeColor?: string;
  isUserUploaded?: boolean;
}

export type FlowerType =
  | 'rose'
  | 'tulip'
  | 'daisy'
  | 'sunflower'
  | 'babys_breath'
  | 'lily';

export interface FlowerItem {
  id: FlowerType;
  name: string;
  colorName: string;
  symbolism: string;
  message: string;
  hexColor: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  audioSrc?: string;
  coverArt: string;
  caption: string;
  synthTheme?:
    | '1000x'
    | 'jadian_yuk'
    | 'rumah_itu'
    | 'night_changes'
    | 'twilight'
    | 'melody'
    | 'waltz'
    | 'cozy';
  localAudioData?: string;
}

export interface SurpriseMessage {
  id: string;
  text: string;
  emoji: string;
}

export type WindowId = 'memories' | 'letter' | 'bouquet' | 'soundtrack' | 'surprises';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}
