export const LOCAL_STORAGE_READ = 'localStorageRead';
export const LOCAL_STORAGE_UPDATE = 'localStorageUpdate';
export const LOCAL_STORAGE_SET = 'localStorageSet';
export const LOCAL_STORAGE_REMOVE = 'localStorageRemove';
export const LOCAL_STORAGE_CLIPBOARD_EXPORT = 'localStorageClipboardExport';
export const LOCAL_STORAGE_BULK_SET = 'localStorageBulkSet';

export const localStorageRead = () => ({ type: LOCAL_STORAGE_READ });

export const localStorageUpdate = (list) => ({
  type: LOCAL_STORAGE_UPDATE,
  payload: list,
});

export const localStorageSet = (key, value) => ({
  type: LOCAL_STORAGE_SET,
  payload: { key, value },
});

export const localStorageRemove = (key) => ({
  type: LOCAL_STORAGE_REMOVE,
  payload: { key },
});

export const localStorageClipboardExport = () => ({
  type: LOCAL_STORAGE_CLIPBOARD_EXPORT,
});

export const localStorageBulkSet = (data) => ({
  type: LOCAL_STORAGE_BULK_SET,
  payload: data,
});
