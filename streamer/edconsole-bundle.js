(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var hasOwn_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	const hasOwn = (
	  (has) =>
	  (target, property) =>
	  Boolean(target && has.call(target, property))
	)(Object.prototype.hasOwnProperty);

	exports.hasOwn = hasOwn;
	exports.default = hasOwn;
	});

	var hasOwn = /*@__PURE__*/getDefaultExportFromCjs(hasOwn_1);

	/* eslint-disable import/prefer-default-export */
	const isObject = (value) => typeof value === 'object' && value !== null;

	/**
	 * Created by Oleg Galaburda on 09.02.16.
	 *
	 */
	class Event {
	  constructor(type, data = null) {
	    this.type = type;
	    this.data = data;
	    this.defaultPrevented = false;
	  }

	  toJSON() {
	    return {
	      type: this.type,
	      data: this.data,
	    };
	  }

	  isDefaultPrevented() {
	    return this.defaultPrevented;
	  }

	  preventDefault() {
	    this.defaultPrevented = true;
	  }
	}
	const getEvent = (eventOrType, optionalData) => {
	  let event = eventOrType;

	  if (!isObject(eventOrType)) {
	    event = new Event(String(eventOrType), optionalData);
	  }

	  return event;
	};

	/**
	 * Created by Oleg Galaburda on 09.02.16.
	 *
	 */
	class ListenersRunner {
	  constructor(listeners, onStopped, onComplete) {
	    this.index = -1;
	    this.immediatelyStopped = false;

	    this.stopImmediatePropagation = () => {
	      this.immediatelyStopped = true;
	    };

	    this.listeners = listeners;
	    this.onStopped = onStopped;
	    this.onComplete = onComplete;
	  }

	  run(event, target) {
	    let listener;
	    const { listeners } = this;
	    this.augmentEvent(event); // TODO this has to be handled in separate object ListenersRunner that should be
	    // created for each call() call and asked for index validation on each listener remove.

	    for (this.index = 0; this.index < listeners.length; this.index++) {
	      if (this.immediatelyStopped) break;
	      listener = listeners[this.index];
	      listener.call(target, event);
	    }

	    this.clearEvent(event);
	    this.onComplete(this);
	  }

	  augmentEvent(eventObject) {
	    const event = eventObject;
	    event.stopPropagation = this.onStopped;
	    event.stopImmediatePropagation = this.stopImmediatePropagation;
	  }
	  /* eslint class-methods-use-this: "off" */

	  clearEvent(eventObject) {
	    const event = eventObject;
	    delete event.stopPropagation;
	    delete event.stopImmediatePropagation;
	  }

	  listenerRemoved(listeners, index) {
	    if (listeners === this.listeners && index <= this.index) {
	      this.index--;
	    }
	  }
	}

	/**
	 * Created by Oleg Galaburda on 09.02.16.
	 *
	 */
	class EventListeners {
	  constructor() {
	    this._listeners = {};
	    this._runners = [];

	    this.removeRunner = (runner) => {
	      this._runners.splice(this._runners.indexOf(runner), 1);
	    };
	  }

	  createList(eventType, priorityOpt) {
	    const priority = parseInt(priorityOpt, 10);
	    const target = this.getPrioritiesByKey(eventType);
	    const key = String(priority);
	    let value;

	    if (hasOwn(target, key)) {
	      value = target[key];
	    } else {
	      value = [];
	      target[key] = value;
	    }

	    return value;
	  }

	  getPrioritiesByKey(key) {
	    let value;

	    if (hasOwn(this._listeners, key)) {
	      value = this._listeners[key];
	    } else {
	      value = {};
	      this._listeners[key] = value;
	    }

	    return value;
	  }

	  add(eventType, handler, priority) {
	    const handlers = this.createList(eventType, priority);

	    if (handlers.indexOf(handler) < 0) {
	      handlers.push(handler);
	    }
	  }

	  has(eventType) {
	    let priority;
	    let result = false;
	    const priorities = this.getPrioritiesByKey(eventType);

	    if (priorities) {
	      for (priority in priorities) {
	        if (hasOwn(priorities, priority)) {
	          result = true;
	          break;
	        }
	      }
	    }

	    return result;
	  }

	  remove(eventType, handler) {
	    const priorities = this.getPrioritiesByKey(eventType);

	    if (priorities) {
	      const list = Object.getOwnPropertyNames(priorities);
	      const { length } = list;

	      for (let index = 0; index < length; index++) {
	        const priority = list[index];
	        const handlers = priorities[priority];
	        const handlerIndex = handlers.indexOf(handler);

	        if (handlerIndex >= 0) {
	          handlers.splice(handlerIndex, 1);

	          if (!handlers.length) {
	            delete priorities[priority];
	          }

	          this._runners.forEach((runner) => {
	            runner.listenerRemoved(handlers, handlerIndex);
	          });
	        }
	      }
	    }
	  }

	  removeAll(eventType) {
	    delete this._listeners[eventType];
	  }

	  createRunner(handlers, onStopped) {
	    const runner = new ListenersRunner(handlers, onStopped, this.removeRunner);

	    this._runners.push(runner);

	    return runner;
	  }

	  call(event, target) {
	    const priorities = this.getPrioritiesByKey(event.type);
	    let stopped = false;

	    const stopPropagation = () => {
	      stopped = true;
	    };

	    if (priorities) {
	      // getOwnPropertyNames() or keys()?
	      const list = Object.getOwnPropertyNames(priorities).sort((a, b) => a - b);
	      const { length } = list;

	      for (let index = 0; index < length; index++) {
	        if (stopped) break;
	        const handlers = priorities[list[index]]; // in case if all handlers of priority were removed while event
	        // was dispatched and handlers become undefined.

	        if (handlers) {
	          const runner = this.createRunner(handlers, stopPropagation);
	          runner.run(event, target);
	          if (runner.immediatelyStopped) break;
	        }
	      }
	    }
	  }
	}

	/**
	 * Created by Oleg Galaburda on 09.02.16.
	 *
	 */

	class EventDispatcher {
	  constructor(eventPreprocessor = null) {
	    this._eventPreprocessor = eventPreprocessor;
	    this._listeners = new EventListeners();
	  }

	  addEventListener(eventType, listener, priority = 0) {
	    this._listeners.add(eventType, listener, -priority || 0);
	  }

	  hasEventListener(eventType) {
	    return this._listeners.has(eventType);
	  }

	  removeEventListener(eventType, listener) {
	    this._listeners.remove(eventType, listener);
	  }

	  removeAllEventListeners(eventType) {
	    this._listeners.removeAll(eventType);
	  }

	  dispatchEvent(event, data) {
	    let eventObject = getEvent(event, data);

	    if (this._eventPreprocessor) {
	      eventObject = this._eventPreprocessor.call(this, eventObject);
	    }

	    this._listeners.call(eventObject);
	  }
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

	var logDataRenderer = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });




	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var getClass__default = /*#__PURE__*/_interopDefaultLegacy(getClass_1);

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
	  __proto__: null,
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
	    try {
	      addToStorage(result, keyNeedsConversion(key) ? convertValue(key) : key, convertValue(value[key]));
	    } catch (error) {
	      /* Possible SecurityError when accessing properties from restricted origin */
	    }
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
	  const type = getClass__default['default'](value);
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

	      try {
	        return `${value}`;
	      } catch (error) {
	        return '[object Non-Serializable]';
	      }

	  }
	};

	const fallbackConversion = (value, convertValue, refs) => {
	  if (isString(value)) {
	    return toString(value);
	  }

	  if (value instanceof Function) {
	    return convertFunction(value);
	  }

	  if (value instanceof Error) {
	    return convertError(value, convertValue);
	  }

	  if (value instanceof Map) {
	    return convertMap(value, convertValue);
	  }

	  if (value instanceof Set) {
	    return convertSet(value, convertValue);
	  }

	  if (value instanceof Array) {
	    return convertArray(value, convertValue);
	  }

	  return convertObject(value, convertValue);
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

	  result = fallbackConversion(value, nextConvert);

	  if (complex) {
	    refs.set(value, result);
	  }

	  return result;
	};

	exports.addTypeHandler = addTypeHandler;
	exports.convert = convert;
	exports.default = convert;
	exports.getMaxNesingDepth = getMaxNesingDepth;
	exports.getTypeHandler = getTypeHandler;
	exports.hasTypeHandler = hasTypeHandler;
	exports.isString = isString;
	exports.removeTypeHandler = removeTypeHandler;
	exports.setMaxNesingDepth = setMaxNesingDepth;
	exports.setTypeHandlerSelector = setTypeHandlerSelector;
	exports.toString = toString;
	exports.utils = utils;

	});

	var index = /*@__PURE__*/getDefaultExportFromCjs(logDataRenderer);

	var LogDataRenderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), logDataRenderer, {
		'default': index
	}));

	const UID_LENGTH = 12;

	const generateUID = () => Date.now().toString(32).padEnd(UID_LENGTH);

	const CLIENT_UID = generateUID();

	// parsing JSON for every message would cost much more than simply stripping a substring.
	const composeMessage = (command, data, stringifyFallback) => {
	  let message;

	  try {
	    message = JSON.stringify({ command, data });
	  } catch (error) {
	    if (stringifyFallback) {
	      try {
	        message = JSON.stringify({ command, data: stringifyFallback(data) });
	      } catch (err) {
	        console.error(error);
	        return null;
	      }
	    } else {
	      console.error(error);
	      return null;
	    }
	  }

	  const uid = generateUID();

	  registerMessageUID(uid);

	  return `${CLIENT_UID}${uid}${message}`;
	};

	const isMessage = (str) =>
	  str && typeof str === 'string' && str.length > UID_LENGTH;

	const isOwnMessage = (str) =>
	  isMessage(str) && str.substr(0, UID_LENGTH) === CLIENT_UID;

	const getMessageUID = (str) => str.substr(UID_LENGTH, UID_LENGTH);

	const parseMessage = (str) => {
	  try {
	    return JSON.parse(str.substr(UID_LENGTH * 2));
	  } catch (error) {
	    return null;
	  }
	};

	const readMessage = ({ data, detail }) => {
	  const str = data || detail;

	  if (!isMessage(str) || isOwnMessage(str)) {
	    return null;
	  }

	  const uid = getMessageUID(str);

	  if (hasMessageUIDRegistered(uid)) {
	    return null;
	  }

	  return parseMessage(str);
	};

	const getMessageCommand = ({ command }) => command;

	const getMessageData = ({ data }) => data;

	const uids = new Set();

	const registerMessageUID = (uid) => {
	  uids.add(uid);
	};

	const hasMessageUIDRegistered = (uid) => uids.has(uid);

	var Message = /*#__PURE__*/Object.freeze({
		__proto__: null,
		UID_LENGTH: UID_LENGTH,
		generateUID: generateUID,
		CLIENT_UID: CLIENT_UID,
		composeMessage: composeMessage,
		isMessage: isMessage,
		isOwnMessage: isOwnMessage,
		getMessageUID: getMessageUID,
		parseMessage: parseMessage,
		readMessage: readMessage,
		getMessageCommand: getMessageCommand,
		getMessageData: getMessageData,
		registerMessageUID: registerMessageUID,
		hasMessageUIDRegistered: hasMessageUIDRegistered
	});

	const { readMessage: readMessage$1, composeMessage: composeMessage$1 } = Message;

	const dispatcher = new EventDispatcher();

	const Event$1 = Object.freeze({
	  CONSOLE_FRAME_OPENED: 'consoleFrameOpened',
	  CONSOLE_FRAME_CLOSED: 'consoleFrameClosed',
	  COMMAND_RECEIVED: 'commandReceived',
	});

	const handlers = {};

	const subscribers = [];

	const plugins = [];

	const EDConsole = {
	  Event: Event$1,
	  Message,
	  EventDispatcher,
	  LogDataRenderer,
	  getConsolePath: () => EDConsoleConfig.consoleHref,
	  registerPlugin: (pluginName) => {
	    plugins.push(pluginName);
	  },
	  getRegisteredPlugins: () => plugins.slice(),
	  setCommandHandler: (command, handler) => {
	    handlers[command] = handler;
	  },
	  subscribeToIncomingMessages: (handler) => {
	    subscribers.push(handler);
	  },
	  unsubscribeFromIncomingMessages: (handler) => {
	    const index = subscribers.indexOf(handler);

	    if (index >= 0) {
	      subscribers.splice(index, 1);
	    }
	  },
	  addEventListener: (type, listener, priority) =>
	    dispatcher.addEventListener(type, listener, priority),
	  removeEventListener: (type, listener) =>
	    dispatcher.removeEventListener(type, listener),
	  consoleOpened: (contentWindow) =>
	    dispatcher.dispatchEvent(Event$1.CONSOLE_FRAME_OPENED, contentWindow),
	  consoleClosed: (contentWindow) =>
	    dispatcher.dispatchEvent(Event$1.CONSOLE_FRAME_CLOSED, contentWindow),
	  handleIncomingMessageEvent: (event, sendResponse) => {
	    const message = readMessage$1(event);

	    if (!message) {
	      return;
	    }

	    EDConsole.handleIncomingCommand(
	      getMessageCommand(message),
	      getMessageData(message),
	      sendResponse,
	    );
	  },
	  handleIncomingCommand: (command, data, sendResponse) => {
	    const { [command]: handler } = handlers;

	    const callback = (rCommand, rData) =>
	      EDConsole.sendCommandTo(sendResponse, rCommand, rData);

	    handler(command, data, callback);
	    dispatcher.dispatchEvent(Event$1.COMMAND_RECEIVED, {
	      command,
	      data,
	      sendResponse: callback,
	    });
	  },
	  sendCommand: (command, data, stringifyFallback) => {
	    const message = composeMessage$1(command, data, stringifyFallback);

	    if (!message) {
	      // INFO Might cause problem when using with plugin-log-console, need to be careful
	      console.error(`Cannot compose "${command}" message from:`, data);
	      return;
	    }

	    subscribers.forEach((subscriber) => subscriber(message));
	  },
	  sendCommandTo: (subscriber, command, data, stringifyFallback) => {
	    const message = composeMessage$1(command, data, stringifyFallback);

	    if (!message) {
	      // INFO Might cause problem when using with plugin-log-console, need to be careful
	      console.error(`Cannot compose "${command}" message from:`, data);
	      return;
	    }

	    subscriber(message);
	  },
	};

	window.EDConsole = EDConsole;

	((EDConsole) => {
	  const { Event, Message } = EDConsole;
	  const Command = {
	    INIT_FRAME: 'init-frame',
	    SET_PLUGINS_CONFIGURATION: 'set-plugins-configuration',
	    CONNECTION_PING: 'connection-ping',
	    CONNECTION_PONG: 'connection-pong',
	  };

	  const targets = new Map();

	  const removeTarget = (target) => {
	    if (!targets.has(target)) {
	      return;
	    }
	    const messageSubscriber = targets.get(target);

	    EDConsole.unsubscribeFromIncomingMessages(messageSubscriber);
	    targets.delete(target);

	    try {
	      target.removeEventListener('message', messageHandler);
	    } catch (error) {}
	  };

	  const messageHandler = (event) => {
	    const { source: target } = event;
	    const messageSubscriber = (str) => target.postMessage(str, '*');
	    if (targets.has(target)) {
	      EDConsole.handleIncomingMessageEvent(event, messageSubscriber);
	      return;
	    }

	    const message = Message.readMessage(event);

	    if (message && Message.getMessageCommand(message) === Command.INIT_FRAME) {
	      EDConsole.subscribeToIncomingMessages(messageSubscriber);
	      targets.set(target, messageSubscriber);

	      EDConsole.sendCommandTo(
	        messageSubscriber,
	        Command.SET_PLUGINS_CONFIGURATION,
	        {
	          plugins: EDConsole.getRegisteredPlugins(),
	        },
	      );
	    }
	  };

	  EDConsole.addEventListener(Event.CONSOLE_FRAME_OPENED, ({ data: target }) => {
	    target.addEventListener('unload', () => removeTarget(target));
	    try {
	      target.addEventListener('message', messageHandler);
	    } catch (error) {}
	  });

	  EDConsole.addEventListener(Event.CONSOLE_FRAME_CLOSED, ({ data: target }) =>
	    removeTarget(target),
	  );

	  window.addEventListener('message', messageHandler);

	  EDConsole.setCommandHandler(Command.INIT_FRAME, (_, src, sendResponse) =>
	    sendResponse(Command.SET_PLUGINS_CONFIGURATION, {
	      plugins: EDConsole.getRegisteredPlugins(),
	    }),
	  );

	  EDConsole.setCommandHandler(Command.CONNECTION_PING, (_, src, sendResponse) =>
	    sendResponse(Command.CONNECTION_PONG),
	  );
	})(window.EDConsole);

	((EDConsole) => {
	  const T_KEY_CODE = 84;
	  const ARROW_DOWN_KEY_CODE = 40;
	  let frame;
	  const bodyPrevPaddingBottom = document.createElement('div');
	  Object.assign(bodyPrevPaddingBottom.style, {
	    flex: '0 0 300px',
	    minHeight: '300px',
	    height: '300px',
	  });

	  const displayConsoleFrame = () => {
	    frame = document.createElement('iframe');
	    frame.src = EDConsole.getConsolePath();

	    Object.assign(frame.style, {
	      position: 'fixed',
	      zIndex: Math.pow(2, 32) - 1,
	      left: '0',
	      right: '0',
	      bottom: '0',
	      width: '100%',
	      height: '350px',
	      borderTop: '1px solid #eee',
	      boxShadow: '0 0 10px #00000066',
	      backgroundColor: '#ffffff',
	    });

	    const { body } = document;

	    body.appendChild(bodyPrevPaddingBottom);
	    body.appendChild(frame);
	    EDConsole.consoleOpened(frame.contentWindow);
	  };

	  const hideConsoleFrame = () => {
	    bodyPrevPaddingBottom.remove();
	    frame.remove();
	    EDConsole.consoleClosed(frame.contentWindow);
	    frame = null;
	  };

	  const toggleConsoleFrame = () => {
	    if (frame) {
	      hideConsoleFrame();
	    } else {
	      displayConsoleFrame();
	    }
	  };

	  window.addEventListener(
	    'keyup',
	    ({ key, ctrlKey, shiftKey, altKey, keyCode }) => {
	      if (
	        shiftKey &&
	        ctrlKey &&
	        !altKey &&
	        (key === 'ArrowDown' || keyCode === ARROW_DOWN_KEY_CODE)
	      ) {
	        toggleConsoleFrame();
	      }

	      if (
	        shiftKey &&
	        ctrlKey &&
	        !altKey &&
	        (String(key).toUpperCase() === 'T' || keyCode === T_KEY_CODE)
	      ) {
	        toggleConsoleFrame();
	      }
	    },
	  );
	})(window.EDConsole);

	((EDConsole) => {
	  const Q_KEY_CODE = 81;
	  const ARROW_UP_KEY_CODE = 38;

	  const openNewWindow = () => {
	    const frame = window.open(EDConsole.getConsolePath());

	    frame.addEventListener('unload', () => {
	      EDConsole.consoleClosed(frame);
	    });

	    EDConsole.consoleOpened(frame);
	  };

	  window.addEventListener(
	    'keyup',
	    ({ key, ctrlKey, shiftKey, altKey, keyCode }) => {
	      if (
	        shiftKey &&
	        ctrlKey &&
	        !altKey &&
	        (key === 'ArrowUp' || keyCode === ARROW_UP_KEY_CODE)
	      ) {
	        openNewWindow();
	      }

	      if (
	        shiftKey &&
	        ctrlKey &&
	        !altKey &&
	        (String(key).toUpperCase() === 'Q' || keyCode === Q_KEY_CODE)
	      ) {
	        openNewWindow();
	      }
	    },
	  );
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'log-console';
	  const { LogDataRenderer } = EDConsole;
	  const Command = {
	    CONSOLE_LOG: 'console-log',
	    EVAL_COMMAND: 'eval-command',
	    EVAL_COMMAND_RESPONSE: 'eval-command/response',
	  };

	  try {
	    const { log: logFn, error: errorFn, warn: warnFn, info: infoFn } = console;

	    const cmdFn = (type, args) =>
	      EDConsole.sendCommand(Command.CONSOLE_LOG, {
	        type,
	        args: args.map((item) => LogDataRenderer.convert(item)),
	      });

	    const log = (...args) => {
	      cmdFn('log', args);
	      logFn.apply(console, args);
	    };

	    const error = (...args) => {
	      cmdFn('error', args);
	      errorFn.apply(console, args);
	    };

	    const warn = (...args) => {
	      cmdFn('warn', args);
	      warnFn.apply(console, args);
	    };

	    const info = (...args) => {
	      cmdFn('info', args);
	      infoFn.apply(console, args);
	    };

	    Object.assign(console, {
	      log,
	      error,
	      warn,
	      info,
	    });

	    if (!window.log) {
	      window.log = log;
	    }
	  } catch (error) {
	    console.log(error);
	  }

	  EDConsole.setCommandHandler(
	    Command.EVAL_COMMAND,
	    (_, { value }, sendResponse) => {
	      let result;

	      try {
	        eval(`result = ${value};`);
	      } catch (error) {
	        result = error;
	      }

	      let response = '';

	      if (result) {
	        response = LogDataRenderer.convert(result);
	      } else {
	        response = 'Command returned "undefined".';
	      }

	      sendResponse(Command.EVAL_COMMAND_RESPONSE, response);
	    },
	  );

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'log-location';
	  const Command = {
	    READ_LOCATION: 'read-location',
	    READ_LOCATION_RESPONSE: 'read-location/response',
	    LOCATION_SET: 'location-set',
	    LOCATION_SET_HASH: 'location-set-hash',
	    LOCATION_RELOAD: 'location-reload',
	    HISTORY_BACK: 'history-back',
	    HISTORY_FORWARD: 'history-forward',
	  };

	  EDConsole.setCommandHandler(Command.LOCATION_SET, (_, { value }) => {
	    window.location.href = value;
	  });

	  EDConsole.setCommandHandler(Command.LOCATION_SET_HASH, (_, { value }) => {
	    window.location.hash = value;
	  });

	  EDConsole.setCommandHandler(Command.LOCATION_RELOAD, () =>
	    window.location.reload(),
	  );

	  EDConsole.setCommandHandler(Command.HISTORY_BACK, () =>
	    window.history.back(),
	  );

	  EDConsole.setCommandHandler(Command.HISTORY_FORWARD, () =>
	    window.history.forward(),
	  );

	  EDConsole.setCommandHandler(
	    Command.READ_LOCATION,
	    (_, data, sendResponse) => {
	      const {
	        hash,
	        host,
	        hostname,
	        href,
	        origin,
	        password,
	        pathname,
	        port,
	        protocol,
	        search,
	        username,
	      } = window.location;

	      sendResponse(Command.READ_LOCATION_RESPONSE, {
	        hash,
	        host,
	        hostname,
	        href,
	        origin,
	        password,
	        pathname,
	        port,
	        protocol,
	        search,
	        username,
	      });
	    },
	  );

	  const { history: historyObj } = window;
	  const {
	    pushState: pushStateFn,
	    replaceState: replaceStateFn,
	    back: backFn,
	    forward: forwardFn,
	    go: goFn,
	  } = historyObj;

	  historyObj.back = (...args) => {
	    console.log('History Back');
	    backFn.apply(historyObj, args);
	  };

	  historyObj.forward = (...args) => {
	    console.log('History Forward');
	    forwardFn.apply(historyObj, args);
	  };

	  historyObj.go = (...args) => {
	    console.log('History Go', ...args);
	    goFn.apply(historyObj, args);
	  };

	  historyObj.pushState = (...args) => {
	    console.log('History Push', ...args);
	    pushStateFn.apply(historyObj, args);
	  };

	  historyObj.replaceState = (...args) => {
	    console.log('History Replace', ...args);
	    replaceStateFn.apply(historyObj, args);
	  };

	  window.addEventListener('popstate', (event) => {
	    console.log('History Pop', event);
	  });

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'manage-cookies';
	  const Command = {
	    READ_COOKIES: 'read-cookies',
	    READ_COOKIES_RESPONSE: 'read-cookies/response',
	    COOKIE_SET: 'cookie-set',
	    COOKIE_REMOVE: 'cookie-remove',
	    COOKIES_CLIPBOARD_EXPORT: 'cookies-clipboard-export',
	    COOKIES_BULK_SET: 'cookies-bulk-set',

	    TEXTDATA_SHOW: 'textdata-show',
	  };

	  const readCookies = () =>
	    document.cookie
	      .split(';')
	      .filter((item) => !!item.trim())
	      .map((str) => {
	        const [key, value] = str.split('=');

	        return { key: key.trim(), value: value.trim() };
	      });

	  const setCookie = (key, value) => {
	    document.cookie = `${key}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	  };

	  const removeCookie = (key) => {
	    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	  };

	  EDConsole.setCommandHandler(Command.READ_COOKIES, (_, data, sendResponse) => {
	    sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
	  });

	  EDConsole.setCommandHandler(Command.COOKIE_SET, (_, data, sendResponse) => {
	    setCookie(data.key, data.value);

	    sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
	  });

	  EDConsole.setCommandHandler(
	    Command.COOKIE_REMOVE,
	    (_, data, sendResponse) => {
	      removeCookie(data.key);

	      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.COOKIES_CLIPBOARD_EXPORT,
	    (_, inc, sendResponse) => {
	      let data = '';
	      const cookies = readCookies();

	      try {
	        data = JSON.stringify(cookies, null, 2);

	        navigator.clipboard.writeText(data);
	      } catch (error) {}

	      if (data) {
	        sendResponse(Command.TEXTDATA_SHOW, { title: 'Cookies', data });
	      }
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.COOKIES_BULK_SET,
	    (_, data, sendResponse) => {
	      if (data instanceof Array) {
	        data.forEach(({ key, value }) => setCookie(key, value));
	      } else {
	        Object.keys(data).forEach((key) => setCookie(key, data[key]));
	      }

	      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
	    },
	  );

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'manage-storage';

	  const HIDDEN_KEYS = {
	    '@EDConsole-Storage-root': true,
	  };

	  const Command = {
	    READ_LOCAL_STORAGE: 'read-local-storage',
	    READ_LOCAL_STORAGE_RESPONSE: 'read-local-storage/response',
	    LOCAL_STORAGE_SET: 'local-storage-set',
	    LOCAL_STORAGE_REMOVE: 'local-storage-remove',
	    LOCAL_STORAGE_CLIPBOARD_EXPORT: 'local-storage-clipboard-export',
	    LOCAL_STORAGE_BULK_SET: 'local-storage-bulk-set',

	    READ_SESSION_STORAGE: 'read-session-storage',
	    READ_SESSION_STORAGE_RESPONSE: 'read-session-storage/response',
	    SESSION_STORAGE_SET: 'session-storage-set',
	    SESSION_STORAGE_REMOVE: 'session-storage-remove',
	    SESSION_STORAGE_CLIPBOARD_EXPORT: 'session-storage-clipboard-export',
	    SESSION_STORAGE_BULK_SET: 'session-storage-bulk-set',

	    TEXTDATA_SHOW: 'textdata-show',
	  };

	  const read = (storage) => {
	    const list = [];

	    for (let index = 0; index < storage.length; index++) {
	      const key = storage.key(index);

	      if (HIDDEN_KEYS[key]) {
	        continue;
	      }

	      list.push({ key, value: storage.getItem(key) });
	    }

	    return list;
	  };

	  EDConsole.setCommandHandler(
	    Command.READ_LOCAL_STORAGE,
	    (_, data, sendResponse) =>
	      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage)),
	  );

	  EDConsole.setCommandHandler(
	    Command.LOCAL_STORAGE_SET,
	    (_, data, sendResponse) => {
	      localStorage.setItem(data.key, data.value);

	      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.LOCAL_STORAGE_REMOVE,
	    (_, data, sendResponse) => {
	      localStorage.removeItem(data.key);

	      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.LOCAL_STORAGE_CLIPBOARD_EXPORT,
	    (_, inc, sendResponse) => {
	      let data = '';
	      const storageData = read(localStorage).reduce(
	        (res, { key, value }) => ({ ...res, [key]: value }),
	        {},
	      );

	      try {
	        data = JSON.stringify(storageData, null, 2);

	        navigator.clipboard.writeText(data);
	      } catch (error) {}

	      if (data) {
	        sendResponse(Command.TEXTDATA_SHOW, {
	          title: 'LocalStorage contents',
	          data,
	        });
	      }
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.LOCAL_STORAGE_BULK_SET,
	    (_, data, sendResponse) => {
	      if (data instanceof Array) {
	        data.forEach(({ key, value }) => localStorage.setItem(key, value));
	      } else {
	        Object.keys(data).forEach((key) =>
	          localStorage.setItem(key, data[key]),
	        );
	      }

	      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.READ_SESSION_STORAGE,
	    (_, data, sendResponse) =>
	      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage)),
	  );

	  EDConsole.setCommandHandler(
	    Command.SESSION_STORAGE_SET,
	    (_, data, sendResponse) => {
	      sessionStorage.setItem(data.key, data.value);

	      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.SESSION_STORAGE_REMOVE,
	    (_, data, sendResponse) => {
	      sessionStorage.removeItem(data.key);

	      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.SESSION_STORAGE_CLIPBOARD_EXPORT,
	    (_, inc, sendResponse) => {
	      let data = '';
	      const storageData = read(sessionStorage).reduce(
	        (res, { key, value }) => ({ ...res, [key]: value }),
	        {},
	      );

	      try {
	        data = JSON.stringify(storageData, null, 2);

	        navigator.clipboard.writeText(data);
	      } catch (error) {}

	      if (data) {
	        sendResponse(Command.TEXTDATA_SHOW, {
	          title: 'SessionStorage contents',
	          data,
	        });
	      }
	    },
	  );

	  EDConsole.setCommandHandler(
	    Command.SESSION_STORAGE_BULK_SET,
	    (_, data, sendResponse) => {
	      if (data instanceof Array) {
	        data.forEach(({ key, value }) => sessionStorage.setItem(key, value));
	      } else {
	        Object.keys(data).forEach((key) =>
	          sessionStorage.setItem(key, data[key]),
	        );
	      }

	      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
	    },
	  );

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'log-redux';
	  const Command = {
	    REDUX_ACTION: 'redux-action',
	  };

	  const send = (action) =>
	    EDConsole.sendCommand(Command.REDUX_ACTION, action, ({ type }) => ({
	      type,
	      payload:
	        "Sorry, JSON.stringify() could not handle this action contents, so it can't be shown here.",
	    }));

	  const __REDUX_DEVTOOLS_EXTENSION__ = () => (next) => (
	    reducer,
	    initialState,
	    enhancer,
	  ) => {
	    const store = next(reducer, initialState, enhancer);

	    return {
	      ...store,
	      dispatch: (...args) => {
	        send(args[0]);
	        return store.dispatch(...args);
	      },
	    };
	  };

	  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (...funcs) => {
	    const extensionCompose = (...funcs) => {
	      return (...args) => {
	        return funcs.reduceRight(
	          (composed, f) => f(composed),
	          __REDUX_DEVTOOLS_EXTENSION__()(...args),
	        );
	      };
	    };

	    if (funcs.length === 0) {
	      return __REDUX_DEVTOOLS_EXTENSION__();
	    }
	    if (funcs.length === 1 && typeof funcs[0] === 'object') {
	      return extensionCompose;
	    }
	    return extensionCompose(...funcs);
	  };

	  const noop = () => undefined;

	  Object.assign(__REDUX_DEVTOOLS_EXTENSION__, {
	    open: noop, // (...args) => console.log('open()', ...args),
	    updateStore: noop, // (...args) => console.log('updateStore()', ...args),
	    notifyErrors: noop, // (...args) => console.log('notifyErrors()', ...args),
	    send: (performAction) => {
	      // console.log('send()', ...args);

	      const { action } = performAction || {};

	      if (action) {
	        send(action);
	      }
	    },
	    listen: noop, // (...args) => console.log('listen()', ...args),
	    connect: () => {
	      // console.log('connect()', ...args);
	      return __REDUX_DEVTOOLS_EXTENSION__;
	    },
	    disconnect: noop, // (...args) => console.log('disconnect()', ...args),
	    error: noop, // (...args) => console.log('X.error()', ...args),
	    init: noop, // (...args) => console.log('X.init()', ...args),
	    subscribe: noop, // (...args) => console.log('X.subscribe()', ...args),
	    unsubscribe: noop, // (...args) => console.log('X.unsubscribe()', ...args),
	  });

	  window.__REDUX_DEVTOOLS_EXTENSION__ = __REDUX_DEVTOOLS_EXTENSION__;

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'log-xhr';
	  const Command = {
	    XHR_UPDATE: 'network-update',
	  };

	  const State = {
	    OPENED: 1,
	    LOADING: 3,
	    DONE: 4,
	  };

	  const { fetch: fetchFn, XMLHttpRequest: XMLHttpRequestDef } = window;
	  let lastRequestIndex = 1;

	  class XMLHttpRequest extends XMLHttpRequestDef {
	    constructor(...args) {
	      super(...args);

	      this._index = lastRequestIndex++;
	      this._openArgs = {};
	      this._headers = [];
	      this._body = '';
	      this._error = null;

	      this.addEventListener('readystatechange', (event) => {
	        const { method, url } = this._openArgs;
	        let data;

	        switch (this.responseType) {
	          case '':
	          case 'text':
	            data = this.responseText;
	            break;
	          case 'json':
	            data = JSON.stringify(this.response, null, 2);
	            break;
	          default:
	            data = ` -- Response of type "${this.responseType}" -- `;
	            break;
	        }

	        EDConsole.sendCommand(Command.XHR_UPDATE, {
	          index: this._index,
	          type: 'xhr',
	          method,
	          url,
	          headers: this._headers,
	          body: String(this._body),
	          error: this._error && this._error.textContent,
	          responseText: data,
	          responseType: this.responseType,
	          responseURL: this.responseURL,
	          responseHeaders: prepareHeaders(this.getAllResponseHeaders()),
	          status: this.status,
	          statusText: this.statusText,
	          state: this.readyState,
	        });
	      });

	      this.addEventListener('error', (error) => {
	        this._error = error;
	      });

	      const { open, send, setRequestHeader } = this;

	      this.open = (method, url, ...args) => {
	        this._openArgs = { method, url };
	        return open.call(this, method, url, ...args);
	      };

	      this.setRequestHeader = (header, value) => {
	        this._headers.push([header, value]);

	        return setRequestHeader.call(this, header, value);
	      };

	      this.send = (value) => {
	        this._body = value;
	        return send.call(this, value);
	      };
	    }
	    /*
	    open(method, url, ...args) {
	      this._openArgs = { method, url };
	      return super.open(method, url, ...args);
	    }

	    setRequestHeader(header, value) {
	      this._headers.push([header, value]);

	      return super.setRequestHeader(header, value);
	    }

	    send(value) {
	      this._body = value;
	      return super.send(value);
	    }
	*/
	    get requestIndex() {
	      return this._index;
	    }
	  }

	  const prepareHeaders = (source) => {
	    let headers = [];

	    if (!source) {
	      return headers;
	    }

	    if (typeof source.entries === 'function') {
	      for (let entry of source.entries()) {
	        headers.push(entry);
	      }
	    } else if (source instanceof Array) {
	      headers.push(...source);
	    } else if (typeof source === 'string') {
	      source.split('\r\n').forEach((item) => {
	        let [name, value = ''] = item.split(':');
	        name = name.trim();
	        value = value.trim();

	        if (name) {
	          headers.push([name, value]);
	        }
	      });
	    } else {
	      Object.keys(source).forEach((key) => {
	        headers.push([key, String(source[key])]);
	      });
	    }

	    return headers;
	  };

	  const getFetchCommandParams = (url, params) => {
	    const index = XMLHttpRequest.lastRequestIndex++;
	    const { method = 'GET', headers, body } = params || {};

	    return {
	      index,
	      type: 'fetch',
	      method,
	      url,
	      headers: prepareHeaders(headers),
	      body: body && String(body),
	      state: 0,
	    };
	  };

	  const fetch = (url, params) => {
	    const cmd = getFetchCommandParams(url, params);
	    EDConsole.sendCommand(Command.XHR_UPDATE, {
	      ...cmd,
	      state: State.OPENED,
	    });

	    return new Promise((res, rej) => {
	      EDConsole.sendCommand(Command.XHR_UPDATE, {
	        ...cmd,
	        state: State.LOADING,
	      });

	      const promise = fetchFn(url, params);

	      promise.then((result) => {
	        res(result);
	        Object.assign(cmd, {
	          responseType: result.type,
	          responseURL: result.url,
	          responseHeaders: prepareHeaders(result.headers),
	          status: result.status,
	          statusText: result.statusText,
	          state: State.DONE,
	        });

	        EDConsole.sendCommand(Command.XHR_UPDATE, cmd);

	        result
	          .text()
	          .then((text) => {
	            EDConsole.sendCommand(Command.XHR_UPDATE, {
	              ...cmd,
	              error: null,
	              responseText: text,
	            });
	          })
	          .catch(() => {
	            EDConsole.sendCommand(Command.XHR_UPDATE, {
	              ...cmd,
	              error: null,
	              responseText: 'Error: Could not retrieve response body.',
	            });
	          });
	      });

	      promise.catch((error) => {
	        rej(error);

	        EDConsole.sendCommand(Command.XHR_UPDATE, {
	          ...cmd,
	          error: `${error.type} ${error.message}`,
	          status: '---',
	          statusText: 'Rejected promise',
	        });
	      });
	    });
	  };

	  EDConsole.$fetch = fetch;
	  EDConsole.$XMLHttpRequest = XMLHttpRequestDef;

	  Object.assign(window, { fetch, XMLHttpRequest });

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

	((EDConsole) => {
	  const PLUGIN_NAME = 'log-websocket';
	  if (typeof window.WebSocket === 'undefined') {
	    return;
	  }

	  const Command = {
	    WEBSOCKET_CREATED: 'websocket-created',
	    WEBSOCKET_UPDATED: 'websocket-updated',
	    WEBSOCKET_MESSAGE: 'websocket-message',
	    WEBSOCKET_MESSAGE_SEND: 'websocket-message-send',
	  };

	  const WebSocketState = {
	    CREATED: 0,
	    OPENED: 1,
	    CLOSED: 3,
	  };

	  const WebsocketMessageType = {
	    INCOMING: 'incoming',
	    OUTGOING: 'outgoing',
	  };

	  const { WebSocket: WebSocketDef } = window;
	  // TODO once WeakRef available, make it weak ref collection
	  const webSockets = {};

	  let lastRequestIndex = 1;

	  class WebSocket extends WebSocketDef {
	    constructor(url, protocols) {
	      super(url, protocols);

	      this._index = lastRequestIndex++;
	      this._openHandler = null;
	      this._closeHandler = null;
	      this._error = null;
	      webSockets[this._index] = this;

	      const cmdData = {
	        index: this._index,
	        url,
	        protocols,
	        state: WebSocketState.CREATED,
	      };

	      EDConsole.sendCommand(Command.WEBSOCKET_CREATED, cmdData);

	      this.addEventListener('message', ({ data, detail }) => {
	        EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
	          index: this._index,
	          type: WebsocketMessageType.INCOMING,
	          data: String(data || detail),
	        });
	      });

	      this.addEventListener('error', (error) => {
	        this._error = error;
	      });

	      super.onopen = (event) => {
	        EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, {
	          ...cmdData,
	          state: WebSocketState.OPENED,
	        });

	        if (typeof this._openHandler === 'function') {
	          this._openHandler.call(this, event);
	        }
	      };

	      super.onclose = (event) => {
	        EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, {
	          ...cmdData,
	          state: WebSocketState.CLOSED,
	        });

	        if (typeof this._closeHandler === 'function') {
	          this._closeHandler.call(this, event);
	        }
	      };

	      const { send } = this;

	      this.send = (data) => {
	        EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
	          index: this._index,
	          type: WebsocketMessageType.OUTGOING,
	          data: String(data || detail),
	        });

	        return send.call(this, data);
	      };
	    }

	    get onopen() {
	      return this._openHandler;
	    }

	    set onopen(handler) {
	      this._openHandler = handler;
	    }

	    get onclose() {
	      return this._closeHandler;
	    }

	    set onclose(handler) {
	      this._closeHandler = handler;
	    }
	    /*
	    send(data) {
	      EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
	        index: this._index,
	        type: WebsocketMessageType.OUTGOING,
	        data: String(data || detail),
	      });

	      return super.send(data);
	    }
	*/
	  }

	  EDConsole.$WebSocket = WebSocketDef;

	  Object.assign(window, { WebSocket });

	  EDConsole.setCommandHandler(
	    Command.WEBSOCKET_MESSAGE_SEND,
	    (_, { index, message }) => {
	      const webSocket = webSockets[index];

	      if (webSocket) {
	        webSocket.send(message);
	      }
	    }
	  );

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

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

	    EDConsole.sendCommand(
	      Command.DOM_NODE_LOOKUP_RESPONSE,
	      generateLastSelectedNodeData(),
	    );

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

	  const getInjectionNode = (type, data) => {
	    let node;

	    switch (type) {
	      case Type.CSS:
	        node = document.createElement('style');
	        node.innerText = data;
	        break;
	      case Type.JS:
	        node = document.createElement('script');
	        node.innerText = data;
	        break;
	      case Type.HTML:
	      default:
	        node = document.createDocumentFragment();
	        node.innerHTML = data;
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
	      }
	    },
	  );

	  EDConsole.registerPlugin(PLUGIN_NAME);
	})(window.EDConsole);

})));
