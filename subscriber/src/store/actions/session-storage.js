export const SESSION_STORAGE_READ = 'sessionStorageRead';
export const SESSION_STORAGE_UPDATE = 'sessionStorageUpdate';
export const SESSION_STORAGE_SET = 'sessionStorageSet';
export const SESSION_STORAGE_REMOVE = 'sessionStorageRemove';
export const SESSION_STORAGE_CLIPBOARD_EXPORT = 'sessionStorageClipboardExport';
export const SESSION_STORAGE_BULK_SET = 'sessionStorageBulkSet';

export const sessionStorageRead = () => ({ type: SESSION_STORAGE_READ });

export const sessionStorageUpdate = (list) => ({
  type: SESSION_STORAGE_UPDATE,
  payload: list,
});

export const sessionStorageSet = (key, value) => ({
  type: SESSION_STORAGE_SET,
  payload: { key, value },
});

export const sessionStorageRemove = (key) => ({
  type: SESSION_STORAGE_REMOVE,
  payload: { key },
});

export const sessionStorageClipboardExport = () => ({
  type: SESSION_STORAGE_CLIPBOARD_EXPORT,
});

export const sessionStorageBulkSet = (data) => ({
  type: SESSION_STORAGE_BULK_SET,
  payload: data,
});
