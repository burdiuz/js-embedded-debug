((EDConsole) => {
  const PLUGIN_NAME = 'log-redux';
  const Command = {
    REDUX_ACTION: 'redux-action',
  };

  const send = (action) =>
    EDConsole.sendCommand(Command.REDUX_ACTION, action, ({ type }) => ({
      type,
      payload:
        "Sorry, JSON.stringify() could not handle this action contents, so it can't be shown here.",
    }));

  const __REDUX_DEVTOOLS_EXTENSION__ = () => (next) => (
    reducer,
    initialState,
    enhancer,
  ) => {
    const store = next(reducer, initialState, enhancer);

    return {
      ...store,
      dispatch: (...args) => {
        send(args[0]);
        return store.dispatch(...args);
      },
    };
  };

  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (...funcs) => {
    const extensionCompose = (...funcs) => {
      return (...args) => {
        return funcs.reduceRight(
          (composed, f) => f(composed),
          __REDUX_DEVTOOLS_EXTENSION__()(...args),
        );
      };
    };

    if (funcs.length === 0) {
      return __REDUX_DEVTOOLS_EXTENSION__();
    }
    if (funcs.length === 1 && typeof funcs[0] === 'object') {
      return extensionCompose;
    }
    return extensionCompose(...funcs);
  };

  const noop = () => undefined;

  Object.assign(__REDUX_DEVTOOLS_EXTENSION__, {
    open: noop, // (...args) => console.log('open()', ...args),
    updateStore: noop, // (...args) => console.log('updateStore()', ...args),
    notifyErrors: noop, // (...args) => console.log('notifyErrors()', ...args),
    send: (performAction) => {
      // console.log('send()', ...args);

      const { action } = performAction || {};

      if (action) {
        send(action);
      }
    },
    listen: noop, // (...args) => console.log('listen()', ...args),
    connect: () => {
      // console.log('connect()', ...args);
      return __REDUX_DEVTOOLS_EXTENSION__;
    },
    disconnect: noop, // (...args) => console.log('disconnect()', ...args),
    error: noop, // (...args) => console.log('X.error()', ...args),
    init: noop, // (...args) => console.log('X.init()', ...args),
    subscribe: noop, // (...args) => console.log('X.subscribe()', ...args),
    unsubscribe: noop, // (...args) => console.log('X.unsubscribe()', ...args),
  });

  window.__REDUX_DEVTOOLS_EXTENSION__ = __REDUX_DEVTOOLS_EXTENSION__;

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
