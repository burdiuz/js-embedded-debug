export const WEBSOCKET_INFO_CLEAR = 'websocketInfoClear';
export const WEBSOCKET_UPDATED = 'websocketUpdated';
export const WEBSOCKET_MESSAGE = 'websocketMessage';

export const websocketInfoClear = () => ({ type: WEBSOCKET_INFO_CLEAR });

export const websocketUpdated = (info) => ({
  type: WEBSOCKET_UPDATED,
  payload: info,
});

export const websocketMessage = (info) => ({
  type: WEBSOCKET_MESSAGE,
  payload: info,
});
