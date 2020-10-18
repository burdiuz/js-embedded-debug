const getInitialState = () => ({
  zoom: 1,
  gridType: '',
  rulerType: '',
  columns: '',
  columnsMargin: '0',
  imageData: null,
  imageScale: 1,
  imageOpacity: 1,
  imageOffsetX: 0,
  imageOffsetY: 0,
  imageLocked: true,
  windowWidth: 0,
  windowHeight: 0,
  mouseX: 0,
  mouseY: 0,
});

export const pixelPerfectZoomSet = (state, { payload: { value } }) => ({
  ...state,
  zoom: value,
});

export const pixelPerfectShowRuler = (state, { payload: { rulerType } }) => ({
  ...state,
  rulerType,
});

export const pixelPerfectShowGrid = (state, { payload: { gridType } }) => ({
  ...state,
  gridType,
});

export const pixelPerfectColumnsShow = (
  state,
  { payload: { columns, margin } },
) => ({
  ...state,
  columns,
  columnsMargin: margin,
});

export const pixelPerfectShowImage = (state, { payload }) => ({
  ...state,
  imageData: payload,
  imageScale: 1,
  imageOpacity: 1,
  imageOffsetX: 0,
  imageOffsetY: 0,
  imageLocked: true,
});

export const pixelPerfectHideImage = (state) => ({
  ...state,
  imageData: null,
});

export const pixelPerfectImageSettings = (
  state,
  { payload: { offsetX, offsetY, opacity, scale, locked } },
) => ({
  ...state,
  imageOffsetX: offsetX !== undefined ? offsetX : state.imageOffsetX,
  imageOffsetY: offsetY !== undefined ? offsetY : state.imageOffsetY,
  imageOpacity: opacity !== undefined ? opacity : state.imageOpacity,
  imageScale: scale !== undefined ? scale : state.imageScale,
  imageLocked: locked !== undefined ? locked : state.imageLocked,
});

export const pixelPerfectWindowSize = (
  state,
  { payload: { width: windowWidth, height: windowHeight } },
) => ({
  ...state,
  windowWidth,
  windowHeight,
});

export const pixelPerfectMousePosition = (
  state,
  { payload: { x: mouseX, y: mouseY } },
) => ({
  ...state,
  mouseX,
  mouseY,
});

export default getInitialState;
