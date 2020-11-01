const State = {
  OPENED: 1,
  LOADING: 3,
  DONE: 4,
};

const Command = {
  LOG: 'log',
  FETCH: 'fetch',
  XHR: 'xhr',
  EXEC: 'exec',
  EXEC_RESPONSE: 'exec-response',
  READ_COOKIES: 'read-cookies',
  SET_COOKIE: 'set-cookie',
  READ_SESSION_STORAGE: 'read-session-storage',
  SET_SESSION_STORAGE: 'set-session-storage',
  CLEAR_SESSION_STORAGE: 'clear-session-storage',
  READ_LOCAL_STORAGE: 'read-local-storage',
  SET_LOCAL_STORAGE: 'set-local-storage',
  CLEAR_LOCAL_STORAGE: 'clear-local-storage',
};

let worker;
let socket;
const frames = [];

if (typeof SharedWorker !== 'undefined') {
  worker = new SharedWorker('./console-worker.js');

  worker.port.start();
  worker.port.addEventListener('message', ({ data }) =>
    parseIncomingMessage(data)
  );

  window.addEventListener('keyup', ({ key, ctrlKey, shiftKey }) => {
    if (shiftKey && ctrlKey && key === 'ArrowUp') {
      frame = window.open('/subscriber/console-subscriber.html');

      frame.addEventListener('unload', () => {
        const index = frames.indexOf(frame);
      });

      frames.push(frame);
    }
  });
}

if (typeof WebSocket !== 'undefined') {
  socket = new WebSocket('ws://localhost:8887/provide');

  socket.addEventListener('message', ({ data }) => parseIncomingMessage(data));
  socket.addEventListener('close', (event) =>
    console.log('Socket connection closed unexpectedly:', event)
  );
}

const sendWorkerCommand = (type, data, index) => {
  if   (worker && worker.port){
    worker.port.postMessage(JSON.stringify({ type, data, index }));
  }
};

const sendSocketCommand = (type, data, index) => {
  if(socket) {
  socket.send(JSON.stringify({ type, data, index }));
  }
};

let commandIndex = 0;

const sendCommand = (type, data) => {
  commandIndex += 1;
  try {
    sendWorkerCommand(type, data ,commandIndex);
    sendSocketCommand(type, data, commandIndex);
  } catch (error) {
    console.log(error);
  }
};

const parseIncomingMessage = (jsonData) => {
  try {
    const { type, data } = JSON.parse(jsonData);

    if (type === Command.EXEC) {
      const result = executeCommand(data);
      sendCommand(Command.EXEC_RESPONSE, result);
    }
  } catch (error) {
    console.error(error);
  }
};

(() => {
  const { fetch: fetchFn, XMLHttpRequest: XMLHttpRequestDef } = window;

  class XMLHttpRequest extends XMLHttpRequestDef {
    static lastRequestIndex = 1;

    /*
      @private
    */
    _index = 0;

    /*
      @private
    */
    _openArgs = {};

    /*
      @private
    */
    _headers = {};

    /*
      @private
    */
    _error = null;

    constructor(...args) {
      super(...args);

      this._index = XMLHttpRequest.lastRequestIndex++;
      this.addEventListener('readystatechange', () =>
        this.handleReadyStateChange()
      );
      this.addEventListener('error', (error) => {
        this._error = error;
      });
    }

    open(method, url, ...args) {
      this._openArgs = { method, url };
      return super.open(method, url, ...args);
    }

    setRequestHeader(header, value) {
      this._headers[header] = value;

      return super.setRequestHeader(header, value);
    }

    get requestIndex() {
      return this._index;
    }

    /*
      @private
    */
    handleReadyStateChange(event) {
      const [, url] = this._openArgs;

      sendCommand(Command.XHR, {
        index: this._index,
        url,
        init: {
          ...this._openArgs,
          headers: this._headers;
        },
        error: this._error,
        result: {
          responseText: this.responseText,
          responseType: this.responseType,
          responseURL: this.responseURL,
          status: this.status,
        },
        state: this.readyState,
      });
    };
  }

  const fetch = (...args) => {
    const [url, init] = args;
    const index = XMLHttpRequest.lastRequestIndex++;

    console.log(url, init);

    sendCommand(Command.FETCH, { index, url, init, state: State.OPENED });

    return new Promise((res, rej) => {
      sendCommand(Command.FETCH, { index, url, init, state: State.LOADING });

      const result = fetchFn(...args);
      result.then((result) => {
        res(result);
        sendCommand(Command.FETCH, {
          index,
          url,
          init,
          error: null,
          result,
          state: State.DONE,
        });
      });
      result.catch((error) => {
        rej(error);
        sendCommand(Command.FETCH, {
          index,
          url,
          init,
          error,
          result: error,
          state: State.DONE,
        });
      });
    });
  };

  Object.assign(window, { fetch, XMLHttpRequest });
})();
