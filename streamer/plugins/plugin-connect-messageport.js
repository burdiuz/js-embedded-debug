((EDConsole) => {
  const { Event, Message } = EDConsole;
  const Command = {
    INIT_FRAME: 'init-frame',
    SET_PLUGINS_CONFIGURATION: 'set-plugins-configuration',
    CONNECTION_PING: 'connection-ping',
    CONNECTION_PONG: 'connection-pong',
  };

  const targets = new Map();

  const removeTarget = (target) => {
    if (!targets.has(target)) {
      return;
    }
    const messageSubscriber = targets.get(target);

    EDConsole.unsubscribeFromIncomingMessages(messageSubscriber);
    targets.delete(target);

    try {
      target.removeEventListener('message', messageHandler);
    } catch (error) {}
  };

  const createMessageSubscriber = (target) => (str) => {
    if (target) {
      target.postMessage(str, '*');
    }
  };

  const messageHandler = (event) => {
    const { source: target } = event;

    if (!target) {
      console.log('Message event came with null source.');
      return;
    }

    if (targets.has(target)) {
      EDConsole.handleIncomingMessageEvent(event, targets.get(target));
      return;
    }

    const message = Message.readMessage(event);

    if (message && Message.getMessageCommand(message) === Command.INIT_FRAME) {
      const messageSubscriber = createMessageSubscriber(target);
      EDConsole.subscribeToIncomingMessages(messageSubscriber);
      targets.set(target, messageSubscriber);

      EDConsole.handleIncomingCommand(
        Message.getMessageCommand(message),
        Message.getMessageData(message),
        messageSubscriber,
      );
    }
  };

  EDConsole.addEventListener(Event.CONSOLE_FRAME_OPENED, ({ data: target }) => {
    target.addEventListener('unload', () => removeTarget(target));
    try {
      target.addEventListener('message', messageHandler);
    } catch (error) {}
  });

  EDConsole.addEventListener(Event.CONSOLE_FRAME_CLOSED, ({ data: target }) =>
    removeTarget(target),
  );

  window.addEventListener('message', messageHandler);

  EDConsole.setCommandHandler(Command.INIT_FRAME, (_, src, sendResponse) =>
    sendResponse(Command.SET_PLUGINS_CONFIGURATION, {
      plugins: EDConsole.getRegisteredPlugins(),
    }),
  );

  EDConsole.setCommandHandler(Command.CONNECTION_PING, (_, src, sendResponse) =>
    sendResponse(Command.CONNECTION_PONG),
  );
})(window.EDConsole);
