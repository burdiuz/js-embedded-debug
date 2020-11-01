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
    HISTORY_UPDATE: 'history-update',
  };

  const HistoryAction = {
    EXTERNAL: 'External',
    BACK: 'Back',
    FORWARD: 'Forward',
    GO: 'Go',
    PUSH_STATE: 'PushState',
    REPLACE_STATE: 'ReplaceState',
  };

  const sendLocation = (send) => {
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

    send(Command.READ_LOCATION_RESPONSE, {
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
  };

  const sendLocationAll = () =>
    sendLocation((...args) => EDConsole.sendCommand(...args));

  EDConsole.setCommandHandler(
    Command.LOCATION_SET,
    (_, { value }, sendResponse) => {
      window.location.href = value;
      sendLocation(sendResponse);
    },
  );

  EDConsole.setCommandHandler(
    Command.LOCATION_SET_HASH,
    (_, { value }, sendResponse) => {
      window.location.hash = value;
      sendLocation(sendResponse);
    },
  );

  EDConsole.setCommandHandler(
    Command.LOCATION_RELOAD,
    (_, data, sendResponse) => {
      window.location.reload();
      sendLocation(sendResponse);
    },
  );

  EDConsole.setCommandHandler(Command.HISTORY_BACK, (_, data, sendResponse) => {
    window.history.back();
    sendLocation(sendResponse);
  });

  EDConsole.setCommandHandler(
    Command.HISTORY_FORWARD,
    (_, data, sendResponse) => {
      window.history.forward();
      sendLocation(sendResponse);
    },
  );

  EDConsole.setCommandHandler(Command.READ_LOCATION, (_, data, sendResponse) =>
    sendLocation(sendResponse),
  );

  const { history: historyObj } = window;
  const {
    pushState: pushStateFn,
    replaceState: replaceStateFn,
    back: backFn,
    forward: forwardFn,
    go: goFn,
  } = historyObj;

  let lastAsyncTimestamp;
  let lastAsyncAction;
  let lastAsyncParams;

  const setLastAsyncAction = (type, params = {}) => {
    lastAsyncTimestamp = Date.now();
    lastAsyncAction = type;
    lastAsyncParams = params;
  };

  const dropLastAsyncAction = () => {
    lastAsyncTimestamp = 0;
    lastAsyncAction = HistoryAction.EXTERNAL;
    lastAsyncParams = {};
  };

  const getHistoryAction = (action, url, state, title = '', params = {}) => ({
    action,
    params: {},
    url,
    title,
    state,
  });

  const sendHistoryUpdateAll = (
    action,
    url,
    state,
    title = '',
    params = {},
  ) => {
    EDConsole.sendCommand(
      Command.HISTORY_UPDATE,
      getHistoryAction(action, url, state, title, params),
    );

    dropLastAsyncAction();
  };

  const sendLastAsyncUpdateAll = (url, state) => {
    if (Date.now() - lastAsyncTimestamp > 1000) {
      dropLastAsyncAction();
    }

    sendHistoryUpdateAll(lastAsyncAction, url, state, '', lastAsyncParams);
  };

  historyObj.back = () => {
    // console.log('History Back');
    setLastAsyncAction(HistoryAction.BACK);
    backFn.call(historyObj);
  };

  historyObj.forward = () => {
    // console.log('History Forward');
    setLastAsyncAction(HistoryAction.FORWARD);
    forwardFn.call(historyObj);
  };

  historyObj.go = (steps) => {
    // console.log('History Go', steps);
    setLastAsyncAction(HistoryAction.GO, { steps });
    goFn.call(historyObj, steps);
  };

  historyObj.pushState = (state, title, url) => {
    // console.log('History Push', state, title, url);
    pushStateFn.call(historyObj, state, title, url);
    sendLocationAll();
    sendHistoryUpdateAll(HistoryAction.PUSH_STATE, url, state, title);
  };

  historyObj.replaceState = (state, title, url) => {
    // console.log('History Replace', state, title, url);
    replaceStateFn.call(historyObj, state, title, url);
    sendLocationAll();
    sendHistoryUpdateAll(HistoryAction.REPLACE_STATE, url, state, title);
  };

  window.addEventListener('popstate', (event) => {
    const url = String(window.location);
    const state = event.state;

    // console.log('History Pop', state, url);
    sendLocationAll();
    sendLastAsyncUpdateAll(url, state);
  });

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
