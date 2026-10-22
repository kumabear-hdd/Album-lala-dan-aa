import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  INITIAL_MEMORIES,
  ALL_MEMORIES_STORAGE_KEY,
  updateMemoryInStorage,
  deleteMemoryFromStorage,
  resetMemoriesToDefault
} from '../data/memories';

// Mock localStorage for node environment
const store: Record<string, string> = {};
global.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => {
    store[key] = value;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  },
  key: (index: number) => Object.keys(store)[index] || null,
  length: 0
} as Storage;

describe('Memory persistence operations', () => {
  test('updates memory in storage correctly', () => {
    store[ALL_MEMORIES_STORAGE_KEY] = JSON.stringify(INITIAL_MEMORIES);
    const target = { ...INITIAL_MEMORIES[0], title: 'Judul Baru yang Diedit', caption: 'Keterangan baru' };
    const result = updateMemoryInStorage(target);

    assert.strictEqual(result.find((m) => m.id === target.id)?.title, 'Judul Baru yang Diedit');
    assert.strictEqual(result.find((m) => m.id === target.id)?.caption, 'Keterangan baru');
  });

  test('deletes memory from storage correctly', () => {
    store[ALL_MEMORIES_STORAGE_KEY] = JSON.stringify(INITIAL_MEMORIES);
    const targetId = INITIAL_MEMORIES[0].id;
    const result = deleteMemoryFromStorage(targetId);

    assert.strictEqual(result.some((m) => m.id === targetId), false);
    assert.strictEqual(result.length, INITIAL_MEMORIES.length - 1);
  });

  test('resets memories to default correctly', () => {
    store[ALL_MEMORIES_STORAGE_KEY] = JSON.stringify([]);
    const reset = resetMemoriesToDefault();
    assert.strictEqual(reset.length, INITIAL_MEMORIES.length);
  });
});
