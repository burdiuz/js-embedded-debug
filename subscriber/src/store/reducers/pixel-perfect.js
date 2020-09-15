const getInitialState = () => ({
  zoom: 1,
  gidType: '',
  rulerType: '',
  imageData: null,
  imageScale: 1,
  imageOpacity: 1,
  imageOffsetX: 0,
  imageOffsetY: 0,
  imageLocked: true,
});

export const pixelPerfectZoomSet = (state, { payload: { value } }) => ({
  ...state,
  zoom: value,
});

export const pixelPerfectShowRuler = (state, { payload: { rulerType } }) => ({
  ...state,
  rulerType,
});
export const pixelPerfectHideRuler = (state) => ({
  ...state,
  rulerType: '',
});

export const pixelPerfectShowGrid = (state, { payload: { gridType } }) => ({
  ...state,
  gridType,
});
export const pixelPerfectHideGrid = (state) => ({
  ...state,
  gridType: '',
});

export const pixelPerfectShowImage = (
  state,
  { payload: { data, offsetX, offsetY, opacity, scale, locked } },
) => ({
  ...state,
  imageData: data,
  imageScale: scale,
  imageOpacity: opacity,
  imageOffsetX: offsetX,
  imageOffsetY: offsetY,
  imageLocked: locked,
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
  imageScale: scale,
  imageOpacity: opacity,
  imageOffsetX: offsetX,
  imageOffsetY: offsetY,
  imageLocked: locked,
});

export default getInitialState;
