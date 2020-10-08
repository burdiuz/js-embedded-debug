export const getCurrentDomelementSelectors = ({ domelement: { selected } }) =>
  (selected && selected.selectors) || [];

export const getCurrentDomelementAttributes = ({ domelement: { selected } }) =>
  (selected && selected.attributes) || [];

export const getCurrentDomelementStyles = ({ domelement: { selected } }) =>
  (selected && selected.styles) || [];

export const getDomelementComputedStyles = ({
  domelement: { computedStyles },
}) => computedStyles;

export const getCurrentDomelementDimensions = (state) => {
  const {
    domelement: {
      selected: { x, y, width, height },
    },
  } = state;

  return { x, y, width, height };
};

export const getCurrentDomelementVariableName = ({
  domelement: {
    selected: { variable },
  },
}) => variable;

export const getCurrentDomelementName = ({ domelement: { selected } }) => {
  const selectors = (selected && selected.selectors) || [];
  const { length } = selectors;

  return length ? selectors[length - 1] : '';
};
