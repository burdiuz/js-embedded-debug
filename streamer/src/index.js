import EventDispatcher from '@actualwave/event-dispatcher';
import * as LogDataRenderer from '@actualwave/log-data-renderer';
import * as Message from '../../subscriber/src/message/message';

const { readMessage, composeMessage } = Message;

const dispatcher = new EventDispatcher();

const Event = Object.freeze({
  CONSOLE_FRAME_OPENED: 'consoleFrameOpened',
  CONSOLE_FRAME_CLOSED: 'consoleFrameClosed',
  COMMAND_RECEIVED: 'commandReceived',
});

const handlers = {};

const subscribers = [];

const addSubscriber = (subscriber) => subscribers.push(subscriber);

const removeSubscriber = (subscriber) => {};

const EDConsole = {
  Event,
  Message,
  EventDispatcher,
  LogDataRenderer,
  getConsolePath: () => EDConsoleConfig.consoleHref,
  setCommandHandler: (command, handler) => {
    handlers[command] = handler;
  },
  subscribeToIncomingMessages: (handler) => {
    subscribers.push(handler);
  },
  unsubscribeFromIncomingMessages: (handler) => {
    const index = subscribers.indexOf(handler);

    if (index >= 0) {
      subscribers.splice(index, 1);
    }
  },
  addEventListener: (type, listener, priority) =>
    dispatcher.addEventListener(type, listener, priority),
  removeEventListener: (type, listener) =>
    dispatcher.removeEventListener(type, listener),
  consoleOpened: (contentWindow) =>
    dispatcher.dispatchEvent(Event.CONSOLE_FRAME_OPENED, contentWindow),
  consoleClosed: (contentWindow) =>
    dispatcher.dispatchEvent(Event.CONSOLE_FRAME_CLOSED, contentWindow),
  handleIncomingMessageEvent: (event, sendResponse) => {
    const message = readMessage(event);

    if (!message) {
      return;
    }

    EDConsole.handleIncomingCommand(
      Message.getMessageCommand(message),
      Message.getMessageData(message),
      sendResponse
    );
  },
  handleIncomingCommand: (command, data, sendResponse) => {
    const { [command]: handler } = handlers;

    const callback = (rCommand, rData) =>
      EDConsole.sendCommandTo(sendResponse, rCommand, rData);

    handler(command, data, callback);
    dispatcher.dispatchEvent(Event.COMMAND_RECEIVED, {
      command,
      data,
      sendResponse: callback,
    });
  },
  sendCommand: (command, data) =>
    subscribers.forEach((subscriber) =>
      EDConsole.sendCommandTo(subscriber, command, data)
    ),
  sendCommandTo: (sendResponse, command, data) =>
    sendResponse(composeMessage(command, data)),
};

window.EDConsole = EDConsole;
