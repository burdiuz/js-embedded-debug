const getInitialState = () => ({
  instance: null,
});

export const consoleInstanceSet = (state, { payload: instance }) => ({
  ...state,
  instance,
});

export default getInitialState;
