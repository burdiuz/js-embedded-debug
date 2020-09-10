((EDConsole) => {
  const { LogDataRenderer } = EDConsole;
  const Command = {
    CONSOLE_LOG: 'console-log',
    EVAL_COMMAND: 'eval-command',
    EVAL_COMMAND_RESPONSE: 'eval-command/response',
  };

  try {
    const { log: logFn, error: errorFn, warn: warnFn, info: infoFn } = console;

    const cmdFn = (type, args) =>
      EDConsole.sendCommand(Command.CONSOLE_LOG, {
        type,
        args: args.map((item) => LogDataRenderer.convert(item)),
      });

    const log = (...args) => {
      cmdFn('log', args);
      logFn.apply(console, args);
    };

    const error = (...args) => {
      cmdFn('error', args);
      errorFn.apply(console, args);
    };

    const warn = (...args) => {
      cmdFn('warn', args);
      warnFn.apply(console, args);
    };

    const info = (...args) => {
      cmdFn('info', args);
      info.apply(console, args);
    };

    Object.assign(console, {
      log,
      error,
      warn,
      /*
      info,
      */
    });

    if (!window.log) {
      window.log = log;
    }
  } catch (error) {
    console.log(error);
  }

  EDConsole.setCommandHandler(
    Command.EVAL_COMMAND,
    (_, { value }, sendResponse) => {
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

      sendResponse(Command.EVAL_COMMAND_RESPONSE, response);
    }
  );
})(window.EDConsole);
