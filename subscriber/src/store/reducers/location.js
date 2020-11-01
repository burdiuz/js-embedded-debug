const getInitialState = () => ({
  current: {},
  history: [],
  historyPosition: 0,
});

export const locationUpdateReceived = (state, { payload }) => ({
  ...state,
  current: payload || {},
});

export const locationHistoryChanged = (state, { payload }) => {
  return state;
};

export default getInitialState;
