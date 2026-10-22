/**
 * IndexedDB helper for persistent audio file storage.
 * Stores audio blobs reliably across browser sessions.
 */

const DB_NAME = 'OurLittleUniverseAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'audio_tracks';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'trackId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export interface StoredAudioEntry {
  trackId: string;
  blob: Blob;
  fileName: string;
  updatedAt: number;
}

export async function saveTrackAudioBlob(
  trackId: string,
  blob: Blob,
  fileName: string
): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: StoredAudioEntry = {
      trackId,
      blob,
      fileName,
      updatedAt: Date.now()
    };

    const req = store.put(record);
    req.onsuccess = () => {
      const objectUrl = URL.createObjectURL(blob);
      resolve(objectUrl);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getTrackAudioUrl(
  trackId: string
): Promise<{ url: string; fileName: string } | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(trackId);

      req.onsuccess = () => {
        const result = req.result as StoredAudioEntry | undefined;
        if (result && result.blob) {
          const url = URL.createObjectURL(result.blob);
          resolve({ url, fileName: result.fileName });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function deleteTrackAudio(trackId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(trackId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore error
  }
}

export async function loadAllStoredAudioTracks(): Promise<
  Record<string, { url: string; fileName: string }>
> {
  const map: Record<string, { url: string; fileName: string }> = {};
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results = (req.result as StoredAudioEntry[]) || [];
        for (const item of results) {
          if (item && item.blob) {
            map[item.trackId] = {
              url: URL.createObjectURL(item.blob),
              fileName: item.fileName
            };
          }
        }
        resolve(map);
      };
      req.onerror = () => resolve(map);
    });
  } catch {
    return map;
  }
}

export async function clearAllStoredAudioTracks(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore error
  }
}

