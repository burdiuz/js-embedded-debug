const getInitialState = () => ({
  selected: {
    selectors: [],
    attributes: [],
    styles: [],
  },
  computedStyles: [],
});

export const domNodeInfoUpdate = (state, { payload: selected }) => ({
  ...state,
  selected,
});

export const domNodeComputedStyleResponse = (
  state,
  { payload: computedStyles },
) => ({
  ...state,
  computedStyles,
});

export default getInitialState;
