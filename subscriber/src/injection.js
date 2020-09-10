import * as LogDataRenderer from '@actualwave/log-data-renderer';
import { Command } from './message/command';

import {
  composeMessage,
  readMessage,
  getMessageCommand,
  getMessageData,
} from './message/message';

export const readCookies = () =>
  document.cookie.split(';').map((str) => {
    const [key, value] = str.split('=');

    return { key: key.trim(), value: value.trim() };
  });

export const setCookie = (key, value) => {
  document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const removeCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const buildAPI = (storage) => ({
  read: () => {
    const list = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      list.push({ key, value: storage.getItem(key) });
    }

    return list;
  },
  set: (key, value) => storage.setItem(key, value),
  remove: (key) => storage.removeItem(key),
  clear: () => storage.clear(),
});

export const {
  read: readSessionStorage,
  set: setSessionStorage,
  remove: removeSessionStorage,
  clear: clearSessionStorage,
} = buildAPI(sessionStorage);

export const {
  read: readLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
  clear: clearLocalStorage,
} = buildAPI(localStorage);

(({
  consolePath = 'console.html',
  sharedWorker = './shared-worker.js',
} = {}) => {
  const sendCommand = (command, value) => sendCommandTo(window, command, value);

  const sendCommandTo = (subscriber, command, value) =>
    subscriber.postMessage(composeMessage(command, value), '*');

  const evaluateCode = (value, responseTarget) => {
    let result;

    try {
      eval(`result = ${value};`);
    } catch (error) {
      result = error;
    }

    let response = '';

    if (result) {
      response = LogDataRenderer.convert(result);
    } else {
      response = 'Command returned "undefined".';
    }

    sendCommandTo(responseTarget, Command.EVAL_COMMAND_RESPONSE, response);
  };

  const executeCommand = (command, data, responseTarget) => {
    console.info('Command:', command);
    switch (command) {
      case Command.INIT_FRAME:
        // addSubscriber(responseTarget);
        console.log('Init frame received!');
        break;
      case Command.EVAL_COMMAND:
        console.info(data);
        evaluateCode(data.value, responseTarget);
        break;
      case Command.READ_COOKIES:
        sendCommandTo(
          responseTarget,
          Command.READ_COOKIES_RESPONSE,
          readCookies(),
        );
        break;
      case Command.COOKIE_SET:
        setCookie(data.key, data.value);
        sendCommandTo(
          responseTarget,
          Command.READ_COOKIES_RESPONSE,
          readCookies(),
        );
        break;
      case Command.COOKIE_REMOVE:
        removeCookie(data.key);
        sendCommandTo(
          responseTarget,
          Command.READ_COOKIES_RESPONSE,
          readCookies(),
        );
        break;
      case Command.READ_LOCAL_STORAGE:
        sendCommandTo(
          responseTarget,
          Command.READ_LOCAL_STORAGE_RESPONSE,
          readLocalStorage(),
        );
        break;
      case Command.LOCAL_STORAGE_SET:
        localStorage.setItem(data.key, data.value);
        sendCommandTo(
          responseTarget,
          Command.READ_LOCAL_STORAGE_RESPONSE,
          readLocalStorage(),
        );
        break;
      case Command.LOCAL_STORAGE_REMOVE:
        localStorage.removeItem(data.key);
        sendCommandTo(
          responseTarget,
          Command.READ_LOCAL_STORAGE_RESPONSE,
          readLocalStorage(),
        );
        break;
      case Command.READ_SESSION_STORAGE:
        sendCommandTo(
          responseTarget,
          Command.READ_SESSION_STORAGE_RESPONSE,
          readSessionStorage(),
        );
        break;
      case Command.SESSION_STORAGE_SET:
        sessionStorage.setItem(data.key, data.value);
        sendCommandTo(
          responseTarget,
          Command.READ_SESSION_STORAGE_RESPONSE,
          readSessionStorage(),
        );
        break;
      case Command.SESSION_STORAGE_REMOVE:
        sessionStorage.removeItem(data.key);
        sendCommandTo(
          responseTarget,
          Command.READ_SESSION_STORAGE_RESPONSE,
          readSessionStorage(),
        );
        break;
      case Command.DOM_START_LOOKUP:
        break;
      case Command.READ_LOCATION:
        const {
          hash,
          host,
          hostname,
          href,
          origin,
          password,
          pathname,
          port,
          protocol,
          search,
          username,
        } = window.location;
        sendCommandTo(responseTarget, Command.READ_LOCATION_RESPONSE, {
          hash,
          host,
          hostname,
          href,
          origin,
          password,
          pathname,
          port,
          protocol,
          search,
          username,
        });
        break;
    }
  };

  (() => {
    try {
      const { log, error, warn, info } = console;

      Object.assign(console, {
        log(...args) {
          sendCommand(Command.CONSOLE_LOG, { type: 'log', args });
          log.apply(console, args);
        },
        error(...args) {
          sendCommand(Command.CONSOLE_LOG, { type: 'error', args });
          error.apply(console, args);
        },
        warn(...args) {
          sendCommand(Command.CONSOLE_LOG, { type: 'warn', args });
          warn.apply(console, args);
        },
        /*
        info(...args) {
          sendCommand(Command.CONSOLE_LOG, { type: 'info', args });
          info.apply(console, args);
        },
        */
      });
    } catch (error) {
      console.log(error);
    }

    console.log('Console Log API overwritten!');
  })();

  window.addEventListener('message', (event) => {
    const message = readMessage(event);

    if (message) {
      executeCommand(
        getMessageCommand(message),
        getMessageData(message),
        window,
      );
    }
  });

  (() => {
    const State = {
      OPENED: 1,
      LOADING: 3,
      DONE: 4,
    };

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
      _headers = [];

      /*
        @private
      */
      _error = null;

      constructor(...args) {
        super(...args);

        this._index = XMLHttpRequest.lastRequestIndex++;

        this.addEventListener('readystatechange', () =>
          this.handleReadyStateChange(),
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
        this._headers.push([header, value]);

        return super.setRequestHeader(header, value);
      }

      get requestIndex() {
        return this._index;
      }

      /*
        @private
      */
      handleReadyStateChange(event) {
        const [method, url] = this._openArgs;

        console.info({
          index: this._index,
          type: 'xhr',
          method,
          url,
          headers: this._headers,
          error: this._error && this._error.textContent,
          result: {
            responseText: this.responseText,
            responseType: this.responseType,
            responseURL: this.responseURL,
            responseHeaders: this.getAllResponseHeaders(),
            status: this.status,
            statusText: this.statusText,
          },
          state: this.readyState,
        });
      }
    }

    const prepareHeaders = (source) => {
      let headers = [];

      if (!source) {
        return headers;
      }

      if (typeof source.entries === 'function') {
        for (let entry of source.entries()) {
          headers.push(entry);
        }
      } else if (source instanceof Array) {
        headers.push(...source);
      } else {
        Object.keys(source).forEach((key) => {
          headers.push([key, String(source[key])]);
        });
      }

      return headers;
    };

    const getFetchCommandParams = (url, params) => {
      const index = XMLHttpRequest.lastRequestIndex++;
      const cmdParams = params || {};
      const { method = 'GET', headers, body } = cmdParams;

      return {
        index,
        method,
        url,
        params: {
          ...cmdParams,
          method,
          headers: prepareHeaders(headers),
          body: body && String(body),
        },
        state: '',
      };
    };

    const fetch = (url, params) => {
      const cmd = getFetchCommandParams(url, params);
      console.info({
        ...cmd,
        state: State.OPENED,
      });

      return new Promise((res, rej) => {
        console.info({
          ...cmd,
          state: State.LOADING,
        });

        const result = fetchFn(url, params);
        result.then((result) => {
          res(result);

          result.text().then((text) => {
            console.info({
              ...cmd,
              error: null,
              result: {
                responseText: text,
                responseType: result.type,
                responseURL: result.url,
                responseHeaders: prepareHeaders(result.headers),
                status: result.status,
                statusText: result.statusText,
              },
              state: State.DONE,
            });
          });
        });
        result.catch((error) => {
          rej(error);

          console.info({
            ...cmd,
            error: `${error.type} ${error.message}`,
            result: {},
            state: State.DONE,
          });
        });
      });
    };

    Object.assign(window, { fetch, XMLHttpRequest });
  })();
})(window);
