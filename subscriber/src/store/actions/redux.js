export const REDUX_INFO_CLEAR = 'reduxInfoClear';
export const REDUX_ACTION_RECEIVED = 'reduxActionReceived';

export const reduxInfoClear = () => ({ type: REDUX_INFO_CLEAR });

export const reduxActionReceived = (action) => ({
  type: REDUX_ACTION_RECEIVED,
  payload: action,
});
