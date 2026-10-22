import { MemoryFolder, MemoryItem, FolderId } from '../types';

export const MEMORY_FOLDERS: MemoryFolder[] = [
  {
    id: 'our-first-memories',
    name: 'Our First Memories',
    description: 'Saat langkah pertama cerita kita dimulai dan deg-degan itu terasa manis...',
    color: '#F7C9D4', // blush pink
    icon: '🌱'
  },
  {
    id: 'silly-moments',
    name: 'Silly Moments',
    description: 'Momen ketawa random, ekspresi konyol, dan candaan yang selalu bikin kangen.',
    color: '#FFF0B8', // butter yellow
    icon: '🎈'
  },
  {
    id: 'favorite-photos',
    name: 'Favorite Photos',
    description: 'Foto-foto favorit yang paling sering Aa lihat saat lagi kangen.',
    color: '#EBA7BA', // dusty rose
    icon: '✨'
  },
  {
    id: 'little-adventures',
    name: 'Little Adventures',
    description: 'Jalan-jalan kecil, tempat baru, dan langit sore yang kita bagi bersama.',
    color: '#DCE8D5', // sage green
    icon: '🚲'
  },
  {
    id: 'screenshots-chats',
    name: 'Screenshots & Chats',
    description: 'Pesan-pesan manis, stiker lucu, dan obrolan larut malam kita.',
    color: '#E7DDF8', // lavender
    icon: '💌'
  },
  {
    id: 'moments-to-keep',
    name: 'Moments I Want to Keep',
    description: 'Potongan waktu sederhana yang ingin Aa simpan selamanya di hati.',
    color: '#FFE4C9', // warm cream
    icon: '🕊️'
  },
  {
    id: 'for-lalaa-only',
    name: 'For Lalaa Only',
    description: 'Ruang kecil penuh kata manis khusus untuk wanita hebatnya Aa.',
    color: '#FFCAD4', // sweet pink
    icon: '🎀'
  }
];

