const isBrowserApiAvailable =
  typeof browser !== 'undefined' && typeof browser.storage !== 'undefined';
const isChromeApiAvailable =
  typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined';
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

const extensionApi = isBrowserApiAvailable
  ? browser
  : isChromeApiAvailable
    ? chrome
    : null;

const dynamicStorage = {
  setItem: async (key: string, value: string) => {
    if (isBrowserApiAvailable && extensionApi) {
      await extensionApi.storage.local.set({ [key]: value });
    } else if (isChromeApiAvailable && extensionApi) {
      return new Promise<void>((resolve, reject) => {
        extensionApi.storage.local.set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(undefined); // Explicitly pass undefined
          }
        });
      });
    } else if (isLocalStorageAvailable) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
      }
    }
  },

  getItem: async (key: string) => {
    if (isBrowserApiAvailable && extensionApi) {
      const result = await extensionApi.storage.local.get(key);
      return result[key];
    } else if (isChromeApiAvailable && extensionApi) {
      return new Promise<string | null>((resolve, reject) => {
        extensionApi.storage.local.get(key, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result[key]);
          }
        });
      });
    } else if (isLocalStorageAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from localStorage:', error);
      }
    }
    return null;
  },

  removeItem: async (key: string) => {
    if (isBrowserApiAvailable && extensionApi) {
      await extensionApi.storage.local.remove(key);
    } else if (isChromeApiAvailable && extensionApi) {
      return new Promise<void>((resolve, reject) => {
        extensionApi.storage.local.remove(key, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(undefined); // Explicitly pass undefined
          }
        });
      });
    } else if (isLocalStorageAvailable) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    }
  },
};

export default dynamicStorage;
