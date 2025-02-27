import { vi } from 'vitest';

global.chrome = {
  storage: {
    local: {
      get: vi.fn().mockImplementation(key => {
        const storage = {};
        return Promise.resolve({ [key]: storage[key] });
      }),
      set: vi.fn().mockImplementation(items => {
        return Promise.resolve();
      }),
      remove: vi.fn().mockImplementation(key => {
        return Promise.resolve();
      }),
      getBytesInUse: vi.fn().mockImplementation(keys => {
        return Promise.resolve(0);
      }),
      clear: vi.fn().mockImplementation(() => {
        return Promise.resolve();
      }),
      setAccessLevel: vi.fn().mockImplementation(accessOptions => {
        return Promise.resolve();
      }),
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
      hasListener: vi.fn(),
    },
  },
  storageArea: {
    QUOTA_BYTES: 1024 * 1024 * 5,
  },
};