// Helper to create reliable romantic SVG illustration cards
const escapeXml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const createRomanticSvgData = (
  title: string,
  bgGradient: [string, string],
  icon: string,
  subtext: string
): string => {
  const safeTitle = escapeXml(title);
  const safeSubtext = escapeXml(subtext);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="480" viewBox="0 0 600 480">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}"/>
        <stop offset="100%" stop-color="${bgGradient[1]}"/>
      </linearGradient>
      <pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1.5" fill="#ffffff" fill-opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="600" height="480" fill="url(#g)"/>
    <rect width="600" height="480" fill="url(#p)"/>
    
    <!-- Floating decorative soft hearts -->
    <path d="M 120 90 C 120 75 140 75 140 90 C 140 105 120 120 120 120 C 120 120 100 105 100 90 C 100 75 120 75 120 90 Z" fill="#ffffff" fill-opacity="0.35"/>
    <path d="M 480 370 C 480 355 500 355 500 370 C 500 385 480 400 480 400 C 480 400 460 385 460 370 C 460 355 480 355 480 370 Z" fill="#ffffff" fill-opacity="0.25"/>
    <circle cx="510" cy="80" r="18" fill="#ffffff" fill-opacity="0.2"/>
    <circle cx="80" cy="400" r="24" fill="#ffffff" fill-opacity="0.15"/>

    <!-- Central emblem card -->
    <rect x="150" y="90" width="300" height="260" rx="24" fill="#ffffff" fill-opacity="0.9" />
    <text x="300" y="195" font-family="'Nunito', sans-serif" font-size="64" text-anchor="middle">${icon}</text>
    <text x="300" y="248" font-family="'Nunito', sans-serif" font-weight="800" font-size="18" fill="#634B50" text-anchor="middle">${safeTitle}</text>
    <text x="300" y="285" font-family="'Caveat', cursive" font-weight="600" font-size="22" fill="#EBA7BA" text-anchor="middle">${safeSubtext}</text>

    <!-- Bottom aesthetic bar -->
    <rect x="0" y="440" width="600" height="40" fill="#634B50" fill-opacity="0.08"/>
    <text x="300" y="465" font-family="'Nunito', sans-serif" font-size="13" font-weight="600" fill="#634B50" fill-opacity="0.7" text-anchor="middle">Our Little Universe • Aa &amp; Lalaa</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_MEMORIES: MemoryItem[] = [
  // Our First Memories
  {
    id: 'mem-1',
    folderId: 'our-first-memories',
    title: 'Hari Pertama Kita Bertemu',
    caption: 'Masih ingat canggungnya saat pertama kali tatap mata? Tapi senyum Lalaa bikin semua jadi tenang.',
    date: 'Memori Pertama',
    imageUrl: createRomanticSvgData('Hari Pertama Kita Bertemu', ['#F7C9D4', '#EBA7BA'], '🌱', 'Awal mula semesta kita...'),
    isFavorite: true,
    category: 'First Dates',
    note: 'Hari itu cuaca teduh banget, dan obrolan kita mengalir tanpa sadar waktu sudah berlalu berjam-jam.',
    rotation: -2,
    tapeColor: '#FFF0B8'
  },
  {
    id: 'mem-2',
    folderId: 'our-first-memories',
    title: 'Es Krim & Cerita Panjang',
    caption: 'Duduk berdua di pinggir jalan, makan es krim sambil ketawa cerita masa kecil.',
    date: 'Awal Cerita',
    imageUrl: createRomanticSvgData('Es Krim & Cerita Panjang', ['#FFF0B8', '#F7C9D4'], '🍦', 'Manisnya sederhana...'),
    isFavorite: false,
    category: 'First Dates',
    note: 'Lalaa suka banget rasa vanila stroberi, dan Aa suka ngeliat Lalaa pas lagi happy.',
    rotation: 1.5,
    tapeColor: '#DCE8D5'
  },

  // Silly Moments
  {
    id: 'mem-3',
    folderId: 'silly-moments',
    title: 'Ekspresi Random Lalaa',
    caption: 'Foto candid waktu Lalaa lagi ngambek pura-pura karena makanannya diculik Aa!',
    date: 'Sore Ceria',
    imageUrl: createRomanticSvgData('Ekspresi Random Lalaa', ['#FFF0B8', '#FFD166'], '😜', 'Tetap paling gemas!'),
    isFavorite: true,
    category: 'Silly',
    note: 'Muka cemberutnya malah bikin makin gemas, nggak pernah bosen liat foto ini.',
    rotation: -3,
    tapeColor: '#F7C9D4'
  },
  {
    id: 'mem-4',
    folderId: 'silly-moments',
    title: 'Hujan Tiba-tiba & Payung Mungil',
    caption: 'Payung kecil bertiga (Aa, Lalaa, dan tas belanjaan) yang berakhir basah kuyup tapi ketawa terus.',
    date: 'Musim Hujan',
    imageUrl: createRomanticSvgData('Payung Mungil & Hujan', ['#DCE8D5', '#A8DADC'], '☔', 'Basah tapi bahagia...'),
    isFavorite: false,
    category: 'Silly',
    note: 'Air hujan di mana-mana, tapi di sebelah Lalaa hawanya selalu hangat.',
    rotation: 2,
    tapeColor: '#E7DDF8'
  },

  // Favorite Photos
  {
    id: 'mem-5',
    folderId: 'favorite-photos',
    title: 'Senyum Terbaik Lalaa',
    caption: 'Senyum yang selalu punya kekuatan magis buat hapus capeknya seharian kerja.',
    date: 'Golden Hour',
    imageUrl: createRomanticSvgData('Senyum Terbaik Lalaa', ['#EBA7BA', '#F7C9D4'], '✨', 'Senyum yang menenangkan...'),
    isFavorite: true,
    category: 'Sweet',
    note: 'Kalau dunia lagi bising, ngeliat senyum ini rasanya semua langsung baik-baik saja.',
    rotation: -1,
    tapeColor: '#FFF0B8'
  },
  {
    id: 'mem-6',
    folderId: 'favorite-photos',
    title: 'Tangan Kecil yang Menggenggam',
    caption: 'Jari-jemari yang pas banget di genggaman Aa. Jangan pernah dilepas yaa.',
    date: 'Malam Tenang',
    imageUrl: createRomanticSvgData('Genggaman Tangan', ['#E7DDF8', '#EBA7BA'], '🤝', 'Selalu bersama...'),
    isFavorite: true,
    category: 'Sweet',
    note: 'Genggaman tangan yang selalu mengingatkan bahwa kita saling punya.',
    rotation: 2.5,
    tapeColor: '#DCE8D5'
  },

  // Little Adventures
  {
    id: 'mem-7',
    folderId: 'little-adventures',
    title: 'Berburu Sunset Bersama',
    caption: 'Menatap langit jingga yang perlahan berganti ungu, ditemani angin sore dan kamu.',
    date: 'Sore di Pantai',
    imageUrl: createRomanticSvgData('Berburu Sunset Bersama', ['#FFAAA6', '#FFD3B6'], '🌅', 'Langit sore dan kamu...'),
    isFavorite: true,
    category: 'Traveling',
    note: 'Langitnya cantik sekali, tapi tetap saja mata Aa lebih sering curi-curi pandang ke Lalaa.',
    rotation: -2,
    tapeColor: '#F7C9D4'
  },
  {
    id: 'mem-8',
    folderId: 'little-adventures',
    title: 'Nyasar yang Menyenangkan',
    caption: 'Tujuan kemana, belok kemana. Tapi selama jalan bareng kamu, nyasar pun terasa seru.',
    date: 'Jalan Santai',
    imageUrl: createRomanticSvgData('Nyasar yang Menyenangkan', ['#DCE8D5', '#C1DFBF'], '🧭', 'Petualangan kecil kita...'),
    isFavorite: false,
    category: 'Traveling',
    note: 'Ternyata nemu kedai kopi lucu di gang kecil karena salah jalan.',
    rotation: 1,
    tapeColor: '#FFF0B8'
  },

  // Screenshots & Chats
  {
    id: 'mem-9',
    folderId: 'screenshots-chats',
    title: 'Pesan Semangat Pagi Hari',
    caption: '"Semangat yaa kerjanya hari ini!" — Kalimat sederhana yang bikin hari jadi luar biasa.',
    date: 'Pagi Hari',
    imageUrl: createRomanticSvgData('Pesan Semangat Pagi', ['#E7DDF8', '#D8B4F8'], '💬', 'Notifikasi paling ditunggu...'),
    isFavorite: false,
    category: 'Chats',
    note: 'Notifikasi dari Lalaa selalu yang pertama Aa cek setiap pagi.',
    rotation: -1.5,
    tapeColor: '#F7C9D4'
  },
  {
    id: 'mem-10',
    folderId: 'screenshots-chats',
    title: 'Pap Random Tengah Malam',
    caption: 'Koleksi stiker gemas dan curhat acak sebelum tidur.',
    date: 'Obrolan Malam',
    imageUrl: createRomanticSvgData('Curhat Larut Malam', ['#DCE8D5', '#E7DDF8'], '🌙', 'Cerita sebelum tidur...'),
    isFavorite: false,
    category: 'Chats',
    note: 'Dari hal serius sampai hal nggak penting, semuanya seru kalau dibahas bareng Lalaa.',
    rotation: 2,
    tapeColor: '#FFF0B8'
  },

  // Moments I Want to Keep
  {
    id: 'mem-11',
    folderId: 'moments-to-keep',
    title: 'Kopi Hangat & Obrolan Impian',
    caption: 'Tentang masa depan yang pelan-pelan kita susun bersama dengan penuh harapan.',
    date: 'Kedai Kopi Teduh',
    imageUrl: createRomanticSvgData('Kopi & Masa Depan', ['#FFE4C9', '#F7C9D4'], '☕', 'Menyusun impian...'),
    isFavorite: true,
    category: 'Sweet',
    note: 'Semoga setiap doa dan harapan yang kita bicarakan hari itu dimudahkan jalan mencapainya.',
    rotation: -2.5,
    tapeColor: '#DCE8D5'
  },

  // For Lalaa Only
  {
    id: 'mem-12',
    folderId: 'for-lalaa-only',
    title: 'Hadiah Bunga Kecil',
    caption: 'Bukan tentang seberapa besar bunganya, tapi tentang doa yang selalu mekar di setiap kelopaknya.',
    date: 'Khusus untuk Lalaa',
    imageUrl: createRomanticSvgData('Hadiah Bunga Spesial', ['#F7C9D4', '#EBA7BA'], '🌸', 'Hanya untuk Lalaa...'),
    isFavorite: true,
    category: 'Special',
    note: 'Untuk perempuan paling sabar dan tulus yang selalu ada di setiap langkah Aa.',
    rotation: 1.8,
    tapeColor: '#FFF0B8'
  }
];

