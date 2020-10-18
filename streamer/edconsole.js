(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return _root.Date.now();
  };

  var now_1 = now;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now_1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now_1());
    }

    function debounced() {
      var time = now_1(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var debounce_1 = debounce;

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    if (isObject_1(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce_1(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  var throttle_1 = throttle;

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

  const Event = Object.freeze({
    CONSOLE_FRAME_OPENED: 'consoleFrameOpened',
    CONSOLE_FRAME_CLOSED: 'consoleFrameClosed',
    COMMAND_RECEIVED: 'commandReceived',
  });

  const handlers = {};

  const subscribers = [];

  const plugins = [];

  const EDConsole = {
    Event,
    Message,
    EventDispatcher,
    LogDataRenderer,
    lodash: {
      debounce: debounce_1,
      throttle: throttle_1,
    },
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
        sendResponse,
      );
    },
    handleIncomingCommand: (command, data, sendResponse) => {
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

})));
