export const EVAL_COMMAND_SEND = 'evalCommandSend';
export const EVAL_COMMAND_RESPONSE = 'evalCommandResponse';
export const COMMAND_HISTORY_ADD = 'commandHistoryAdd';

export const evalCommandSend = (command) => ({
  type: EVAL_COMMAND_SEND,
  payload: command,
});

export const evalCommandReceived = (response) => ({
  type: EVAL_COMMAND_RESPONSE,
  payload: response,
});

export const commandHistoryAdd = (command) => ({
  type: COMMAND_HISTORY_ADD,
  payload: command,
});
