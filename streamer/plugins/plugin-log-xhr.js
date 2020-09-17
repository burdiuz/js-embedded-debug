((EDConsole) => {
  const Command = {
    XHR_UPDATE: 'network-update',
  };

  const State = {
    OPENED: 1,
    LOADING: 3,
    DONE: 4,
  };

  const { fetch: fetchFn, XMLHttpRequest: XMLHttpRequestDef } = window;
  let lastRequestIndex = 1;

  class XMLHttpRequest extends XMLHttpRequestDef {
    constructor(...args) {
      super(...args);

      this._index = lastRequestIndex++;
      this._openArgs = {};
      this._headers = [];
      this._body = '';
      this._error = null;

      this.addEventListener('readystatechange', (event) => {
        const { method, url } = this._openArgs;

        EDConsole.sendCommand(Command.XHR_UPDATE, {
          index: this._index,
          type: 'xhr',
          method,
          url,
          headers: this._headers,
          body: String(this._body),
          error: this._error && this._error.textContent,
          responseText: this.responseText,
          responseType: this.responseType,
          responseURL: this.responseURL,
          responseHeaders: prepareHeaders(this.getAllResponseHeaders()),
          status: this.status,
          statusText: this.statusText,
          state: this.readyState,
        });
      });

      this.addEventListener('error', (error) => {
        this._error = error;
      });

      const { open, send, setRequestHeader } = this;

      this.open = (method, url, ...args) => {
        this._openArgs = { method, url };
        return open.call(this, method, url, ...args);
      };

      this.setRequestHeader = (header, value) => {
        this._headers.push([header, value]);

        return setRequestHeader.call(this, header, value);
      };

      this.send = (value) => {
        this._body = value;
        return send.call(this, value);
      };
    }
    /*
    open(method, url, ...args) {
      this._openArgs = { method, url };
      return super.open(method, url, ...args);
    }

    setRequestHeader(header, value) {
      this._headers.push([header, value]);

      return super.setRequestHeader(header, value);
    }

    send(value) {
      this._body = value;
      return super.send(value);
    }
*/
    get requestIndex() {
      return this._index;
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
    } else if (typeof source === 'string') {
      source.split('\r\n').forEach((item) => {
        let [name, value = ''] = item.split(':');
        name = name.trim();
        value = value.trim();

        if (name) {
          headers.push([name, value]);
        }
      });
    } else {
      Object.keys(source).forEach((key) => {
        headers.push([key, String(source[key])]);
      });
    }

    return headers;
  };

  const getFetchCommandParams = (url, params) => {
    const index = XMLHttpRequest.lastRequestIndex++;
    const { method = 'GET', headers, body } = params || {};

    return {
      index,
      type: 'fetch',
      method,
      url,
      headers: prepareHeaders(headers),
      body: body && String(body),
      state: 0,
    };
  };

  const fetch = (url, params) => {
    const cmd = getFetchCommandParams(url, params);
    EDConsole.sendCommand(Command.XHR_UPDATE, {
      ...cmd,
      state: State.OPENED,
    });

    return new Promise((res, rej) => {
      EDConsole.sendCommand(Command.XHR_UPDATE, {
        ...cmd,
        state: State.LOADING,
      });

      const promise = fetchFn(url, params);

      promise.then((result) => {
        res(result);
        Object.assign(cmd, {
          responseType: result.type,
          responseURL: result.url,
          responseHeaders: prepareHeaders(result.headers),
          status: result.status,
          statusText: result.statusText,
          state: State.DONE,
        })

        EDConsole.sendCommand(Command.XHR_UPDATE, cmd);

        result
          .text()
          .then((text) => {
            EDConsole.sendCommand(Command.XHR_UPDATE, {
              ...cmd,
              error: null,
              responseText: text,
            });
          })
          .catch(() => {
            EDConsole.sendCommand(Command.XHR_UPDATE, {
              ...cmd,
              error: null,
              responseText: 'Error: Could not retrieve response body.',
            });
          });
      });

      promise.catch((error) => {
        rej(error);

        EDConsole.sendCommand(Command.XHR_UPDATE, {
          ...cmd,
          error: `${error.type} ${error.message}`,
          status: '---',
          statusText: 'Rejected promise',
        });
      });
    });
  };

  EDConsole.$fetch = fetch;
  EDConsole.$XMLHttpRequest = XMLHttpRequestDef;

  Object.assign(window, { fetch, XMLHttpRequest });
})(window.EDConsole);
