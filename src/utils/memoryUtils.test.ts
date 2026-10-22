import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortMemories,
  pickRandomMemory,
  countMemoriesByFolder
} from './memoryUtils';
import { MemoryItem } from '../types';

const sampleItems: MemoryItem[] = [
  {
    id: 'mem-1',
    folderId: 'our-first-memories',
    title: 'Pertama Ketemu',
    caption: 'Senyum manis di taman',
    category: 'First Dates',
    imageUrl: '',
    isFavorite: true,
    date: '2023-01-10'
  },
  {
    id: 'mem-2',
    folderId: 'silly-moments',
    title: 'Lucu Banget',
    caption: 'Muka konyol pas lapar',
    category: 'Silly',
    imageUrl: '',
    isFavorite: false,
    date: '2023-02-14'
  },
  {
    id: 'mem-3',
    folderId: 'our-first-memories',
    title: 'Nonton Bioskop',
    caption: 'Beli popcorn berdua',
    category: 'First Dates',
    imageUrl: '',
    isFavorite: false,
    date: '2023-03-01'
  }
];

test('filterAndSortMemories filters by folder correctly', () => {
  const result = filterAndSortMemories(sampleItems, {
    folderId: 'our-first-memories'
  });
  assert.equal(result.length, 2);
  assert.equal(result[0].folderId, 'our-first-memories');
  assert.equal(result[1].folderId, 'our-first-memories');
});

test('filterAndSortMemories filters by category correctly', () => {
  const result = filterAndSortMemories(sampleItems, {
    category: 'Silly'
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Lucu Banget');
});

test('filterAndSortMemories filters by favorites correctly', () => {
  const result = filterAndSortMemories(sampleItems, {
    onlyFavorites: true
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'mem-1');
});

test('filterAndSortMemories searches across title and caption', () => {
  const resultTitle = filterAndSortMemories(sampleItems, {
    searchQuery: 'bioskop'
  });
  assert.equal(resultTitle.length, 1);
  assert.equal(resultTitle[0].title, 'Nonton Bioskop');

  const resultCaption = filterAndSortMemories(sampleItems, {
    searchQuery: 'popcorn'
  });
  assert.equal(resultCaption.length, 1);
  assert.equal(resultCaption[0].title, 'Nonton Bioskop');
});

test('filterAndSortMemories sorts by title alphabetically', () => {
  const result = filterAndSortMemories(sampleItems, {
    sortBy: 'title'
  });
  assert.equal(result[0].title, 'Lucu Banget');
  assert.equal(result[1].title, 'Nonton Bioskop');
  assert.equal(result[2].title, 'Pertama Ketemu');
});

test('countMemoriesByFolder calculates correct count per folder', () => {
  const counts = countMemoriesByFolder(sampleItems);
  assert.equal(counts['our-first-memories'], 2);
  assert.equal(counts['silly-moments'], 1);
});

test('pickRandomMemory returns an item from the pool', () => {
  const random = pickRandomMemory(sampleItems);
  assert.ok(random);
  assert.ok(sampleItems.some((it) => it.id === random.id));
});
