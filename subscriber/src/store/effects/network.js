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
    _headers = {};

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
        },
        state: this.readyState,
      });
    }
  }

  const getFetchCommandParams = (url, params) => {
    const index = XMLHttpRequest.lastRequestIndex++;
    const cmdParams = params || {};
    const { method = 'GET', headers, body } = cmdParams;
    let cmdHeaders = headers;

    if(headers && typeof headers.entries === 'function') {
      cmdHeaders = [];

      for(let entry of headers.entries()) {
        cmdHeaders.push(entry);
      }
    }

    return {
      index,
      method,
      url,
      params: {
        ...cmdParams,
        method,
        headers: cmdHeaders,
        body: body && String(body),
      },
      state: '',
    };
  };

  const fetch = (url, params) => {
    const cmd = getFetchCommandParams(url, params);
    console.info(cmd);

    sendCommand(Command.FETCH, {
      index,
      type: 'fetch',
      method,
      url,
      params: {
        ...cmdParams,
        method,
        headers: cmdHeaders,
        body: body && String(body),
      },
      state: State.OPENED,
    });

    return new Promise((res, rej) => {
      sendCommand(Command.FETCH, { index, url, params, state: State.LOADING });

      const result = fetchFn(url, params);
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
