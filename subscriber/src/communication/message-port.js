import { Command } from 'message/command';
import { composeMessage, readMessage } from 'message/message';

export const factory = ({ source, target }) => {
  const send = (command, data = null) => {
    const str = composeMessage(command, data);

    console.log(str);

    target.postMessage(str, '*');
  };

  return {
    initialize: (callback) => {
      source.addEventListener('message', (event) => {
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
