((EDConsole) => {
  const T_KEY_CODE = 84;
  const ARROW_DOWN_KEY_CODE = 40;
  let frame;

  const displayConsoleFrame = () => {
    frame = document.createElement('iframe');
    frame.src = EDConsole.getConsolePath();

    Object.assign(frame.style, {
      position: 'absolute',
      zIndex: '9999',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '300px',
      borderTop: '1px solid #eee',
      boxShadow: '0 0 10px #00000066',
      backgroundColor: '#ffffff',
    });

    document.body.appendChild(frame);
    EDConsole.consoleOpened(frame.contentWindow);
  };

  const hideConsoleFrame = () => {
    frame.remove();
    EDConsole.consoleClosed(frame.contentWindow);
    frame = null;
  };

  const toggleConsoleFrame = () => {
    if (frame) {
      hideConsoleFrame();
    } else {
      displayConsoleFrame();
    }
  };

  window.addEventListener(
    'keyup',
    ({ key, ctrlKey, shiftKey, altKey, keyCode }) => {
      if (
        shiftKey &&
        ctrlKey &&
        !altKey &&
        (key === 'ArrowDown' || keyCode === ARROW_DOWN_KEY_CODE)
      ) {
        toggleConsoleFrame();
      }

      if (
        shiftKey &&
        !ctrlKey &&
        !altKey &&
        (String(key).toUpperCase() === 'T' || keyCode === T_KEY_CODE)
      ) {
        toggleConsoleFrame();
      }
    },
  );
})(window.EDConsole);
