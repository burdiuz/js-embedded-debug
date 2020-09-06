export const EVAL_COMMAND_SEND = 'evalCommandSend';
export const EVAL_COMMAND_RESPONSE = 'evalCommandResponse';
export const CONSOLE_LOG_RECEIVED = 'consoleLogReceived';
export const CONSOLE_INSTANCE_SET = 'consoleInstanceSet';

export const evalCommandSend = (command) => ({
  type: EVAL_COMMAND_SEND,
  payload: command,
});

export const evalCommandReceived = (response) => ({
  type: EVAL_COMMAND_RESPONSE,
  payload: response,
});

export const consoleLogReceived = (log) => ({
  type: CONSOLE_LOG_RECEIVED,
  payload: log,
});

export const consoleInstanceSet = (instance) => ({
  type: CONSOLE_INSTANCE_SET,
  payload: instance,
});
