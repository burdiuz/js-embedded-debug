export const PIXEL_PERFECT_ZOOM_SET = 'pixelPerfectZoomSet';

export const PIXEL_PERFECT_SHOW_RULER = 'pixelPerfectShowRuler';

// grid of two types -- 5 and 10 pixels
export const PIXEL_PERFECT_SHOW_GRID = 'pixelPerfectShowGrid';

// bootstrap-like columns
export const PIXEL_PERFECT_COLUMNS_SHOW = 'pixelPerfectColumnsShow';

// image, offset, scale, opacity
export const PIXEL_PERFECT_SHOW_IMAGE = 'pixelPerfectShowImage';
export const PIXEL_PERFECT_HIDE_IMAGE = 'pixelPerfectHideImage';

export const PIXEL_PERFECT_IMAGE_SETTINGS = 'pixelPerfectImageSettings';

export const PIXEL_WINDOW_SIZE = 'pixelPerfectWindowSize';
export const PIXEL_WINDOW_SET_SIZE = 'pixelPerfectWindowSetSize';
export const PIXEL_MOUSE_POSITION = 'pixelPerfectMousePosition';

export const pixelPerfectZoomSet = (zoom) => ({
  type: PIXEL_PERFECT_ZOOM_SET,
  payload: { value: zoom },
});

export const pixelPerfectShowRuler = (rulerType) => ({
  type: PIXEL_PERFECT_SHOW_RULER,
  payload: { rulerType },
});

export const pixelPerfectShowGrid = (gridType) => ({
  type: PIXEL_PERFECT_SHOW_GRID,
  payload: { gridType },
});

export const pixelPerfectColumnsShow = ({ columns, margin }) => ({
  type: PIXEL_PERFECT_COLUMNS_SHOW,
  payload: { columns, margin },
});

export const pixelPerfectShowImage = (base64) => ({
  type: PIXEL_PERFECT_SHOW_IMAGE,
  payload: base64,
});
export const pixelPerfectHideImage = () => ({ type: PIXEL_PERFECT_HIDE_IMAGE });

export const pixelPerfectImageSettings = ({
  offsetX,
  offsetY,
  opacity,
  scale,
  locked,
}) => ({
  type: PIXEL_PERFECT_IMAGE_SETTINGS,
  payload: { offsetX, offsetY, opacity, scale },
});

export const pixelPerfectWindowSize = ({ width, height }) => ({
  type: PIXEL_WINDOW_SIZE,
  payload: { width, height },
});

export const pixelPerfectWindowSetSize = ({ width, height }) => ({
  type: PIXEL_WINDOW_SET_SIZE,
  payload: { width, height },
});

export const pixelPerfectMousePosition = ({ x, y }) => ({
  type: PIXEL_MOUSE_POSITION,
  payload: { x, y },
});