export const ALL_MEMORIES_STORAGE_KEY = 'our_little_universe_all_memories_v2';
export const FAVORITES_STORAGE_KEY = 'our_little_universe_favorites';

export function loadStoredMemories(): MemoryItem[] {
  try {
    const favRaw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const favSet = new Set<string>(favRaw ? JSON.parse(favRaw) : []);

    const raw = localStorage.getItem(ALL_MEMORIES_STORAGE_KEY);
    if (raw) {
      const storedList: MemoryItem[] = JSON.parse(raw);
      return storedList.map((item) => ({
        ...item,
        isFavorite: favSet.has(item.id) ? true : item.isFavorite
      }));
    }

    // First time load: save initial memories to storage so they can be edited immediately
    const initialWithFavs = INITIAL_MEMORIES.map((item) => ({
      ...item,
      isFavorite: favSet.has(item.id) ? true : item.isFavorite
    }));

    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(initialWithFavs));
    return initialWithFavs;
  } catch {
    return INITIAL_MEMORIES;
  }
}

export function saveUploadedMemory(memory: Omit<MemoryItem, 'id'>): MemoryItem {
  const newItem: MemoryItem = {
    ...memory,
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    isUserUploaded: true,
    rotation: Math.random() * 4 - 2
  };

  try {
    const list = loadStoredMemories();
    const updated = [newItem, ...list];
    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }

  return newItem;
}

