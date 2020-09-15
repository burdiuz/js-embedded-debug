export const getZoomLevel = ({ pixelperfect: { zoom } }) => zoom;

export const showGrid = ({ pixelperfect: { gridType } }) => !!gridType;

export const getGridType = ({ pixelperfect: { gridType } }) => gridType;

export const showRuler = ({ pixelperfect: { rulerType } }) => !!rulerType;

export const getRulerType = ({ pixelperfect: { rulerType } }) => rulerType;

export const getImageData = ({ pixelperfect: { imageData } }) => imageData;

export const getImageScale = ({ pixelperfect: { imageScale } }) => imageScale;

export const getImageOpacity = ({ pixelperfect: { imageOpacity } }) =>
  imageOpacity;

export const getImageOffsetX = ({ pixelperfect: { imageOffsetX } }) =>
  imageOffsetX;

export const getImageOffsetX = ({ pixelperfect: { imageOffsetY } }) =>
  imageOffsetY;
