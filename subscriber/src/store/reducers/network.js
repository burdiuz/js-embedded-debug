const getInitialState = () => ({
  list: [],
});

export const networkUpdateReceived = (state, { payload: list }) => ({
  ...state,
  list,
});

export default getInitialState;
