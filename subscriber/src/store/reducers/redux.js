const getInitialState = () => ({
  list: [],
});

export const reduxInfoClear = (state) => ({
  ...state,
  list: [],
});

export const reduxActionReceived = (state, { payload: action }) => ({
  ...state,
  list: [...state.list, action],
});

export default getInitialState;
