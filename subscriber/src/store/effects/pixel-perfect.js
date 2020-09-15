import { take } from '@actualwave/redux-side-effect';
import {
  PIXEL_PERFECT_ZOOM_SET,
  PIXEL_PERFECT_SHOW_RULER,
  PIXEL_PERFECT_HIDE_RULER,
  PIXEL_PERFECT_SHOW_GRID,
  PIXEL_PERFECT_HIDE_GRID,
  PIXEL_PERFECT_SHOW_IMAGE,
  PIXEL_PERFECT_HIDE_IMAGE,
  PIXEL_PERFECT_IMAGE_SETTINGS,
} from 'store/actions/pixel-perfect';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(PIXEL_PERFECT_ZOOM_SET, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_ZOOM_SET, payload);
});

take(PIXEL_PERFECT_SHOW_RULER, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_RULER_SHOW, payload);
});

take(PIXEL_PERFECT_HIDE_RULER, async () => {
  const comm = getServiceInstance();

  comm.send(Command.PP_RULER_HIDE);
});

take(PIXEL_PERFECT_SHOW_GRID, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_GRID_SHOW, payload);
});

take(PIXEL_PERFECT_HIDE_GRID, async () => {
  const comm = getServiceInstance();

  comm.send(Command.PP_GRID_HIDE);
});

take(PIXEL_PERFECT_SHOW_IMAGE, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_IMAGE_SHOW, payload);
});

take(PIXEL_PERFECT_HIDE_IMAGE, async () => {
  const comm = getServiceInstance();

  comm.send(Command.PP_IMAGE_HIDE);
});

take(PIXEL_PERFECT_IMAGE_SETTINGS, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.PP_IMAGE_SETTINGS, payload);
});
