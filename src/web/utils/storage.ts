// Safe LocalStorage Wrapper for RageMP CEF
// CEF often blocks access to localStorage, causing crashes.

const memoryStorage: Record<string, string> = {};

const storage = {
  getItem: (key: string): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      // Access denied, fallback to memory
      return memoryStorage[key] || null;
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // Access denied, save to memory
      memoryStorage[key] = value;
    }
  },

  removeItem: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      delete memoryStorage[key];
    }
  }
};

export default storage;
