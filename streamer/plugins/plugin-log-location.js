((EDConsole) => {
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

  EDConsole.setCommandHandler(Command.HISTORY_BACK, () => window.history.back());

  EDConsole.setCommandHandler(Command.HISTORY_FORWARD, () => window.history.forward());

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
})(window.EDConsole);
