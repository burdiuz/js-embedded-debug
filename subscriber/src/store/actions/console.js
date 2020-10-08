export const CONSOLE_LOG_RECEIVED = 'consoleLogReceived';
export const CONSOLE_INSTANCE_SET = 'consoleInstanceSet';

export const consoleLogReceived = (log) => ({
  type: CONSOLE_LOG_RECEIVED,
  payload: log,
});

export const consoleInstanceSet = (instance) => ({
  type: CONSOLE_INSTANCE_SET,
  payload: instance,
});
