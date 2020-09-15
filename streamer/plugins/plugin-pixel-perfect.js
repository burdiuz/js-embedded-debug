((EDConsole) => {
  const Command = {
    PP_ZOOM_SET: 'pixel-perfect-zoom-set',
    PP_RULER_SHOW: 'pixel-perfect-ruler-show',
    PP_RULER_HIDE: 'pixel-perfect-ruler-hide',
    PP_GRID_SHOW: 'pixel-perfect-grid-show',
    PP_GRID_HIDE: 'pixel-perfect-grid-hide',
    PP_IMAGE_SHOW: 'pixel-perfect-image-show',
    PP_IMAGE_HIDE: 'pixel-perfect-image-hide',
  };

  const container = document.createElement('div');

  const createEl = (tag = 'div') => {
    const el = document.createElement(tag);
    el.style.display = 'none';
    container.appendChild(el);

    return el;
  };

  const grid = createEl();
  const image = createEl();
  const rulerX = createEl();
  const rulerY = createEl();
  const rulerXY = createEl();

  EDConsole.setCommandHandler(Command.PP_ZOOM_SET, ({ value }) => {
    document.body.style.zoom = value;
  });

  EDConsole.setCommandHandler(Command.PP_RULER_SHOW, () => {});

  EDConsole.setCommandHandler(Command.PP_RULER_HIDE, () => {});

  EDConsole.setCommandHandler(Command.PP_GRID_SHOW, () => {});

  EDConsole.setCommandHandler(Command.PP_GRID_HIDE, () => {});

  EDConsole.setCommandHandler(Command.PP_IMAGE_SHOW, () => {});

  EDConsole.setCommandHandler(Command.PP_IMAGE_HIDE, () => {});
})(window.EDConsole);
