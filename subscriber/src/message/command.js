export const Command = {
  INIT_FRAME: 'init-frame',

  CONSOLE_LOG: 'console-log',
  EVAL_COMMAND: 'eval-command',
  EVAL_COMMAND_RESPONSE: 'eval-command/response',

  READ_COOKIES: 'read-cookies',
  READ_COOKIES_RESPONSE: 'read-cookies/response',
  COOKIE_SET: 'cookie-set',
  COOKIE_REMOVE: 'cookie-remove',

  READ_LOCAL_STORAGE: 'read-local-storage',
  READ_LOCAL_STORAGE_RESPONSE: 'read-local-storage/response',
  LOCAL_STORAGE_SET: 'local-storage-set',
  LOCAL_STORAGE_REMOVE: 'local-storage-remove',

  READ_SESSION_STORAGE: 'read-session-storage',
  READ_SESSION_STORAGE_RESPONSE: 'read-session-storage/response',
  SESSION_STORAGE_SET: 'session-storage-set',
  SESSION_STORAGE_REMOVE: 'session-storage-remove',

  DOM_START_LOOKUP: 'dom-start-lookup',
  DOM_NODE_SELECTED: 'dom-node-selected',

  NETWORK_UPDATE: 'network-update',

  REDUX_ACTION: 'redux-action',
};