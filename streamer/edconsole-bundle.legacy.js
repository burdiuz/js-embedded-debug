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

  var now = function () {
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

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
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
    return typeof value == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
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
      value = isObject_1(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
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
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now_1();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
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

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    const hasOwn = (has => (target, property) => Boolean(target && has.call(target, property)))(Object.prototype.hasOwnProperty);

    exports.hasOwn = hasOwn;
    exports.default = hasOwn;
  });

  var eventDispatcher = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function _interopDefault(ex) {
      return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
    }

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

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    const getClass = target => {
      if (target === null || target === undefined) {
        return undefined;
      }

      const constructor = target.constructor;

      if (typeof constructor === 'function' && target instanceof constructor) {
        return target.constructor;
      }

      const proto = Object.getPrototypeOf(target);

      if (proto && typeof proto === 'object') {
        return proto.constructor;
      }

      return proto || Object;
    };

    const getParentClass = target => {
      const def = getClass(target);
      return def && Object.getPrototypeOf(def);
    };

    const getClassName = value => {
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

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    const singleValueFactory = (defaultValue = null, valueFormatter = value => value) => {
      let value = defaultValue;
      return {
        getDefault: () => defaultValue,
        get: () => value,
        set: (newValue = defaultValue) => {
          value = valueFormatter(newValue);
        }
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
        delete: key => values.delete(key),
        has: key => values.has(key),
        set: (key, value) => values.set(key, valueFormatter(key, value)),
        get: key => values.get(key)
      };
    };

    const valuesSetFactory = (defaults = new Set(), valueFormatter = value => value) => {
      const defaultValues = new Set(defaults);

      const getDefault = () => new Set(defaultValues);

      const values = getDefault();
      return {
        values,
        getDefault,
        get: () => new Set(values),
        delete: value => values.delete(value),
        has: value => values.has(value),
        add: value => values.add(valueFormatter(value))
      };
    };

    exports.singleValueFactory = singleValueFactory;
    exports.valuesMapFactory = valuesMapFactory;
    exports.valuesSetFactory = valuesSetFactory;
  });

  var logDataRenderer = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function _interopDefaultLegacy(e) {
      return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
      };
    }

    var getClass__default = /*#__PURE__*/_interopDefaultLegacy(getClass_1); // Assigned to an object, when rendering, if exists, will wrap content, like
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

    var convertArray = (value, convertValue) => {
      const result = createList();
      value.forEach((item, index) => {
        addToList(result, index, convertValue(item));
      });
      setCustomClassNameTo(result, getClass_1.getClassName(value));
      return result;
    };

    var convertBoolean = value => `${value}`;

    var convertDate = value => `Date(${value})`;

    var convertError = (value, convertValue) => {
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
    };

    var convertFunction = value => {
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
    };

    var convertMap = (value, convertValue) => {
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
    };

    var convertNumber = value => `${value}`;

    var convertObject = (value, convertValue) => {
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
    };

    var convertSet = (value, convertValue) => {
      const result = createList(); // remove need in indexes for Set

      let index = 0;
      value.forEach(item => {
        addToList(result, index++, convertValue(item));
      });
      setCustomClassNameTo(result, getClass_1.getClassName(value));
      return result;
    };

    var convertString = value => JSON.stringify(value);

    var convertSymbol = value => String(value); // use Map to store handlers for every type in this case every
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
  const CLIENT_UID = generateUID(); // parsing JSON for every message would cost much more than simply stripping a substring.

  const composeMessage = (command, data, stringifyFallback) => {
    let message;

    try {
      message = JSON.stringify({
        command,
        data
      });
    } catch (error) {
      if (stringifyFallback) {
        try {
          message = JSON.stringify({
            command,
            data: stringifyFallback(data)
          });
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
  const isMessage = str => str && typeof str === 'string' && str.length > UID_LENGTH;
  const isOwnMessage = str => isMessage(str) && str.substr(0, UID_LENGTH) === CLIENT_UID;
  const getMessageUID = str => str.substr(UID_LENGTH, UID_LENGTH);
  const parseMessage = str => {
    try {
      return JSON.parse(str.substr(UID_LENGTH * 2));
    } catch (error) {
      return null;
    }
  };
  const readMessage = ({
    data,
    detail
  }) => {
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
  const getMessageCommand = ({
    command
  }) => command;
  const getMessageData = ({
    data
  }) => data;
  const uids = new Set();
  const registerMessageUID = uid => {
    uids.add(uid);
  };
  const hasMessageUIDRegistered = uid => uids.has(uid);

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

  var readMessage$1 = readMessage,
      composeMessage$1 = composeMessage;
  var dispatcher = new EventDispatcher();
  var Event = Object.freeze({
    CONSOLE_FRAME_OPENED: 'consoleFrameOpened',
    CONSOLE_FRAME_CLOSED: 'consoleFrameClosed',
    COMMAND_RECEIVED: 'commandReceived'
  });
  var handlers = {};
  var subscribers = [];
  var plugins = [];

  var EDConsole = {
    Event: Event,
    Message: Message,
    EventDispatcher: EventDispatcher,
    LogDataRenderer: LogDataRenderer,
    lodash: {
      debounce: debounce_1,
      throttle: throttle_1
    },
    getConsolePath: function getConsolePath() {
      return EDConsoleConfig.consoleHref;
    },
    registerPlugin: function registerPlugin(pluginName) {
      plugins.push(pluginName);
    },
    getRegisteredPlugins: function getRegisteredPlugins() {
      return plugins.slice();
    },
    setCommandHandler: function setCommandHandler(command, handler) {
      handlers[command] = handler;
    },
    subscribeToIncomingMessages: function subscribeToIncomingMessages(handler) {
      subscribers.push(handler);
    },
    unsubscribeFromIncomingMessages: function unsubscribeFromIncomingMessages(handler) {
      var index = subscribers.indexOf(handler);

      if (index >= 0) {
        subscribers.splice(index, 1);
      }
    },
    addEventListener: function addEventListener(type, listener, priority) {
      return dispatcher.addEventListener(type, listener, priority);
    },
    removeEventListener: function removeEventListener(type, listener) {
      return dispatcher.removeEventListener(type, listener);
    },
    consoleOpened: function consoleOpened(contentWindow) {
      return dispatcher.dispatchEvent(Event.CONSOLE_FRAME_OPENED, contentWindow);
    },
    consoleClosed: function consoleClosed(contentWindow) {
      return dispatcher.dispatchEvent(Event.CONSOLE_FRAME_CLOSED, contentWindow);
    },
    handleIncomingMessageEvent: function handleIncomingMessageEvent(event, sendResponse) {
      var message = readMessage$1(event);

      if (!message) {
        return;
      }

      EDConsole.handleIncomingCommand(getMessageCommand(message), getMessageData(message), sendResponse);
    },
    handleIncomingCommand: function handleIncomingCommand(command, data, sendResponse) {
      var handler = handlers[command];

      var callback = function callback(rCommand, rData) {
        return EDConsole.sendCommandTo(sendResponse, rCommand, rData);
      };

      handler(command, data, callback);
      dispatcher.dispatchEvent(Event.COMMAND_RECEIVED, {
        command: command,
        data: data,
        sendResponse: callback
      });
    },
    sendCommand: function sendCommand(command, data, stringifyFallback) {
      var message = composeMessage$1(command, data, stringifyFallback);

      if (!message) {
        // INFO Might cause problem when using with plugin-log-console, need to be careful
        console.error("Cannot compose \"".concat(command, "\" message from:"), data);
        return;
      }

      subscribers.forEach(function (subscriber) {
        return subscriber(message);
      });
    },
    sendCommandTo: function sendCommandTo(subscriber, command, data, stringifyFallback) {
      var message = composeMessage$1(command, data, stringifyFallback);

      if (!message) {
        // INFO Might cause problem when using with plugin-log-console, need to be careful
        console.error("Cannot compose \"".concat(command, "\" message from:"), data);
        return;
      }

      subscriber(message);
    }
  };
  window.EDConsole = EDConsole;

  (function (EDConsole) {
    var Event = EDConsole.Event,
        Message = EDConsole.Message;
    var Command = {
      INIT_FRAME: 'init-frame',
      SET_PLUGINS_CONFIGURATION: 'set-plugins-configuration',
      CONNECTION_PING: 'connection-ping',
      CONNECTION_PONG: 'connection-pong'
    };
    var targets = new Map();

    var removeTarget = function removeTarget(target) {
      if (!targets.has(target)) {
        return;
      }

      var messageSubscriber = targets.get(target);
      EDConsole.unsubscribeFromIncomingMessages(messageSubscriber);
      targets["delete"](target);

      try {
        target.removeEventListener('message', messageHandler);
      } catch (error) {}
    };

    var createMessageSubscriber = function createMessageSubscriber(target) {
      return function (str) {
        return target.postMessage(str, '*');
      };
    };

    var messageHandler = function messageHandler(event) {
      var target = event.source;

      if (targets.has(target)) {
        EDConsole.handleIncomingMessageEvent(event, targets.get(target));
        return;
      }

      var message = Message.readMessage(event);

      if (message && Message.getMessageCommand(message) === Command.INIT_FRAME) {
        var messageSubscriber = createMessageSubscriber(target);
        EDConsole.subscribeToIncomingMessages(messageSubscriber);
        targets.set(target, messageSubscriber);
        EDConsole.handleIncomingCommand(Message.getMessageCommand(message), Message.getMessageData(message), messageSubscriber);
      }
    };

    EDConsole.addEventListener(Event.CONSOLE_FRAME_OPENED, function (_ref) {
      var target = _ref.data;
      target.addEventListener('unload', function () {
        return removeTarget(target);
      });

      try {
        target.addEventListener('message', messageHandler);
      } catch (error) {}
    });
    EDConsole.addEventListener(Event.CONSOLE_FRAME_CLOSED, function (_ref2) {
      var target = _ref2.data;
      return removeTarget(target);
    });
    window.addEventListener('message', messageHandler);
    EDConsole.setCommandHandler(Command.INIT_FRAME, function (_, src, sendResponse) {
      return sendResponse(Command.SET_PLUGINS_CONFIGURATION, {
        plugins: EDConsole.getRegisteredPlugins()
      });
    });
    EDConsole.setCommandHandler(Command.CONNECTION_PING, function (_, src, sendResponse) {
      return sendResponse(Command.CONNECTION_PONG);
    });
  })(window.EDConsole);

  (function (EDConsole) {
    var T_KEY_CODE = 84;
    var ARROW_DOWN_KEY_CODE = 40;
    var frame;
    var bodyPrevPaddingBottom = document.createElement('div');
    Object.assign(bodyPrevPaddingBottom.style, {
      flex: '0 0 300px',
      minHeight: '300px',
      height: '300px'
    });

    var displayConsoleFrame = function displayConsoleFrame() {
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
        backgroundColor: '#ffffff'
      });
      var _document = document,
          body = _document.body;
      body.appendChild(bodyPrevPaddingBottom);
      body.appendChild(frame);
      EDConsole.consoleOpened(frame.contentWindow);
    };

    var hideConsoleFrame = function hideConsoleFrame() {
      bodyPrevPaddingBottom.remove();
      frame.remove();
      EDConsole.consoleClosed(frame.contentWindow);
      frame = null;
    };

    var toggleConsoleFrame = function toggleConsoleFrame() {
      if (frame) {
        hideConsoleFrame();
      } else {
        displayConsoleFrame();
      }
    };

    window.addEventListener('keyup', function (_ref) {
      var key = _ref.key,
          ctrlKey = _ref.ctrlKey,
          shiftKey = _ref.shiftKey,
          altKey = _ref.altKey,
          keyCode = _ref.keyCode;

      if (shiftKey && ctrlKey && !altKey && (key === 'ArrowDown' || keyCode === ARROW_DOWN_KEY_CODE)) {
        toggleConsoleFrame();
      }

      if (shiftKey && ctrlKey && !altKey && (String(key).toUpperCase() === 'T' || keyCode === T_KEY_CODE)) {
        toggleConsoleFrame();
      }
    });
  })(window.EDConsole);

  (function (EDConsole) {
    var Q_KEY_CODE = 81;
    var ARROW_UP_KEY_CODE = 38;

    var openNewWindow = function openNewWindow() {
      var frame = window.open(EDConsole.getConsolePath());
      frame.addEventListener('unload', function () {
        EDConsole.consoleClosed(frame);
      });
      EDConsole.consoleOpened(frame);
    };

    window.addEventListener('keyup', function (_ref) {
      var key = _ref.key,
          ctrlKey = _ref.ctrlKey,
          shiftKey = _ref.shiftKey,
          altKey = _ref.altKey,
          keyCode = _ref.keyCode;

      if (shiftKey && ctrlKey && !altKey && (key === 'ArrowUp' || keyCode === ARROW_UP_KEY_CODE)) {
        openNewWindow();
      }

      if (shiftKey && ctrlKey && !altKey && (String(key).toUpperCase() === 'Q' || keyCode === Q_KEY_CODE)) {
        openNewWindow();
      }
    });
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'log-console';
    var LogDataRenderer = EDConsole.LogDataRenderer;
    var Command = {
      CONSOLE_LOG: 'console-log',
      EVAL_COMMAND: 'eval-command',
      EVAL_COMMAND_RESPONSE: 'eval-command/response'
    };

    try {
      var _console = console,
          logFn = _console.log,
          errorFn = _console.error,
          warnFn = _console.warn,
          infoFn = _console.info;

      var cmdFn = function cmdFn(type, args) {
        return EDConsole.sendCommand(Command.CONSOLE_LOG, {
          type: type,
          args: args.map(function (item) {
            return LogDataRenderer.convert(item);
          })
        });
      };

      var log = function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        cmdFn('log', args);
        logFn.apply(console, args);
      };

      var error = function error() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        cmdFn('error', args);
        errorFn.apply(console, args);
      };

      var warn = function warn() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        cmdFn('warn', args);
        warnFn.apply(console, args);
      };

      var info = function info() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        cmdFn('info', args);
        infoFn.apply(console, args);
      };

      Object.assign(console, {
        log: log,
        error: error,
        warn: warn,
        info: info
      });

      if (!window.log) {
        window.log = log;
      }
    } catch (error) {
      console.log(error);
    }

    EDConsole.setCommandHandler(Command.EVAL_COMMAND, function (_, _ref, sendResponse) {
      var value = _ref.value;
      var result;

      try {
        eval("result = ".concat(value, ";"));
      } catch (error) {
        result = error;
      }

      var response = '';

      if (result) {
        response = LogDataRenderer.convert(result);
      } else {
        response = 'Command returned "undefined".';
      }

      sendResponse(Command.EVAL_COMMAND_RESPONSE, response);
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'log-location';
    var Command = {
      READ_LOCATION: 'read-location',
      READ_LOCATION_RESPONSE: 'read-location/response',
      LOCATION_SET: 'location-set',
      LOCATION_SET_HASH: 'location-set-hash',
      LOCATION_RELOAD: 'location-reload',
      HISTORY_BACK: 'history-back',
      HISTORY_FORWARD: 'history-forward'
    };
    EDConsole.setCommandHandler(Command.LOCATION_SET, function (_, _ref) {
      var value = _ref.value;
      window.location.href = value;
    });
    EDConsole.setCommandHandler(Command.LOCATION_SET_HASH, function (_, _ref2) {
      var value = _ref2.value;
      window.location.hash = value;
    });
    EDConsole.setCommandHandler(Command.LOCATION_RELOAD, function () {
      return window.location.reload();
    });
    EDConsole.setCommandHandler(Command.HISTORY_BACK, function () {
      return window.history.back();
    });
    EDConsole.setCommandHandler(Command.HISTORY_FORWARD, function () {
      return window.history.forward();
    });
    EDConsole.setCommandHandler(Command.READ_LOCATION, function (_, data, sendResponse) {
      var _window$location = window.location,
          hash = _window$location.hash,
          host = _window$location.host,
          hostname = _window$location.hostname,
          href = _window$location.href,
          origin = _window$location.origin,
          password = _window$location.password,
          pathname = _window$location.pathname,
          port = _window$location.port,
          protocol = _window$location.protocol,
          search = _window$location.search,
          username = _window$location.username;
      sendResponse(Command.READ_LOCATION_RESPONSE, {
        hash: hash,
        host: host,
        hostname: hostname,
        href: href,
        origin: origin,
        password: password,
        pathname: pathname,
        port: port,
        protocol: protocol,
        search: search,
        username: username
      });
    });
    var _window = window,
        historyObj = _window.history;
    var pushStateFn = historyObj.pushState,
        replaceStateFn = historyObj.replaceState,
        backFn = historyObj.back,
        forwardFn = historyObj.forward,
        goFn = historyObj.go;

    historyObj.back = function () {
      console.log('History Back');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      backFn.apply(historyObj, args);
    };

    historyObj.forward = function () {
      console.log('History Forward');

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      forwardFn.apply(historyObj, args);
    };

    historyObj.go = function () {
      var _console;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_console = console).log.apply(_console, ['History Go'].concat(args));

      goFn.apply(historyObj, args);
    };

    historyObj.pushState = function () {
      var _console2;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (_console2 = console).log.apply(_console2, ['History Push'].concat(args));

      pushStateFn.apply(historyObj, args);
    };

    historyObj.replaceState = function () {
      var _console3;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      (_console3 = console).log.apply(_console3, ['History Replace'].concat(args));

      replaceStateFn.apply(historyObj, args);
    };

    window.addEventListener('popstate', function (event) {
      console.log('History Pop', event);
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  (function (EDConsole) {
    var PLUGIN_NAME = 'manage-cookies';
    var Command = {
      READ_COOKIES: 'read-cookies',
      READ_COOKIES_RESPONSE: 'read-cookies/response',
      COOKIE_SET: 'cookie-set',
      COOKIE_REMOVE: 'cookie-remove',
      COOKIES_CLIPBOARD_EXPORT: 'cookies-clipboard-export',
      COOKIES_BULK_SET: 'cookies-bulk-set',
      TEXTDATA_SHOW: 'textdata-show'
    };

    var readCookies = function readCookies() {
      return document.cookie.split(';').filter(function (item) {
        return !!item.trim();
      }).map(function (str) {
        var _str$split = str.split('='),
            _str$split2 = _slicedToArray(_str$split, 2),
            key = _str$split2[0],
            value = _str$split2[1];

        return {
          key: key.trim(),
          value: value.trim()
        };
      });
    };

    var setCookie = function setCookie(key, value) {
      document.cookie = "".concat(key, "=").concat(value, "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT");
    };

    var removeCookie = function removeCookie(key) {
      document.cookie = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:00 GMT");
    };

    EDConsole.setCommandHandler(Command.READ_COOKIES, function (_, data, sendResponse) {
      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    });
    EDConsole.setCommandHandler(Command.COOKIE_SET, function (_, data, sendResponse) {
      setCookie(data.key, data.value);
      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    });
    EDConsole.setCommandHandler(Command.COOKIE_REMOVE, function (_, data, sendResponse) {
      removeCookie(data.key);
      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    });
    EDConsole.setCommandHandler(Command.COOKIES_CLIPBOARD_EXPORT, function (_, inc, sendResponse) {
      var data = '';
      var cookies = readCookies();

      try {
        data = JSON.stringify(cookies, null, 2);
        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, {
          title: 'Cookies',
          data: data
        });
      }
    });
    EDConsole.setCommandHandler(Command.COOKIES_BULK_SET, function (_, data, sendResponse) {
      if (data instanceof Array) {
        data.forEach(function (_ref) {
          var key = _ref.key,
              value = _ref.value;
          return setCookie(key, value);
        });
      } else {
        Object.keys(data).forEach(function (key) {
          return setCookie(key, data[key]);
        });
      }

      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'manage-storage';
    var HIDDEN_KEYS = {
      '@EDConsole-Storage-root': true
    };
    var Command = {
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
      TEXTDATA_SHOW: 'textdata-show'
    };

    var read = function read(storage) {
      var list = [];

      for (var index = 0; index < storage.length; index++) {
        var key = storage.key(index);

        if (HIDDEN_KEYS[key]) {
          continue;
        }

        list.push({
          key: key,
          value: storage.getItem(key)
        });
      }

      return list;
    };

    EDConsole.setCommandHandler(Command.READ_LOCAL_STORAGE, function (_, data, sendResponse) {
      return sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    });
    EDConsole.setCommandHandler(Command.LOCAL_STORAGE_SET, function (_, data, sendResponse) {
      localStorage.setItem(data.key, data.value);
      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    });
    EDConsole.setCommandHandler(Command.LOCAL_STORAGE_REMOVE, function (_, data, sendResponse) {
      localStorage.removeItem(data.key);
      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    });
    EDConsole.setCommandHandler(Command.LOCAL_STORAGE_CLIPBOARD_EXPORT, function (_, inc, sendResponse) {
      var data = '';
      var storageData = read(localStorage).reduce(function (res, _ref) {
        var key = _ref.key,
            value = _ref.value;
        return _objectSpread2(_objectSpread2({}, res), {}, _defineProperty({}, key, value));
      }, {});

      try {
        data = JSON.stringify(storageData, null, 2);
        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, {
          title: 'LocalStorage contents',
          data: data
        });
      }
    });
    EDConsole.setCommandHandler(Command.LOCAL_STORAGE_BULK_SET, function (_, data, sendResponse) {
      if (data instanceof Array) {
        data.forEach(function (_ref2) {
          var key = _ref2.key,
              value = _ref2.value;
          return localStorage.setItem(key, value);
        });
      } else {
        Object.keys(data).forEach(function (key) {
          return localStorage.setItem(key, data[key]);
        });
      }

      sendResponse(Command.READ_LOCAL_STORAGE_RESPONSE, read(localStorage));
    });
    EDConsole.setCommandHandler(Command.READ_SESSION_STORAGE, function (_, data, sendResponse) {
      return sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    });
    EDConsole.setCommandHandler(Command.SESSION_STORAGE_SET, function (_, data, sendResponse) {
      sessionStorage.setItem(data.key, data.value);
      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    });
    EDConsole.setCommandHandler(Command.SESSION_STORAGE_REMOVE, function (_, data, sendResponse) {
      sessionStorage.removeItem(data.key);
      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    });
    EDConsole.setCommandHandler(Command.SESSION_STORAGE_CLIPBOARD_EXPORT, function (_, inc, sendResponse) {
      var data = '';
      var storageData = read(sessionStorage).reduce(function (res, _ref3) {
        var key = _ref3.key,
            value = _ref3.value;
        return _objectSpread2(_objectSpread2({}, res), {}, _defineProperty({}, key, value));
      }, {});

      try {
        data = JSON.stringify(storageData, null, 2);
        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, {
          title: 'SessionStorage contents',
          data: data
        });
      }
    });
    EDConsole.setCommandHandler(Command.SESSION_STORAGE_BULK_SET, function (_, data, sendResponse) {
      if (data instanceof Array) {
        data.forEach(function (_ref4) {
          var key = _ref4.key,
              value = _ref4.value;
          return sessionStorage.setItem(key, value);
        });
      } else {
        Object.keys(data).forEach(function (key) {
          return sessionStorage.setItem(key, data[key]);
        });
      }

      sendResponse(Command.READ_SESSION_STORAGE_RESPONSE, read(sessionStorage));
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'log-redux';
    var Command = {
      REDUX_ACTION: 'redux-action'
    };

    var _send = function send(action) {
      return EDConsole.sendCommand(Command.REDUX_ACTION, action, function (_ref) {
        var type = _ref.type;
        return {
          type: type,
          payload: "Sorry, JSON.stringify() could not handle this action contents, so it can't be shown here."
        };
      });
    };

    var __REDUX_DEVTOOLS_EXTENSION__ = function __REDUX_DEVTOOLS_EXTENSION__() {
      return function (next) {
        return function (reducer, initialState, enhancer) {
          var store = next(reducer, initialState, enhancer);
          return _objectSpread2(_objectSpread2({}, store), {}, {
            dispatch: function dispatch() {
              _send(arguments.length <= 0 ? undefined : arguments[0]);

              return store.dispatch.apply(store, arguments);
            }
          });
        };
      };
    };

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = function () {
      var extensionCompose = function extensionCompose() {
        for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
          funcs[_key] = arguments[_key];
        }

        return function () {
          return funcs.reduceRight(function (composed, f) {
            return f(composed);
          }, __REDUX_DEVTOOLS_EXTENSION__().apply(void 0, arguments));
        };
      };

      if (arguments.length === 0) {
        return __REDUX_DEVTOOLS_EXTENSION__();
      }

      if (arguments.length === 1 && _typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
        return extensionCompose;
      }

      return extensionCompose.apply(void 0, arguments);
    };

    var noop = function noop() {
      return undefined;
    };

    Object.assign(__REDUX_DEVTOOLS_EXTENSION__, {
      open: noop,
      // (...args) => console.log('open()', ...args),
      updateStore: noop,
      // (...args) => console.log('updateStore()', ...args),
      notifyErrors: noop,
      // (...args) => console.log('notifyErrors()', ...args),
      send: function send(performAction) {
        // console.log('send()', ...args);
        var _ref2 = performAction || {},
            action = _ref2.action;

        if (action) {
          _send(action);
        }
      },
      listen: noop,
      // (...args) => console.log('listen()', ...args),
      connect: function connect() {
        // console.log('connect()', ...args);
        return __REDUX_DEVTOOLS_EXTENSION__;
      },
      disconnect: noop,
      // (...args) => console.log('disconnect()', ...args),
      error: noop,
      // (...args) => console.log('X.error()', ...args),
      init: noop,
      // (...args) => console.log('X.init()', ...args),
      subscribe: noop,
      // (...args) => console.log('X.subscribe()', ...args),
      unsubscribe: noop // (...args) => console.log('X.unsubscribe()', ...args),

    });
    window.__REDUX_DEVTOOLS_EXTENSION__ = __REDUX_DEVTOOLS_EXTENSION__;
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'log-xhr';
    var Command = {
      XHR_UPDATE: 'network-update'
    };
    var State = {
      OPENED: 1,
      LOADING: 3,
      DONE: 4
    };
    var _window = window,
        fetchFn = _window.fetch,
        XMLHttpRequestDef = _window.XMLHttpRequest;
    var lastRequestIndex = 1;

    var XMLHttpRequest = /*#__PURE__*/function (_XMLHttpRequestDef) {
      _inherits(XMLHttpRequest, _XMLHttpRequestDef);

      var _super = _createSuper(XMLHttpRequest);

      function XMLHttpRequest() {
        var _this;

        _classCallCheck(this, XMLHttpRequest);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        _this._index = lastRequestIndex++;
        _this._openArgs = {};
        _this._headers = [];
        _this._body = '';
        _this._error = null;

        _this.addEventListener('readystatechange', function (event) {
          var _this$_openArgs = _this._openArgs,
              method = _this$_openArgs.method,
              url = _this$_openArgs.url;
          var data;

          switch (_this.responseType) {
            case '':
            case 'text':
              data = _this.responseText;
              break;

            case 'json':
              data = JSON.stringify(_this.response, null, 2);
              break;

            default:
              data = " -- Response of type \"".concat(_this.responseType, "\" -- ");
              break;
          }

          EDConsole.sendCommand(Command.XHR_UPDATE, {
            index: _this._index,
            type: 'xhr',
            method: method,
            url: url,
            headers: _this._headers,
            body: String(_this._body),
            error: _this._error && _this._error.textContent,
            responseText: data,
            responseType: _this.responseType,
            responseURL: _this.responseURL,
            responseHeaders: prepareHeaders(_this.getAllResponseHeaders()),
            status: _this.status,
            statusText: _this.statusText,
            state: _this.readyState
          });
        });

        _this.addEventListener('error', function (error) {
          _this._error = error;
        });

        var _assertThisInitialize = _assertThisInitialized(_this),
            open = _assertThisInitialize.open,
            send = _assertThisInitialize.send,
            setRequestHeader = _assertThisInitialize.setRequestHeader;

        _this.open = function (method, url) {
          _this._openArgs = {
            method: method,
            url: url
          };

          for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          return open.call.apply(open, [_assertThisInitialized(_this), method, url].concat(args));
        };

        _this.setRequestHeader = function (header, value) {
          _this._headers.push([header, value]);

          return setRequestHeader.call(_assertThisInitialized(_this), header, value);
        };

        _this.send = function (value) {
          _this._body = value;
          return send.call(_assertThisInitialized(_this), value);
        };

        return _this;
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


      _createClass(XMLHttpRequest, [{
        key: "requestIndex",
        get: function get() {
          return this._index;
        }
      }]);

      return XMLHttpRequest;
    }(XMLHttpRequestDef);

    var prepareHeaders = function prepareHeaders(source) {
      var headers = [];

      if (!source) {
        return headers;
      }

      if (typeof source.entries === 'function') {
        var _iterator = _createForOfIteratorHelper(source.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            headers.push(entry);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (source instanceof Array) {
        headers.push.apply(headers, _toConsumableArray(source));
      } else if (typeof source === 'string') {
        source.split('\r\n').forEach(function (item) {
          var _item$split = item.split(':'),
              _item$split2 = _slicedToArray(_item$split, 2),
              name = _item$split2[0],
              _item$split2$ = _item$split2[1],
              value = _item$split2$ === void 0 ? '' : _item$split2$;

          name = name.trim();
          value = value.trim();

          if (name) {
            headers.push([name, value]);
          }
        });
      } else {
        Object.keys(source).forEach(function (key) {
          headers.push([key, String(source[key])]);
        });
      }

      return headers;
    };

    var getFetchCommandParams = function getFetchCommandParams(url, params) {
      var index = XMLHttpRequest.lastRequestIndex++;

      var _ref = params || {},
          _ref$method = _ref.method,
          method = _ref$method === void 0 ? 'GET' : _ref$method,
          headers = _ref.headers,
          body = _ref.body;

      return {
        index: index,
        type: 'fetch',
        method: method,
        url: url,
        headers: prepareHeaders(headers),
        body: body && String(body),
        state: 0
      };
    };

    var fetch = function fetch(url, params) {
      var cmd = getFetchCommandParams(url, params);
      EDConsole.sendCommand(Command.XHR_UPDATE, _objectSpread2(_objectSpread2({}, cmd), {}, {
        state: State.OPENED
      }));
      return new Promise(function (res, rej) {
        EDConsole.sendCommand(Command.XHR_UPDATE, _objectSpread2(_objectSpread2({}, cmd), {}, {
          state: State.LOADING
        }));
        var promise = fetchFn(url, params);
        promise.then(function (result) {
          res(result);
          Object.assign(cmd, {
            responseType: result.type,
            responseURL: result.url,
            responseHeaders: prepareHeaders(result.headers),
            status: result.status,
            statusText: result.statusText,
            state: State.DONE
          });
          EDConsole.sendCommand(Command.XHR_UPDATE, cmd);
          result.text().then(function (text) {
            EDConsole.sendCommand(Command.XHR_UPDATE, _objectSpread2(_objectSpread2({}, cmd), {}, {
              error: null,
              responseText: text
            }));
          })["catch"](function () {
            EDConsole.sendCommand(Command.XHR_UPDATE, _objectSpread2(_objectSpread2({}, cmd), {}, {
              error: null,
              responseText: 'Error: Could not retrieve response body.'
            }));
          });
        });
        promise["catch"](function (error) {
          rej(error);
          EDConsole.sendCommand(Command.XHR_UPDATE, _objectSpread2(_objectSpread2({}, cmd), {}, {
            error: "".concat(error.type, " ").concat(error.message),
            status: '---',
            statusText: 'Rejected promise'
          }));
        });
      });
    };

    EDConsole.$fetch = fetch;
    EDConsole.$XMLHttpRequest = XMLHttpRequestDef;
    Object.assign(window, {
      fetch: fetch,
      XMLHttpRequest: XMLHttpRequest
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'log-websocket';

    if (typeof window.WebSocket === 'undefined') {
      return;
    }

    var Command = {
      WEBSOCKET_CREATED: 'websocket-created',
      WEBSOCKET_UPDATED: 'websocket-updated',
      WEBSOCKET_MESSAGE: 'websocket-message',
      WEBSOCKET_MESSAGE_SEND: 'websocket-message-send'
    };
    var WebSocketState = {
      CREATED: 0,
      OPENED: 1,
      CLOSED: 3
    };
    var WebsocketMessageType = {
      INCOMING: 'incoming',
      OUTGOING: 'outgoing'
    };
    var _window = window,
        WebSocketDef = _window.WebSocket; // TODO once WeakRef available, make it weak ref collection

    var webSockets = {};
    var lastRequestIndex = 1;

    var WebSocket = /*#__PURE__*/function (_WebSocketDef) {
      _inherits(WebSocket, _WebSocketDef);

      var _super = _createSuper(WebSocket);

      function WebSocket(url, protocols) {
        var _thisSuper, _thisSuper2, _this;

        _classCallCheck(this, WebSocket);

        _this = _super.call(this, url, protocols);
        _this._index = lastRequestIndex++;
        _this._openHandler = null;
        _this._closeHandler = null;
        _this._error = null;
        webSockets[_this._index] = _assertThisInitialized(_this);
        var cmdData = {
          index: _this._index,
          url: url,
          protocols: protocols,
          state: WebSocketState.CREATED
        };
        EDConsole.sendCommand(Command.WEBSOCKET_CREATED, cmdData);

        _this.addEventListener('message', function (_ref) {
          var data = _ref.data,
              detail = _ref.detail;
          EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
            index: _this._index,
            type: WebsocketMessageType.INCOMING,
            data: String(data || detail)
          });
        });

        _this.addEventListener('error', function (error) {
          _this._error = error;
        });

        _set((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(WebSocket.prototype)), "onopen", function (event) {
          EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, _objectSpread2(_objectSpread2({}, cmdData), {}, {
            state: WebSocketState.OPENED
          }));

          if (typeof _this._openHandler === 'function') {
            _this._openHandler.call(_assertThisInitialized(_this), event);
          }
        }, _thisSuper, true);

        _set((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(WebSocket.prototype)), "onclose", function (event) {
          EDConsole.sendCommand(Command.WEBSOCKET_UPDATED, _objectSpread2(_objectSpread2({}, cmdData), {}, {
            state: WebSocketState.CLOSED
          }));

          if (typeof _this._closeHandler === 'function') {
            _this._closeHandler.call(_assertThisInitialized(_this), event);
          }
        }, _thisSuper2, true);

        var _assertThisInitialize = _assertThisInitialized(_this),
            send = _assertThisInitialize.send;

        _this.send = function (data) {
          EDConsole.sendCommand(Command.WEBSOCKET_MESSAGE, {
            index: _this._index,
            type: WebsocketMessageType.OUTGOING,
            data: String(data || detail)
          });
          return send.call(_assertThisInitialized(_this), data);
        };

        return _this;
      }

      _createClass(WebSocket, [{
        key: "onopen",
        get: function get() {
          return this._openHandler;
        },
        set: function set(handler) {
          this._openHandler = handler;
        }
      }, {
        key: "onclose",
        get: function get() {
          return this._closeHandler;
        },
        set: function set(handler) {
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

      }]);

      return WebSocket;
    }(WebSocketDef);

    EDConsole.$WebSocket = WebSocketDef;
    Object.assign(window, {
      WebSocket: WebSocket
    });
    EDConsole.setCommandHandler(Command.WEBSOCKET_MESSAGE_SEND, function (_, _ref2) {
      var index = _ref2.index,
          message = _ref2.message;
      var webSocket = webSockets[index];

      if (webSocket) {
        webSocket.send(message);
      }
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'manage-domelement';
    var Command = {
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
      TEXTDATA_SHOW: 'textdata-show'
    };
    var container = document.createElement('div');
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
      pointerEvents: 'none'
    });
    var selection = document.createElement('div');
    Object.assign(selection.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      border: '1px dashed #ff0000',
      boxShadow: '0 0 5px #ff0000'
    });
    container.appendChild(selection);

    var buildNodeSelector = function buildNodeSelector(node) {
      var tagName = node.tagName;
      var className = (node.getAttribute('class') || '').replace(/\s+/g, '.');
      var id = node.getAttribute('id');
      var name = node.getAttribute('name');
      var index = 0;
      var isFirst = true;
      var children = [];

      if (node.parentElement) {
        children = Array.from(node.parentElement.children);
        index = children.indexOf(node);
      }

      if (className) {
        var rgx = new RegExp("(^|\\s)".concat(className, "(\\s|$)"));
        isFirst = !children.length || children.find(function (item) {
          return item.tagName === tagName && item.className.match(rgx);
        }) === node;
        var base = "".concat(tagName, ".").concat(className);
        return isFirst ? base : "".concat(base, ":nth-child(").concat(index + 1, ")");
      } else if (id) {
        // isFirst = !children.length || children.find((item) => item.tagName === tagName && item.id === id) === node;
        return "".concat(tagName, "#").concat(id);
      } else if (name) {
        return "".concat(tagName, "[name=\"").concat(name, "\"]");
      } else {
        isFirst = !children.length || children.find(function (item) {
          return item.tagName === tagName;
        }) === node;

        if (!isFirst) {
          return "".concat(tagName, ":nth-child(").concat(index + 1, ")");
        }
      }

      return "".concat(tagName);
    };

    var buildSelector = function buildSelector(node) {
      var selectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      selectors.unshift(buildNodeSelector(node));

      if (!node.parentElement || node.parentElement === node) {
        return selectors;
      }

      return buildSelector(node.parentElement, selectors);
    };

    var generateAttributeList = function generateAttributeList(node) {
      var attrs = node.attributes;
      var list = [];

      for (var index = 0; index < attrs.length; index++) {
        var attr = attrs.item(index);
        list.push([attr.name, attr.value]);
      }

      return list;
    };

    var generateStyleList = function generateStyleList(node) {
      var style = node.style;
      var list = [];

      for (var index = 0; index < style.length; index++) {
        var name = style.item(index);
        list.push([name, style.getPropertyValue(name)]);
      }

      return list;
    };

    var generateComputedStyleList = function generateComputedStyleList(node) {
      var styles = window.getComputedStyle(node);
      var list = [];

      for (var index = 0; index < styles.length; index++) {
        var name = styles.item(index);
        list.push([name, styles.getPropertyValue(name)]);
      }

      return list;
    }; // TODO cache selection to apply attrs and styles changes directly without looking up for it every time
    // let lastSelectedElement = null;


    var lastSelectedNode = null;
    var lastSelectedQuery = null;

    var generateLastSelectedNodeData = function generateLastSelectedNodeData() {
      return _objectSpread2({
        selectors: lastSelectedQuery,
        attributes: generateAttributeList(lastSelectedNode),
        styles: generateStyleList(lastSelectedNode),
        variable: lastSelectedNode._edconsole_varname
      }, getNodeDimensions(lastSelectedNode));
    };

    var mouseoverHandler = function mouseoverHandler(_ref) {
      var node = _ref.target;
      lastSelectedNode = node;
      lastSelectedQuery = buildSelector(node);
      EDConsole.sendCommand(Command.DOM_NODE_LOOKUP_RESPONSE, generateLastSelectedNodeData());

      var _node$getBoundingClie = node.getBoundingClientRect(),
          top = _node$getBoundingClie.top,
          left = _node$getBoundingClie.left,
          width = _node$getBoundingClie.width,
          height = _node$getBoundingClie.height;

      Object.assign(selection.style, {
        top: "".concat(top, "px"),
        left: "".concat(left, "px"),
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      });
    };

    var stopEventPropagation = function stopEventPropagation(event) {
      return event.stopImmediatePropagation();
    };

    var BLOCKED_EVENTS = ['click', 'mousedown', 'mouseup'];

    var blockEvents = function blockEvents() {
      return BLOCKED_EVENTS.forEach(function (type) {
        return window.addEventListener(type, stopEventPropagation, {
          capture: true
        });
      });
    };

    var unblockEvents = function unblockEvents() {
      return BLOCKED_EVENTS.forEach(function (type) {
        return window.removeEventListener(type, stopEventPropagation, {
          capture: true
        });
      });
    };

    EDConsole.setCommandHandler(Command.DOM_NODE_LOOKUP, function () {
      var clickHandler = function clickHandler(event) {
        var node = event.target;
        stopEventPropagation(event);
        window.removeEventListener('mouseover', mouseoverHandler);
        window.removeEventListener('click', clickHandler, {
          capture: true
        });
        unblockEvents();
        container.remove();
        Object.assign(selection.style, {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        });
      };

      window.addEventListener('mouseover', mouseoverHandler);
      window.addEventListener('click', clickHandler, {
        capture: true
      });
      blockEvents();
      document.body.appendChild(container);
    });

    var getNodeDimensions = function getNodeDimensions(node) {
      return {
        x: node.offsetLeft,
        y: node.offsetTop,
        width: node.scrollWidth || node.offsetWidth || node.clientWidth,
        height: node.scrollHeight || node.offsetHeight || node.clientHeight
      };
    };

    var querySelectorHandler = function querySelectorHandler(_, _ref2, sendResponse) {
      var value = _ref2.value;
      var node = document.querySelector(value);
      var data = null;

      if (node) {
        lastSelectedNode = node;
        lastSelectedQuery = buildSelector(node);
        data = generateLastSelectedNodeData();
      }

      sendResponse(Command.DOM_QUERY_SELECTOR_RESPONSE, data);
    };

    EDConsole.setCommandHandler(Command.DOM_QUERY_SELECTOR, querySelectorHandler);
    EDConsole.setCommandHandler(Command.DOM_NODE_COMPUTED_STYLE, function (_, _ref3, sendResponse) {
      var selector = _ref3.selector;
      var node = document.querySelector(selector);
      var data = [];

      if (node) {
        data = generateComputedStyleList(node);
      }

      sendResponse(Command.DOM_NODE_COMPUTED_STYLE_RESPONSE, data);
    });
    EDConsole.setCommandHandler(Command.DOM_NODE_SET_ATTRIBUTE, function (_, _ref4, sendResponse) {
      var selector = _ref4.selector,
          prop = _ref4.prop;
      var node = document.querySelector(selector);

      if (!node) {
        return;
      }

      node.setAttribute.apply(node, _toConsumableArray(prop));
      querySelectorHandler(null, {
        value: selector
      }, sendResponse);
    });
    EDConsole.setCommandHandler(Command.DOM_NODE_SET_STYLE, function (_, _ref5, sendResponse) {
      var _node$style;

      var selector = _ref5.selector,
          prop = _ref5.prop;
      var node = document.querySelector(selector);

      if (!node) {
        return;
      }

      (_node$style = node.style).setProperty.apply(_node$style, _toConsumableArray(prop));

      querySelectorHandler(null, {
        value: selector
      }, sendResponse);
    });
    EDConsole.setCommandHandler(Command.DOM_NODE_COPY_QUERY, function (_, inc, sendResponse) {
      var data = '';

      if (lastSelectedQuery) {
        try {
          data = lastSelectedQuery.join(' > ');
          navigator.clipboard.writeText(data);
        } catch (error) {}

        if (data) {
          sendResponse(Command.TEXTDATA_SHOW, {
            title: 'HTML Element query selector',
            data: data
          });
        }
      }
    });
    EDConsole.setCommandHandler(Command.DOM_NODE_COPY_HTML, function (_, inc, sendResponse) {
      var data = '';
      var title = 'HTML Element outerHTML';

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
          sendResponse(Command.TEXTDATA_SHOW, {
            title: title,
            data: data
          });
        }
      }
    });
    EDConsole.setCommandHandler(Command.DOM_NODE_COPY_TEXT, function (_, inc, sendResponse) {
      var data = '';

      if (lastSelectedNode) {
        try {
          data = lastSelectedNode.innerText;
          navigator.clipboard.writeText(data);
        } catch (error) {}

        if (data) {
          sendResponse(Command.TEXTDATA_SHOW, {
            title: 'HTML Element innerText',
            data: data
          });
        }
      }
    });
    var varIndex = 1;
    EDConsole.setCommandHandler(Command.DOM_NODE_ASSIGN_VARIABLE, function (_, inc, sendResponse) {
      var name;

      if (lastSelectedNode) {
        name = "temp".concat(varIndex++);
        window[name] = lastSelectedNode;
        Object.defineProperty(lastSelectedNode, '_edconsole_varname', {
          value: name,
          configurable: true,
          enumerable: false
        });
        sendResponse(Command.DOM_QUERY_SELECTOR_RESPONSE, generateLastSelectedNodeData());
      }
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var PLUGIN_NAME = 'manage-inject';
    var Command = {
      INJECTION_EXECUTE: 'injection-execute'
    };
    var Type = {
      JS: 'js',
      CSS: 'css',
      HTML: 'html'
    };
    var Target = {
      HEAD: 'HEAD',
      BODY: 'BODY',
      SELECTOR: 'Selector'
    };
    var Operation = {
      APPEND: 'Append',
      PREPEND: 'Prepend',
      REPLACE: 'Replace',
      CONTENT: 'Content'
    };

    var getTargetNode = function getTargetNode(target, query) {
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

    var converter = document.createElement('span');

    var getInjectionNode = function getInjectionNode(type, data) {
      var node;

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
            var _node;

            (_node = node).append.apply(_node, _toConsumableArray(Array.from(converter.childNodes)));
          } catch (error) {
            while (converter.firstChild) {
              node.appendChild(converter.firstChild);
            }
          }

          break;
      }

      return node;
    };

    EDConsole.setCommandHandler(Command.INJECTION_EXECUTE, function (_, _ref) {
      var type = _ref.type,
          target = _ref.target,
          operation = _ref.operation,
          query = _ref.query,
          data = _ref.data;
      var targetNode = getTargetNode(target, query);

      if (!targetNode) {
        return;
      }

      var injectionNode = getInjectionNode(type, data);

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
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

  (function (EDConsole) {
    var Event = EDConsole.Event,
        throttle = EDConsole.lodash.throttle;
    var PLUGIN_NAME = 'pixel-perfect';
    var Images = {
      GRID_10: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE1SURBVHhe7ZSxDQNADITy2X/oUDgT0FwBjSmRTvLn++fdHbMCQVmBoKxAUFYgKPu8cZoYlBUIygoEZQWCsv3Ae9izNDEoKxCUFQjKCgRl+4H3sGdpYlBWICgrEJQVCMr2A+9hz9LEoKxAUFYgKCsQlO0H3sOepYlBWYGgrEBQViAo2w+8hz1LE4OyAkFZgaCsQFC2H3gPe5YmBmUFgrICQVmBoGw/8B72LE0MygoEZQWCsgJB2X7gPexZmhiUFQjKCgRlBYKy/cB72LM0MSgrEJQVCMoKBGX7gfewZ2liUFYgKCsQlBUIyvYD72HP0sSgrEBQViAoKxCU7Qfew56liUFZgaCsQFBWICjbD7yHPUsTg7ICQVmBoKxAULYfeA97liYGZQWCsgJBWYGgbD/wHvYo7/0ArNK1AfQZhrQAAAAASUVORK5CYII=',
      GRID_20: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEtSURBVHhe7ZYhDgIBEMQ4/v9oKlaQICsY0ZpNqpqM2df7l+fuN39zBYJyBYJyBYJyBYJyBYJyBYJyBYJyBYJyBYJyr2ecJgblCgTlCgTlCgTlCgTlCgTlCgTlCgTlCgTl9gPv9Z+liUG5AkG5AkG5AkG5AkG5AkG5AkG5AkG5AkG5/cB7/WdpYlCuQFCuQFCuQFCuQFCuQFCuQFCuQFCuQFBuP/Be/1maGJQrEJQrEJQrEJQrEJQrEJQrEJQrEJQrEJTbD7zXf5YmBuUKBOUKBOUKBOUKBOUKBOUKBOUKBOUKBOX2A+/1n6WJQbkCQbkCQbkCQbkCQbkCQbkCQbkCQbkCQbn9wHv9Z2liUK5AUK5AUK5AUK5AUK5AUK5AUK5AUK5AUG4/8F7/UZ7nAxmNvkFjGEKpAAAAAElFTkSuQmCC',
      GRID_50: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAAj/AAAAAKVUrCEAAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEwSURBVHhe7dqhDcAwEARBf/ovOsQFZEgkWzvEyGClg78eNfv97pcfhYBCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBhYhCQCGiEFCIKAQUIgoBs+YSTQsUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIKEQUAgoRhYBCRCGgEFEIuChkH6Adr2mBQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAYWIQkAhohBQiCgEFCIKAReF7AO04zUtUAgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIaAQUQgoRBQCChGFgEJEIeCikH2AdriZF6eVMmBILgYNAAAAAElFTkSuQmCC',
      RULER_H: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABkCAYAAAC/zKGXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD6SURBVFhH7ZZPC4JAEMV3ZaFaEzr4ObtEdLUv5xfw5kHwIF7Fs3/aeXsxcsig2Nz6geI832GG57BKIcTY9/11GAYRBAFdo9EeCHAzL5VSI2ciYFzCa8Y4jo91XW+gMGAYQ2JLng/1uAT0aB9NISX1Sxo1ftf3GoaBUWt9adtWQWFYXTJT2GS6rpNPd4ZwtDPm80qapvnBZGzJ43AYGCmZNE0PUBj8S2YN50wURaeqqvw6Z6bMJvPlw8BIO1MUxQ4Kg5/JrOGcKctyC4XBz2RsyeNwGBjDMDxnWbaHwuBnMv9/szneb3w9GVvyOBwGRkomz3MNhcGjZIS4AbBzy89QxI43AAAAAElFTkSuQmCC',
      RULER_V: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAKCAYAAABCHPt+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVFhH7dRNS4RAGAdwx6OiePAiHgQP3vwCfqguER0z6NALQUQQfSDBuxc9CB49CAamFfjS5D6728zaUBsLA80PxP8j8jg6MyJJkiZ8CJxAwzCEsixvJsU0zaOqqu6hnCGEwmmaQihniqKcdl13BeVs6b6/XsPjO/86Pk3TjpumuYVydojn0tdUVT1p2/YGytkhniuP4wjlSpIkTxCZyrIkPspa3/efu26jrusLiExRFN1BJNDjS9P0ASJTnufEYlmjx1cUxSVEpjiOHyES9n3fLMuuIRLw4pMhrliW9Q5xA8/czm9N1/UeIoHuZxjG4n20IAieIRLofrZt74xvieu6rxAJdD/Hcd4gMvm+/wKRsO/7ep7XQSTgftvfwXfw1iJWActP+v3Gv+sHZ4ETCK/+M8gCB8QO4YyYEM6ICeGKJH0A5lSbFWrGfocAAAAASUVORK5CYII='
    };
    var Command = {
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
      PP_MOUSE_POSITION: 'pixel-perfect-mouse-position'
    };
    var container = document.createElement('div');
    Object.assign(container.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 10000000,
      pointerEvents: 'none'
    });

    var createEl = function createEl() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
      var el = document.createElement(tag);
      Object.assign(el.style, _objectSpread2({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      }, style));
      return el;
    };

    var grid = createEl({
      opacity: '0.4'
    });
    var bgrid = createEl({
      display: 'grid',
      gridGap: '0 0'
    });
    var image = createEl({}, 'img');
    var rulerX = createEl({
      backgroundImage: "url(\"".concat(Images.RULER_H, "\")"),
      backgroundRepeat: 'no-repeat repeat'
    });
    var rulerY = createEl({
      backgroundImage: "url(\"".concat(Images.RULER_V, "\")"),
      backgroundRepeat: 'repeat no-repeat'
    });
    var gridVisible = false;
    var rulersVisible = false;
    var bgridVisible = false;
    var imageVisible = false;

    var show = function show() {
      return document.body.appendChild(container);
    };

    var hide = function hide() {
      container.remove();
      grid.remove();
      bgrid.remove();
      image.remove();
      rulerX.remove();
      rulerY.remove();
    };

    var showGrid = function showGrid(type) {
      Object.assign(grid.style, {
        backgroundImage: "url(\"".concat(Images[type], "\")"),
        backgroundRepeat: 'repeat repeat'
      });
      container.appendChild(grid);
    };

    var showRulers = function showRulers() {
      container.appendChild(rulerX);
      container.appendChild(rulerY);
    };

    var showBGrid = function showBGrid(cols, margin) {
      bgrid.innerHTML = '';
      var style = '';

      for (var index = 1; index <= cols; index++) {
        style = "".concat(style, " 1fr");
        var col = document.createElement('div');
        Object.assign(col.style, {
          backgroundColor: index % 2 ? '#0088ff66' : '#00000007',
          gridColumn: "".concat(index, " / ").concat(index + 1)
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
        bgrid.style.margin = "0 ".concat(margin);
      }

      container.appendChild(bgrid);
    };

    window.addEventListener('resize', throttle(function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      EDConsole.sendCommand(Command.PP_WINDOW_SIZE, {
        width: width,
        height: height
      });
    }, 500));
    window.addEventListener('mousemove', throttle(function (event) {
      var x = event.pageX;
      var y = event.pageY;
      EDConsole.sendCommand(Command.PP_MOUSE_POSITION, {
        x: x,
        y: y
      });
    }, 500));
    EDConsole.addEventListener(Event.COMMAND_RECEIVED, function (_ref) {
      var _ref$data = _ref.data,
          command = _ref$data.command,
          sendResponse = _ref$data.sendResponse;

      if (command === Command.INIT_FRAME) {
        sendResponse(Command.PP_WINDOW_SIZE, {
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    });
    EDConsole.setCommandHandler(Command.PP_ZOOM_SET, function (_, _ref2) {
      var value = _ref2.value;
      document.body.style.zoom = value;
    });

    var hideIf = function hideIf() {
      if (!gridVisible && !rulersVisible && !bgridVisible && !imageVisible) {
        hide();
      }
    };

    var hideRule = function hideRule() {
      rulersVisible = false;
      rulerX.remove();
      rulerY.remove();
      hideIf();
    };

    EDConsole.setCommandHandler(Command.PP_RULER_SHOW, function (_, _ref3) {
      var rulerType = _ref3.rulerType;

      if (rulerType) {
        rulersVisible = true;
        showRulers();
        show();
      } else {
        hideRule();
      }
    });
    EDConsole.setCommandHandler(Command.PP_RULER_HIDE, hideRule);

    var hideGrid = function hideGrid() {
      gridVisible = false;
      grid.remove();
      hideIf();
    };

    EDConsole.setCommandHandler(Command.PP_GRID_SHOW, function (_, _ref4) {
      var gridType = _ref4.gridType;

      if (gridType) {
        gridVisible = true;
        showGrid(gridType);
        show();
      } else {
        hideGrid();
      }
    });
    EDConsole.setCommandHandler(Command.PP_GRID_HIDE, hideGrid);

    var hideColumns = function hideColumns() {
      bgridVisible = false;
      bgrid.remove();
      hideIf();
    };

    EDConsole.setCommandHandler(Command.PP_COLUMNS_SHOW, function (_, _ref5) {
      var columns = _ref5.columns,
          margin = _ref5.margin;
      var count = Number.parseInt(columns, 10);

      if (count) {
        bgridVisible = true;
        showBGrid(count, margin);
        show();
      } else {
        hideColumns();
      }
    });
    EDConsole.setCommandHandler(Command.PP_COLUMNS_HIDE, hideColumns);

    var applyImageSettings = function applyImageSettings(_ref6) {
      var scale = _ref6.scale,
          opacity = _ref6.opacity,
          offsetX = _ref6.offsetX,
          offsetY = _ref6.offsetY;
      var x = offsetX ? "".concat(offsetX, "px") : '0';
      var y = offsetY ? "".concat(offsetY, "px") : '0';
      Object.assign(image.style, {
        transform: "translate(".concat(x, ", ").concat(y, ") scale(").concat(scale, ")"),
        transformOrigin: 'top left',
        opacity: opacity
      });
    };

    EDConsole.setCommandHandler(Command.PP_IMAGE_SHOW, function (_, payload) {
      var data = payload.data;
      image.src = data;
      applyImageSettings(payload);
      container.appendChild(image);
      show();
    });
    EDConsole.setCommandHandler(Command.PP_IMAGE_HIDE, function () {
      image.src = '';
      image.remove();
      hideIf();
    });
    EDConsole.setCommandHandler(Command.PP_IMAGE_SETTINGS, function (_, payload) {
      return applyImageSettings(payload);
    });
    EDConsole.setCommandHandler(Command.PP_WINDOW_SET_SIZE, function (_, _ref7) {
      var width = _ref7.width,
          height = _ref7.height;
      window.resizeTo(width, height);
    });
    EDConsole.registerPlugin(PLUGIN_NAME);
  })(window.EDConsole);

})));
