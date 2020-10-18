export const getZoomLevel = ({ pixelperfect: { zoom } }) => zoom;

export const showGrid = ({ pixelperfect: { gridType } }) => !!gridType;

export const getGridType = ({ pixelperfect: { gridType } }) => gridType;

export const showRuler = ({ pixelperfect: { rulerType } }) => !!rulerType;

export const getRulerType = ({ pixelperfect: { rulerType } }) => rulerType;

export const showColumns = ({ pixelperfect: { columns } }) => !Number.isNaN(Number.parseInt(columns)) && Number.parseInt(columns) !== 0;

export const getColumns = ({ pixelperfect: { columns } }) => columns;

export const getColumnsMargin = ({ pixelperfect: { columnsMargin } }) => columnsMargin;

export const getImageData = ({ pixelperfect: { imageData } }) => imageData;

export const isImageLoaded = (state) => !!getImageData(state);

export const getImageScale = ({ pixelperfect: { imageScale } }) => imageScale;

export const getImageOpacity = ({ pixelperfect: { imageOpacity } }) =>
  imageOpacity;

export const getImageOffsetX = ({ pixelperfect: { imageOffsetX } }) =>
  imageOffsetX;

export const getImageOffsetY = ({ pixelperfect: { imageOffsetY } }) =>
  imageOffsetY;

export const getWindowWidth = ({ pixelperfect: { windowWidth } }) =>
  windowWidth;

export const getWindowHeight = ({ pixelperfect: { windowHeight } }) =>
  windowHeight;

export const getMouseX = ({ pixelperfect: { mouseX } }) => mouseX;

export const getMouseY = ({ pixelperfect: { mouseY } }) => mouseY;
