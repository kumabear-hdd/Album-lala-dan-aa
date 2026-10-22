import { MemoryItem, FolderId } from '../types';

export type SortOption = 'newest' | 'oldest' | 'title' | 'favorites';
export type CategoryFilter = 'All' | 'First Dates' | 'Silly' | 'Traveling' | 'Chats' | 'Sweet' | 'Special';

export interface FilterOptions {
  folderId?: FolderId | 'all';
  searchQuery?: string;
  category?: CategoryFilter;
  sortBy?: SortOption;
  onlyFavorites?: boolean;
}

/**
 * Pure function: filters and sorts memory items
 */
export function filterAndSortMemories(
  items: MemoryItem[],
  options: FilterOptions
): MemoryItem[] {
  let result = [...items];

  // 1. Folder filter
  if (options.folderId && options.folderId !== 'all') {
    result = result.filter((item) => item.folderId === options.folderId);
  }

  // 2. Category filter
  if (options.category && options.category !== 'All') {
    result = result.filter((item) => item.category === options.category);
  }

  // 3. Favorites only filter
  if (options.onlyFavorites) {
    result = result.filter((item) => item.isFavorite);
  }

  // 4. Search query filter
  if (options.searchQuery && options.searchQuery.trim() !== '') {
    const q = options.searchQuery.toLowerCase().trim();
    result = result.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCaption = item.caption.toLowerCase().includes(q);
      const matchDate = item.date ? item.date.toLowerCase().includes(q) : false;
      const matchNote = item.note ? item.note.toLowerCase().includes(q) : false;
      return matchTitle || matchCaption || matchDate || matchNote;
    });
  }

  // 5. Sorting
  if (options.sortBy) {
    result.sort((a, b) => {
      switch (options.sortBy) {
        case 'favorites': {
          const favA = a.isFavorite ? 1 : 0;
          const favB = b.isFavorite ? 1 : 0;
          if (favA !== favB) return favB - favA;
          return a.title.localeCompare(b.title);
        }
        case 'title':
          return a.title.localeCompare(b.title);
        case 'oldest':
          return a.id.localeCompare(b.id);
        case 'newest':
        default:
          return b.id.localeCompare(a.id);
      }
    });
  }

  return result;
}

/**
 * Pure function: picks a random memory from items, optionally excluding a specific ID
 */
export function pickRandomMemory(
  items: MemoryItem[],
  excludeId?: string
): MemoryItem | null {
  if (!items || items.length === 0) return null;
  const pool = excludeId ? items.filter((it) => it.id !== excludeId) : items;
  if (pool.length === 0) return items[0];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Pure function: counts memories by folder
 */
export function countMemoriesByFolder(items: MemoryItem[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    counts[item.folderId] = (counts[item.folderId] || 0) + 1;
  }
  return counts;
}
