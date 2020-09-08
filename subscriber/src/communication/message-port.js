import { Command } from 'message/command';
import { composeMessage, readMessage } from 'message/message';

export const factory = (target) => {
  const send = (command, data = null) => {
    const str = composeMessage(command, data);

    target.postMessage(str, '*');
  };

  return {
    initialize: (callback) => {
      target.addEventListener('message', (event) => {
        const message = readMessage(event);

        if (message) {
          callback(message);
        }
      });

      send(Command.INIT_FRAME);
    },

    send,
  };
};
