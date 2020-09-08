import {
  composeMessage,
  readMessage,
} from 'message/message';

export const factory = (path) => {
  if (!window.SharedWorker) {
    return null;
  }

  const worker = new SharedWorker(path);

  return {
    initialize: (callback) => {
      worker.port.addEventListener('message', (event) => {
        const message = readMessage(event);

        if (message) {
          callback(message);
        }
      });

      worker.port.start();
    },

    send: (command, data = null) => {
      const str = composeMessage(command, data);

      worker.port.postMessage(str);
    },
  };
};
