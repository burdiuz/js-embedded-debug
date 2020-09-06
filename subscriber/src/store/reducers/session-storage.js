const getInitialState = () => ({
  list: [],
});

export const sessionStorageUpdate = (state, { payload: list }) => ({
  ...state,
  list,
});

export default getInitialState;