export function updateMemoryInStorage(updatedMemory: MemoryItem): MemoryItem[] {
  try {
    const list = loadStoredMemories();
    const nextList = list.map((item) =>
      item.id === updatedMemory.id ? updatedMemory : item
    );
    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(nextList));
    return nextList;
  } catch (err) {
    console.error('Failed to update in storage', err);
    return [];
  }
}

export function deleteMemoryFromStorage(memoryId: string): MemoryItem[] {
  try {
    const list = loadStoredMemories();
    const nextList = list.filter((item) => item.id !== memoryId);
    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(nextList));
    return nextList;
  } catch (err) {
    console.error('Failed to delete from storage', err);
    return [];
  }
}

export function resetMemoriesToDefault(): MemoryItem[] {
  try {
    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(INITIAL_MEMORIES));
    return INITIAL_MEMORIES;
  } catch {
    return INITIAL_MEMORIES;
  }
}

export function clearAllMemoriesStorage(): MemoryItem[] {
  try {
    localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify([]));
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    return [];
  } catch {
    return [];
  }
}

export function toggleFavoriteInStorage(memoryId: string, currentStatus: boolean): boolean {
  try {
    const favRaw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const favSet = new Set<string>(favRaw ? JSON.parse(favRaw) : []);
    const nextStatus = !currentStatus;

    if (nextStatus) {
      favSet.add(memoryId);
    } else {
      favSet.delete(memoryId);
    }

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favSet)));

    // Also sync the item inside ALL_MEMORIES_STORAGE_KEY
    const raw = localStorage.getItem(ALL_MEMORIES_STORAGE_KEY);
    if (raw) {
      const list: MemoryItem[] = JSON.parse(raw);
      const updated = list.map((m) =>
        m.id === memoryId ? { ...m, isFavorite: nextStatus } : m
      );
      localStorage.setItem(ALL_MEMORIES_STORAGE_KEY, JSON.stringify(updated));
    }

    return nextStatus;
  } catch {
    return !currentStatus;
  }
}
