(() => {
  const WORKER_PATH = './shared-worker.js';
  const CONSOLE_PATH = 'console.html';
  const T_KEY_CODE = 84;
  const Q_KEY_CODE = 81;
  const ARROW_UP_KEY_CODE = 38;
  const ARROW_DOWN_KEY_CODE = 40;

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
    subscribers.forEach((subscriber) =>
      sendCommandTo(subscriber, command, value),
    );
  };

  const sendCommandTo = (subscriber, command, value) => {
    console.log('Send response:', command, value);
    subscriber.postMessage(JSON.stringify({ type: command, value }), '*');
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
        response = 'Cannot convert response to JSON.';
      }
    } else {
      response = 'Command returned "undefined".';
    }

    sendCommandTo(responseTarget, Command.EXEC_RESPONSE, response);
  };

  const parseCommand = (str, responseTarget) => {
    console.log('Parse command received', str);

    if (typeof str !== 'string') {
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
    subscriber.addEventListener('message', ({ data }) =>
      parseCommand(data, subscriber),
    );

  const openNewWindow = () => {
    const frame = window.open(CONSOLE_PATH);

    frame.addEventListener('unload', () => {
      removeSubscriber(frame);
    });

    initializeAPI(frame);
  };

  let frame;

  const displayConsoleFrame = () => {
    frame = document.createElement('iframe');
    frame.src = CONSOLE_PATH;
    Object.assign(frame.style, {
      position: 'absolute',
      zIndex: '9999',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '250px',
      borderTop: '1px solid #eee',
      boxShadow: '0 0 10px #00000066',
      backgroundColor: '#ffffff',
    });

    document.body.appendChild(frame);

    initializeAPI(frame.contentWindow);
    addSubscriber(frame.contentWindow);
  };

  const hideConsoleFrame = () => {
    frame.remove();
    removeSubscriber(frame);
    frame = null;
  };

  const toggleConsoleFrame = () => {
    if (frame) {
      hideConsoleFrame();
    } else {
      displayConsoleFrame();
    }
  };

  window.addEventListener('keyup', ({ key, ctrlKey, shiftKey, keyCode }) => {
    if (
      shiftKey &&
      ctrlKey &&
      (key === 'ArrowUp' || keyCode === ARROW_UP_KEY_CODE)
    ) {
      openNewWindow();
    }

    if (shiftKey && (String(key).toUpperCase() === 'Q' || keyCode === Q_KEY_CODE)) {
      openNewWindow();
    }
  });

  if (window.SharedWorker) {
    const worker = new SharedWorker(WORKER_PATH);

    const subscriber = {
      postMessage: (data) => worker.port.postMessage(data),
      addEventListener: (...args) => worker.port.addEventListener(...args),
      worker,
    };

    addSubscriber(subscriber);
    initializeAPI(subscriber);

    worker.port.start();
  }

  window.addEventListener('keyup', ({ key, ctrlKey, shiftKey, keyCode }) => {
    if (
      shiftKey &&
      ctrlKey &&
      (key === 'ArrowDown' || keyCode === ARROW_DOWN_KEY_CODE)
    ) {
      toggleConsoleFrame();
    }

    if (shiftKey && (String(key).toUpperCase() === 'T' || keyCode === T_KEY_CODE)) {
      toggleConsoleFrame();
    }
  });
})();
