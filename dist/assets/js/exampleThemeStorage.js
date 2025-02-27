var StorageType = /* @__PURE__ */ ((StorageType2) => {
  StorageType2["Local"] = "local";
  StorageType2["Sync"] = "sync";
  StorageType2["Managed"] = "managed";
  StorageType2["Session"] = "session";
  return StorageType2;
})(StorageType || {});
function createStorage(key, fallback, config) {
  let cache = null;
  let listeners = [];
  const storageType = (config == null ? void 0 : config.storageType) ?? "local";
  const _getDataFromStorage = async () => {
    if (chrome.storage[storageType] === void 0) {
      throw new Error(`Check your storage permission into manifest.json: ${storageType} is not defined`);
    }
    const value = await chrome.storage[storageType].get([key]);
    return value[key] ?? fallback;
  };
  const _emitChange = () => {
    listeners.forEach((listener) => listener());
  };
  const set = async (valueOrUpdate) => {
    if (typeof valueOrUpdate === "function") {
      if (valueOrUpdate.hasOwnProperty("then")) {
        cache = await valueOrUpdate(cache);
      } else {
        cache = valueOrUpdate(cache);
      }
    } else {
      cache = valueOrUpdate;
    }
    await chrome.storage[storageType].set({ [key]: cache });
    _emitChange();
  };
  const subscribe = (listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const getSnapshot = () => {
    return cache;
  };
  _getDataFromStorage().then((data) => {
    cache = data;
    _emitChange();
  });
  return {
    get: _getDataFromStorage,
    set,
    getSnapshot,
    subscribe
  };
}
const storage = createStorage("theme-storage-key", "light", {
  storageType: StorageType.Local
});
const exampleThemeStorage = {
  ...storage,
  // TODO: extends your own methods
  toggle: () => {
    storage.set((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  }
};
export {
  exampleThemeStorage as e
};
//# sourceMappingURL=exampleThemeStorage.js.map
