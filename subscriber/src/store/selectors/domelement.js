export const getCurrentDomelementSelectors = ({ domelement: { selected } }) =>
  (selected && selected.selectors) || [];

export const getCurrentDomelementAttributes = ({ domelement: { selected } }) =>
  (selected && selected.attributes) || [];

export const getCurrentDomelementStyles = ({ domelement: { selected } }) =>
  (selected && selected.styles) || [];

export const getDomelementComputedStyles = ({
  domelement: { computedStyles },
}) => computedStyles;

export const getCurrentDomelementDimensions = ({
  domelement: {
    selected: { x, y, width, height },
  },
}) => ({ x, y, width, height });

export const getCurrentDomelementName = ({ domelement: { selected } }) => {
  const selectors = (selected && selected.selectors) || [];
  const { length } = selectors;

  return length ? selectors[length - 1] : '';
};
