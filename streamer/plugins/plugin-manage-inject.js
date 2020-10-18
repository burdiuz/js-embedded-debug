((EDConsole) => {
  const PLUGIN_NAME = 'manage-inject';

  const Command = {
    INJECTION_EXECUTE: 'injection-execute',
  };

  const Type = {
    JS: 'js',
    CSS: 'css',
    HTML: 'html',
  };

  const Target = {
    HEAD: 'HEAD',
    BODY: 'BODY',
    SELECTOR: 'Selector',
  };

  const Operation = {
    APPEND: 'Append',
    PREPEND: 'Prepend',
    REPLACE: 'Replace',
    CONTENT: 'Content',
  };

  const getTargetNode = (target, query) => {
    switch (target) {
      case Target.HEAD:
        return document.querySelector('head');
      case Target.SELECTOR:
        return document.querySelector(query);
      case Target.BODY:
      default:
        return document.body;
    }
  };

  const converter = document.createElement('span');

  const getInjectionNode = (type, data) => {
    let node;

    switch (type) {
      case Type.CSS:
        node = document.createElement('style');
        node.setAttribute('type', 'text/css');
        node.innerText = data;
        break;
      case Type.JS:
        node = document.createElement('script');
        node.setAttribute('type', 'text/javascript');
        node.innerText = data;
        break;
      case Type.HTML:
      default:
        converter.innerHTML = data;
        node = document.createDocumentFragment();

        try {
          node.append(...Array.from(converter.childNodes));
        } catch (error) {
          while (converter.firstChild) {
            node.appendChild(converter.firstChild);
          }
        }
        break;
    }

    return node;
  };

  EDConsole.setCommandHandler(
    Command.INJECTION_EXECUTE,
    (_, { type, target, operation, query, data }) => {
      const targetNode = getTargetNode(target, query);

      if (!targetNode) {
        return;
      }

      const injectionNode = getInjectionNode(type, data);

      switch (operation) {
        case Operation.PREPEND:
          targetNode.prepend(injectionNode);
          break;
        case Operation.REPLACE:
          targetNode.parentNode.replaceChild(injectionNode, targetNode);
          break;
        case Operation.CONTENT:
          targetNode.innerHTML = '';
          targetNode.append(injectionNode);
          break;
        case Operation.APPEND:
          targetNode.append(injectionNode);
        default:
          break;
      }
    },
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
