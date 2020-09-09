export const XHR_INFO_CLEAR = 'xhrInfoClear';
export const XHR_UPDATE_RECEIVED = 'xhrUpdateReceived';

export const xhrInfoClear = () => ({ type: XHR_INFO_CLEAR });

export const xhrUpdateReceived = (info) => ({
  type: XHR_UPDATE_RECEIVED,
  payload: info,
});
