const getInitialState = () => ({
  list: [],
});

export const cookiesUpdate = (state, { payload: list }) => ({
  ...state,
  list,
});

export default getInitialState;
