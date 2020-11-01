import { take, select } from '@actualwave/redux-side-effect';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';
import {
  PIXEL_PERFECT_ZOOM_SET,
  PIXEL_PERFECT_SHOW_RULER,
  PIXEL_PERFECT_SHOW_GRID,
  PIXEL_PERFECT_COLUMNS_SHOW,
  PIXEL_PERFECT_SHOW_IMAGE,
  PIXEL_PERFECT_HIDE_IMAGE,
  PIXEL_PERFECT_IMAGE_SETTINGS,
  PIXEL_WINDOW_SET_SIZE,
} from 'store/actions/pixel-perfect';
import {
  getImageScale,
  getImageOpacity,
  getImageOffsetX,
  getImageOffsetY,
} from 'store/selectors/pixel-perfect';

take(PIXEL_PERFECT_ZOOM_SET, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_ZOOM_SET, payload);
});

take(PIXEL_PERFECT_SHOW_RULER, async ({ payload: { rulerType } }) => {
  const comm = getServiceInstance();

  if (rulerType) {
    comm.send(Command.PP_RULER_SHOW, { rulerType });
  } else {
    comm.send(Command.PP_RULER_HIDE);
  }
});

take(PIXEL_PERFECT_SHOW_GRID, async ({ payload: { gridType } }) => {
  const comm = getServiceInstance();

  if (gridType) {
    comm.send(Command.PP_GRID_SHOW, { gridType });
  } else {
    comm.send(Command.PP_GRID_HIDE);
  }
});

take(PIXEL_PERFECT_COLUMNS_SHOW, async ({ payload: { columns, margin } }) => {
  const comm = getServiceInstance();

  if (columns) {
    comm.send(Command.PP_COLUMNS_SHOW, { columns, margin });
  } else {
    comm.send(Command.PP_COLUMNS_HIDE);
  }
});

take(PIXEL_PERFECT_SHOW_IMAGE, async ({ payload }) => {
  const comm = getServiceInstance();

  if (!payload) {
    comm.send(Command.PP_IMAGE_HIDE);
    return;
  }

  const scale = select(getImageScale);
  const opacity = select(getImageOpacity);
  const offsetX = select(getImageOffsetX);
  const offsetY = select(getImageOffsetY);

  comm.send(Command.PP_IMAGE_SHOW, {
    data: payload,
    scale,
    opacity,
    offsetX,
    offsetY,
  });
});

take(PIXEL_PERFECT_HIDE_IMAGE, async () => {
  const comm = getServiceInstance();

  comm.send(Command.PP_IMAGE_HIDE);
});

take(
  PIXEL_PERFECT_IMAGE_SETTINGS,
  async ({ payload: { scale, opacity, offsetX, offsetY } }) => {
    const comm = getServiceInstance();

    comm.send(Command.PP_IMAGE_SETTINGS, {
      scale: scale === undefined ? select(getImageScale) : scale,
      opacity: opacity === undefined ? select(getImageOpacity) : opacity,
      offsetX: offsetX === undefined ? select(getImageOffsetX) : offsetX,
      offsetY: offsetY === undefined ? select(getImageOffsetY) : offsetY,
    });
  },
);

take(PIXEL_WINDOW_SET_SIZE, async (payload) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_WINDOW_SET_SIZE, payload);
});
