((EDConsole) => {
  const Command = {
    READ_LOCAL_STORAGE: 'read-local-storage',
    READ_LOCAL_STORAGE_RESPONSE: 'read-local-storage/response',
    LOCAL_STORAGE_SET: 'local-storage-set',
    LOCAL_STORAGE_REMOVE: 'local-storage-remove',

    READ_SESSION_STORAGE: 'read-session-storage',
    READ_SESSION_STORAGE_RESPONSE: 'read-session-storage/response',
    SESSION_STORAGE_SET: 'session-storage-set',
    SESSION_STORAGE_REMOVE: 'session-storage-remove',
  };

  const read = (storage) => {
    const list = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
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
})(window.EDConsole);
