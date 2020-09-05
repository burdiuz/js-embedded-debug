const buildAPI = (storage) => ({
  read: () => {
    const list = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      list.push({ key, value: storage.getItem(key) });
    }

    return list;
  },
  set: (key, value) => storage.setItem(key, value),
  clear: () => storage.clear(),
});

export const {
  read: readSessionStorage,
  set: setSessionStorage,
  clear: clearSessionStorage,
} = buildAPI(sessionStorage);

export const {
  read: readLocalStorage,
  set: setLocalStorage,
  clear: clearLocalStorage,
} = buildAPI(localStorage);
