import { factory as messagePortServiceFactory } from './message-port';
import { factory as sharedWorkServiceFactory } from './shared-worker';

let instance = null;

export const factory = ({
  messagePort = null,
  sharedWorker = '',
  webSocket = '',
} = {}) => {
  if (instance) {
    throw new Error(
      'Communication Service is a singleton and cannot be created more than once.',
    );
  }

  const services = [];

  if (messagePort) {
    services.push(messagePortServiceFactory(messagePort));
  }

  if (sharedWorker) {
    services.push(sharedWorkServiceFactory(sharedWorker));
  }

  instance = {
    initialize: (callback) => {
      services.forEach((service) => service.initialize(callback));
    },

    send: (command, data = null) => {
      services.forEach((service) => service.send(command, data));
    },

    get services() {
      return services.slice();
    },
  };

  return instance;
};

export const getServiceInstance = () => instance;
