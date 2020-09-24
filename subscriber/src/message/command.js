export const Command = {
  INIT_FRAME: 'init-frame',
  SET_PLUGINS_CONFIGURATION: 'set-plugins-configuration',
  CONNECTION_PING: 'connection-ping',
  CONNECTION_PONG: 'connection-pong',

  CONSOLE_LOG: 'console-log',
  EVAL_COMMAND: 'eval-command',
  EVAL_COMMAND_RESPONSE: 'eval-command/response',

  READ_LOCATION: 'read-location',
  READ_LOCATION_RESPONSE: 'read-location/response',
  LOCATION_SET: 'location-set',
  LOCATION_SET_HASH: 'location-set-hash',
  LOCATION_RELOAD: 'location-reload',
  HISTORY_BACK: 'history-back',
  HISTORY_FORWARD: 'history-forward',

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

  DOM_NODE_LOOKUP: 'dom-node-lookup',
  DOM_NODE_LOOKUP_RESPONSE: 'dom-node-lookup/response',
  DOM_QUERY_SELECTOR: 'dom-query-selector',
  DOM_QUERY_SELECTOR_RESPONSE: 'dom-query-selector/response',
  DOM_NODE_COMPUTED_STYLE: 'dom-node-computed-style',
  DOM_NODE_COMPUTED_STYLE_RESPONSE: 'dom-node-computed-style/response',
  DOM_NODE_SET_ATTRIBUTE: 'dom-node-set-attribute',
  DOM_NODE_SET_STYLE: 'dom-node-set-style',

  PP_ZOOM_SET: 'pixel-perfect-zoom-set',
  PP_RULER_SHOW: 'pixel-perfect-ruler-show',
  PP_RULER_HIDE: 'pixel-perfect-ruler-hide',
  PP_GRID_SHOW: 'pixel-perfect-grid-show',
  PP_GRID_HIDE: 'pixel-perfect-grid-hide',
  PP_IMAGE_SHOW: 'pixel-perfect-image-show',
  PP_IMAGE_HIDE: 'pixel-perfect-image-hide',
  PP_IMAGE_SETTINGS: 'pixel-perfect-image-settings',

  XHR_UPDATE: 'network-update',

  WEBSOCKET_CREATED: 'websocket-created',
  WEBSOCKET_UPDATED: 'websocket-updated',
  WEBSOCKET_MESSAGE: 'websocket-message',
  WEBSOCKET_MESSAGE_SEND: 'websocket-message-send',

  REDUX_ACTION: 'redux-action',
};
