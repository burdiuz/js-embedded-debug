((EDConsole) => {
  const Command = {
    REDUX_ACTION: 'redux-action',
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = () => (next) => (
    reducer,
    initialState,
    enhancer,
  ) => {
    const store = next(reducer, initialState, enhancer);

    return {
      ...store,
      dispatch: (...args) => {
        EDConsole.sendCommand(Command.REDUX_ACTION, args[0], ({ type }) => ({
          type,
          payload:
            "Sorry, JSON.stringify() could not handle this action contents, so it can't be shown here.",
        }));
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
})(window.EDConsole);
