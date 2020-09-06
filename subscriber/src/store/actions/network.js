export const NETWORK_INFO_CLEAR = 'networkInfoClear';
export const NETWORK_UPDATE_RECEIVED = 'networkUpdateReceived';

export const networkInfoClear = () => ({ type: NETWORK_INFO_CLEAR });

export const networkUpdateReceived = (info) => ({
  type: NETWORK_UPDATE_RECEIVED,
  payload: info,
});
