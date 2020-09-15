((EDConsole) => {
  const T_KEY_CODE = 84;
  const ARROW_DOWN_KEY_CODE = 40;
  let frame;
  const bodyPrevPaddingBottom = document.createElement('div');
  Object.assign(bodyPrevPaddingBottom.style, {
    flex: '0 0 300px',
    minHeight: '300px',
    height: '300px',
  });

  const displayConsoleFrame = () => {
    frame = document.createElement('iframe');
    frame.src = EDConsole.getConsolePath();

    Object.assign(frame.style, {
      position: 'fixed',
      zIndex: Math.pow(2, 32) - 1,
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '300px',
      borderTop: '1px solid #eee',
      boxShadow: '0 0 10px #00000066',
      backgroundColor: '#ffffff',
    });

    const { body } = document;

    body.appendChild(bodyPrevPaddingBottom);
    body.appendChild(frame);
    EDConsole.consoleOpened(frame.contentWindow);
  };

  const hideConsoleFrame = () => {
    bodyPrevPaddingBottom.remove();
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
        ctrlKey &&
        !altKey &&
        (String(key).toUpperCase() === 'T' || keyCode === T_KEY_CODE)
      ) {
        toggleConsoleFrame();
      }
    },
  );
})(window.EDConsole);
