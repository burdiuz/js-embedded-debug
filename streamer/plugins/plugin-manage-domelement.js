((EDConsole) => {
  const PLUGIN_NAME = 'manage-domelement';
  const Command = {
    DOM_NODE_LOOKUP: 'dom-node-lookup',
    DOM_NODE_LOOKUP_RESPONSE: 'dom-node-lookup/response',
    DOM_QUERY_SELECTOR: 'dom-query-selector',
    DOM_QUERY_SELECTOR_RESPONSE: 'dom-query-selector/response',
    DOM_NODE_COMPUTED_STYLE: 'dom-node-computed-style',
    DOM_NODE_COMPUTED_STYLE_RESPONSE: 'dom-node-computed-style/response',
    DOM_NODE_SET_ATTRIBUTE: 'dom-node-set-attribute',
    DOM_NODE_SET_STYLE: 'dom-node-set-style',
    DOM_NODE_COPY_QUERY: 'dom-node-copy-query',
    DOM_NODE_COPY_HTML: 'dom-node-copy-html',
    DOM_NODE_COPY_TEXT: 'dom-node-copy-text',
    DOM_NODE_ASSIGN_VARIABLE: 'dom-node-assign-variable',

    TEXTDATA_SHOW: 'textdata-show',
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
    backgroundColor: '#ffffff66',
    zIndex: Math.pow(2, 31),
    pointerEvents: 'none',
  });

  const selection = document.createElement('div');
  Object.assign(selection.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    border: '1px dashed #ff0000',
    boxShadow: '0 0 5px #ff0000',
  });

  container.appendChild(selection);

  const buildNodeSelector = (node) => {
    const { tagName } = node;
    const className = (node.getAttribute('class') || '').replace(/\s+/g, '.');
    const id = node.getAttribute('id');
    const name = node.getAttribute('name');

    let index = 0;
    let isFirst = true;
    let children = [];

    if (node.parentElement) {
      children = Array.from(node.parentElement.children);
      index = children.indexOf(node);
    }

    if (className) {
      const rgx = new RegExp(`(^|\\s)${className}(\\s|$)`);

      isFirst =
        !children.length ||
        children.find(
          (item) => item.tagName === tagName && item.className.match(rgx),
        ) === node;

      const base = `${tagName}.${className}`;
      return isFirst ? base : `${base}:nth-child(${index + 1})`;
    } else if (id) {
      // isFirst = !children.length || children.find((item) => item.tagName === tagName && item.id === id) === node;

      return `${tagName}#${id}`;
    } else if (name) {
      return `${tagName}[name="${name}"]`;
    } else {
      isFirst =
        !children.length ||
        children.find((item) => item.tagName === tagName) === node;

      if (!isFirst) {
        return `${tagName}:nth-child(${index + 1})`;
      }
    }

    return `${tagName}`;
  };

  const buildSelector = (node, selectors = []) => {
    selectors.unshift(buildNodeSelector(node));

    if (!node.parentElement || node.parentElement === node) {
      return selectors;
    }

    return buildSelector(node.parentElement, selectors);
  };

  const generateAttributeList = (node) => {
    const attrs = node.attributes;
    const list = [];

    for (let index = 0; index < attrs.length; index++) {
      const attr = attrs.item(index);
      list.push([attr.name, attr.value]);
    }

    return list;
  };

  const generateStyleList = (node) => {
    const { style } = node;
    const list = [];

    for (let index = 0; index < style.length; index++) {
      const name = style.item(index);
      list.push([name, style.getPropertyValue(name)]);
    }

    return list;
  };

  const generateComputedStyleList = (node) => {
    const styles = window.getComputedStyle(node);
    const list = [];

    for (let index = 0; index < styles.length; index++) {
      const name = styles.item(index);
      list.push([name, styles.getPropertyValue(name)]);
    }

    return list;
  };

  // TODO cache selection to apply attrs and styles changes directly without looking up for it every time
  // let lastSelectedElement = null;

  let lastSelectedNode = null;
  let lastSelectedQuery = null;

  const generateLastSelectedNodeData = () => ({
    selectors: lastSelectedQuery,
    attributes: generateAttributeList(lastSelectedNode),
    styles: generateStyleList(lastSelectedNode),
    variable: lastSelectedNode._edconsole_varname,
    ...getNodeDimensions(lastSelectedNode),
  });

  const mouseoverHandler = ({ target: node }) => {
    lastSelectedNode = node;
    lastSelectedQuery = buildSelector(node);

    const data = generateLastSelectedNodeData();

    EDConsole.sendCommand(Command.DOM_NODE_LOOKUP_RESPONSE, data);

    const { top, left, width, height } = node.getBoundingClientRect();

    Object.assign(selection.style, {
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    });
  };

  const stopEventPropagation = (event) => event.stopImmediatePropagation();
  const BLOCKED_EVENTS = ['click', 'mousedown', 'mouseup'];

  const blockEvents = () =>
    BLOCKED_EVENTS.forEach((type) =>
      window.addEventListener(type, stopEventPropagation, { capture: true }),
    );

  const unblockEvents = () =>
    BLOCKED_EVENTS.forEach((type) =>
      window.removeEventListener(type, stopEventPropagation, { capture: true }),
    );

  EDConsole.setCommandHandler(Command.DOM_NODE_LOOKUP, () => {
    const clickHandler = (event) => {
      const { target: node } = event;
      stopEventPropagation(event);

      window.removeEventListener('mouseover', mouseoverHandler);
      window.removeEventListener('click', clickHandler, { capture: true });
      unblockEvents();
      container.remove();
      Object.assign(selection.style, {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });
    };

    window.addEventListener('mouseover', mouseoverHandler);
    window.addEventListener('click', clickHandler, { capture: true });
    blockEvents();
    document.body.appendChild(container);
  });

  const getNodeDimensions = (node) => ({
    x: node.offsetLeft,
    y: node.offsetTop,
    width: node.scrollWidth || node.offsetWidth || node.clientWidth,
    height: node.scrollHeight || node.offsetHeight || node.clientHeight,
  });

  const querySelectorHandler = (_, { value }, sendResponse) => {
    const node = document.querySelector(value);
    let data = null;

    if (node) {
      lastSelectedNode = node;
      lastSelectedQuery = buildSelector(node);

      data = generateLastSelectedNodeData();
    }

    sendResponse(Command.DOM_QUERY_SELECTOR_RESPONSE, data);
  };

  EDConsole.setCommandHandler(Command.DOM_QUERY_SELECTOR, querySelectorHandler);

  EDConsole.setCommandHandler(
    Command.DOM_NODE_COMPUTED_STYLE,
    (_, { selector }, sendResponse) => {
      const node = document.querySelector(selector);
      let data = [];

      if (node) {
        data = generateComputedStyleList(node);
      }
      sendResponse(Command.DOM_NODE_COMPUTED_STYLE_RESPONSE, data);
    },
  );

  EDConsole.setCommandHandler(
    Command.DOM_NODE_SET_ATTRIBUTE,
    (_, { selector, prop }, sendResponse) => {
      const node = document.querySelector(selector);
      if (!node) {
        return;
      }

      node.setAttribute(...prop);

      querySelectorHandler(null, { value: selector }, sendResponse);
    },
  );

  EDConsole.setCommandHandler(
    Command.DOM_NODE_SET_STYLE,
    (_, { selector, prop }, sendResponse) => {
      const node = document.querySelector(selector);

      if (!node) {
        return;
      }

      node.style.setProperty(...prop);

      querySelectorHandler(null, { value: selector }, sendResponse);
    },
  );

  EDConsole.setCommandHandler(
    Command.DOM_NODE_COPY_QUERY,
    (_, inc, sendResponse) => {
      let data = '';

      if (lastSelectedQuery) {
        try {
          data = lastSelectedQuery.join(' > ');

          navigator.clipboard.writeText(data);
        } catch (error) {}

        if (data) {
          sendResponse(Command.TEXTDATA_SHOW, {
            title: 'HTML Element query selector',
            data,
          });
        }
      }
    },
  );

  EDConsole.setCommandHandler(
    Command.DOM_NODE_COPY_HTML,
    (_, inc, sendResponse) => {
      let data = '';
      let title = 'HTML Element outerHTML';

      if (lastSelectedNode) {
        try {
          data = lastSelectedNode.outerHTML;

          if (!data) {
            data = lastSelectedNode.innerHTML;
            title = 'HTML Element innerHTML';
          }

          navigator.clipboard.writeText(data);
        } catch (error) {}

        if (data) {
          sendResponse(Command.TEXTDATA_SHOW, { title, data });
        }
      }
    },
  );

  EDConsole.setCommandHandler(
    Command.DOM_NODE_COPY_TEXT,
    (_, inc, sendResponse) => {
      let data = '';

      if (lastSelectedNode) {
        try {
          data = lastSelectedNode.innerText;

          navigator.clipboard.writeText(data);
        } catch (error) {}

        if (data) {
          sendResponse(Command.TEXTDATA_SHOW, {
            title: 'HTML Element innerText',
            data,
          });
        }
      }
    },
  );

  let varIndex = 1;

  EDConsole.setCommandHandler(
    Command.DOM_NODE_ASSIGN_VARIABLE,
    (_, inc, sendResponse) => {
      let name;

      if (lastSelectedNode) {
        name = `temp${varIndex++}`;
        window[name] = lastSelectedNode;
        Object.defineProperty(lastSelectedNode, '_edconsole_varname', {
          value: name,
          configurable: true,
          enumerable: false,
        });

        sendResponse(
          Command.DOM_QUERY_SELECTOR_RESPONSE,
          generateLastSelectedNodeData(),
        );
      }
    },
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
