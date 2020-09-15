export const PIXEL_PERFECT_ZOOM_SET = 'pixelPerfectZoomSet';

export const PIXEL_PERFECT_SHOW_RULER = 'pixelPerfectShowRuler';
export const PIXEL_PERFECT_HIDE_RULER = 'pixelPerfectHideRuler';

// grid of two types -- 5 and 10 pixels
export const PIXEL_PERFECT_SHOW_GRID = 'pixelPerfectShowGrid';
export const PIXEL_PERFECT_HIDE_GRID = 'pixelPerfectHideGrid';

// image, offset, scale, opacity
export const PIXEL_PERFECT_SHOW_IMAGE = 'pixelPerfectShowImage';
export const PIXEL_PERFECT_HIDE_IMAGE = 'pixelPerfectHideImage';

export const PIXEL_PERFECT_IMAGE_SETTINGS = 'pixelPerfectImageSettings';

export const pixelPerfectZoomSet = (zoom) => ({
  type: PIXEL_PERFECT_SHOW_RULER,
  payload: { value: zoom },
});

export const pixelPerfectShowRuler = (rulerType) => ({
  type: PIXEL_PERFECT_SHOW_RULER,
  payload: { rulerType },
});
export const pixelPerfectHideRuler = () => ({ type: PIXEL_PERFECT_HIDE_RULER });

export const pixelPerfectShowGrid = (gridType) => ({
  type: PIXEL_PERFECT_SHOW_GRID,
  payload: { gridType },
});
export const pixelPerfectHideGrid = () => ({ type: PIXEL_PERFECT_HIDE_GRID });

export const pixelPerfectShowImage = ({
  data,
  offsetX,
  offsetY,
  opacity,
  scale,
  locked,
}) => ({
  type: PIXEL_PERFECT_SHOW_IMAGE,
  payload: { data, offsetX, offsetY, opacity, scale },
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
