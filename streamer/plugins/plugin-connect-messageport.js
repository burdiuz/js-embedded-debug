((EDConsole) => {
  const { Event, Message } = EDConsole;
  const Command = {
    INIT_FRAME: 'init-frame',
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

  const messageHandler = (event) => {
    const { source: target } = event;
    const messageSubscriber = (str) => target.postMessage(str, '*');
    if (targets.has(target)) {
      EDConsole.handleIncomingMessageEvent(event, messageSubscriber);
      return;
    }

    const message = Message.readMessage(event);
    console.info(message);

    if (message && Message.getMessageCommand(message) === Command.INIT_FRAME) {
      EDConsole.subscribeToIncomingMessages(messageSubscriber);
      targets.set(target, messageSubscriber);
    }
  };

  EDConsole.addEventListener(Event.CONSOLE_FRAME_OPENED, ({ data: target }) => {
    target.addEventListener('unload', () => removeTarget(target));
    try {
      target.addEventListener('message', messageHandler);
    } catch (error) {}
  });

  EDConsole.addEventListener(Event.CONSOLE_FRAME_CLOSED, ({ data: target }) =>
    removeTarget(target)
  );

  window.addEventListener('message', messageHandler);
})(window.EDConsole);
