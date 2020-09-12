((EDConsole) => {
  if (typeof window.WebSocket === 'undefined') {
    return;
  }

  const Command = {
    WEBSOCKET_CREATED: 'websocket-created',
    WEBSOCKET_UPDATED: 'websocket-updated',
    WEBSOCKET_MESSAGE: 'websocket-message',
    WEBSOCKET_MESSAGE_SEND: 'websocket-message-send',
  };

  const WebSocketState = {
    CREATED: 0,
    OPENED: 1,
    CLOSED: 3,
  };

  const WebsocketMessageType = {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing',
  };

  const { WebSocket: WebSocketDef } = window;
  // TODO once WeakRef available, make it weak ref collection
  const webSockets = {};

  class WebSocket extends WebSocketDef {
    static lastRequestIndex = 1;

    /*
      @private
    */
    _index = 0;

    /*
      @private
    */
    _openHandler = null;

    /*
      @private
    */
    _closeHandler = null;

    /*
      @private
    */
    _error = null;

    constructor(url, protocols) {
      super(url, protocols);

      this._index = WebSocket.lastRequestIndex++;
      webSockets[this._index] = this;

      const cmdData = {
        index: this._index,
        url,
        protocols,
        state: WebSocketState.CREATED,
      };

      EDConsole.sendCommand(Command.WEBSOCKET_CREATED, cmdData);

      this.addEventListener('message', ({ data, detail }) => {
        EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
          index: this._index,
          type: WebsocketMessageType.INCOMING,
          data: String(data || detail),
        });
      });

      this.addEventListener('error', (error) => {
        this._error = error;
      });

      super.onopen = (event) => {
        EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, {
          ...cmdData,
          state: WebSocketState.OPENED,
        });

        if (typeof this._openHandler === 'function') {
          this._openHandler.call(this, event);
        }
      };

      super.onclose = (event) => {
        EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, {
          ...cmdData,
          state: WebSocketState.CLOSED,
        });

        if (typeof this._closeHandler === 'function') {
          this._closeHandler.call(this, event);
        }
      };
    }

    get onopen() {
      return this._openHandler;
    }

    set onopen(handler) {
      this._openHandler = handler;
    }

    get onclose() {
      return this._closeHandler;
    }

    set onclose(handler) {
      this._closeHandler = handler;
    }

    send(data) {
      EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
        index: this._index,
        type: WebsocketMessageType.OUTGOING,
        data: String(data || detail),
      });

      return super.send(data);
    }
  }

  Object.assign(window, { WebSocket });

  EDConsole.setCommandHandler(
    Command.WEBSOCKET_MESSAGE_SEND,
    (_, { index, message }) => {
      const webSocket = webSockets[index];

      if (webSocket) {
        webSocket.send(message);
      }
    },
  );
})(window.EDConsole);
