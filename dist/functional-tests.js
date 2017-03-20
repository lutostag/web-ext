require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Webpack tests entry point. Bundles all the smoke test files
	// into a single file.
	
	var context = __webpack_require__(1);
	context.keys().forEach(context);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./test.cli.build.js": 2,
		"./test.cli.lint.js": 84,
		"./test.cli.nocommand.js": 85,
		"./test.cli.run.js": 86,
		"./test.cli.sign.js": 87
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(3);
	
	var _common = __webpack_require__(4);
	
	(0, _mocha.describe)('web-ext build', function () {
	  (0, _mocha.it)('should accept: --source-dir SRCDIR', function () {
	    return (0, _common.withTempAddonDir)({ addonPath: _common.minimalAddonPath }, function (srcDir, tmpDir) {
	      var argv = ['build', '--source-dir', srcDir, '--verbose'];
	      var cmd = (0, _common.execWebExt)(argv, { cwd: tmpDir });
	
	      return cmd.waitForExit.then(function (_ref) {
	        var exitCode = _ref.exitCode,
	            stdout = _ref.stdout,
	            stderr = _ref.stderr;
	
	        if (exitCode !== 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          });
	        }
	      });
	    });
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fakeServerPath = exports.fakeFirefoxPath = exports.minimalAddonPath = exports.fixturesDir = exports.webExt = exports.projectDir = exports.functionalTestsDir = exports.withTempDir = undefined;
	
	var _toConsumableArray2 = __webpack_require__(5);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	exports.withTempAddonDir = withTempAddonDir;
	exports.reportCommandErrors = reportCommandErrors;
	exports.execWebExt = execWebExt;
	
	var _path = __webpack_require__(59);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _child_process = __webpack_require__(60);
	
	var _copyDir = __webpack_require__(61);
	
	var _copyDir2 = _interopRequireDefault(_copyDir);
	
	var _es6Promisify = __webpack_require__(62);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _prettyjson = __webpack_require__(63);
	
	var _prettyjson2 = _interopRequireDefault(_prettyjson);
	
	var _tempDir = __webpack_require__(64);
	
	var tmpDirUtils = _interopRequireWildcard(_tempDir);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var withTempDir = exports.withTempDir = tmpDirUtils.withTempDir;
	
	var functionalTestsDir = exports.functionalTestsDir = _path2.default.resolve(__dirname);
	var projectDir = exports.projectDir = _path2.default.join(functionalTestsDir, '..', '..');
	var webExt = exports.webExt = _path2.default.join(projectDir, 'bin', 'web-ext');
	var fixturesDir = exports.fixturesDir = _path2.default.join(functionalTestsDir, '..', 'fixtures');
	var minimalAddonPath = exports.minimalAddonPath = _path2.default.join(fixturesDir, 'minimal-web-ext');
	var fakeFirefoxPath = exports.fakeFirefoxPath = _path2.default.join(functionalTestsDir, process.platform === 'win32' ? 'fake-firefox-binary.bat' : 'fake-firefox-binary.js');
	var fakeServerPath = exports.fakeServerPath = _path2.default.join(functionalTestsDir, 'fake-amo-server.js');
	
	// withTempAddonDir helper
	
	var copyDirAsPromised = (0, _es6Promisify2.default)(_copyDir2.default);
	function withTempAddonDir(_ref, makePromise) {
	  var addonPath = _ref.addonPath;
	
	  return withTempDir(function (tmpDir) {
	    var tempAddonDir = _path2.default.join(tmpDir.path(), 'tmp-addon-dir');
	    return copyDirAsPromised(addonPath, tempAddonDir).then(function () {
	      process.chdir(tmpDir.path());
	
	      return makePromise(tempAddonDir, tmpDir).then(function () {
	        return process.chdir(projectDir);
	      }).catch(function (err) {
	        process.chdir(projectDir);
	        throw err;
	      });
	    });
	  });
	}
	
	// reportCommandErrors helper
	
	function reportCommandErrors(obj, msg) {
	  var errorMessage = msg || 'Unexpected web-ext functional test result';
	  var formattedErrorData = _prettyjson2.default.render(obj);
	  var error = new Error(errorMessage + ': \n' + formattedErrorData);
	  /* eslint-disable no-console */
	
	  // Make the error diagnostic info easier to read.
	  console.error('This test failed. Please check the log below to debug.');
	  /* eslint-enable no-console */
	
	  // Make sure the test fails and error diagnostic fully reported in the failure.
	  throw error;
	}
	
	// execWebExt helper
	
	function execWebExt(argv, spawnOptions) {
	
	  var spawnedProcess = (0, _child_process.spawn)(process.execPath, [webExt].concat((0, _toConsumableArray3.default)(argv)), spawnOptions);
	
	  var waitForExit = new Promise(function (resolve) {
	    var errorData = '';
	    var outputData = '';
	
	    spawnedProcess.stderr.on('data', function (data) {
	      return errorData += data;
	    });
	    spawnedProcess.stdout.on('data', function (data) {
	      return outputData += data;
	    });
	
	    spawnedProcess.on('close', function (exitCode) {
	      resolve({
	        exitCode: exitCode,
	        stderr: errorData,
	        stdout: outputData
	      });
	    });
	  });
	
	  return { argv: argv, waitForExit: waitForExit, spawnedProcess: spawnedProcess };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/functional"))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(6);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(52);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(9)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(13)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(35);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(10)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(49)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(17)
	  , $export        = __webpack_require__(14)
	  , toObject       = __webpack_require__(51)
	  , call           = __webpack_require__(53)
	  , isArrayIter    = __webpack_require__(54)
	  , toLength       = __webpack_require__(41)
	  , createProperty = __webpack_require__(55)
	  , getIterFn      = __webpack_require__(56);
	
	$export($export.S + $export.F * !__webpack_require__(58)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(49)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(20)
	  , createDesc      = __webpack_require__(28);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(49)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(49)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("copy-dir");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("es6-promisify");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("prettyjson");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TempDir = undefined;
	
	var _slicedToArray2 = __webpack_require__(65);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(76);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(77);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.withTempDir = withTempDir;
	
	var _tmp = __webpack_require__(81);
	
	var _tmp2 = _interopRequireDefault(_tmp);
	
	var _es6Promisify = __webpack_require__(62);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _logger = __webpack_require__(82);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	/*
	 * Work with a self-destructing temporary directory in a promise chain.
	 *
	 * The directory will be destroyed when the promise chain is finished
	 * (whether there was an error or not).
	 *
	 * Usage:
	 *
	 * withTempDir(
	 *   (tmpDir) =>
	 *     doSomething(tmpDir.path())
	 *     .then(...)
	 * );
	 *
	 */
	
	function withTempDir(makePromise) {
	  var tmpDir = new TempDir();
	  return tmpDir.create().then(function () {
	    return makePromise(tmpDir);
	  }).catch(tmpDir.errorHandler()).then(tmpDir.successHandler());
	}
	
	/*
	 * Work with a self-destructing temporary directory object.
	 *
	 * It is safer to use withTempDir() instead but if you know
	 * what you're doing you can use it directly like:
	 *
	 * let tmpDir = new TempDir();
	 * tmpDir.create()
	 *   .then(() => {
	 *     // work with tmpDir.path()
	 *   })
	 *   .catch(tmpDir.errorHandler())
	 *   .then(tmpDir.successHandler());
	 *
	 */
	
	var TempDir = exports.TempDir = function () {
	  function TempDir() {
	    (0, _classCallCheck3.default)(this, TempDir);
	
	    this._path = undefined;
	    this._removeTempDir = undefined;
	  }
	
	  /*
	   * Returns a promise that is fulfilled when the temp directory has
	   * been created.
	   */
	
	
	  (0, _createClass3.default)(TempDir, [{
	    key: 'create',
	    value: function create() {
	      var _this = this;
	
	      var createTempDir = (0, _es6Promisify2.default)(_tmp2.default.dir, { multiArgs: true });
	      return createTempDir({
	        prefix: 'tmp-web-ext-',
	        // This allows us to remove a non-empty tmp dir.
	        unsafeCleanup: true
	      }).then(function (args) {
	        var _args = (0, _slicedToArray3.default)(args, 2),
	            tmpPath = _args[0],
	            removeTempDir = _args[1];
	
	        _this._path = tmpPath;
	        _this._removeTempDir = removeTempDir;
	        log.debug('Created temporary directory: ' + _this.path());
	        return _this;
	      });
	    }
	
	    /*
	     * Get the absolute path of the temp directory.
	     */
	
	  }, {
	    key: 'path',
	    value: function path() {
	      if (!this._path) {
	        throw new Error('You cannot access path() before calling create()');
	      }
	      return this._path;
	    }
	
	    /*
	     * Returns a callback that will catch an error, remove
	     * the temporary directory, and throw the error.
	     *
	     * This is intended for use in a promise like
	     * Promise().catch(tmp.errorHandler())
	     */
	
	  }, {
	    key: 'errorHandler',
	    value: function errorHandler() {
	      var _this2 = this;
	
	      return function (error) {
	        _this2.remove();
	        throw error;
	      };
	    }
	
	    /*
	     * Returns a callback that will remove the temporary direcotry.
	     *
	     * This is intended for use in a promise like
	     * Promise().then(tmp.successHandler())
	     */
	
	  }, {
	    key: 'successHandler',
	    value: function successHandler() {
	      var _this3 = this;
	
	      return function (promiseResult) {
	        _this3.remove();
	        return promiseResult;
	      };
	    }
	
	    /*
	     * Remove the temp directory.
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove() {
	      if (!this._removeTempDir) {
	        return;
	      }
	      log.debug('Removing temporary directory: ' + this.path());
	      this._removeTempDir && this._removeTempDir();
	    }
	  }]);
	  return TempDir;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, "src/util/temp-dir.js"))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(66);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(73);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	__webpack_require__(8);
	module.exports = __webpack_require__(72);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(31)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(70)
	  , step             = __webpack_require__(71)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(16).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	__webpack_require__(8);
	module.exports = __webpack_require__(75);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21)
	  , get      = __webpack_require__(56);
	module.exports = __webpack_require__(16).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(78);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("tmp");

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.consoleStream = exports.ConsoleStream = undefined;
	
	var _classCallCheck2 = __webpack_require__(76);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(77);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.createLogger = createLogger;
	
	var _bunyan = __webpack_require__(83);
	
	var _bunyan2 = _interopRequireDefault(_bunyan);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Bunyan-related Flow types
	
	// ConsoleStream types and implementation.
	
	var ConsoleStream = exports.ConsoleStream = function () {
	  function ConsoleStream() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$verbose = _ref.verbose,
	        verbose = _ref$verbose === undefined ? false : _ref$verbose;
	
	    (0, _classCallCheck3.default)(this, ConsoleStream);
	
	    this.verbose = verbose;
	    this.isCapturing = false;
	    this.capturedMessages = [];
	  }
	
	  (0, _createClass3.default)(ConsoleStream, [{
	    key: 'format',
	    value: function format(_ref2) {
	      var name = _ref2.name,
	          msg = _ref2.msg,
	          level = _ref2.level;
	
	      var prefix = this.verbose ? '[' + name + '][' + _bunyan.nameFromLevel[level] + '] ' : '';
	      return '' + prefix + msg + '\n';
	    }
	  }, {
	    key: 'makeVerbose',
	    value: function makeVerbose() {
	      this.verbose = true;
	    }
	  }, {
	    key: 'write',
	    value: function write(packet) {
	      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref3$localProcess = _ref3.localProcess,
	          localProcess = _ref3$localProcess === undefined ? process : _ref3$localProcess;
	
	      var thisLevel = this.verbose ? _bunyan2.default.TRACE : _bunyan2.default.INFO;
	      if (packet.level >= thisLevel) {
	        var _msg = this.format(packet);
	        if (this.isCapturing) {
	          this.capturedMessages.push(_msg);
	        } else {
	          localProcess.stdout.write(_msg);
	        }
	      }
	    }
	  }, {
	    key: 'startCapturing',
	    value: function startCapturing() {
	      this.isCapturing = true;
	    }
	  }, {
	    key: 'stopCapturing',
	    value: function stopCapturing() {
	      this.isCapturing = false;
	      this.capturedMessages = [];
	    }
	  }, {
	    key: 'flushCapturedLogs',
	    value: function flushCapturedLogs() {
	      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref4$localProcess = _ref4.localProcess,
	          localProcess = _ref4$localProcess === undefined ? process : _ref4$localProcess;
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.capturedMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _msg2 = _step.value;
	
	          localProcess.stdout.write(_msg2);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      this.capturedMessages = [];
	    }
	  }]);
	  return ConsoleStream;
	}();
	
	var consoleStream = exports.consoleStream = new ConsoleStream();
	
	// createLogger types and implementation.
	
	function createLogger(filename) {
	  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref5$createBunyanLog = _ref5.createBunyanLog,
	      createBunyanLog = _ref5$createBunyanLog === undefined ? _bunyan.createLogger : _ref5$createBunyanLog;
	
	  return createBunyanLog({
	    // Strip the leading src/ from file names (which is in all file names) to
	    // make the name less redundant.
	    name: filename.replace(/^src\//, ''),
	    // Capture all log levels and let the stream filter them.
	    level: _bunyan2.default.TRACE,
	    streams: [{
	      type: 'raw',
	      stream: consoleStream
	    }]
	  });
	}

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(3);
	
	var _common = __webpack_require__(4);
	
	(0, _mocha.describe)('web-ext lint', function () {
	  (0, _mocha.it)('should accept: --source-dir SRCDIR', function () {
	    return (0, _common.withTempAddonDir)({ addonPath: _common.minimalAddonPath }, function (srcDir, tmpDir) {
	      var argv = ['lint', '--source-dir', srcDir, '--verbose'];
	      var cmd = (0, _common.execWebExt)(argv, { cwd: tmpDir });
	
	      return cmd.waitForExit.then(function (_ref) {
	        var exitCode = _ref.exitCode,
	            stdout = _ref.stdout,
	            stderr = _ref.stderr;
	
	        if (exitCode !== 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          });
	        }
	      });
	    });
	  });
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(3);
	
	var _common = __webpack_require__(4);
	
	(0, _mocha.describe)('web-ext', function () {
	  (0, _mocha.it)('should accept: --help', function () {
	    return (0, _common.withTempDir)(function (tmpDir) {
	      var argv = ['--help'];
	      var cmd = (0, _common.execWebExt)(argv, { cwd: tmpDir });
	
	      return cmd.waitForExit.then(function (_ref) {
	        var exitCode = _ref.exitCode,
	            stdout = _ref.stdout,
	            stderr = _ref.stderr;
	
	        if (exitCode !== 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          });
	        }
	      });
	    });
	  });
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(3);
	
	var _common = __webpack_require__(4);
	
	var EXPECTED_MESSAGE = 'Fake Firefox binary executed correctly.';
	
	(0, _mocha.describe)('web-ext run', function () {
	
	  (0, _mocha.it)('should accept: --no-reload --source-dir SRCDIR --firefox FXPATH', function () {
	    return (0, _common.withTempAddonDir)({ addonPath: _common.minimalAddonPath }, function (srcDir) {
	      var argv = ['run', '--verbose', '--no-reload', '--source-dir', srcDir, '--firefox', _common.fakeFirefoxPath];
	      var spawnOptions = {
	        env: {
	          PATH: process.env.PATH,
	          EXPECTED_MESSAGE: EXPECTED_MESSAGE,
	          addonPath: srcDir
	        }
	      };
	
	      var cmd = (0, _common.execWebExt)(argv, spawnOptions);
	
	      return cmd.waitForExit.then(function (_ref) {
	        var exitCode = _ref.exitCode,
	            stdout = _ref.stdout,
	            stderr = _ref.stderr;
	
	        if (stdout.indexOf(EXPECTED_MESSAGE) < 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          }, 'The fake Firefox binary has not been executed');
	        } else if (exitCode !== 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          });
	        }
	      });
	    });
	  });
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _child_process = __webpack_require__(60);
	
	var _mocha = __webpack_require__(3);
	
	var _common = __webpack_require__(4);
	
	(0, _mocha.describe)('web-ext sign', function () {
	  var fakeServerProcess = void 0;
	
	  (0, _mocha.beforeEach)(function () {
	    return new Promise(function (resolve, reject) {
	      fakeServerProcess = (0, _child_process.spawn)(process.execPath, [_common.fakeServerPath]);
	      fakeServerProcess.stdout.on('data', resolve);
	      fakeServerProcess.stderr.on('data', reject);
	    });
	  });
	
	  (0, _mocha.afterEach)(function () {
	    if (fakeServerProcess) {
	      fakeServerProcess.kill();
	      fakeServerProcess = null;
	    }
	  });
	
	  (0, _mocha.it)('should accept: --source-dir SRCDIR --api-url-prefix URL', function () {
	    return (0, _common.withTempAddonDir)({ addonPath: _common.minimalAddonPath }, function (srcDir, tmpDir) {
	      var argv = ['sign', '--verbose', '--api-url-prefix', 'http://localhost:8989/fake/api/v3', '--api-key', 'FAKEAPIKEY', '--api-secret', 'FAKEAPISECRET', '--source-dir', srcDir];
	      var cmd = (0, _common.execWebExt)(argv, { cwd: tmpDir });
	
	      return cmd.waitForExit.then(function (_ref) {
	        var exitCode = _ref.exitCode,
	            stdout = _ref.stdout,
	            stderr = _ref.stderr;
	
	        if (exitCode !== 0) {
	          (0, _common.reportCommandErrors)({
	            argv: argv,
	            exitCode: exitCode,
	            stdout: stdout,
	            stderr: stderr
	          });
	        }
	      });
	    });
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=functional-tests.js.map