const subscribers = [];

const addSubscriber = (subscriber) => subscribers.push(subscriber);

const removeSubscriber = (subscriber) => {
  const index = subscribers.indexOf(subscriber);

  if (index >= 0) {
    subscribers.splice(index, 1);
  }
};

const Command = {
  INIT_FRAME: 'init-frame',
  EXEC: 'exec',
  EXEC_RESPONSE: 'exec/response',
};

const sendCommand = (command, value) => {
  subscribers.forEach((subscriber) => {
    subscriber.postMessage(JSON.stringify({ type: command, value }));
  });
};

const sendCommandTo = (subscriber, command, value) => {
  console.log('Send response:', command, value);
  subscriber.postMessage(JSON.stringify({ type: command, value }));
};

const evaluateCode = ({ value }, responseTarget) => {
  let result;

  try {
    eval(`result = ${value};`);
  } catch (error) {
    result = error;
  }

  let response = '';

  if (result) {
    try {
      response = LogDataRenderer.convert(result);
      JSON.stringify(response);
    } catch (error) {
      response = LogDataRenderer.convert('Cannot convert response to JSON.');
    }
  } else {
    response = LogDataRenderer.convert('Command returned "undefined".');
  }

  sendCommandTo(responseTarget, Command.EXEC_RESPONSE, response);
};

const parseCommand = (str, responseTarget) => {
  console.log('Parse command received', str);

  if(typeof str !== 'string') {
    return;
  }

  let data;

  try {
    data = JSON.parse(str);
  } catch (error) {
    console.log(error);
    return;
  }

  const { type } = data;

  console.log('Parsed:', data);

  switch (type) {
    case Command.INIT_FRAME:
      addSubscriber(responseTarget);
      break;
    case Command.EXEC:
      evaluateCode(data, responseTarget);
      break;
    case Command.EXEC_RESPONSE:
      break;
    default:
      console.log('Unknown command type:', type);
      break;
  }
};

const initializeAPI = (subscriber) =>
subscriber.addEventListener('message', ({ data }) => parseCommand(data, subscriber));

const openNewFrame = () => {
  const frame = window.open('console.html');

  frame.addEventListener('unload', () => {
    removeSubscriber(frame);
  });

  initializeAPI(frame);
};

window.addEventListener('keyup', ({ key, ctrlKey, shiftKey }) => {
  if (shiftKey && ctrlKey && key === 'ArrowUp') {
    openNewFrame();
  }

  if (shiftKey && key.toUpperCase() === 'Q') {
    openNewFrame();
  }
});

if (window.SharedWorker) {
  const worker = new SharedWorker('./shared-worker.js');

  const subscriber = {
    postMessage: (...args) => worker.port.postMessage(...args),
    addEventListener: (...args) => worker.port.addEventListener(...args),
    worker,
  };

  addSubscriber(subscriber);
  initializeAPI(subscriber);

  worker.port.start();
}
