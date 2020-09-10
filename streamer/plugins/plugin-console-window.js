((EDConsole) => {
  const Q_KEY_CODE = 81;
  const ARROW_UP_KEY_CODE = 38;

  const openNewWindow = () => {
    const frame = window.open(EDConsole.getConsolePath());

    frame.addEventListener('unload', () => {
      EDConsole.consoleClosed(frame);
    });

    EDConsole.consoleOpened(frame);
  };

  window.addEventListener(
    'keyup',
    ({ key, ctrlKey, shiftKey, altKey, keyCode }) => {
      if (
        shiftKey &&
        ctrlKey &&
        !altKey &&
        (key === 'ArrowUp' || keyCode === ARROW_UP_KEY_CODE)
      ) {
        openNewWindow();
      }

      if (
        shiftKey &&
        !ctrlKey &&
        !altKey &&
        (String(key).toUpperCase() === 'Q' || keyCode === Q_KEY_CODE)
      ) {
        openNewWindow();
      }
    },
  );
})(window.EDConsole);
