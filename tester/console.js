(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.DOMConsole = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var getClass_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	const getClass = (target) => {
	  if(target === null || target === undefined) {
	    return undefined;
	  }

	  const constructor = target.constructor;

	  if(
	    typeof constructor === 'function'
	    && target instanceof constructor
	  ) {
	    return target.constructor;
	  }

	  const proto = Object.getPrototypeOf(target);

	  if (proto && typeof proto === 'object') {
	    return proto.constructor;
	  }

	  return proto || Object;
	};

	const getParentClass = (target) => {
	  const def = getClass(target);

	  return def && Object.getPrototypeOf(def);
	};

	const getClassName = (value) => {
	  if (!value) return '';

	  const valueClass = getClass(value);

	  return valueClass ? valueClass.name : '';
	};

	exports.getClassName = getClassName;
	exports.getParentClass = getParentClass;
	exports.getClass = getClass;
	exports.default = getClass;
	});

	unwrapExports(getClass_1);
	var getClass_2 = getClass_1.getClassName;
	var getClass_3 = getClass_1.getParentClass;
	var getClass_4 = getClass_1.getClass;

	var closureValue = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	const singleValueFactory = (defaultValue = null, valueFormatter = (value) => value) => {
	  let value = defaultValue;

	  return {
	    getDefault: () => defaultValue,
	    get: () => value,
	    set: (newValue = defaultValue) => {
	      value = valueFormatter(newValue);
	    },
	  };
	};

	const valuesMapFactory = (defaults = new Map(), valueFormatter = (key, value) => value) => {
	  const defaultValues = new Map(defaults);
	  const getDefault = () => new Map(defaultValues);

	  const values = getDefault();

	  return {
	    values,
	    getDefault,
	    copy: () => new Map(values),
	    delete: (key) => values.delete(key),
	    has: (key) => values.has(key),
	    set: (key, value) => values.set(key, valueFormatter(key, value)),
	    get: (key) => values.get(key),
	  };
	};

	const valuesSetFactory = (defaults = new Set(), valueFormatter = (value) => value) => {
	  const defaultValues = new Set(defaults);
	  const getDefault = () => new Set(defaultValues);

	  const values = getDefault();

	  return {
	    values,
	    getDefault,
	    get: () => new Set(values),
	    delete: (value) => values.delete(value),
	    has: (value) => values.has(value),
	    add: (value) => values.add(valueFormatter(value)),
	  };
	};

	exports.singleValueFactory = singleValueFactory;
	exports.valuesMapFactory = valuesMapFactory;
	exports.valuesSetFactory = valuesSetFactory;
	});

	unwrapExports(closureValue);
	var closureValue_1 = closureValue.singleValueFactory;
	var closureValue_2 = closureValue.valuesMapFactory;
	var closureValue_3 = closureValue.valuesSetFactory;

	var logDataRenderer = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }


	var getClass__default = _interopDefault(getClass_1);


	// Assigned to an object, when rendering, if exists, will wrap content, like
	// Map{...} or Set[...]
	const MAX_FUNC_STR_LEN = 30;
	const setCustomClassNameTo = (data, className) => data.className = className;
	const getCustomClassNameFrom = data => data.className || '';
	const canPassAsIs = value => typeof value === 'string';
	const validKeyRgx = /^[\w_$][\w\d_$]*$/i;
	const keyNeedsConversion = key => !(canPassAsIs(key) && validKeyRgx.test(key));
	const isNested = value => value && typeof value === 'object';
	const setNestedWraps = (value, pre, post) => {
	  value.pre = pre;
	  value.post = post;
	};
	const getNestedWraps = ({
	  pre,
	  post
	}) => ({
	  pre,
	  post
	});
	const setNestedShortContent = (value, short) => {
	  value.short = short;
	};
	const getNestedShortContent = value => value.short;
	const isList = target => isNested(target) && target.type === 'list';
	const createList = () => ({
	  type: 'list',
	  values: [],
	  pre: '[',
	  post: ']'
	});
	const addToList = ({
	  values
	}, index, value) => values[index] = value;
	const iterateList = ({
	  values
	}, handler) => values.forEach((value, index) => handler(value, index));
	const getListSize = ({
	  values
	}) => values.length;
	const isStorage = target => isNested(value) && target.type === 'storage';
	const createStorage = () => ({
	  type: 'storage',
	  keys: [],
	  values: [],
	  pre: '{',
	  post: '}'
	});
	const addToStorage = ({
	  keys,
	  values
	}, key, value) => {
	  keys.push(key);
	  values.push(value);
	};
	const iterateStorage = (storage, handler) => {
	  const {
	    keys,
	    values
	  } = storage;
	  keys.forEach((key, index) => handler(values[index], key));
	};
	const getStorageSize = ({
	  keys
	}) => keys.length;

	var utils = /*#__PURE__*/Object.freeze({
	  MAX_FUNC_STR_LEN: MAX_FUNC_STR_LEN,
	  setCustomClassNameTo: setCustomClassNameTo,
	  getCustomClassNameFrom: getCustomClassNameFrom,
	  canPassAsIs: canPassAsIs,
	  keyNeedsConversion: keyNeedsConversion,
	  isNested: isNested,
	  setNestedWraps: setNestedWraps,
	  getNestedWraps: getNestedWraps,
	  setNestedShortContent: setNestedShortContent,
	  getNestedShortContent: getNestedShortContent,
	  isList: isList,
	  createList: createList,
	  addToList: addToList,
	  iterateList: iterateList,
	  getListSize: getListSize,
	  isStorage: isStorage,
	  createStorage: createStorage,
	  addToStorage: addToStorage,
	  iterateStorage: iterateStorage,
	  getStorageSize: getStorageSize
	});

	var convertArray = ((value, convertValue) => {
	  const result = createList();
	  value.forEach((item, index) => {
	    addToList(result, index, convertValue(item));
	  });
	  setCustomClassNameTo(result, getClass_1.getClassName(value));
	  return result;
	});

	var convertBoolean = (value => `${value}`);

	var convertDate = (value => `Date(${value})`);

	var convertError = ((value, convertValue) => {
	  const {
	    name,
	    message,
	    columnNumber,
	    fileName,
	    lineNumber
	  } = value;
	  const result = createStorage();
	  addToStorage(result, 'name', convertValue(name));
	  addToStorage(result, 'message', convertValue(message));
	  addToStorage(result, 'columnNumber', convertValue(columnNumber));
	  addToStorage(result, 'fileName', convertValue(fileName));
	  addToStorage(result, 'lineNumber', convertValue(lineNumber));
	  setCustomClassNameTo(result, name || 'Error');
	  return result;
	});

	var convertFunction = (value => {
	  const content = String(value);

	  if (content.length <= MAX_FUNC_STR_LEN) {
	    return content;
	  }

	  const type = getClass_1.getClassName(value) || 'Function';
	  let {
	    name
	  } = value;

	  if (!name) {
	    name = content.replace(/\s+/g, ' ').substr(content.substr(0, 9) === 'function ' ? 9 : 0, MAX_FUNC_STR_LEN);

	    if (content.length < MAX_FUNC_STR_LEN) {
	      name = `${name}...`;
	    }
	  }

	  const result = createStorage();
	  addToStorage(result, 'code', content);
	  setNestedWraps(result, '(', ')');
	  setNestedShortContent(result, name);
	  setCustomClassNameTo(result, type);
	  return result;
	});

	var convertMap = ((value, convertValue) => {
	  const result = createStorage();
	  value.forEach((item, key) => {
	    /*
	    Do not use keyNeedsConversion() here, because Map may hold values of
	    different types as keys and string should be quoted, otherwise it may be
	    unclear -- what you see string true or boolean true as key.
	    */
	    addToStorage(result, convertValue(key), convertValue(item));
	  });
	  setCustomClassNameTo(result, getClass_1.getClassName(value));
	  return result;
	});

	var convertNumber = (value => `${value}`);

	var convertObject = ((value, convertValue) => {
	  const result = createStorage();
	  Object.keys(value).forEach(key => {
	    addToStorage(result, keyNeedsConversion(key) ? convertValue(key) : key, convertValue(value[key]));
	  });
	  setCustomClassNameTo(result, getClass_1.getClassName(value));
	  return result;
	});

	var convertSet = ((value, convertValue) => {
	  const result = createList(); // remove need in indexes for Set

	  let index = 0;
	  value.forEach(item => {
	    addToList(result, index++, convertValue(item));
	  });
	  setCustomClassNameTo(result, getClass_1.getClassName(value));
	  return result;
	});

	var convertString = (value => JSON.stringify(value));

	var convertSymbol = (value => String(value));

	// use Map to store handlers for every type in this case every
	// handler could be replaced and customizable

	const types = new Map();
	/**
	 * Type handler signature func(value:*, convertType:(value:*)): String|Array|Object;
	 * @param {*} constructor
	 * @param {*} handler
	 */

	const addTypeHandler = (constructor, handler) => {
	  if (constructor && handler) {
	    types.delete(constructor);
	    types.set(constructor, handler);
	  }
	};
	const hasTypeHandler = constructor => types.has(constructor);
	const getTypeHandler = constructor => types.get(constructor);
	const removeTypeHandler = constructor => types.delete(constructor);
	const defaultTypeHandlerSelector = value => {
	  const type = getClass__default(value);
	  return type && getTypeHandler(type);
	};
	let typeHandlerSelector = defaultTypeHandlerSelector;
	/*
	 * Used to get type handler instead of getTypeHandler(), can be customized.
	 * @param {*} value
	 */

	const selectTypeHandler = value => typeHandlerSelector(value);
	/**
	 * Used to customize type selection algorythm, by default it just gets current
	 * constructor value and looks for its handler.
	 * @param {*} newSelector
	 */

	const setTypeHandlerSelector = newSelector => {
	  typeHandlerSelector = newSelector;
	};
	addTypeHandler(Array, convertArray);
	addTypeHandler(Boolean, convertBoolean);
	addTypeHandler(Date, convertDate);
	addTypeHandler(Error, convertError);
	addTypeHandler(Function, convertFunction);
	addTypeHandler(Map, convertMap);
	addTypeHandler(Number, convertNumber);
	addTypeHandler(Object, convertObject);
	addTypeHandler(Set, convertSet);
	addTypeHandler(String, convertString);
	addTypeHandler(Symbol, convertSymbol);

	const {
	  get: getMaxNesingDepth,
	  set: setMaxNesingDepth
	} = closureValue.singleValueFactory(2);

	const isString = value => {
	  switch (typeof value) {
	    case 'symbol':
	    case 'string':
	    case 'boolean':
	    case 'number':
	    case 'undefined':
	      return true;

	    default:
	      return value === null || value instanceof Date;
	  }
	};
	const toString = value => {
	  switch (typeof value) {
	    case 'symbol':
	      return convertSymbol(value);

	    case 'string':
	      return convertString(value);

	    case 'boolean':
	      return convertBoolean(value);

	    case 'number':
	      return convertNumber(value);

	    default:
	      if (value instanceof Date) {
	        return convertDate(value);
	      }

	      return `${value}`;
	  }
	};

	const fallbackConversion = (value, convertValue, refs) => {
	  if (isString(value)) {
	    return toString(value);
	  }

	  if (value instanceof Function) {
	    return convertFunction(value, convertValue, refs);
	  }

	  if (value instanceof Error) {
	    return convertError(value, convertValue, refs);
	  }

	  if (value instanceof Map) {
	    return convertMap(value, convertValue, refs);
	  }

	  if (value instanceof Set) {
	    return convertSet(value, convertValue, refs);
	  }

	  if (value instanceof Array) {
	    return convertArray(value, convertValue, refs);
	  }

	  return convertObject(value, convertValue, refs);
	};

	const convert = (value, level = 1, refs = new Map()) => {
	  if (value === null || value === undefined) {
	    return `${value}`;
	  }

	  const maxLevel = getMaxNesingDepth();

	  if (level > maxLevel) {
	    return toString(value);
	  }

	  const complex = !isString(value);

	  if (complex && refs.has(value)) {
	    return refs.get(value);
	  }

	  const handler = selectTypeHandler(value);

	  const nextConvert = propValue => convert(propValue, level + 1, refs);

	  let result;

	  if (handler) {
	    result = handler(value, nextConvert, refs);
	  }

	  result = fallbackConversion(value, nextConvert, refs);

	  if (complex) {
	    refs.set(value, result);
	  }

	  return result;
	};

	exports.default = convert;
	exports.utils = utils;
	exports.addTypeHandler = addTypeHandler;
	exports.getTypeHandler = getTypeHandler;
	exports.hasTypeHandler = hasTypeHandler;
	exports.removeTypeHandler = removeTypeHandler;
	exports.setTypeHandlerSelector = setTypeHandlerSelector;
	exports.isString = isString;
	exports.toString = toString;
	exports.convert = convert;
	exports.getMaxNesingDepth = getMaxNesingDepth;
	exports.setMaxNesingDepth = setMaxNesingDepth;

	});

	var convert = unwrapExports(logDataRenderer);
	var logDataRenderer_1 = logDataRenderer.utils;
	var logDataRenderer_2 = logDataRenderer.addTypeHandler;
	var logDataRenderer_3 = logDataRenderer.getTypeHandler;
	var logDataRenderer_4 = logDataRenderer.hasTypeHandler;
	var logDataRenderer_5 = logDataRenderer.removeTypeHandler;
	var logDataRenderer_6 = logDataRenderer.setTypeHandlerSelector;
	var logDataRenderer_7 = logDataRenderer.isString;
	var logDataRenderer_8 = logDataRenderer.convert;
	var logDataRenderer_9 = logDataRenderer.getMaxNesingDepth;
	var logDataRenderer_10 = logDataRenderer.setMaxNesingDepth;

	const {
	  isList,
	  getListSize,
	  getNestedWraps,
	  getCustomClassNameFrom
	} = logDataRenderer_1;
	const SPACE_LEVEL = '  ';
	const INFO_TYPE = 'info';
	const LOG_TYPE = 'log';
	const WARNING_TYPE = 'warning';
	const ERROR_TYPE = 'error';
	const SUCCESS_TYPE = 'success';
	const getStringWrap = value => {
	  const wraps = getNestedWraps(value);
	  const name = getCustomClassNameFrom(value);

	  if (isList(value)) {
	    wraps.pre = `${name}(${getListSize(value)})${wraps.pre}`;
	  } else {
	    wraps.pre = `${name}${wraps.pre}`;
	  }

	  return wraps;
	};
	const removeAllChildren = target => {
	  while (target.firstChild) {
	    target.removeChild(target.firstChild);
	  }
	};

	/* eslint-disable no-use-before-define */
	const {
	  iterateStorage,
	  isNested,
	  isList: isList$1,
	  iterateList,
	  getNestedShortContent,
	  getNestedWraps: getNestedWraps$1,
	  getListSize: getListSize$1,
	  getStorageSize
	} = logDataRenderer_1;

	const setExpandIconSymbol = (icon, expanded) => {
	  icon.innerHTML = expanded ? '-' : '+';
	};

	const createExpandIcon = expanded => {
	  const icon = document.createElement('span');
	  icon.className = 'ui-console-button-expand';
	  setExpandIconSymbol(icon, expanded);
	  return icon;
	};

	const createCollapsedContent = (value, size) => {
	  let content = getNestedShortContent(value);

	  if (content === undefined) {
	    content = size ? ' ... ' : '';
	  }

	  return [document.createTextNode(content)];
	};

	const createUINestedArrayContent = (list, space) => {
	  const result = [];
	  let text = '\n';
	  iterateList(list, value => {
	    text += space;

	    if (isNested(value)) {
	      result.push(document.createTextNode(text));
	      text = '';
	      result.push(createUINested(value, space));
	    } else {
	      text += value;
	    }

	    text += ', \n';
	  });

	  if (text) {
	    result.push(document.createTextNode(text));
	  }

	  return result;
	};

	const createUINestedObjectContent = (storage, space) => {
	  const result = [];
	  let text = '\n';
	  iterateStorage(storage, (value, key) => {
	    text += `${space}`;

	    if (isNested(key)) {
	      result.push(document.createTextNode(`${text}[`));
	      result.push(createUINested(key, space));
	      text = ']';
	    } else {
	      text += key;
	    }

	    text += ': ';

	    if (isNested(value)) {
	      result.push(document.createTextNode(text));
	      result.push(createUINested(value, space));
	      text = '';
	    } else {
	      text += value;
	    }

	    text += ', \n';
	  });

	  if (text) {
	    result.push(document.createTextNode(text));
	  }

	  return result;
	};

	const createUINestedContent = (value, initSpace) => {
	  const space = `${SPACE_LEVEL}${initSpace}`;

	  if (isList$1(value)) {
	    return createUINestedArrayContent(value, space);
	  }

	  return createUINestedObjectContent(value, space);
	};

	function createUINested(value, space = '', initExpanded = false) {
	  const size = isList$1(value) ? getListSize$1(value) : getStorageSize(value);
	  let expanded = initExpanded && !!size;
	  let contentExpanded;
	  const contentCollapsed = createCollapsedContent(value, size);
	  const {
	    pre,
	    post
	  } = getStringWrap(value);
	  const icon = createExpandIcon(expanded);
	  const wrapper = document.createElement('span');
	  wrapper.className = 'ui-console-nested-wrapper';
	  const link = document.createElement('span');
	  link.className = 'ui-console-clickable';
	  link.appendChild(icon);
	  link.appendChild(document.createTextNode(pre));

	  const drawContents = () => {
	    let content;
	    removeAllChildren(wrapper);
	    wrapper.appendChild(link);

	    if (expanded) {
	      if (!contentExpanded) {
	        contentExpanded = createUINestedContent(value, space);
	      }

	      content = contentExpanded;
	    } else {
	      content = contentCollapsed;
	    }

	    content.forEach(node => wrapper.appendChild(node));
	    wrapper.appendChild(document.createTextNode(expanded ? `${space}${post}` : post));
	  };

	  link.addEventListener('click', event => {
	    event.preventDefault();
	    event.stopPropagation();
	    expanded = !expanded;
	    setExpandIconSymbol(icon, expanded);
	    drawContents();
	  });
	  drawContents();
	  return wrapper;
	}

	const {
	  isNested: isNested$1,
	  canPassAsIs
	} = logDataRenderer_1;

	const createSimpleValue = value => document.createTextNode(`${value} `);

	const buildContent = (content, item, converted = false) => {
	  content.forEach(value => {
	    if (!converted && canPassAsIs(value)) {
	      // shortcut for log strings to not wrap them with quotes
	      item.appendChild(createSimpleValue(value));
	      return;
	    }

	    const result = converted ? value : convert(value);

	    if (isNested$1(result)) {
	      item.appendChild(createUINested(result, '', true));
	    } else {
	      item.appendChild(createSimpleValue(result));
	    }
	  });
	  return item;
	};

	const init = (container, maxItems = Number.MAX_SAFE_INTEGER) => {
	  const shiftOverMax = () => {
	    while (maxItems > 0 && maxItems < container.childElementCount) {
	      const child = container.firstElementChild;

	      if (!child) {
	        return;
	      }

	      child.remove();
	    }
	  };

	  const pushItem = (content, type = LOG_TYPE, converted = false) => {
	    const item = document.createElement('div');
	    item.className = `ui-console-item ui-console-item-${type}`;
	    buildContent(content, item, converted);
	    container.appendChild(item);
	    shiftOverMax();
	  };

	  return {
	    info: (...content) => pushItem(content, INFO_TYPE),
	    log: (...content) => pushItem(content, LOG_TYPE),
	    warn: (...content) => pushItem(content, WARNING_TYPE),
	    error: (...content) => pushItem(content, ERROR_TYPE),
	    success: (...content) => pushItem(content, SUCCESS_TYPE),
	    add: (type, ...content) => pushItem(content, type),
	    addConverted: (type, ...content) => pushItem(content, type, true),
	  };
	};
	const create = (wrapper, maxItems = Number.MAX_SAFE_INTEGER) => {
	  const container = document.createElement('div');
	  container.className = 'ui-console ui-console-container';
	  wrapper.appendChild(container);
	  return init(container, maxItems);
	};

	exports.init = init;
	exports.create = create;
	exports.addTypeHandler = logDataRenderer_2;
	exports.getTypeHandler = logDataRenderer_3;
	exports.hasTypeHandler = logDataRenderer_4;
	exports.removeTypeHandler = logDataRenderer_5;
	exports.setTypeHandlerSelector = logDataRenderer_6;
	exports.getMaxNesingDepth = logDataRenderer_9;
	exports.setMaxNesingDepth = logDataRenderer_10;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=console.js.map
