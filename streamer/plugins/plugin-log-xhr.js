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
})(window.EDConsole);
