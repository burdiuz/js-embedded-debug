((EDConsole) => {
  const PLUGIN_NAME = 'manage-storage';

  const HIDDEN_KEYS = {
    '@EDConsole-Storage-root': true,
  };

  const Command = {
    READ_LOCAL_STORAGE: 'read-local-storage',
    READ_LOCAL_STORAGE_RESPONSE: 'read-local-storage/response',
    LOCAL_STORAGE_SET: 'local-storage-set',
    LOCAL_STORAGE_REMOVE: 'local-storage-remove',
    LOCAL_STORAGE_CLIPBOARD_EXPORT: 'local-storage-clipboard-export',
    LOCAL_STORAGE_BULK_SET: 'local-storage-bulk-set',

    READ_SESSION_STORAGE: 'read-session-storage',
    READ_SESSION_STORAGE_RESPONSE: 'read-session-storage/response',
    SESSION_STORAGE_SET: 'session-storage-set',
    SESSION_STORAGE_REMOVE: 'session-storage-remove',
    SESSION_STORAGE_CLIPBOARD_EXPORT: 'session-storage-clipboard-export',
    SESSION_STORAGE_BULK_SET: 'session-storage-bulk-set',

    TEXTDATA_SHOW: 'textdata-show',
  };

  const read = (storage) => {
    const list = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);

      if (HIDDEN_KEYS[key]) {
        continue;
      }

      list.push({ key, value: storage.getItem(key) });
    }

    return list;
  };

  EDConsole.setCommandHandler(
    Command.READ_LOCAL_STORAGE,
    (_, data, sendResponse) =>
      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage)),
  );

  EDConsole.setCommandHandler(
    Command.LOCAL_STORAGE_SET,
    (_, data, sendResponse) => {
      localStorage.setItem(data.key, data.value);

      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    },
  );

  EDConsole.setCommandHandler(
    Command.LOCAL_STORAGE_REMOVE,
    (_, data, sendResponse) => {
      localStorage.removeItem(data.key);

      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    },
  );

  EDConsole.setCommandHandler(
    Command.LOCAL_STORAGE_CLIPBOARD_EXPORT,
    (_, inc, sendResponse) => {
      let data = '';
      const storageData = read(localStorage).reduce(
        (res, { key, value }) => ({ ...res, [key]: value }),
        {},
      );

      try {
        data = JSON.stringify(storageData, null, 2);

        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, {
          title: 'LocalStorage contents',
          data,
        });
      }
    },
  );

  EDConsole.setCommandHandler(
    Command.LOCAL_STORAGE_BULK_SET,
    (_, data, sendResponse) => {
      if (data instanceof Array) {
        data.forEach(({ key, value }) => localStorage.setItem(key, value));
      } else {
        Object.keys(data).forEach((key) =>
          localStorage.setItem(key, data[key]),
        );
      }

      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    },
  );

  EDConsole.setCommandHandler(
    Command.READ_SESSION_STORAGE,
    (_, data, sendResponse) =>
      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage)),
  );

  EDConsole.setCommandHandler(
    Command.SESSION_STORAGE_SET,
    (_, data, sendResponse) => {
      sessionStorage.setItem(data.key, data.value);

      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    },
  );

  EDConsole.setCommandHandler(
    Command.SESSION_STORAGE_REMOVE,
    (_, data, sendResponse) => {
      sessionStorage.removeItem(data.key);

      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    },
  );

  EDConsole.setCommandHandler(
    Command.SESSION_STORAGE_CLIPBOARD_EXPORT,
    (_, inc, sendResponse) => {
      let data = '';
      const storageData = read(sessionStorage).reduce(
        (res, { key, value }) => ({ ...res, [key]: value }),
        {},
      );

      try {
        data = JSON.stringify(storageData, null, 2);

        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, {
          title: 'SessionStorage contents',
          data,
        });
      }
    },
  );

  EDConsole.setCommandHandler(
    Command.SESSION_STORAGE_BULK_SET,
    (_, data, sendResponse) => {
      if (data instanceof Array) {
        data.forEach(({ key, value }) => sessionStorage.setItem(key, value));
      } else {
        Object.keys(data).forEach((key) =>
          sessionStorage.setItem(key, data[key]),
        );
      }

      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    },
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
