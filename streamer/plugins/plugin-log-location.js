((EDConsole) => {
  const PLUGIN_NAME = 'log-location';
  const Command = {
    READ_LOCATION: 'read-location',
    READ_LOCATION_RESPONSE: 'read-location/response',
    LOCATION_SET: 'location-set',
    LOCATION_SET_HASH: 'location-set-hash',
    LOCATION_RELOAD: 'location-reload',
    HISTORY_BACK: 'history-back',
    HISTORY_FORWARD: 'history-forward',
  };

  EDConsole.setCommandHandler(Command.LOCATION_SET, (_, { value }) => {
    window.location.href = value;
  });

  EDConsole.setCommandHandler(Command.LOCATION_SET_HASH, (_, { value }) => {
    window.location.hash = value;
  });

  EDConsole.setCommandHandler(Command.LOCATION_RELOAD, () =>
    window.location.reload(),
  );

  EDConsole.setCommandHandler(Command.HISTORY_BACK, () =>
    window.history.back(),
  );

  EDConsole.setCommandHandler(Command.HISTORY_FORWARD, () =>
    window.history.forward(),
  );

  EDConsole.setCommandHandler(
    Command.READ_LOCATION,
    (_, data, sendResponse) => {
      const {
        hash,
        host,
        hostname,
        href,
        origin,
        password,
        pathname,
        port,
        protocol,
        search,
        username,
      } = window.location;

      sendResponse(Command.READ_LOCATION_RESPONSE, {
        hash,
        host,
        hostname,
        href,
        origin,
        password,
        pathname,
        port,
        protocol,
        search,
        username,
      });
    },
  );

  const { history: historyObj } = window;
  const {
    pushState: pushStateFn,
    replaceState: replaceStateFn,
    back: backFn,
    forward: forwardFn,
    go: goFn,
  } = historyObj;

  historyObj.back = (...args) => {
    console.log('History Back');
    backFn.apply(historyObj, args);
  };

  historyObj.forward = (...args) => {
    console.log('History Forward');
    forwardFn.apply(historyObj, args);
  };

  historyObj.go = (...args) => {
    console.log('History Go', ...args);
    goFn.apply(historyObj, args);
  };

  historyObj.pushState = (...args) => {
    console.log('History Push', ...args);
    pushStateFn.apply(historyObj, args);
  };

  historyObj.replaceState = (...args) => {
    console.log('History Replace', ...args);
    replaceStateFn.apply(historyObj, args);
  };

  window.addEventListener('popstate', (event) => {
    console.log('History Pop', event);
  });

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
