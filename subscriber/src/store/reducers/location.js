const getInitialState = () => ({
  current: {},
});

export const locationUpdateReceived = (state, { payload }) => ({
  ...state,
  current: payload || {},
});

export default getInitialState;
