const getInitialState = () => ({
  list: [],
});

export const localStorageUpdate = (state, { payload: list }) => ({
  ...state,
  list,
});

export default getInitialState;
