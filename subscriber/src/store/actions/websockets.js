export const WEBSOCKET_INFO_CLEAR = 'websocketInfoClear';
export const WEBSOCKET_CREATED = 'websocketCreated';
export const WEBSOCKET_UPDATED = 'websocketUpdated';
export const WEBSOCKET_MESSAGE = 'websocketMessage';
export const WEBSOCKET_SEND_MESSAGE = 'websocketSendMessage';

export const websocketInfoClear = () => ({ type: WEBSOCKET_INFO_CLEAR });

export const websocketCreated = (info) => ({
  type: WEBSOCKET_CREATED,
  payload: info,
});

export const websocketUpdated = (info) => ({
  type: WEBSOCKET_UPDATED,
  payload: info,
});

export const websocketMessage = (info) => ({
  type: WEBSOCKET_MESSAGE,
  payload: info,
});

export const websocketSendMessage = (info) => ({
  type: WEBSOCKET_SEND_MESSAGE,
  payload: info,
});
