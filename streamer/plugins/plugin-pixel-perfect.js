((EDConsole) => {
  const {
    Event,
    lodash: { throttle },
  } = EDConsole;
  const PLUGIN_NAME = 'pixel-perfect';
  const Images = {
    GRID_10:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE1SURBVHhe7ZSxDQNADITy2X/oUDgT0FwBjSmRTvLn++fdHbMCQVmBoKxAUFYgKPu8cZoYlBUIygoEZQWCsv3Ae9izNDEoKxCUFQjKCgRl+4H3sGdpYlBWICgrEJQVCMr2A+9hz9LEoKxAUFYgKCsQlO0H3sOepYlBWYGgrEBQViAo2w+8hz1LE4OyAkFZgaCsQFC2H3gPe5YmBmUFgrICQVmBoGw/8B72LE0MygoEZQWCsgJB2X7gPexZmhiUFQjKCgRlBYKy/cB72LM0MSgrEJQVCMoKBGX7gfewZ2liUFYgKCsQlBUIyvYD72HP0sSgrEBQViAoKxCU7Qfew56liUFZgaCsQFBWICjbD7yHPUsTg7ICQVmBoKxAULYfeA97liYGZQWCsgJBWYGgbD/wHvYo7/0ArNK1AfQZhrQAAAAASUVORK5CYII=',
    GRID_20:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEtSURBVHhe7ZYhDgIBEMQ4/v9oKlaQICsY0ZpNqpqM2df7l+fuN39zBYJyBYJyBYJyBYJyBYJyBYJyBYJyBYJyBYJyr2ecJgblCgTlCgTlCgTlCgTlCgTlCgTlCgTlCgTl9gPv9Z+liUG5AkG5AkG5AkG5AkG5AkG5AkG5AkG5AkG5/cB7/WdpYlCuQFCuQFCuQFCuQFCuQFCuQFCuQFCuQFBuP/Be/1maGJQrEJQrEJQrEJQrEJQrEJQrEJQrEJQrEJTbD7zXf5YmBuUKBOUKBOUKBOUKBOUKBOUKBOUKBOUKBOX2A+/1n6WJQbkCQbkCQbkCQbkCQbkCQbkCQbkCQbkCQbn9wHv9Z2liUK5AUK5AUK5AUK5AUK5AUK5AUK5AUK5AUG4/8F7/UZ7nAxmNvkFjGEKpAAAAAElFTkSuQmCC',
    GRID_50:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEwSURBVHhe7dqhDcAwEARBf/ovOsQFZEgkWzvEyGClg78eNfv97pcfhYBCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBs+YSTQsUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIuChkH6Adr2mBQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAReF7AO04zUtUAgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIeCikH2AdriZF6eVMmBILgYNAAAAAElFTkSuQmCC',
    RULER_H:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABkCAYAAAC/zKGXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD6SURBVFhH7ZZPC4JAEMV3ZaFaEzr4ObtEdLUv5xfw5kHwIF7Fs3/aeXsxcsig2Nz6geI832GG57BKIcTY9/11GAYRBAFdo9EeCHAzL5VSI2ciYFzCa8Y4jo91XW+gMGAYQ2JLng/1uAT0aB9NISX1Sxo1ftf3GoaBUWt9adtWQWFYXTJT2GS6rpNPd4ZwtDPm80qapvnBZGzJ43AYGCmZNE0PUBj8S2YN50wURaeqqvw6Z6bMJvPlw8BIO1MUxQ4Kg5/JrOGcKctyC4XBz2RsyeNwGBjDMDxnWbaHwuBnMv9/szneb3w9GVvyOBwGRkomz3MNhcGjZIS4AbBzy89QxI43AAAAAElFTkSuQmCC',
    RULER_V:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAKCAYAAABCHPt+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVFhH7dRNS4RAGAdwx6OiePAiHgQP3vwCfqguER0z6NALQUQQfSDBuxc9CB49CAamFfjS5D6728zaUBsLA80PxP8j8jg6MyJJkiZ8CJxAwzCEsixvJsU0zaOqqu6hnCGEwmmaQihniqKcdl13BeVs6b6/XsPjO/86Pk3TjpumuYVydojn0tdUVT1p2/YGytkhniuP4wjlSpIkTxCZyrIkPspa3/efu26jrusLiExRFN1BJNDjS9P0ASJTnufEYlmjx1cUxSVEpjiOHyES9n3fLMuuIRLw4pMhrliW9Q5xA8/czm9N1/UeIoHuZxjG4n20IAieIRLofrZt74xvieu6rxAJdD/Hcd4gMvm+/wKRsO/7ep7XQSTgftvfwXfw1iJWActP+v3Gv+sHZ4ETCK/+M8gCB8QO4YyYEM6ICeGKJH0A5lSbFWrGfocAAAAASUVORK5CYII=',
  };
  const Command = {
    INIT_FRAME: 'init-frame',
    PP_ZOOM_SET: 'pixel-perfect-zoom-set',
    PP_RULER_SHOW: 'pixel-perfect-ruler-show',
    PP_RULER_HIDE: 'pixel-perfect-ruler-hide',
    PP_GRID_SHOW: 'pixel-perfect-grid-show',
    PP_GRID_HIDE: 'pixel-perfect-grid-hide',
    PP_COLUMNS_SHOW: 'pixel-perfect-columns-show',
    PP_COLUMNS_HIDE: 'pixel-perfect-columns-hide',
    PP_IMAGE_SHOW: 'pixel-perfect-image-show',
    PP_IMAGE_HIDE: 'pixel-perfect-image-hide',
    PP_IMAGE_SETTINGS: 'pixel-perfect-image-settings',
    PP_WINDOW_SIZE: 'pixel-perfect-window-size',
    PP_WINDOW_SET_SIZE: 'pixel-perfect-window-set-size',
    PP_MOUSE_POSITION: 'pixel-perfect-mouse-position',
  };

  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 10000000,
    pointerEvents: 'none',
  });

  const createEl = (style = {}, tag = 'div') => {
    const el = document.createElement(tag);
    Object.assign(el.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      ...style,
    });

    return el;
  };

  const grid = createEl({ opacity: '0.4' });
  const bgrid = createEl({
    display: 'grid',
    gridGap: '0 0',
  });
  const image = createEl({}, 'img');
  const rulerX = createEl({
    backgroundImage: `url("${Images.RULER_H}")`,
    backgroundRepeat: 'no-repeat repeat',
  });
  const rulerY = createEl({
    backgroundImage: `url("${Images.RULER_V}")`,
    backgroundRepeat: 'repeat no-repeat',
  });

  let gridVisible = false;
  let rulersVisible = false;
  let bgridVisible = false;
  let imageVisible = false;

  const show = () => document.body.appendChild(container);

  const hide = () => {
    container.remove();
    grid.remove();
    bgrid.remove();
    image.remove();
    rulerX.remove();
    rulerY.remove();
  };

  const showGrid = (type) => {
    Object.assign(grid.style, {
      backgroundImage: `url("${Images[type]}")`,
      backgroundRepeat: 'repeat repeat',
    });

    container.appendChild(grid);
  };

  const showRulers = () => {
    container.appendChild(rulerX);
    container.appendChild(rulerY);
  };

  const showBGrid = (cols, margin) => {
    bgrid.innerHTML = '';
    let style = '';

    for (let index = 1; index <= cols; index++) {
      style = `${style} 1fr`;

      const col = document.createElement('div');

      Object.assign(col.style, {
        backgroundColor: index % 2 ? '#0088ff66' : '#00000007',
        gridColumn: `${index} / ${index + 1}`,
      });

      bgrid.appendChild(col);
    }

    bgrid.style.gridTemplateColumns = style;
    if (!margin || margin.charAt(0) === '0') {
      bgrid.style.margin = ' 0 ';
      bgrid.style.width = '100%';
      bgrid.style.height = '100%';
    } else {
      bgrid.style.removeProperty('width');
      bgrid.style.removeProperty('height');
      bgrid.style.margin = `0 ${margin}`;
    }

    container.appendChild(bgrid);
  };

  window.addEventListener(
    'resize',
    throttle(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      EDConsole.sendCommand(Command.PP_WINDOW_SIZE, { width, height });
    }, 500),
  );

  window.addEventListener(
    'mousemove',
    throttle((event) => {
      const x = event.pageX;
      const y = event.pageY;

      EDConsole.sendCommand(Command.PP_MOUSE_POSITION, { x, y });
    }, 500),
  );

  EDConsole.addEventListener(
    Event.COMMAND_RECEIVED,
    ({ data: { command, sendResponse } }) => {
      if (command === Command.INIT_FRAME) {
        sendResponse(Command.PP_WINDOW_SIZE, {
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    },
  );

  EDConsole.setCommandHandler(Command.PP_ZOOM_SET, (_, { value }) => {
    document.body.style.zoom = value;
  });

  const hideIf = () => {
    if (!gridVisible && !rulersVisible && !bgridVisible && !imageVisible) {
      hide();
    }
  };

  const hideRule = () => {
    rulersVisible = false;
    rulerX.remove();
    rulerY.remove();

    hideIf();
  };

  EDConsole.setCommandHandler(Command.PP_RULER_SHOW, (_, { rulerType }) => {
    if (rulerType) {
      rulersVisible = true;
      showRulers();
      show();
    } else {
      hideRule();
    }
  });

  EDConsole.setCommandHandler(Command.PP_RULER_HIDE, hideRule);

  const hideGrid = () => {
    gridVisible = false;
    grid.remove();

    hideIf();
  };

  EDConsole.setCommandHandler(Command.PP_GRID_SHOW, (_, { gridType }) => {
    if (gridType) {
      gridVisible = true;
      showGrid(gridType);
      show();
    } else {
      hideGrid();
    }
  });

  EDConsole.setCommandHandler(Command.PP_GRID_HIDE, hideGrid);

  const hideColumns = () => {
    bgridVisible = false;
    bgrid.remove();

    hideIf();
  };

  EDConsole.setCommandHandler(
    Command.PP_COLUMNS_SHOW,
    (_, { columns, margin }) => {
      const count = Number.parseInt(columns, 10);

      if (count) {
        bgridVisible = true;
        showBGrid(count, margin);
        show();
      } else {
        hideColumns();
      }
    },
  );

  EDConsole.setCommandHandler(Command.PP_COLUMNS_HIDE, hideColumns);

  const applyImageSettings = ({ scale, opacity, offsetX, offsetY }) => {
    const x = offsetX ? `${offsetX}px` : '0';
    const y = offsetY ? `${offsetY}px` : '0';

    Object.assign(image.style, {
      transform: `translate(${x}, ${y}) scale(${scale})`,
      transformOrigin: 'top left',
      opacity: opacity,
    });
  };

  EDConsole.setCommandHandler(Command.PP_IMAGE_SHOW, (_, payload) => {
    const { data } = payload;

    image.src = data;

    applyImageSettings(payload);

    container.appendChild(image);
    show();
  });

  EDConsole.setCommandHandler(Command.PP_IMAGE_HIDE, () => {
    image.src = '';
    image.remove();

    hideIf();
  });

  EDConsole.setCommandHandler(Command.PP_IMAGE_SETTINGS, (_, payload) =>
    applyImageSettings(payload),
  );

  EDConsole.setCommandHandler(
    Command.PP_WINDOW_SET_SIZE,
    (_, { width, height }) => {
      window.resizeTo(width, height);
    },
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
