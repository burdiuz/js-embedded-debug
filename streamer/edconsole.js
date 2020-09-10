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

	var eventDispatcher = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var hasOwn = _interopDefault(hasOwn_1);

	/**
	 *      
	 */

	/* eslint-disable import/prefer-default-export */
	const isObject = value => typeof value === 'object' && value !== null;

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
	      data: this.data
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
	    const {
	      listeners
	    } = this;
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

	    this.removeRunner = runner => {
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
	      const {
	        length
	      } = list;

	      for (let index = 0; index < length; index++) {
	        const priority = list[index];
	        const handlers = priorities[priority];
	        const handlerIndex = handlers.indexOf(handler);

	        if (handlerIndex >= 0) {
	          handlers.splice(handlerIndex, 1);

	          if (!handlers.length) {
	            delete priorities[priority];
	          }

	          this._runners.forEach(runner => {
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
	      const {
	        length
	      } = list;

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

	const createEventDispatcher = eventPreprocessor => new EventDispatcher(eventPreprocessor);

	exports.default = EventDispatcher;
	exports.Event = Event;
	exports.EventDispatcher = EventDispatcher;
	exports.createEventDispatcher = createEventDispatcher;
	exports.getEvent = getEvent;
	exports.isObject = isObject;

	});

	var EventDispatcher = /*@__PURE__*/getDefaultExportFromCjs(eventDispatcher);

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
	const composeMessage = (command, data) => {
	  const uid = generateUID();

	  registerMessageUID(uid);

	  return `${CLIENT_UID}${uid}${JSON.stringify({ command, data })}`;
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

	const Event = Object.freeze({
	  CONSOLE_FRAME_OPENED: 'consoleFrameOpened',
	  CONSOLE_FRAME_CLOSED: 'consoleFrameClosed',
	  COMMAND_RECEIVED: 'commandReceived',
	});

	const handlers = {};

	const subscribers = [];

	const EDConsole = {
	  Event,
	  Message,
	  EventDispatcher,
	  LogDataRenderer,
	  getConsolePath: () => EDConsoleConfig.consoleHref,
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
	    dispatcher.dispatchEvent(Event.CONSOLE_FRAME_OPENED, contentWindow),
	  consoleClosed: (contentWindow) =>
	    dispatcher.dispatchEvent(Event.CONSOLE_FRAME_CLOSED, contentWindow),
	  handleIncomingMessageEvent: (event, sendResponse) => {
	    const message = readMessage$1(event);

	    if (!message) {
	      return;
	    }

	    EDConsole.handleIncomingCommand(
	      getMessageCommand(message),
	      getMessageData(message),
	      sendResponse
	    );
	  },
	  handleIncomingCommand: (command, data, sendResponse) => {
	    console.log(command, handlers);
	    const { [command]: handler } = handlers;

	    const callback = (rCommand, rData) =>
	      EDConsole.sendCommandTo(sendResponse, rCommand, rData);

	    handler(command, data, callback);
	    dispatcher.dispatchEvent(Event.COMMAND_RECEIVED, {
	      command,
	      data,
	      sendResponse: callback,
	    });
	  },
	  sendCommand: (command, data) =>
	    subscribers.forEach((subscriber) =>
	      EDConsole.sendCommandTo(subscriber, command, data)
	    ),
	  sendCommandTo: (sendResponse, command, data) =>
	    sendResponse(composeMessage$1(command, data)),
	};

	window.EDConsole = EDConsole;

})));
