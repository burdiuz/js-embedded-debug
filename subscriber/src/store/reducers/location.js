const getInitialState = () => ({
  current: {},
});

export const locationkUpdateReceived = (state, { payload }) => ({
  ...state,
  current: payload || {},
});

export default getInitialState;
