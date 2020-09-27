const getInitialState = () => ({
  selected: {
    selectors: [],
    attributes: [],
    styles: [],
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  computedStyles: [],
});

export const domNodeInfoUpdate = (state, { payload }) => {
  return {
    ...state,
    selected: payload || getInitialState().selected,
  };
};

export const domNodeComputedStyleResponse = (
  state,
  { payload: computedStyles },
) => ({
  ...state,
  computedStyles,
});

export default getInitialState;
