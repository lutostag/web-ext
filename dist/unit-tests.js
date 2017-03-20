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
	
	__webpack_require__(1);
	
	var context = __webpack_require__(2); // Webpack tests entry point. Bundles all the test files
	// into a single file.
	
	context.keys().forEach(context);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./test-cmd/test.build.js": 3,
		"./test-cmd/test.docs.js": 142,
		"./test-cmd/test.lint.js": 145,
		"./test-cmd/test.run.js": 153,
		"./test-cmd/test.sign.js": 166,
		"./test-firefox/test.firefox.js": 170,
		"./test-firefox/test.preferences.js": 171,
		"./test-firefox/test.remote.js": 172,
		"./test-util/test.artifacts.js": 173,
		"./test-util/test.desktop-notifier.js": 174,
		"./test-util/test.file-filter.js": 175,
		"./test-util/test.is-directory.js": 176,
		"./test-util/test.logger.js": 177,
		"./test-util/test.manifest.js": 140,
		"./test-util/test.temp-dir.js": 179,
		"./test-util/test.updates.js": 180,
		"./test.config.js": 183,
		"./test.errors.js": 192,
		"./test.program.js": 193,
		"./test.setup.js": 194,
		"./test.watcher.js": 195
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
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mz = __webpack_require__(5);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _build = __webpack_require__(9);
	
	var _build2 = _interopRequireDefault(_build);
	
	var _fileFilter = __webpack_require__(127);
	
	var _tempDir = __webpack_require__(129);
	
	var _helpers = __webpack_require__(138);
	
	var _test = __webpack_require__(140);
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	(0, _mocha.describe)('build', function () {
	
	  (0, _mocha.it)('zips a package', function () {
	    var zipFile = new _helpers.ZipFile();
	
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: tmpDir.path()
	      }).then(function (buildResult) {
	        _chai.assert.match(buildResult.extensionPath, /minimal_extension-1\.0\.zip$/);
	        return buildResult.extensionPath;
	      }).then(function (extensionPath) {
	        return zipFile.open(extensionPath);
	      }).then(function () {
	        return zipFile.extractFilenames();
	      }).then(function (fileNames) {
	        fileNames.sort();
	        _chai.assert.deepEqual(fileNames, ['background-script.js', 'manifest.json']);
	        return zipFile.close();
	      });
	    });
	  });
	
	  (0, _mocha.it)('configures a build command with the expected fileFilter', function () {
	    var packageCreator = _sinon2.default.spy(function () {
	      return { extensionPath: 'extension/path' };
	    });
	    var fileFilter = { wantFile: function wantFile() {
	        return true;
	      } };
	    var createFileFilter = _sinon2.default.spy(function () {
	      return fileFilter;
	    });
	    var params = {
	      sourceDir: '/src',
	      artifactsDir: 'artifacts',
	      ignoreFiles: ['**/*.log']
	    };
	    return (0, _build2.default)(params, { packageCreator: packageCreator, createFileFilter: createFileFilter }).then(function () {
	      // ensure sourceDir, artifactsDir, ignoreFiles is used
	      _chai.assert.ok(createFileFilter.called);
	      _chai.assert.deepEqual(createFileFilter.firstCall.args[0], params);
	      // ensure packageCreator received correct fileFilter
	      _chai.assert.ok(packageCreator.called);
	      _chai.assert.equal(packageCreator.firstCall.args[0].fileFilter, fileFilter);
	    });
	  });
	
	  (0, _mocha.it)('gives the correct name to a localized extension', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-localizable-web-ext'),
	        artifactsDir: tmpDir.path()
	      }).then(function (buildResult) {
	        _chai.assert.match(buildResult.extensionPath, /name_of_the_extension-1\.0\.zip$/);
	        return buildResult.extensionPath;
	      });
	    });
	  });
	
	  (0, _mocha.it)('handles repeating localization keys', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
	      _mz.fs.writeFileSync(messageFileName, '{"extensionName": {\n              "message": "example extension",\n              "description": "example description"\n            }\n          }');
	
	      var manifestWithRepeatingPattern = {
	        name: '__MSG_extensionName__ __MSG_extensionName__',
	        version: '0.0.1'
	      };
	
	      return (0, _build.getDefaultLocalizedName)({
	        messageFile: messageFileName,
	        manifestData: manifestWithRepeatingPattern
	      }).then(function (result) {
	        _chai.assert.match(result, /example extension example extension/);
	      });
	    });
	  });
	
	  (0, _mocha.it)('checks locale file for malformed json', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
	      _mz.fs.writeFileSync(messageFileName, '{"simulated:" "json syntax error"');
	      return (0, _build.getDefaultLocalizedName)({
	        messageFile: messageFileName,
	        manifestData: _test.manifestWithoutApps
	      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.instanceOf(error, _errors.UsageError);
	        _chai.assert.match(error.message, /Unexpected token '"' at 1:15/);
	        _chai.assert.match(error.message, /^Error parsing messages.json/);
	        _chai.assert.include(error.message, messageFileName);
	      });
	    });
	  });
	
	  (0, _mocha.it)('checks locale file for incorrect format', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var messageFileName = _path2.default.join(tmpDir.path(), 'messages.json');
	      //This is missing the 'message' key
	      _mz.fs.writeFileSync(messageFileName, '{"extensionName": {\n              "description": "example extension"\n              }\n          }');
	      var basicLocalizedManifest = {
	        name: '__MSG_extensionName__',
	        version: '0.0.1'
	      };
	      return (0, _build.getDefaultLocalizedName)({
	        messageFile: messageFileName,
	        manifestData: basicLocalizedManifest
	      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.instanceOf(error, _errors.UsageError);
	        _chai.assert.match(error.message, /The locale file .*messages\.json is missing key: extensionName/);
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws an error if the locale file does not exist', function () {
	    return (0, _build.getDefaultLocalizedName)({
	      messageFile: '/path/to/non-existent-dir/messages.json',
	      manifestData: _test.manifestWithoutApps
	    }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      log.info(error);
	      _chai.assert.instanceOf(error, _errors.UsageError);
	      _chai.assert.match(error.message, /Error: ENOENT: no such file or directory, open .*messages.json/);
	      _chai.assert.match(error.message, /^Error reading messages.json/);
	      _chai.assert.include(error.message, '/path/to/non-existent-dir/messages.json');
	    });
	  });
	
	  (0, _mocha.it)('can build an extension without an ID', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      // Make sure a manifest without an ID doesn't throw an error.
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: tmpDir.path()
	      }, { manifestData: _test.manifestWithoutApps });
	    });
	  });
	
	  (0, _mocha.it)('prepares the artifacts dir', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'artifacts');
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: artifactsDir
	      }).then(function () {
	        return _mz.fs.stat(artifactsDir);
	      }).then(function (stats) {
	        _chai.assert.equal(stats.isDirectory(), true);
	      });
	    });
	  });
	
	  (0, _mocha.it)('lets you specify a manifest', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: tmpDir.path()
	      }, {
	        manifestData: _test.basicManifest
	      }).then(function (buildResult) {
	        _chai.assert.match(buildResult.extensionPath, /the_extension-0\.0\.1\.zip$/);
	        return buildResult.extensionPath;
	      });
	    });
	  });
	
	  (0, _mocha.it)('asks FileFilter what files to include in the ZIP', function () {
	    var zipFile = new _helpers.ZipFile();
	    var fileFilter = new _fileFilter.FileFilter({
	      sourceDir: '.',
	      baseIgnoredPatterns: ['**/background-script.js']
	    });
	
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: tmpDir.path()
	      }, { fileFilter: fileFilter }).then(function (buildResult) {
	        return zipFile.open(buildResult.extensionPath);
	      }).then(function () {
	        return zipFile.extractFilenames();
	      }).then(function (fileNames) {
	        _chai.assert.notInclude(fileNames, 'background-script.js');
	        return zipFile.close();
	      });
	    });
	  });
	
	  (0, _mocha.it)('lets you rebuild when files change', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
	      var artifactsDir = tmpDir.path();
	      var fileFilter = new _fileFilter.FileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir });
	      _sinon2.default.spy(fileFilter, 'wantFile');
	      var onSourceChange = _sinon2.default.spy(function () {});
	      return (0, _build2.default)({
	        sourceDir: sourceDir, artifactsDir: artifactsDir, asNeeded: true
	      }, {
	        manifestData: _test.basicManifest, onSourceChange: onSourceChange, fileFilter: fileFilter
	      }).then(function (buildResult) {
	        // Make sure we still have a build result.
	        _chai.assert.match(buildResult.extensionPath, /\.zip$/);
	        return buildResult;
	      }).then(function (buildResult) {
	        _chai.assert.equal(onSourceChange.called, true);
	        var args = onSourceChange.firstCall.args[0];
	        _chai.assert.equal(args.sourceDir, sourceDir);
	        _chai.assert.equal(args.artifactsDir, artifactsDir);
	        _chai.assert.typeOf(args.onChange, 'function');
	
	        // Make sure it uses the file filter.
	        _chai.assert.typeOf(args.shouldWatchFile, 'function');
	        args.shouldWatchFile('/some/path');
	        _chai.assert.equal(fileFilter.wantFile.called, true);
	
	        // Remove the built extension.
	        return _mz.fs.unlink(buildResult.extensionPath)
	        // Execute the onChange handler to make sure it gets built
	        // again. This simulates what happens when the file watcher
	        // executes the callback.
	        .then(function () {
	          return args.onChange();
	        });
	      }).then(function (buildResult) {
	        _chai.assert.match(buildResult.extensionPath, /\.zip$/);
	        return _mz.fs.stat(buildResult.extensionPath);
	      }).then(function (stat) {
	        _chai.assert.equal(stat.isFile(), true);
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws errors when rebuilding in source watcher', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var packageResult = Promise.resolve({});
	      var packageCreator = _sinon2.default.spy(function () {
	        return packageResult;
	      });
	      var onSourceChange = _sinon2.default.spy(function () {});
	      return (0, _build2.default)({
	        sourceDir: (0, _helpers.fixturePath)('minimal-web-ext'),
	        artifactsDir: tmpDir.path(),
	        asNeeded: true
	      }, {
	        manifestData: _test.basicManifest, onSourceChange: onSourceChange, packageCreator: packageCreator
	      }).then(function () {
	        _chai.assert.equal(onSourceChange.called, true);
	        _chai.assert.equal(packageCreator.callCount, 1);
	
	        var onChange = onSourceChange.firstCall.args[0].onChange;
	
	        packageResult = Promise.reject(new Error('Simulate an error on the second call to packageCreator()'));
	        // Invoke the stub packageCreator() again which should throw an error
	        return onChange();
	      }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.include(error.message, 'Simulate an error on the second call to packageCreator()');
	      });
	    });
	  });
	
	  (0, _mocha.describe)('safeFileName', function () {
	
	    (0, _mocha.it)('makes names safe for writing to a file system', function () {
	      _chai.assert.equal((0, _build.safeFileName)('Bob Loblaw\'s 2005 law-blog.net'), 'bob_loblaw_s_2005_law-blog.net');
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-cmd/test.build.js"))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mz");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("sinon");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDefaultLocalizedName = undefined;
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var getDefaultLocalizedName = exports.getDefaultLocalizedName = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
	    var messageFile = _ref2.messageFile,
	        manifestData = _ref2.manifestData;
	    var messageData, messageContents, extensionName;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            messageData = void 0;
	            messageContents = void 0;
	            extensionName = manifestData.name;
	            _context.prev = 3;
	            _context.next = 6;
	            return _mz.fs.readFile(messageFile);
	
	          case 6:
	            messageContents = _context.sent;
	            _context.next = 12;
	            break;
	
	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](3);
	            throw new _errors.UsageError('Error reading messages.json file at ' + messageFile + ': ' + _context.t0);
	
	          case 12:
	            _context.prev = 12;
	
	            messageData = (0, _parseJson2.default)(messageContents, messageFile);
	            _context.next = 19;
	            break;
	
	          case 16:
	            _context.prev = 16;
	            _context.t1 = _context['catch'](12);
	            throw new _errors.UsageError('Error parsing messages.json ' + _context.t1);
	
	          case 19:
	
	            extensionName = manifestData.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g, function (match, messageName) {
	              if (!(messageData[messageName] && messageData[messageName].message)) {
	                var error = new _errors.UsageError('The locale file ' + messageFile + ' ' + ('is missing key: ' + messageName));
	                throw error;
	              } else {
	                return messageData[messageName].message;
	              }
	            });
	            return _context.abrupt('return', Promise.resolve(extensionName));
	
	          case 21:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[3, 9], [12, 16]]);
	  }));
	
	  return function getDefaultLocalizedName(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var defaultPackageCreator = function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
	    var manifestData = _ref4.manifestData,
	        sourceDir = _ref4.sourceDir,
	        fileFilter = _ref4.fileFilter,
	        artifactsDir = _ref4.artifactsDir,
	        showReadyMessage = _ref4.showReadyMessage;
	
	    var id, buffer, extensionName, _messageFile, packageName, extensionPath, stream;
	
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            id = void 0;
	
	            if (!manifestData) {
	              _context2.next = 6;
	              break;
	            }
	
	            id = (0, _manifest.getManifestId)(manifestData);
	            log.debug('Using manifest id=' + (id || '[not specified]'));
	            _context2.next = 9;
	            break;
	
	          case 6:
	            _context2.next = 8;
	            return (0, _manifest2.default)(sourceDir);
	
	          case 8:
	            manifestData = _context2.sent;
	
	          case 9:
	            _context2.next = 11;
	            return (0, _zipDir.zipDir)(sourceDir, {
	              filter: function filter() {
	                return fileFilter.wantFile.apply(fileFilter, arguments);
	              }
	            });
	
	          case 11:
	            buffer = _context2.sent;
	            extensionName = manifestData.name;
	
	            if (!manifestData.default_locale) {
	              _context2.next = 19;
	              break;
	            }
	
	            _messageFile = _path2.default.join(sourceDir, '_locales', manifestData.default_locale, 'messages.json');
	
	            log.debug('Manifest declared default_locale, localizing extension name');
	            _context2.next = 18;
	            return getDefaultLocalizedName({ messageFile: _messageFile, manifestData: manifestData });
	
	          case 18:
	            extensionName = _context2.sent;
	
	          case 19:
	            packageName = safeFileName(extensionName + '-' + manifestData.version + '.zip');
	            extensionPath = _path2.default.join(artifactsDir, packageName);
	            stream = (0, _fs.createWriteStream)(extensionPath);
	
	
	            stream.write(buffer, function () {
	              return stream.end();
	            });
	
	            _context2.next = 25;
	            return (0, _eventToPromise2.default)(stream, 'close');
	
	          case 25:
	
	            if (showReadyMessage) {
	              log.info('Your web extension is ready: ' + extensionPath);
	            }
	            return _context2.abrupt('return', { extensionPath: extensionPath });
	
	          case 27:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function defaultPackageCreator(_x2) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// Build command types and implementation.
	
	exports.safeFileName = safeFileName;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _fs = __webpack_require__(78);
	
	var _mz = __webpack_require__(5);
	
	var _parseJson = __webpack_require__(79);
	
	var _parseJson2 = _interopRequireDefault(_parseJson);
	
	var _eventToPromise = __webpack_require__(80);
	
	var _eventToPromise2 = _interopRequireDefault(_eventToPromise);
	
	var _watcher = __webpack_require__(81);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _zipDir = __webpack_require__(91);
	
	var _manifest = __webpack_require__(94);
	
	var _manifest2 = _interopRequireDefault(_manifest);
	
	var _artifacts = __webpack_require__(125);
	
	var _logger = __webpack_require__(84);
	
	var _errors = __webpack_require__(95);
	
	var _fileFilter = __webpack_require__(127);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import flow types.
	var log = (0, _logger.createLogger)(__filename);
	
	function safeFileName(name) {
	  return name.toLowerCase().replace(/[^a-z0-9\.-]+/g, '_');
	}
	
	// defaultPackageCreator types and implementation.
	
	// This defines the _locales/messages.json type. See:
	// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization#Providing_localized_strings_in__locales
	
	exports.default = function () {
	  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
	    var sourceDir = _ref6.sourceDir,
	        artifactsDir = _ref6.artifactsDir,
	        _ref6$asNeeded = _ref6.asNeeded,
	        asNeeded = _ref6$asNeeded === undefined ? false : _ref6$asNeeded,
	        _ref6$ignoreFiles = _ref6.ignoreFiles,
	        ignoreFiles = _ref6$ignoreFiles === undefined ? [] : _ref6$ignoreFiles;
	
	    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        manifestData = _ref7.manifestData,
	        _ref7$createFileFilte = _ref7.createFileFilter,
	        createFileFilter = _ref7$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref7$createFileFilte,
	        _ref7$fileFilter = _ref7.fileFilter,
	        fileFilter = _ref7$fileFilter === undefined ? createFileFilter({
	      sourceDir: sourceDir,
	      artifactsDir: artifactsDir,
	      ignoreFiles: ignoreFiles
	    }) : _ref7$fileFilter,
	        _ref7$onSourceChange = _ref7.onSourceChange,
	        onSourceChange = _ref7$onSourceChange === undefined ? _watcher2.default : _ref7$onSourceChange,
	        _ref7$packageCreator = _ref7.packageCreator,
	        packageCreator = _ref7$packageCreator === undefined ? defaultPackageCreator : _ref7$packageCreator,
	        _ref7$showReadyMessag = _ref7.showReadyMessage,
	        showReadyMessage = _ref7$showReadyMessag === undefined ? true : _ref7$showReadyMessag;
	
	    var rebuildAsNeeded, createPackage, result;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            rebuildAsNeeded = asNeeded; // alias for `build --as-needed`
	
	            log.info('Building web extension from ' + sourceDir);
	
	            createPackage = function createPackage() {
	              return packageCreator({
	                manifestData: manifestData, sourceDir: sourceDir, fileFilter: fileFilter, artifactsDir: artifactsDir, showReadyMessage: showReadyMessage
	              });
	            };
	
	            _context3.next = 5;
	            return (0, _artifacts.prepareArtifactsDir)(artifactsDir);
	
	          case 5:
	            _context3.next = 7;
	            return createPackage();
	
	          case 7:
	            result = _context3.sent;
	
	
	            if (rebuildAsNeeded) {
	              log.info('Rebuilding when files change...');
	              onSourceChange({
	                sourceDir: sourceDir,
	                artifactsDir: artifactsDir,
	                onChange: function onChange() {
	                  return createPackage().catch(function (error) {
	                    log.error(error.stack);
	                    throw error;
	                  });
	                },
	                shouldWatchFile: function shouldWatchFile() {
	                  return fileFilter.wantFile.apply(fileFilter, arguments);
	                }
	              });
	            }
	
	            return _context3.abrupt('return', result);
	
	          case 10:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  function build(_x3) {
	    return _ref5.apply(this, arguments);
	  }
	
	  return build;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/build.js"))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("regenerator-runtime");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _promise = __webpack_require__(13);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }
	
	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }
	
	      return step("next");
	    });
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(60);
	__webpack_require__(64);
	module.exports = __webpack_require__(24).Promise;

/***/ },
/* 15 */
/***/ function(module, exports) {



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(17)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(20)(String, 'String', function(iterated){
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(18)
	  , defined   = __webpack_require__(19);
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
/* 18 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(21)
	  , $export        = __webpack_require__(22)
	  , redefine       = __webpack_require__(37)
	  , hide           = __webpack_require__(27)
	  , has            = __webpack_require__(38)
	  , Iterators      = __webpack_require__(39)
	  , $iterCreate    = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(58)
	  , ITERATOR       = __webpack_require__(57)('iterator')
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
/* 21 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(23)
	  , core      = __webpack_require__(24)
	  , ctx       = __webpack_require__(25)
	  , hide      = __webpack_require__(27)
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
/* 23 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(26);
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
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(28)
	  , createDesc = __webpack_require__(36);
	module.exports = __webpack_require__(32) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(29)
	  , IE8_DOM_DEFINE = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(35)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(32) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(32) && !__webpack_require__(33)(function(){
	  return Object.defineProperty(__webpack_require__(34)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(33)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30)
	  , document = __webpack_require__(23).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(30);
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);

/***/ },
/* 38 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(41)
	  , descriptor     = __webpack_require__(36)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(27)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(29)
	  , dPs         = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(34)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(28)
	  , anObject = __webpack_require__(29)
	  , getKeys  = __webpack_require__(43);
	
	module.exports = __webpack_require__(32) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(54);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(38)
	  , toIObject    = __webpack_require__(45)
	  , arrayIndexOf = __webpack_require__(48)(false)
	  , IE_PROTO     = __webpack_require__(51)('IE_PROTO');
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(46)
	  , defined = __webpack_require__(19);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45)
	  , toLength  = __webpack_require__(49)
	  , toIndex   = __webpack_require__(50);
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(18)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(18)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(52)('keys')
	  , uid    = __webpack_require__(53);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(23)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23).document && document.documentElement;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(28).f
	  , has = __webpack_require__(38)
	  , TAG = __webpack_require__(57)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(52)('wks')
	  , uid        = __webpack_require__(53)
	  , Symbol     = __webpack_require__(23).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(38)
	  , toObject    = __webpack_require__(59)
	  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(19);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var global        = __webpack_require__(23)
	  , hide          = __webpack_require__(27)
	  , Iterators     = __webpack_require__(39)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(62)
	  , step             = __webpack_require__(63)
	  , Iterators        = __webpack_require__(39)
	  , toIObject        = __webpack_require__(45);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(20)(Array, 'Array', function(iterated, kind){
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
/* 62 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(21)
	  , global             = __webpack_require__(23)
	  , ctx                = __webpack_require__(25)
	  , classof            = __webpack_require__(65)
	  , $export            = __webpack_require__(22)
	  , isObject           = __webpack_require__(30)
	  , aFunction          = __webpack_require__(26)
	  , anInstance         = __webpack_require__(66)
	  , forOf              = __webpack_require__(67)
	  , speciesConstructor = __webpack_require__(71)
	  , task               = __webpack_require__(72).set
	  , microtask          = __webpack_require__(74)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(57)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(75)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(56)($Promise, PROMISE);
	__webpack_require__(76)(PROMISE);
	Wrapper = __webpack_require__(24)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(77)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(47)
	  , TAG = __webpack_require__(57)('toStringTag')
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
/* 66 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(25)
	  , call        = __webpack_require__(68)
	  , isArrayIter = __webpack_require__(69)
	  , anObject    = __webpack_require__(29)
	  , toLength    = __webpack_require__(49)
	  , getIterFn   = __webpack_require__(70)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(29);
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(39)
	  , ITERATOR   = __webpack_require__(57)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(65)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(39);
	module.exports = __webpack_require__(24).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(29)
	  , aFunction = __webpack_require__(26)
	  , SPECIES   = __webpack_require__(57)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(25)
	  , invoke             = __webpack_require__(73)
	  , html               = __webpack_require__(55)
	  , cel                = __webpack_require__(34)
	  , global             = __webpack_require__(23)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(47)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(23)
	  , macrotask = __webpack_require__(72).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(47)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(27);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(23)
	  , core        = __webpack_require__(24)
	  , dP          = __webpack_require__(28)
	  , DESCRIPTORS = __webpack_require__(32)
	  , SPECIES     = __webpack_require__(57)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(57)('iterator')
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
/* 78 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("parse-json");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("event-to-promise");

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = onSourceChange;
	exports.proxyFileChanges = proxyFileChanges;
	
	var _watchpack = __webpack_require__(82);
	
	var _watchpack2 = _interopRequireDefault(_watchpack);
	
	var _debounce = __webpack_require__(83);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	// onSourceChange types and implementation
	
	// NOTE: this fix an issue with flow and default exports (which currently
	// lose their type signatures) by explicitly declare the default export
	// signature. Reference: https://github.com/facebook/flow/issues/449
	// eslint-disable-next-line no-shadow
	
	function onSourceChange(_ref) {
	  var sourceDir = _ref.sourceDir,
	      artifactsDir = _ref.artifactsDir,
	      onChange = _ref.onChange,
	      shouldWatchFile = _ref.shouldWatchFile;
	
	  // TODO: For network disks, we would need to add {poll: true}.
	  var watcher = new _watchpack2.default();
	
	  var executeImmediately = true;
	  onChange = (0, _debounce2.default)(onChange, 1000, executeImmediately);
	
	  watcher.on('change', function (filePath) {
	    proxyFileChanges({ artifactsDir: artifactsDir, onChange: onChange, filePath: filePath, shouldWatchFile: shouldWatchFile });
	  });
	
	  log.debug('Watching for file changes in ' + sourceDir);
	  watcher.watch([], [sourceDir], Date.now());
	
	  // TODO: support interrupting the watcher on Windows.
	  // https://github.com/mozilla/web-ext/issues/225
	  process.on('SIGINT', function () {
	    return watcher.close();
	  });
	  return watcher;
	}
	
	// proxyFileChanges types and implementation.
	
	function proxyFileChanges(_ref2) {
	  var artifactsDir = _ref2.artifactsDir,
	      onChange = _ref2.onChange,
	      filePath = _ref2.filePath,
	      shouldWatchFile = _ref2.shouldWatchFile;
	
	  if (filePath.indexOf(artifactsDir) === 0 || !shouldWatchFile(filePath)) {
	    log.debug('Ignoring change to: ' + filePath);
	  } else {
	    log.debug('Changed: ' + filePath);
	    log.debug('Last change detection: ' + new Date().toTimeString());
	    onChange();
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/watcher.js"))

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = require("watchpack");

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("debounce");

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.consoleStream = exports.ConsoleStream = undefined;
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.createLogger = createLogger;
	
	var _bunyan = __webpack_require__(90);
	
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
/* 85 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(87);
	
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	var $Object = __webpack_require__(24).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(22);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(32), 'Object', {defineProperty: __webpack_require__(28).f});

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.zipDir = undefined;
	
	var _zipDir = __webpack_require__(92);
	
	var _zipDir2 = _interopRequireDefault(_zipDir);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var zipDir = exports.zipDir = (0, _es6Promisify2.default)(_zipDir2.default);

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("zip-dir");

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = require("es6-promisify");

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	exports.getManifestId = getManifestId;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mz = __webpack_require__(5);
	
	var _parseJson = __webpack_require__(79);
	
	var _parseJson2 = _interopRequireDefault(_parseJson);
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	// getValidatedManifest helper types and implementation
	
	exports.default = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sourceDir) {
	    var manifestFile, manifestContents, manifestData, errors;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            manifestFile = _path2.default.join(sourceDir, 'manifest.json');
	
	            log.debug('Validating manifest at ' + manifestFile);
	
	            manifestContents = void 0;
	            _context.prev = 3;
	            _context.next = 6;
	            return _mz.fs.readFile(manifestFile);
	
	          case 6:
	            manifestContents = _context.sent;
	            _context.next = 12;
	            break;
	
	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](3);
	            throw new _errors.InvalidManifest('Could not read manifest.json file at ' + manifestFile + ': ' + _context.t0);
	
	          case 12:
	            manifestData = void 0;
	            _context.prev = 13;
	
	            manifestData = (0, _parseJson2.default)(manifestContents, manifestFile);
	            _context.next = 20;
	            break;
	
	          case 17:
	            _context.prev = 17;
	            _context.t1 = _context['catch'](13);
	            throw new _errors.InvalidManifest('Error parsing manifest.json at ' + manifestFile + ': ' + _context.t1);
	
	          case 20:
	            errors = [];
	            // This is just some basic validation of what web-ext needs, not
	            // what Firefox will need to run the extension.
	            // TODO: integrate with the addons-linter for actual validation.
	
	            if (!manifestData.name) {
	              errors.push('missing "name" property');
	            }
	            if (!manifestData.version) {
	              errors.push('missing "version" property');
	            }
	
	            if (manifestData.applications && !manifestData.applications.gecko) {
	              // Since the applications property only applies to gecko, make
	              // sure 'gecko' exists when 'applications' is defined. This should
	              // make introspection of gecko properties easier.
	              errors.push('missing "applications.gecko" property');
	            }
	
	            if (!errors.length) {
	              _context.next = 26;
	              break;
	            }
	
	            throw new _errors.InvalidManifest('Manifest at ' + manifestFile + ' is invalid: ' + errors.join('; '));
	
	          case 26:
	            return _context.abrupt('return', manifestData);
	
	          case 27:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[3, 9], [13, 17]]);
	  }));
	
	  function getValidatedManifest(_x) {
	    return _ref.apply(this, arguments);
	  }
	
	  return getValidatedManifest;
	}();
	
	function getManifestId(manifestData) {
	  return manifestData.applications ? manifestData.applications.gecko.id : undefined;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/util/manifest.js"))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RemoteTempInstallNotSupported = exports.InvalidManifest = exports.UsageError = exports.WebExtError = undefined;
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(96);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(116);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	exports.onlyInstancesOf = onlyInstancesOf;
	exports.onlyErrorsWithCode = onlyErrorsWithCode;
	exports.isErrorWithCode = isErrorWithCode;
	
	var _es6Error = __webpack_require__(124);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * Base error for all custom web-ext errors.
	 */
	var WebExtError = exports.WebExtError = function (_ExtendableError) {
	  (0, _inherits3.default)(WebExtError, _ExtendableError);
	
	  function WebExtError(message) {
	    (0, _classCallCheck3.default)(this, WebExtError);
	    return (0, _possibleConstructorReturn3.default)(this, (WebExtError.__proto__ || Object.getPrototypeOf(WebExtError)).call(this, message));
	  }
	
	  return WebExtError;
	}(_es6Error2.default);
	
	/*
	 * The class for errors that can be fixed by the developer.
	 */
	
	
	var UsageError = exports.UsageError = function (_WebExtError) {
	  (0, _inherits3.default)(UsageError, _WebExtError);
	
	  function UsageError(message) {
	    (0, _classCallCheck3.default)(this, UsageError);
	    return (0, _possibleConstructorReturn3.default)(this, (UsageError.__proto__ || Object.getPrototypeOf(UsageError)).call(this, message));
	  }
	
	  return UsageError;
	}(WebExtError);
	
	/*
	 * The manifest for the extension is invalid (or missing).
	 */
	
	
	var InvalidManifest = exports.InvalidManifest = function (_UsageError) {
	  (0, _inherits3.default)(InvalidManifest, _UsageError);
	
	  function InvalidManifest(message) {
	    (0, _classCallCheck3.default)(this, InvalidManifest);
	    return (0, _possibleConstructorReturn3.default)(this, (InvalidManifest.__proto__ || Object.getPrototypeOf(InvalidManifest)).call(this, message));
	  }
	
	  return InvalidManifest;
	}(UsageError);
	
	/*
	 * The remote Firefox does not support temporary add-on installation.
	 */
	
	
	var RemoteTempInstallNotSupported = exports.RemoteTempInstallNotSupported = function (_WebExtError2) {
	  (0, _inherits3.default)(RemoteTempInstallNotSupported, _WebExtError2);
	
	  function RemoteTempInstallNotSupported(message) {
	    (0, _classCallCheck3.default)(this, RemoteTempInstallNotSupported);
	    return (0, _possibleConstructorReturn3.default)(this, (RemoteTempInstallNotSupported.__proto__ || Object.getPrototypeOf(RemoteTempInstallNotSupported)).call(this, message));
	  }
	
	  return RemoteTempInstallNotSupported;
	}(WebExtError);
	
	/*
	 * Sugar-y way to catch only instances of a certain error.
	 *
	 * Usage:
	 *
	 *  Promise.reject(SyntaxError)
	 *    .catch(onlyInstancesOf(SyntaxError, (error) => {
	 *      // error is guaranteed to be an instance of SyntaxError
	 *    }))
	 *
	 * All other errors will be re-thrown.
	 *
	 */
	
	
	function onlyInstancesOf(predicate, errorHandler) {
	  return function (error) {
	    if (error instanceof predicate) {
	      return errorHandler(error);
	    } else {
	      throw error;
	    }
	  };
	}
	
	/*
	 * Sugar-y way to catch only errors having certain code(s).
	 *
	 * Usage:
	 *
	 *  Promise.resolve()
	 *    .catch(onlyErrorsWithCode('ENOENT', (error) => {
	 *      // error.code is guaranteed to be ENOENT
	 *    }))
	 *
	 *  or:
	 *
	 *  Promise.resolve()
	 *    .catch(onlyErrorsWithCode(['ENOENT', 'ENOTDIR'], (error) => {
	 *      // ...
	 *    }))
	 *
	 * All other errors will be re-thrown.
	 *
	 */
	function onlyErrorsWithCode(codeWanted, errorHandler) {
	  return function (error) {
	    var throwError = true;
	
	    if (Array.isArray(codeWanted)) {
	      if (codeWanted.indexOf(error.code) !== -1 || codeWanted.indexOf(error.errno) !== -1) {
	        throwError = false;
	      }
	    } else if (error.code === codeWanted || error.errno === codeWanted) {
	      throwError = false;
	    }
	
	    if (throwError) {
	      throw error;
	    }
	
	    return errorHandler(error);
	  };
	}
	
	function isErrorWithCode(codeWanted, error) {
	  if (Array.isArray(codeWanted) && codeWanted.indexOf(error.code) !== -1) {
	    return true;
	  } else if (error.code === codeWanted) {
	    return true;
	  }
	
	  return false;
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(97);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(98);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(101);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(60);
	module.exports = __webpack_require__(100).f('iterator');

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(57);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	__webpack_require__(15);
	__webpack_require__(114);
	__webpack_require__(115);
	module.exports = __webpack_require__(24).Symbol;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(23)
	  , has            = __webpack_require__(38)
	  , DESCRIPTORS    = __webpack_require__(32)
	  , $export        = __webpack_require__(22)
	  , redefine       = __webpack_require__(37)
	  , META           = __webpack_require__(104).KEY
	  , $fails         = __webpack_require__(33)
	  , shared         = __webpack_require__(52)
	  , setToStringTag = __webpack_require__(56)
	  , uid            = __webpack_require__(53)
	  , wks            = __webpack_require__(57)
	  , wksExt         = __webpack_require__(100)
	  , wksDefine      = __webpack_require__(105)
	  , keyOf          = __webpack_require__(106)
	  , enumKeys       = __webpack_require__(107)
	  , isArray        = __webpack_require__(110)
	  , anObject       = __webpack_require__(29)
	  , toIObject      = __webpack_require__(45)
	  , toPrimitive    = __webpack_require__(35)
	  , createDesc     = __webpack_require__(36)
	  , _create        = __webpack_require__(41)
	  , gOPNExt        = __webpack_require__(111)
	  , $GOPD          = __webpack_require__(113)
	  , $DP            = __webpack_require__(28)
	  , $keys          = __webpack_require__(43)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(112).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(109).f  = $propertyIsEnumerable;
	  __webpack_require__(108).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(21)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(27)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(53)('meta')
	  , isObject = __webpack_require__(30)
	  , has      = __webpack_require__(38)
	  , setDesc  = __webpack_require__(28).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(33)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(23)
	  , core           = __webpack_require__(24)
	  , LIBRARY        = __webpack_require__(21)
	  , wksExt         = __webpack_require__(100)
	  , defineProperty = __webpack_require__(28).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(43)
	  , toIObject = __webpack_require__(45);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(43)
	  , gOPS    = __webpack_require__(108)
	  , pIE     = __webpack_require__(109);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 108 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 109 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(47);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(45)
	  , gOPN      = __webpack_require__(112).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(44)
	  , hiddenKeys = __webpack_require__(54).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(109)
	  , createDesc     = __webpack_require__(36)
	  , toIObject      = __webpack_require__(45)
	  , toPrimitive    = __webpack_require__(35)
	  , has            = __webpack_require__(38)
	  , IE8_DOM_DEFINE = __webpack_require__(31)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(32) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105)('asyncIterator');

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105)('observable');

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(117);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(121);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(97);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(119);
	module.exports = __webpack_require__(24).Object.setPrototypeOf;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(22);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(120).set});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(30)
	  , anObject = __webpack_require__(29);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(25)(Function.call, __webpack_require__(113).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(123);
	var $Object = __webpack_require__(24).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(22)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(41)});

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = require("es6-error");

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prepareArtifactsDir = undefined;
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var prepareArtifactsDir = exports.prepareArtifactsDir = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(artifactsDir) {
	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref2$asyncMkdirp = _ref2.asyncMkdirp,
	        asyncMkdirp = _ref2$asyncMkdirp === undefined ? defaultAsyncMkdirp : _ref2$asyncMkdirp;
	
	    var stats;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.prev = 0;
	            _context.next = 3;
	            return _mz.fs.stat(artifactsDir);
	
	          case 3:
	            stats = _context.sent;
	
	            if (stats.isDirectory()) {
	              _context.next = 6;
	              break;
	            }
	
	            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but it is not a directory.');
	
	          case 6:
	            _context.prev = 6;
	            _context.next = 9;
	            return _mz.fs.access(artifactsDir, _mz.fs.W_OK);
	
	          case 9:
	            _context.next = 18;
	            break;
	
	          case 11:
	            _context.prev = 11;
	            _context.t0 = _context['catch'](6);
	
	            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t0)) {
	              _context.next = 17;
	              break;
	            }
	
	            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but the user lacks ' + 'permissions on it.');
	
	          case 17:
	            throw _context.t0;
	
	          case 18:
	            _context.next = 43;
	            break;
	
	          case 20:
	            _context.prev = 20;
	            _context.t1 = _context['catch'](0);
	
	            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t1)) {
	              _context.next = 26;
	              break;
	            }
	
	            throw new _errors.UsageError('Cannot access --artifacts-dir="' + artifactsDir + '" because the user ' + ('lacks permissions: ' + _context.t1));
	
	          case 26:
	            if (!(0, _errors.isErrorWithCode)('ENOENT', _context.t1)) {
	              _context.next = 42;
	              break;
	            }
	
	            _context.prev = 27;
	
	            log.debug('Creating artifacts directory: ' + artifactsDir);
	            _context.next = 31;
	            return asyncMkdirp(artifactsDir);
	
	          case 31:
	            _context.next = 40;
	            break;
	
	          case 33:
	            _context.prev = 33;
	            _context.t2 = _context['catch'](27);
	
	            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t2)) {
	              _context.next = 39;
	              break;
	            }
	
	            throw new _errors.UsageError('Cannot create --artifacts-dir="' + artifactsDir + '" because the ' + ('user lacks permissions: ' + _context.t2));
	
	          case 39:
	            throw _context.t2;
	
	          case 40:
	            _context.next = 43;
	            break;
	
	          case 42:
	            throw _context.t1;
	
	          case 43:
	            return _context.abrupt('return', artifactsDir);
	
	          case 44:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[0, 20], [6, 11], [27, 33]]);
	  }));
	
	  return function prepareArtifactsDir(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var _mz = __webpack_require__(5);
	
	var _mkdirp = __webpack_require__(126);
	
	var _mkdirp2 = _interopRequireDefault(_mkdirp);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	var defaultAsyncMkdirp = (0, _es6Promisify2.default)(_mkdirp2.default);
	/* WEBPACK VAR INJECTION */}.call(exports, "src/util/artifacts.js"))

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = require("mkdirp");

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFileFilter = exports.FileFilter = exports.isSubPath = undefined;
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _minimatch = __webpack_require__(128);
	
	var _minimatch2 = _interopRequireDefault(_minimatch);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	// check if target is a sub directory of src
	
	var isSubPath = exports.isSubPath = function isSubPath(src, target) {
	  var relate = _path2.default.relative(src, target);
	  // same dir
	  if (!relate) {
	    return false;
	  }
	  if (relate === '..') {
	    return false;
	  }
	  return !relate.startsWith('..' + _path2.default.sep);
	};
	
	// FileFilter types and implementation.
	
	/*
	 * Allows or ignores files.
	 */
	var FileFilter = exports.FileFilter = function () {
	  function FileFilter() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$baseIgnoredPatte = _ref.baseIgnoredPatterns,
	        baseIgnoredPatterns = _ref$baseIgnoredPatte === undefined ? ['**/*.xpi', '**/*.zip', '**/.*', // any hidden file and folder
	    '**/.*/**/*', // and the content inside hidden folder
	    '**/node_modules', '**/node_modules/**/*'] : _ref$baseIgnoredPatte,
	        _ref$ignoreFiles = _ref.ignoreFiles,
	        ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
	        sourceDir = _ref.sourceDir,
	        artifactsDir = _ref.artifactsDir;
	
	    (0, _classCallCheck3.default)(this, FileFilter);
	
	    sourceDir = _path2.default.resolve(sourceDir);
	
	    this.filesToIgnore = [];
	    this.sourceDir = sourceDir;
	
	    this.addToIgnoreList(baseIgnoredPatterns);
	    if (ignoreFiles) {
	      this.addToIgnoreList(ignoreFiles);
	    }
	    if (artifactsDir && isSubPath(sourceDir, artifactsDir)) {
	      artifactsDir = _path2.default.resolve(artifactsDir);
	      log.debug('Ignoring artifacts directory "' + artifactsDir + '" ' + 'and all its subdirectories');
	      this.addToIgnoreList([artifactsDir, _path2.default.join(artifactsDir, '**', '*')]);
	    }
	  }
	
	  /**
	   *  Resolve relative path to absolute path with sourceDir.
	   */
	
	
	  (0, _createClass3.default)(FileFilter, [{
	    key: 'resolveWithSourceDir',
	    value: function resolveWithSourceDir(file) {
	      var resolvedPath = _path2.default.resolve(this.sourceDir, file);
	      log.debug('Resolved path ' + file + ' with sourceDir ' + this.sourceDir + ' ' + ('to ' + resolvedPath));
	      return resolvedPath;
	    }
	
	    /**
	     *  Insert more files into filesToIgnore array.
	     */
	
	  }, {
	    key: 'addToIgnoreList',
	    value: function addToIgnoreList(files) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var file = _step.value;
	
	          this.filesToIgnore.push(this.resolveWithSourceDir(file));
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
	    }
	
	    /*
	     * Returns true if the file is wanted.
	     *
	     * If filePath does not start with a slash, it will be treated as a path
	     * relative to sourceDir when matching it against all configured
	     * ignore-patterns.
	     *
	     * Example: this is called by zipdir as wantFile(filePath) for each
	     * file in the folder that is being archived.
	     */
	
	  }, {
	    key: 'wantFile',
	    value: function wantFile(filePath) {
	      var resolvedPath = this.resolveWithSourceDir(filePath);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = this.filesToIgnore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var test = _step2.value;
	
	          if ((0, _minimatch2.default)(resolvedPath, test)) {
	            log.debug('FileFilter: ignoring file ' + resolvedPath + ' (it matched ' + test + ')');
	            return false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      return true;
	    }
	  }]);
	  return FileFilter;
	}();
	
	// a helper function to make mocking easier
	
	var createFileFilter = exports.createFileFilter = function createFileFilter(params) {
	  return new FileFilter(params);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "src/util/file-filter.js"))

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = require("minimatch");

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TempDir = undefined;
	
	var _slicedToArray2 = __webpack_require__(130);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.withTempDir = withTempDir;
	
	var _tmp = __webpack_require__(137);
	
	var _tmp2 = _interopRequireDefault(_tmp);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _logger = __webpack_require__(84);
	
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(131);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(134);
	
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	__webpack_require__(16);
	module.exports = __webpack_require__(133);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(65)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(39);
	module.exports = __webpack_require__(24).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	__webpack_require__(16);
	module.exports = __webpack_require__(136);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(29)
	  , get      = __webpack_require__(70);
	module.exports = __webpack_require__(24).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = require("tmp");

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ErrorWithCode = exports.TCPConnectError = exports.ZipFile = undefined;
	
	var _possibleConstructorReturn2 = __webpack_require__(96);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(116);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _typeof2 = __webpack_require__(97);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.fixturePath = fixturePath;
	exports.makeSureItFails = makeSureItFails;
	exports.fake = fake;
	exports.fakeFirefoxClient = fakeFirefoxClient;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _yauzl = __webpack_require__(139);
	
	var _yauzl2 = _interopRequireDefault(_yauzl);
	
	var _es6Error = __webpack_require__(124);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	/*
	 * A way to read zip files using promises for all the things.
	 */
	
	var ZipFile = exports.ZipFile = function () {
	  function ZipFile() {
	    (0, _classCallCheck3.default)(this, ZipFile);
	
	    this._zip = null;
	    this._close = null;
	  }
	
	  /*
	   * Open a zip file and return a promise that resolves to a yauzl
	   * zipfile object.
	   */
	
	
	  (0, _createClass3.default)(ZipFile, [{
	    key: 'open',
	    value: function open() {
	      var _this = this;
	
	      return (0, _es6Promisify2.default)(_yauzl2.default.open).apply(undefined, arguments).then(function (zip) {
	        _this._zip = zip;
	        _this._close = new Promise(function (resolve) {
	          zip.once('close', resolve);
	        });
	      });
	    }
	
	    /**
	     * Close the zip file and wait fd to release.
	     */
	
	  }, {
	    key: 'close',
	    value: function close() {
	      this._zip.close();
	      return this._close;
	    }
	
	    /*
	     * After open(), readEach(onRead) will return a promise that resolves
	     * when all entries have been read.
	     *
	     * The onRead callback receives a single argument, a yauzl Entry object.
	     */
	
	  }, {
	    key: 'readEach',
	    value: function readEach(onRead) {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	
	        if (!_this2._zip) {
	          throw new Error('Cannot operate on a falsey zip file. Call open() first.');
	        }
	
	        _this2._zip.on('entry', function (entry) {
	          onRead(entry);
	        });
	
	        _this2._zip.once('error', function (error) {
	          reject(error);
	        });
	
	        _this2._zip.once('end', function () {
	          resolve();
	        });
	      });
	    }
	
	    /*
	     * Resolve a promise with an array of all file names in the zip archive.
	     */
	
	  }, {
	    key: 'extractFilenames',
	    value: function extractFilenames() {
	      var _this3 = this;
	
	      return new Promise(function (resolve, reject) {
	        var fileNames = [];
	        _this3.readEach(function (entry) {
	          fileNames.push(entry.fileName);
	        }).then(function () {
	          resolve(fileNames);
	        }).catch(function (error) {
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return ZipFile;
	}();
	
	/*
	 * Returns a path to a test fixture file. Invoke it the same as path.join().
	 */
	
	
	function fixturePath() {
	  for (var _len = arguments.length, pathParts = Array(_len), _key = 0; _key < _len; _key++) {
	    pathParts[_key] = arguments[_key];
	  }
	
	  return _path2.default.join.apply(_path2.default, [__dirname, '..', 'fixtures'].concat(pathParts));
	}
	
	/*
	 * Test helper to make sure a promise chain really fails.
	 *
	 * Usage:
	 *
	 *  Promise.resolve()
	 *    .then(makeSureItFails())
	 *    .catch((error) => {
	 *      // Safely make assertions about the error...
	 *    });
	 */
	function makeSureItFails() {
	  return function () {
	    throw new Error('This test unexpectedly succeeded without an error');
	  };
	}
	
	/*
	 * Return a fake version of an object for testing.
	 *
	 * The fake object will contain stub implementations of
	 * all original methods. Each method will be wrapped in
	 * a sinon.spy() for inspection.
	 *
	 * You can optionally provide implementations for one or
	 * more methods.
	 *
	 * Unlike similar sinon helpers, this *does not* touch the
	 * original object so there is no need to tear down any
	 * patches afterwards.
	 *
	 * Usage:
	 *
	 * let fakeProcess = fake(process, {
	 *   cwd: () => '/some/directory',
	 * });
	 *
	 * // Use the object in real code:
	 * fakeProcess.cwd();
	 *
	 * // Make assertions about methods that
	 * // were on the original object:
	 * assert.equal(fakeProcess.exit.called, true);
	 *
	 */
	// $FLOW_IGNORE: fake can return any kind of object and fake a defined set of methods for testing.
	function fake(original) {
	  var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var stub = {};
	
	  // Provide stubs for all original members:
	  var props = [];
	  var obj = original;
	  while (obj) {
	    props = props.concat(Object.getOwnPropertyNames(obj));
	    obj = Object.getPrototypeOf(obj);
	  }
	
	  var proto = Object.getPrototypeOf(original);
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    var _loop = function _loop() {
	      var key = _step.value;
	
	      if (!original.hasOwnProperty(key) && !proto.hasOwnProperty(key)) {
	        return 'continue';
	      }
	      var definition = original[key] || proto[key];
	      if (typeof definition === 'function') {
	        stub[key] = function () {
	          log.warn('Running stubbed function ' + key + ' (default implementation)');
	        };
	      }
	    };
	
	    for (var _iterator = props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _ret = _loop();
	
	      if (_ret === 'continue') continue;
	    }
	
	    // Provide custom implementations, if necessary.
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
	
	  Object.keys(methods).forEach(function (key) {
	    if (!original[key]) {
	      throw new Error('Cannot define method "' + key + '"; it does not exist on the original');
	    }
	    stub[key] = methods[key];
	  });
	
	  // Wrap all implementations in spies.
	  Object.keys(stub).forEach(function (key) {
	    stub[key] = _sinon2.default.spy(stub[key]);
	  });
	
	  return stub;
	}
	
	/*
	 * Returns a fake Firefox client as would be returned by
	 * connect() of 'node-firefox-connect'
	 */
	
	function fakeFirefoxClient() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$requestResult = _ref.requestResult,
	      requestResult = _ref$requestResult === undefined ? {} : _ref$requestResult,
	      requestError = _ref.requestError,
	      _ref$makeRequestResul = _ref.makeRequestResult,
	      makeRequestResult = _ref$makeRequestResul === undefined ? {} : _ref$makeRequestResul,
	      makeRequestError = _ref.makeRequestError;
	
	  return {
	    disconnect: _sinon2.default.spy(function () {}),
	    request: _sinon2.default.spy(function (request, callback) {
	      return callback(requestError, requestResult);
	    }),
	    // This is client.client, the actual underlying connection.
	    client: {
	      on: function on() {},
	      makeRequest: _sinon2.default.spy(function (request, callback) {
	        //
	        // The real function returns a response object that you
	        // use like this:
	        // if (response.error) {
	        //   ...
	        // } else {
	        //   response.something; // ...
	        // }
	        //
	        if (makeRequestError) {
	          var error = void 0;
	          if ((typeof makeRequestError === 'undefined' ? 'undefined' : (0, _typeof3.default)(makeRequestError)) === 'object') {
	            error = makeRequestError;
	          } else {
	            error = { error: makeRequestError };
	          }
	          callback(error);
	        } else {
	          callback(makeRequestResult);
	        }
	      })
	    }
	  };
	}
	
	/*
	 * A simulated TCP connection error.
	 *
	 * By default, the error code will be ECONNREFUSED.
	 */
	
	var TCPConnectError = exports.TCPConnectError = function (_ExtendableError) {
	  (0, _inherits3.default)(TCPConnectError, _ExtendableError);
	
	  function TCPConnectError() {
	    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'simulated connection error';
	    (0, _classCallCheck3.default)(this, TCPConnectError);
	
	    var _this4 = (0, _possibleConstructorReturn3.default)(this, (TCPConnectError.__proto__ || Object.getPrototypeOf(TCPConnectError)).call(this, msg));
	
	    _this4.code = 'ECONNREFUSED';
	    return _this4;
	  }
	
	  return TCPConnectError;
	}(_es6Error2.default);
	
	var ErrorWithCode = exports.ErrorWithCode = function (_Error) {
	  (0, _inherits3.default)(ErrorWithCode, _Error);
	
	  function ErrorWithCode(code, message) {
	    (0, _classCallCheck3.default)(this, ErrorWithCode);
	
	    var _this5 = (0, _possibleConstructorReturn3.default)(this, (ErrorWithCode.__proto__ || Object.getPrototypeOf(ErrorWithCode)).call(this, message || 'pretend this is a system error'));
	
	    _this5.code = code || 'SOME_CODE';
	    return _this5;
	  }
	
	  return ErrorWithCode;
	}(Error);
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/helpers.js", "tests/unit"))

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = require("yauzl");

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.manifestWithoutApps = exports.basicManifest = undefined;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _deepcopy = __webpack_require__(141);
	
	var _deepcopy2 = _interopRequireDefault(_deepcopy);
	
	var _mz = __webpack_require__(5);
	
	var _errors = __webpack_require__(95);
	
	var _manifest = __webpack_require__(94);
	
	var _manifest2 = _interopRequireDefault(_manifest);
	
	var _tempDir = __webpack_require__(129);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var basicManifest = exports.basicManifest = {
	  name: 'the extension',
	  version: '0.0.1',
	  applications: {
	    gecko: {
	      id: 'basic-manifest@web-ext-test-suite'
	    }
	  }
	};
	var manifestWithoutApps = exports.manifestWithoutApps = (0, _deepcopy2.default)(basicManifest);
	delete manifestWithoutApps.applications;
	
	(0, _mocha.describe)('util/manifest', function () {
	
	  (0, _mocha.describe)('getValidatedManifest', function () {
	
	    (0, _mocha.it)('returns a valid manifest', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        return writeManifest(tmpDir.path(), basicManifest).then(function () {
	          return (0, _manifest2.default)(tmpDir.path());
	        }).then(function (manifestData) {
	          _chai.assert.deepEqual(manifestData, basicManifest);
	        });
	      });
	    });
	
	    (0, _mocha.it)('allows manifests without an applications property', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        return writeManifest(tmpDir.path(), manifestWithoutApps).then(function () {
	          return (0, _manifest2.default)(tmpDir.path());
	        }).then(function (manifestData) {
	          _chai.assert.deepEqual(manifestData, manifestWithoutApps);
	        });
	      });
	    });
	
	    (0, _mocha.it)('reports an error for a missing manifest file', function () {
	      var nonExistentDir = _path2.default.join('dev', 'null', 'nowhere');
	      return (0, _manifest2.default)(nonExistentDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	        _chai.assert.match(error.message, /Could not read manifest\.json/);
	        // Make sure the filename is included in the exception message.
	        // This is actually done by default in file system error messages.
	        _chai.assert.include(error.message, nonExistentDir);
	      }));
	    });
	
	    (0, _mocha.it)('reports an error for invalid manifest JSON', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var badManifest = '{\n          "name": "I\'m an invalid JSON Manifest\n          "version": "0.0.0"\n        }';
	        var manifestFile = _path2.default.join(tmpDir.path(), 'manifest.json');
	        return _mz.fs.writeFile(manifestFile, badManifest).then(function () {
	          return (0, _manifest2.default)(tmpDir.path());
	        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	          _chai.assert.match(error.message, /Error parsing manifest\.json at /);
	          _chai.assert.include(error.message, 'Unexpected token \' \' at 2:49');
	          _chai.assert.include(error.message, manifestFile);
	        }));
	      });
	    });
	
	    (0, _mocha.it)('reports an error when missing a name', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var noNameManifest = (0, _deepcopy2.default)(basicManifest);
	        delete noNameManifest.name;
	
	        return writeManifest(tmpDir.path(), noNameManifest).then(function (manifestFile) {
	          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "name" property/);
	            _chai.assert.include(error.message, manifestFile);
	          }));
	        });
	      });
	    });
	
	    (0, _mocha.it)('reports an error when missing version', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var noVersionManifest = (0, _deepcopy2.default)(basicManifest);
	        delete noVersionManifest.version;
	
	        return writeManifest(tmpDir.path(), noVersionManifest).then(function (manifestFile) {
	          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "version" property/);
	            _chai.assert.include(error.message, manifestFile);
	          }));
	        });
	      });
	    });
	
	    (0, _mocha.it)('reports an error when missing applications.gecko', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var incompleteManifest = (0, _deepcopy2.default)(basicManifest);
	        delete incompleteManifest.applications.gecko;
	
	        return writeManifest(tmpDir.path(), incompleteManifest).then(function (manifestFile) {
	          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	            _chai.assert.match(error.message, /Manifest at .* is invalid: missing "applications.gecko".*/);
	            _chai.assert.include(error.message, manifestFile);
	          }));
	        });
	      });
	    });
	
	    (0, _mocha.it)('allows a missing applications.gecko.id', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var incompleteManifest = (0, _deepcopy2.default)(basicManifest);
	        delete incompleteManifest.applications.gecko.id;
	
	        return writeManifest(tmpDir.path(), incompleteManifest).then(function () {
	          return (0, _manifest2.default)(tmpDir.path());
	        }).then(function (manifestData) {
	          _chai.assert.strictEqual((0, _manifest.getManifestId)(manifestData), undefined);
	        });
	      });
	    });
	
	    (0, _mocha.it)('concatenates errors in error message', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var manifestWithErrors = (0, _deepcopy2.default)(basicManifest);
	        delete manifestWithErrors.name;
	        delete manifestWithErrors.version;
	
	        return writeManifest(tmpDir.path(), manifestWithErrors).then(function () {
	          return (0, _manifest2.default)(tmpDir.path()).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.InvalidManifest, function (error) {
	            _chai.assert.match(error.message, /missing "name" property; missing "version" property/);
	          }));
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('getManifestId', function () {
	
	    (0, _mocha.it)('returns a gecko ID', function () {
	      _chai.assert.equal((0, _manifest.getManifestId)(basicManifest), 'basic-manifest@web-ext-test-suite');
	    });
	
	    (0, _mocha.it)('returns undefined when ID is not specified', function () {
	      _chai.assert.strictEqual((0, _manifest.getManifestId)(manifestWithoutApps), undefined);
	    });
	  });
	});
	
	function writeManifest(destDir, manifestData) {
	  var manifestFile = _path2.default.join(destDir, 'manifest.json');
	  return _mz.fs.writeFile(manifestFile, JSON.stringify(manifestData)).then(function () {
	    return manifestFile;
	  });
	}

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = require("deepcopy");

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _chai = __webpack_require__(7);
	
	var _helpers = __webpack_require__(138);
	
	var _docs = __webpack_require__(143);
	
	var _docs2 = _interopRequireDefault(_docs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('docs', function () {
	  (0, _mocha.it)('passes the correct url to docs', function () {
	    var openUrl = _sinon2.default.spy(function (urlToOpen, callback) {
	      return callback(null);
	    });
	    return (0, _docs2.default)({}, { openUrl: openUrl }).then(function () {
	      _chai.assert.ok(openUrl.called);
	      _chai.assert.equal(openUrl.firstCall.args[0], _docs.url);
	    });
	  });
	
	  (0, _mocha.it)('throws an error when open fails', function () {
	    var openUrl = _sinon2.default.spy(function (urlToOpen, callback) {
	      return callback(new Error('pretends this is an error from open()'));
	    });
	    return (0, _docs2.default)({}, { openUrl: openUrl }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /error from open()/);
	    });
	  });
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.url = undefined;
	exports.default = docs;
	
	var _open = __webpack_require__(144);
	
	var _open2 = _interopRequireDefault(_open);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	var url = exports.url = 'https://developer.mozilla.org/en-US/Add-ons' + '/WebExtensions/Getting_started_with_web-ext';
	
	function docs(params) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$openUrl = _ref.openUrl,
	      openUrl = _ref$openUrl === undefined ? _open2.default : _ref$openUrl;
	
	  return new Promise(function (resolve, reject) {
	    openUrl(url, function (error) {
	      if (error) {
	        log.debug('Encountered an error while opening URL ' + url, error);
	        reject(error);
	      } else {
	        resolve();
	      }
	    });
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/docs.js"))

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = require("open");

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _lint = __webpack_require__(151);
	
	var _lint2 = _interopRequireDefault(_lint);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('lint', function () {
	
	  function setUp() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        createLinter = _ref.createLinter,
	        createFileFilter = _ref.createFileFilter;
	
	    var lintResult = '<lint.run() result placeholder>';
	    var runLinter = _sinon2.default.spy(function () {
	      return Promise.resolve(lintResult);
	    });
	    if (!createLinter) {
	      createLinter = _sinon2.default.spy(function () {
	        return { run: runLinter };
	      });
	    }
	    return {
	      lintResult: lintResult,
	      createLinter: createLinter,
	      runLinter: runLinter,
	      lint: function lint() {
	        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        return (0, _lint2.default)((0, _extends3.default)({
	          sourceDir: '/fake/source/dir'
	        }, params), {
	          createLinter: createLinter,
	          createFileFilter: createFileFilter
	        });
	      }
	    };
	  }
	
	  (0, _mocha.it)('creates and runs a linter', function () {
	    var _setUp = setUp(),
	        lint = _setUp.lint,
	        createLinter = _setUp.createLinter,
	        runLinter = _setUp.runLinter,
	        lintResult = _setUp.lintResult;
	
	    return lint().then(function (actualLintResult) {
	      _chai.assert.equal(actualLintResult, lintResult);
	      _chai.assert.equal(createLinter.called, true);
	      _chai.assert.equal(runLinter.called, true);
	    });
	  });
	
	  (0, _mocha.it)('fails when the linter fails', function () {
	    var createLinter = function createLinter() {
	      return {
	        run: function run() {
	          return Promise.reject(new Error('some error from the linter'));
	        }
	      };
	    };
	
	    var _setUp2 = setUp({ createLinter: createLinter }),
	        lint = _setUp2.lint;
	
	    return lint().then((0, _helpers.makeSureItFails)(), function (error) {
	      _chai.assert.match(error.message, /error from the linter/);
	    });
	  });
	
	  (0, _mocha.it)('runs as a binary', function () {
	    var _setUp3 = setUp(),
	        lint = _setUp3.lint,
	        createLinter = _setUp3.createLinter;
	
	    return lint().then(function () {
	      var args = createLinter.firstCall.args[0];
	      _chai.assert.equal(args.runAsBinary, true);
	    });
	  });
	
	  (0, _mocha.it)('passes sourceDir to the linter', function () {
	    var _setUp4 = setUp(),
	        lint = _setUp4.lint,
	        createLinter = _setUp4.createLinter;
	
	    return lint({ sourceDir: '/some/path' }).then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.equal(config._[0], '/some/path');
	    });
	  });
	
	  (0, _mocha.it)('passes warningsAsErrors to the linter', function () {
	    var _setUp5 = setUp(),
	        lint = _setUp5.lint,
	        createLinter = _setUp5.createLinter;
	
	    return lint({ warningsAsErrors: true }).then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.equal(config.warningsAsErrors, true);
	    });
	  });
	
	  (0, _mocha.it)('passes warningsAsErrors undefined to the linter', function () {
	    var _setUp6 = setUp(),
	        lint = _setUp6.lint,
	        createLinter = _setUp6.createLinter;
	
	    return lint().then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.equal(config.warningsAsErrors, undefined);
	    });
	  });
	
	  (0, _mocha.it)('configures the linter when verbose', function () {
	    var _setUp7 = setUp(),
	        lint = _setUp7.lint,
	        createLinter = _setUp7.createLinter;
	
	    return lint({ verbose: true }).then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.equal(config.logLevel, 'debug');
	      _chai.assert.equal(config.stack, true);
	    });
	  });
	
	  (0, _mocha.it)('configures the linter when not verbose', function () {
	    var _setUp8 = setUp(),
	        lint = _setUp8.lint,
	        createLinter = _setUp8.createLinter;
	
	    return lint({ verbose: false }).then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.equal(config.logLevel, 'fatal');
	      _chai.assert.equal(config.stack, false);
	    });
	  });
	
	  (0, _mocha.it)('passes through linter configuration', function () {
	    var _setUp9 = setUp(),
	        lint = _setUp9.lint,
	        createLinter = _setUp9.createLinter;
	
	    return lint({
	      pretty: true,
	      metadata: true,
	      output: 'json',
	      boring: true,
	      selfHosted: true
	    }).then(function () {
	      var config = createLinter.firstCall.args[0].config;
	      _chai.assert.strictEqual(config.pretty, true);
	      _chai.assert.strictEqual(config.metadata, true);
	      _chai.assert.strictEqual(config.output, 'json');
	      _chai.assert.strictEqual(config.boring, true);
	      _chai.assert.strictEqual(config.selfHosted, true);
	    });
	  });
	
	  (0, _mocha.it)('configures a lint command with the expected fileFilter', function () {
	    var fileFilter = { wantFile: _sinon2.default.spy(function () {
	        return true;
	      }) };
	    var createFileFilter = _sinon2.default.spy(function () {
	      return fileFilter;
	    });
	
	    var _setUp10 = setUp({ createFileFilter: createFileFilter }),
	        lint = _setUp10.lint,
	        createLinter = _setUp10.createLinter;
	
	    var params = {
	      sourceDir: '.',
	      artifactsDir: 'artifacts',
	      ignoreFiles: ['file1', '**/file2']
	    };
	    return lint(params).then(function () {
	      _chai.assert.ok(createFileFilter.called);
	      _chai.assert.deepEqual(createFileFilter.firstCall.args[0], params);
	
	      _chai.assert.ok(createLinter.called);
	      var shouldScanFile = createLinter.firstCall.args[0].config.shouldScanFile;
	
	      shouldScanFile('path/to/file');
	      _chai.assert.ok(fileFilter.wantFile.called);
	      _chai.assert.equal(fileFilter.wantFile.firstCall.args[0], 'path/to/file');
	    });
	  });
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _assign = __webpack_require__(147);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(149);
	module.exports = __webpack_require__(24).Object.assign;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(22);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(150)});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(43)
	  , gOPS     = __webpack_require__(108)
	  , pIE      = __webpack_require__(109)
	  , toObject = __webpack_require__(59)
	  , IObject  = __webpack_require__(46)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(33)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = lint;
	
	var _addonsLinter = __webpack_require__(152);
	
	var _logger = __webpack_require__(84);
	
	var _fileFilter = __webpack_require__(127);
	
	// import flow types
	var log = (0, _logger.createLogger)(__filename);
	
	// Define the needed 'addons-linter' module flow types.
	
	// Lint command types and implementation.
	
	function lint(_ref) {
	  var verbose = _ref.verbose,
	      sourceDir = _ref.sourceDir,
	      selfHosted = _ref.selfHosted,
	      boring = _ref.boring,
	      output = _ref.output,
	      metadata = _ref.metadata,
	      pretty = _ref.pretty,
	      warningsAsErrors = _ref.warningsAsErrors,
	      ignoreFiles = _ref.ignoreFiles,
	      artifactsDir = _ref.artifactsDir;
	
	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$createLinter = _ref2.createLinter,
	      createLinter = _ref2$createLinter === undefined ? _addonsLinter.createInstance : _ref2$createLinter,
	      _ref2$createFileFilte = _ref2.createFileFilter,
	      createFileFilter = _ref2$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref2$createFileFilte;
	
	  var fileFilter = createFileFilter({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: artifactsDir });
	
	  log.debug('Running addons-linter on ' + sourceDir);
	  var linter = createLinter({
	    config: {
	      logLevel: verbose ? 'debug' : 'fatal',
	      stack: Boolean(verbose),
	      pretty: pretty,
	      warningsAsErrors: warningsAsErrors,
	      metadata: metadata,
	      output: output,
	      boring: boring,
	      selfHosted: selfHosted,
	      shouldScanFile: function shouldScanFile(fileName) {
	        return fileFilter.wantFile(fileName);
	      },
	      // This mimics the first command line argument from yargs,
	      // which should be the directory to the extension.
	      _: [sourceDir]
	    },
	    runAsBinary: true
	  });
	  return linter.run();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/lint.js"))

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = require("addons-linter");

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	var _objectWithoutProperties2 = __webpack_require__(154);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(96);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(116);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _events = __webpack_require__(155);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _errors = __webpack_require__(95);
	
	var _run2 = __webpack_require__(156);
	
	var _run3 = _interopRequireDefault(_run2);
	
	var _firefox = __webpack_require__(159);
	
	var defaultFirefoxApp = _interopRequireWildcard(_firefox);
	
	var _remote = __webpack_require__(164);
	
	var _helpers = __webpack_require__(138);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	// Fake result for client.installTemporaryAddon().then(installResult => ...)
	
	var tempInstallResult = {
	  addon: { id: 'some-addon@test-suite' }
	};
	// Fake missing addon id result for client.installTemporaryAddon
	var tempInstallResultMissingAddonId = {
	  addon: { id: null }
	};
	
	(0, _mocha.describe)('run', function () {
	
	  function prepareRun(fakeInstallResult) {
	    var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
	    var argv = {
	      artifactsDir: _path2.default.join(sourceDir, 'web-ext-artifacts'),
	      sourceDir: sourceDir,
	      noReload: true,
	      keepProfileChanges: false
	    };
	    var options = {
	      firefoxApp: getFakeFirefox(),
	      firefoxClient: _sinon2.default.spy(function () {
	        return Promise.resolve((0, _helpers.fake)(_remote.RemoteFirefox.prototype, {
	          installTemporaryAddon: function installTemporaryAddon() {
	            return Promise.resolve(fakeInstallResult || tempInstallResult);
	          }
	        }));
	      }),
	      reloadStrategy: _sinon2.default.spy(function () {
	        log.debug('fake: reloadStrategy()');
	      })
	    };
	
	    return {
	      argv: argv,
	      options: options,
	      run: function run() {
	        var customArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var customOpt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        return (0, _run3.default)((0, _extends3.default)({}, argv, customArgv), (0, _extends3.default)({}, options, customOpt));
	      }
	    };
	  }
	
	  function getFakeFirefox() {
	    var implementations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    var profile = {}; // empty object just to avoid errors.
	    var allImplementations = (0, _extends3.default)({
	      createProfile: function createProfile() {
	        return Promise.resolve(profile);
	      },
	      copyProfile: function copyProfile() {
	        return Promise.resolve(profile);
	      },
	      useProfile: function useProfile() {
	        return Promise.resolve(profile);
	      },
	      installExtension: function installExtension() {
	        return Promise.resolve();
	      },
	      run: function run() {
	        return Promise.resolve();
	      }
	    }, implementations);
	    return (0, _helpers.fake)(defaultFirefoxApp, allImplementations);
	  }
	
	  (0, _mocha.it)('installs and runs the extension', function () {
	
	    var profile = {};
	
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	    var firefoxClient = (0, _helpers.fake)(_remote.RemoteFirefox.prototype, {
	      installTemporaryAddon: function installTemporaryAddon() {
	        return Promise.resolve(tempInstallResult);
	      }
	    });
	
	    return cmd.run({}, {
	      firefoxClient: _sinon2.default.spy(function () {
	        return Promise.resolve(firefoxClient);
	      })
	    }).then(function () {
	      var install = firefoxClient.installTemporaryAddon;
	      _chai.assert.equal(install.called, true);
	      _chai.assert.equal(install.firstCall.args[0], cmd.argv.sourceDir);
	
	      _chai.assert.equal(firefoxApp.run.called, true);
	      _chai.assert.deepEqual(firefoxApp.run.firstCall.args[0], profile);
	    });
	  });
	
	  (0, _mocha.it)('suggests --pre-install when remote install not supported', function () {
	    var cmd = prepareRun();
	    var _firefoxClient = (0, _helpers.fake)(_remote.RemoteFirefox.prototype, {
	      // Simulate an older Firefox that will throw this error.
	      installTemporaryAddon: function installTemporaryAddon() {
	        return Promise.reject(new _errors.RemoteTempInstallNotSupported(''));
	      }
	    });
	
	    return cmd.run({}, { firefoxClient: function firefoxClient() {
	        return Promise.resolve(_firefoxClient);
	      } }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	      _chai.assert.equal(_firefoxClient.installTemporaryAddon.called, true);
	      _chai.assert.match(error.message, /use --pre-install/);
	    }));
	  });
	
	  (0, _mocha.it)('passes a custom Firefox binary when specified', function () {
	    var firefox = '/pretend/path/to/Firefox/firefox-bin';
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	
	    return cmd.run({ firefox: firefox }).then(function () {
	      _chai.assert.equal(firefoxApp.run.called, true);
	      _chai.assert.equal(firefoxApp.run.firstCall.args[1].firefoxBinary, firefox);
	    });
	  });
	
	  (0, _mocha.it)('passes single url parameter to Firefox when specified', function () {
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	    var expectedBinaryArgs = ['--url', 'www.example.com'];
	
	    return cmd.run({ startUrl: 'www.example.com' }).then(function () {
	      _chai.assert.ok(firefoxApp.run.called);
	      _chai.assert.deepEqual(firefoxApp.run.firstCall.args[1].binaryArgs, expectedBinaryArgs);
	    });
	  });
	
	  (0, _mocha.it)('passes multiple url parameters to Firefox when specified', function () {
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	    var expectedBinaryArgs = ['--url', 'www.one.com', '--url', 'www.two.com', '--url', 'www.three.com'];
	
	    return cmd.run({ startUrl: ['www.one.com', 'www.two.com', 'www.three.com'] }).then(function () {
	      _chai.assert.ok(firefoxApp.run.called);
	      _chai.assert.deepEqual(firefoxApp.run.firstCall.args[1].binaryArgs, expectedBinaryArgs);
	    });
	  });
	
	  (0, _mocha.it)('passes -jsconsole when --browser-console is specified', function () {
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	
	    return cmd.run({ browserConsole: true }).then(function () {
	      _chai.assert.ok(firefoxApp.run.called);
	      _chai.assert.equal(firefoxApp.run.firstCall.args[1].binaryArgs, '-jsconsole');
	    });
	  });
	
	  (0, _mocha.it)('passes --marionette when --marionette is specified', function () {
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	
	    return cmd.run({ marionette: true }).then(function () {
	      _chai.assert.ok(firefoxApp.run.called);
	      _chai.assert.equal(firefoxApp.run.firstCall.args[1].binaryArgs, '--marionette');
	    });
	  });
	
	  (0, _mocha.it)('passes a custom Firefox profile when specified', function () {
	    var firefoxProfile = '/pretend/path/to/firefox/profile';
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	
	    return cmd.run({ firefoxProfile: firefoxProfile }).then(function () {
	      _chai.assert.equal(firefoxApp.createProfile.called, false);
	      _chai.assert.equal(firefoxApp.copyProfile.called, true);
	      _chai.assert.equal(firefoxApp.copyProfile.firstCall.args[0], firefoxProfile);
	    });
	  });
	
	  (0, _mocha.it)('keeps changes in custom profile when specified', function () {
	    var firefoxProfile = '/pretend/path/to/firefox/profile';
	    var cmd = prepareRun();
	    var firefoxApp = cmd.options.firefoxApp;
	
	
	    return cmd.run({ firefoxProfile: firefoxProfile, keepProfileChanges: true }).then(function () {
	      _chai.assert.equal(firefoxApp.useProfile.called, true);
	      _chai.assert.equal(firefoxApp.useProfile.firstCall.args[0], firefoxProfile);
	    });
	  });
	
	  (0, _mocha.it)('can pre-install into the profile before startup', function () {
	    var cmd = prepareRun();
	    var firefoxClient = (0, _helpers.fake)(_remote.RemoteFirefox.prototype, {
	      installTemporaryAddon: function installTemporaryAddon() {
	        return Promise.resolve(tempInstallResult);
	      }
	    });
	    var fakeProfile = {};
	    var firefoxApp = getFakeFirefox({
	      copyProfile: function copyProfile() {
	        return fakeProfile;
	      }
	    });
	    var sourceDir = cmd.argv.sourceDir;
	
	
	    return cmd.run({ preInstall: true }, {
	      firefoxApp: firefoxApp,
	      firefoxClient: _sinon2.default.spy(function () {
	        return Promise.resolve(firefoxClient);
	      })
	    }).then(function () {
	      _chai.assert.equal(firefoxApp.installExtension.called, true);
	      _chai.assert.equal(firefoxClient.installTemporaryAddon.called, false);
	
	      var install = firefoxApp.installExtension.firstCall.args[0];
	      _chai.assert.equal(install.asProxy, true);
	      _chai.assert.equal(install.manifestData.applications.gecko.id, 'minimal-example@web-ext-test-suite');
	      _chai.assert.deepEqual(install.profile, fakeProfile);
	      // This needs to be the source of the extension.
	      _chai.assert.equal(install.extensionPath, sourceDir);
	    });
	  });
	
	  (0, _mocha.it)('can watch and reload the extension', function () {
	    var cmd = prepareRun();
	    var _cmd$argv = cmd.argv,
	        sourceDir = _cmd$argv.sourceDir,
	        artifactsDir = _cmd$argv.artifactsDir;
	    var reloadStrategy = cmd.options.reloadStrategy;
	
	
	    return cmd.run({ noReload: false }).then(function () {
	      _chai.assert.equal(reloadStrategy.called, true);
	      var args = reloadStrategy.firstCall.args[0];
	      _chai.assert.equal(args.sourceDir, sourceDir);
	      _chai.assert.equal(args.artifactsDir, artifactsDir);
	      _chai.assert.equal(args.addonId, tempInstallResult.addon.id);
	    });
	  });
	
	  (0, _mocha.it)('raise an error on addonId missing from installTemporaryAddon result', function () {
	    var cmd = prepareRun(tempInstallResultMissingAddonId);
	
	    return cmd.run({ noReload: false }).catch(function (error) {
	      return error;
	    }).then(function (error) {
	      _chai.assert.equal(error instanceof _errors.WebExtError, true);
	      _chai.assert.equal(error.message, 'Unexpected missing addonId in the installAsTemporaryAddon result');
	    });
	  });
	
	  (0, _mocha.it)('will not reload when using --pre-install', function () {
	    var cmd = prepareRun();
	    var reloadStrategy = cmd.options.reloadStrategy;
	
	    // --pre-install should imply --no-reload
	
	    return cmd.run({ noReload: false, preInstall: true }).then(function () {
	      _chai.assert.equal(reloadStrategy.called, false);
	    });
	  });
	
	  (0, _mocha.it)('will not connect to the debugger when using --pre-install', function () {
	    var cmd = prepareRun();
	    var firefoxClient = cmd.options.firefoxClient;
	
	
	    return cmd.run({ preInstall: true }).then(function () {
	      _chai.assert.equal(firefoxClient.called, false);
	    });
	  });
	
	  (0, _mocha.it)('allows you to opt out of extension reloading', function () {
	    var cmd = prepareRun();
	    var reloadStrategy = cmd.options.reloadStrategy;
	
	
	    return cmd.run({ noReload: true }).then(function () {
	      _chai.assert.equal(reloadStrategy.called, false);
	    });
	  });
	
	  (0, _mocha.describe)('defaultWatcherCreator', function () {
	
	    function prepare() {
	      var config = {
	        addonId: 'some-addon@test-suite',
	        client: (0, _helpers.fake)(_remote.RemoteFirefox.prototype, {
	          reloadAddon: function reloadAddon() {
	            return Promise.resolve();
	          }
	        }),
	        sourceDir: '/path/to/extension/source/',
	        artifactsDir: '/path/to/web-ext-artifacts',
	        onSourceChange: _sinon2.default.spy(function () {}),
	        desktopNotifications: _sinon2.default.spy(function () {
	          return Promise.resolve();
	        }),
	        ignoreFiles: ['path/to/file', 'path/to/file2']
	      };
	      return {
	        config: config,
	        createWatcher: function createWatcher() {
	          var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	          return (0, _run2.defaultWatcherCreator)((0, _extends3.default)({}, config, customConfig));
	        }
	      };
	    }
	
	    (0, _mocha.it)('configures a source watcher', function () {
	      var _prepare = prepare(),
	          config = _prepare.config,
	          createWatcher = _prepare.createWatcher;
	
	      createWatcher();
	      _chai.assert.equal(config.onSourceChange.called, true);
	      var callArgs = config.onSourceChange.firstCall.args[0];
	      _chai.assert.equal(callArgs.sourceDir, config.sourceDir);
	      _chai.assert.equal(callArgs.artifactsDir, config.artifactsDir);
	      _chai.assert.typeOf(callArgs.onChange, 'function');
	    });
	
	    (0, _mocha.it)('configures a run command with the expected fileFilter', function () {
	      var fileFilter = { wantFile: _sinon2.default.spy() };
	      var createFileFilter = _sinon2.default.spy(function () {
	        return fileFilter;
	      });
	
	      var _prepare2 = prepare(),
	          config = _prepare2.config,
	          createWatcher = _prepare2.createWatcher;
	
	      createWatcher({ createFileFilter: createFileFilter });
	      _chai.assert.ok(createFileFilter.called);
	      _chai.assert.deepEqual(createFileFilter.firstCall.args[0], {
	        sourceDir: config.sourceDir,
	        artifactsDir: config.artifactsDir,
	        ignoreFiles: config.ignoreFiles
	      });
	      var shouldWatchFile = config.onSourceChange.firstCall.args[0].shouldWatchFile;
	
	      shouldWatchFile('path/to/file');
	      _chai.assert.ok(fileFilter.wantFile.called);
	      _chai.assert.equal(fileFilter.wantFile.firstCall.args[0], 'path/to/file');
	    });
	
	    (0, _mocha.it)('returns a watcher', function () {
	      var watcher = {};
	      var onSourceChange = _sinon2.default.spy(function () {
	        return watcher;
	      });
	      var createdWatcher = prepare().createWatcher({ onSourceChange: onSourceChange });
	      _chai.assert.equal(createdWatcher, watcher);
	    });
	
	    (0, _mocha.it)('reloads the extension', function () {
	      var _prepare3 = prepare(),
	          config = _prepare3.config,
	          createWatcher = _prepare3.createWatcher;
	
	      createWatcher();
	
	      var callArgs = config.onSourceChange.firstCall.args[0];
	      _chai.assert.typeOf(callArgs.onChange, 'function');
	      // Simulate executing the handler when a source file changes.
	      return callArgs.onChange().then(function () {
	        _chai.assert.equal(config.client.reloadAddon.called, true);
	        var reloadArgs = config.client.reloadAddon.firstCall.args;
	        _chai.assert.ok(config.addonId);
	        _chai.assert.equal(reloadArgs[0], config.addonId);
	      });
	    });
	
	    (0, _mocha.it)('notifies user on error from source change handler', function () {
	      var _prepare4 = prepare(),
	          config = _prepare4.config,
	          createWatcher = _prepare4.createWatcher;
	
	      config.client.reloadAddon = function () {
	        return Promise.reject(new Error('an error'));
	      };
	      createWatcher();
	
	      _chai.assert.equal(config.onSourceChange.called, true);
	      // Simulate executing the handler when a source file changes.
	      return config.onSourceChange.firstCall.args[0].onChange().then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(config.desktopNotifications.called, true);
	        _chai.assert.equal(config.desktopNotifications.lastCall.args[0].message, error.message);
	      });
	    });
	
	    (0, _mocha.it)('throws errors from source change handler', function () {
	      var _prepare5 = prepare(),
	          createWatcher = _prepare5.createWatcher,
	          config = _prepare5.config;
	
	      config.client.reloadAddon = function () {
	        return Promise.reject(new Error('an error'));
	      };
	      createWatcher();
	
	      _chai.assert.equal(config.onSourceChange.called, true);
	      // Simulate executing the handler when a source file changes.
	      return config.onSourceChange.firstCall.args[0].onChange().then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(error.message, 'an error');
	      });
	    });
	  });
	
	  (0, _mocha.describe)('defaultReloadStrategy', function () {
	    var StubChildProcess = function (_EventEmitter) {
	      (0, _inherits3.default)(StubChildProcess, _EventEmitter);
	
	      function StubChildProcess() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        (0, _classCallCheck3.default)(this, StubChildProcess);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StubChildProcess.__proto__ || Object.getPrototypeOf(StubChildProcess)).call.apply(_ref, [this].concat(args))), _this), _this.stderr = new _events2.default(), _this.stdout = new _events2.default(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	      }
	
	      return StubChildProcess;
	    }(_events2.default);
	
	    function prepare() {
	      var client = new _remote.RemoteFirefox((0, _helpers.fakeFirefoxClient)());
	      var watcher = {
	        close: _sinon2.default.spy(function () {})
	      };
	      var args = {
	        addonId: 'some-addon@test-suite',
	        client: client,
	        firefoxProcess: new StubChildProcess(),
	        profile: {},
	        sourceDir: '/path/to/extension/source',
	        artifactsDir: '/path/to/web-ext-artifacts/',
	        ignoreFiles: ['first/file', 'second/file']
	      };
	      var options = {
	        createWatcher: _sinon2.default.spy(function () {
	          return watcher;
	        })
	      };
	      return (0, _extends3.default)({}, args, options, {
	        client: client,
	        watcher: watcher,
	        reloadStrategy: function reloadStrategy() {
	          var argOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	          var optOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	          return (0, _run2.defaultReloadStrategy)((0, _extends3.default)({}, args, argOverride), (0, _extends3.default)({}, options, optOverride));
	        }
	      });
	    }
	
	    (0, _mocha.it)('cleans up connections when firefox closes', function () {
	      var _prepare6 = prepare(),
	          firefoxProcess = _prepare6.firefoxProcess,
	          client = _prepare6.client,
	          watcher = _prepare6.watcher,
	          reloadStrategy = _prepare6.reloadStrategy;
	
	      reloadStrategy();
	      firefoxProcess.emit('close');
	      _chai.assert.equal(client.client.disconnect.called, true);
	      _chai.assert.equal(watcher.close.called, true);
	    });
	
	    (0, _mocha.it)('configures a watcher', function () {
	      var _prepare7 = prepare(),
	          createWatcher = _prepare7.createWatcher,
	          reloadStrategy = _prepare7.reloadStrategy,
	          sentArgs = (0, _objectWithoutProperties3.default)(_prepare7, ['createWatcher', 'reloadStrategy']);
	
	      reloadStrategy();
	      _chai.assert.equal(createWatcher.called, true);
	      var receivedArgs = createWatcher.firstCall.args[0];
	      _chai.assert.equal(receivedArgs.client, sentArgs.client);
	      _chai.assert.equal(receivedArgs.sourceDir, sentArgs.sourceDir);
	      _chai.assert.equal(receivedArgs.artifactsDir, sentArgs.artifactsDir);
	      _chai.assert.equal(receivedArgs.addonId, sentArgs.addonId);
	      _chai.assert.deepEqual(receivedArgs.ignoreFiles, sentArgs.ignoreFiles);
	    });
	  });
	
	  (0, _mocha.describe)('firefoxClient', function () {
	
	    function firefoxClient() {
	      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      return (0, _run2.defaultFirefoxClient)((0, _extends3.default)({ maxRetries: 0, retryInterval: 1 }, opt));
	    }
	
	    (0, _mocha.it)('retries after a connection error', function () {
	      var client = new _remote.RemoteFirefox((0, _helpers.fakeFirefoxClient)());
	      var tryCount = 0;
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return new Promise(function (resolve, reject) {
	          tryCount++;
	          if (tryCount === 1) {
	            reject(new _helpers.TCPConnectError('first connection fails'));
	          } else {
	            // The second connection succeeds.
	            resolve(client);
	          }
	        });
	      });
	
	      return firefoxClient({ connectToFirefox: connectToFirefox, maxRetries: 3 }).then(function () {
	        _chai.assert.equal(connectToFirefox.callCount, 2);
	      });
	    });
	
	    (0, _mocha.it)('only retries connection errors', function () {
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return Promise.reject(new Error('not a connection error'));
	      });
	
	      return firefoxClient({ connectToFirefox: connectToFirefox, maxRetries: 2 }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(connectToFirefox.callCount, 1);
	        _chai.assert.equal(error.message, 'not a connection error');
	      });
	    });
	
	    (0, _mocha.it)('gives up connecting after too many retries', function () {
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return Promise.reject(new _helpers.TCPConnectError('failure'));
	      });
	
	      return firefoxClient({ connectToFirefox: connectToFirefox, maxRetries: 2 }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(connectToFirefox.callCount, 3);
	        _chai.assert.equal(error.message, 'failure');
	      });
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-cmd/test.run.js"))

/***/ },
/* 154 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExtensionRunner = undefined;
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	exports.defaultWatcherCreator = defaultWatcherCreator;
	exports.defaultReloadStrategy = defaultReloadStrategy;
	exports.defaultFirefoxClient = defaultFirefoxClient;
	
	var _desktopNotifier = __webpack_require__(157);
	
	var _firefox = __webpack_require__(159);
	
	var defaultFirefoxApp = _interopRequireWildcard(_firefox);
	
	var _remote = __webpack_require__(164);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	var _manifest = __webpack_require__(94);
	
	var _manifest2 = _interopRequireDefault(_manifest);
	
	var _watcher = __webpack_require__(81);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _fileFilter = __webpack_require__(127);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import objects that are only used as Flow types.
	var log = (0, _logger.createLogger)(__filename);
	
	// defaultWatcherCreator types and implementation.
	
	function defaultWatcherCreator(_ref) {
	  var addonId = _ref.addonId,
	      client = _ref.client,
	      sourceDir = _ref.sourceDir,
	      artifactsDir = _ref.artifactsDir,
	      ignoreFiles = _ref.ignoreFiles,
	      _ref$onSourceChange = _ref.onSourceChange,
	      onSourceChange = _ref$onSourceChange === undefined ? _watcher2.default : _ref$onSourceChange,
	      _ref$desktopNotificat = _ref.desktopNotifications,
	      desktopNotifications = _ref$desktopNotificat === undefined ? _desktopNotifier.showDesktopNotification : _ref$desktopNotificat,
	      _ref$createFileFilter = _ref.createFileFilter,
	      createFileFilter = _ref$createFileFilter === undefined ? _fileFilter.createFileFilter : _ref$createFileFilter;
	
	  var fileFilter = createFileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles });
	  return onSourceChange({
	    sourceDir: sourceDir,
	    artifactsDir: artifactsDir,
	    onChange: function onChange() {
	      log.debug('Reloading add-on ID ' + addonId);
	
	      return client.reloadAddon(addonId).catch(function (error) {
	        log.error('\n');
	        log.error(error.stack);
	        desktopNotifications({
	          title: 'web-ext run: error occurred',
	          message: error.message
	        });
	        throw error;
	      });
	    },
	    shouldWatchFile: function shouldWatchFile(file) {
	      return fileFilter.wantFile(file);
	    }
	  });
	}
	
	// defaultReloadStrategy types and implementation.
	
	function defaultReloadStrategy(_ref2) {
	  var addonId = _ref2.addonId,
	      firefoxProcess = _ref2.firefoxProcess,
	      client = _ref2.client,
	      profile = _ref2.profile,
	      sourceDir = _ref2.sourceDir,
	      artifactsDir = _ref2.artifactsDir,
	      ignoreFiles = _ref2.ignoreFiles;
	
	  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref3$createWatcher = _ref3.createWatcher,
	      createWatcher = _ref3$createWatcher === undefined ? defaultWatcherCreator : _ref3$createWatcher;
	
	  var watcher = createWatcher({ addonId: addonId, client: client, sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles });
	
	  firefoxProcess.on('close', function () {
	    client.disconnect();
	    watcher.close();
	  });
	}
	
	// defaultFirefoxClient types and implementation.
	
	function defaultFirefoxClient() {
	  var establishConnection = function () {
	    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	      var lastError, retries;
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              retries = 0;
	
	            case 1:
	              if (!(retries <= maxRetries)) {
	                _context.next = 22;
	                break;
	              }
	
	              _context.prev = 2;
	              _context.next = 5;
	              return connectToFirefox();
	
	            case 5:
	              return _context.abrupt('return', _context.sent);
	
	            case 8:
	              _context.prev = 8;
	              _context.t0 = _context['catch'](2);
	
	              if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context.t0)) {
	                _context.next = 17;
	                break;
	              }
	
	              _context.next = 13;
	              return new Promise(function (resolve) {
	                setTimeout(resolve, retryInterval);
	              });
	
	            case 13:
	
	              lastError = _context.t0;
	              log.debug('Retrying Firefox (' + retries + '); connection error: ' + _context.t0);
	              _context.next = 19;
	              break;
	
	            case 17:
	              log.error(_context.t0.stack);
	              throw _context.t0;
	
	            case 19:
	              retries++;
	              _context.next = 1;
	              break;
	
	            case 22:
	
	              log.debug('Connect to Firefox debugger: too many retries');
	              throw lastError;
	
	            case 24:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this, [[2, 8]]);
	    }));
	
	    return function establishConnection() {
	      return _ref5.apply(this, arguments);
	    };
	  }();
	
	  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref4$connectToFirefo = _ref4.connectToFirefox,
	      connectToFirefox = _ref4$connectToFirefo === undefined ? _remote2.default : _ref4$connectToFirefo,
	      _ref4$maxRetries = _ref4.maxRetries,
	      maxRetries = _ref4$maxRetries === undefined ? 250 : _ref4$maxRetries,
	      _ref4$retryInterval = _ref4.retryInterval,
	      retryInterval = _ref4$retryInterval === undefined ? 120 : _ref4$retryInterval;
	
	  log.debug('Connecting to the remote Firefox debugger');
	  return establishConnection();
	}
	
	// Run command types and implementation.
	
	exports.default = function () {
	  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref7) {
	    var sourceDir = _ref7.sourceDir,
	        artifactsDir = _ref7.artifactsDir,
	        firefox = _ref7.firefox,
	        firefoxProfile = _ref7.firefoxProfile,
	        _ref7$keepProfileChan = _ref7.keepProfileChanges,
	        keepProfileChanges = _ref7$keepProfileChan === undefined ? false : _ref7$keepProfileChan,
	        _ref7$preInstall = _ref7.preInstall,
	        preInstall = _ref7$preInstall === undefined ? false : _ref7$preInstall,
	        _ref7$marionette = _ref7.marionette,
	        marionette = _ref7$marionette === undefined ? false : _ref7$marionette,
	        _ref7$noReload = _ref7.noReload,
	        noReload = _ref7$noReload === undefined ? false : _ref7$noReload,
	        _ref7$browserConsole = _ref7.browserConsole,
	        browserConsole = _ref7$browserConsole === undefined ? false : _ref7$browserConsole,
	        customPrefs = _ref7.customPrefs,
	        startUrl = _ref7.startUrl,
	        ignoreFiles = _ref7.ignoreFiles;
	
	    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref8$firefoxApp = _ref8.firefoxApp,
	        firefoxApp = _ref8$firefoxApp === undefined ? defaultFirefoxApp : _ref8$firefoxApp,
	        _ref8$firefoxClient = _ref8.firefoxClient,
	        firefoxClient = _ref8$firefoxClient === undefined ? defaultFirefoxClient : _ref8$firefoxClient,
	        _ref8$reloadStrategy = _ref8.reloadStrategy,
	        reloadStrategy = _ref8$reloadStrategy === undefined ? defaultReloadStrategy : _ref8$reloadStrategy;
	
	    var requiresRemote, installed, client, addonId, manifestData, runner, profile, runningFirefox;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	
	            log.info('Running web extension from ' + sourceDir);
	            if (preInstall) {
	              log.info('Disabled auto-reloading because it\'s not possible with ' + '--pre-install');
	              noReload = true;
	            }
	            // When not pre-installing the extension, we require a remote
	            // connection to Firefox.
	            requiresRemote = !preInstall;
	            installed = false;
	            client = void 0;
	            addonId = void 0;
	            _context2.next = 8;
	            return (0, _manifest2.default)(sourceDir);
	
	          case 8:
	            manifestData = _context2.sent;
	            runner = new ExtensionRunner({
	              sourceDir: sourceDir,
	              firefoxApp: firefoxApp,
	              firefox: firefox,
	              keepProfileChanges: keepProfileChanges,
	              browserConsole: browserConsole,
	              manifestData: manifestData,
	              marionette: marionette,
	              profilePath: firefoxProfile,
	              customPrefs: customPrefs,
	              startUrl: startUrl
	            });
	            _context2.next = 12;
	            return runner.getProfile();
	
	          case 12:
	            profile = _context2.sent;
	
	            if (preInstall) {
	              _context2.next = 17;
	              break;
	            }
	
	            log.debug('Deferring extension installation until after ' + 'connecting to the remote debugger');
	            _context2.next = 22;
	            break;
	
	          case 17:
	            log.debug('Pre-installing extension as a proxy file');
	            _context2.next = 20;
	            return runner.installAsProxy(profile);
	
	          case 20:
	            addonId = _context2.sent;
	
	            installed = true;
	
	          case 22:
	            _context2.next = 24;
	            return runner.run(profile);
	
	          case 24:
	            runningFirefox = _context2.sent;
	
	            if (!installed) {
	              _context2.next = 29;
	              break;
	            }
	
	            log.debug('Not installing as temporary add-on because the ' + 'add-on was already installed');
	            _context2.next = 55;
	            break;
	
	          case 29:
	            if (!requiresRemote) {
	              _context2.next = 55;
	              break;
	            }
	
	            _context2.next = 32;
	            return firefoxClient();
	
	          case 32:
	            client = _context2.sent;
	            _context2.prev = 33;
	            _context2.next = 36;
	            return runner.installAsTemporaryAddon(client).then(function (installResult) {
	              return installResult.addon.id;
	            });
	
	          case 36:
	            addonId = _context2.sent;
	            _context2.next = 47;
	            break;
	
	          case 39:
	            _context2.prev = 39;
	            _context2.t0 = _context2['catch'](33);
	
	            if (!(_context2.t0 instanceof _errors.RemoteTempInstallNotSupported)) {
	              _context2.next = 46;
	              break;
	            }
	
	            log.debug('Caught: ' + _context2.t0);
	            throw new _errors.WebExtError('Temporary add-on installation is not supported in this version ' + 'of Firefox (you need Firefox 49 or higher). For older Firefox ' + 'versions, use --pre-install');
	
	          case 46:
	            throw _context2.t0;
	
	          case 47:
	            if (!noReload) {
	              _context2.next = 51;
	              break;
	            }
	
	            log.info('Automatic extension reloading has been disabled');
	            _context2.next = 55;
	            break;
	
	          case 51:
	            if (addonId) {
	              _context2.next = 53;
	              break;
	            }
	
	            throw new _errors.WebExtError('Unexpected missing addonId in the installAsTemporaryAddon result');
	
	          case 53:
	
	            log.info('The extension will reload if any source file changes');
	            reloadStrategy({
	              firefoxProcess: runningFirefox,
	              profile: profile,
	              client: client,
	              sourceDir: sourceDir,
	              artifactsDir: artifactsDir,
	              addonId: addonId,
	              ignoreFiles: ignoreFiles
	            });
	
	          case 55:
	            return _context2.abrupt('return', firefoxApp);
	
	          case 56:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this, [[33, 39]]);
	  }));
	
	  function run(_x3) {
	    return _ref6.apply(this, arguments);
	  }
	
	  return run;
	}();
	
	// ExtensionRunner types and implementation.
	
	var ExtensionRunner = exports.ExtensionRunner = function () {
	  function ExtensionRunner(_ref9) {
	    var firefoxApp = _ref9.firefoxApp,
	        sourceDir = _ref9.sourceDir,
	        manifestData = _ref9.manifestData,
	        profilePath = _ref9.profilePath,
	        keepProfileChanges = _ref9.keepProfileChanges,
	        firefox = _ref9.firefox,
	        browserConsole = _ref9.browserConsole,
	        marionette = _ref9.marionette,
	        startUrl = _ref9.startUrl,
	        _ref9$customPrefs = _ref9.customPrefs,
	        customPrefs = _ref9$customPrefs === undefined ? {} : _ref9$customPrefs;
	    (0, _classCallCheck3.default)(this, ExtensionRunner);
	
	    this.sourceDir = sourceDir;
	    this.manifestData = manifestData;
	    this.profilePath = profilePath;
	    this.keepProfileChanges = keepProfileChanges;
	    this.firefoxApp = firefoxApp;
	    this.firefox = firefox;
	    this.browserConsole = browserConsole;
	    this.marionette = marionette;
	    this.customPrefs = customPrefs;
	    this.startUrl = startUrl;
	  }
	
	  (0, _createClass3.default)(ExtensionRunner, [{
	    key: 'getProfile',
	    value: function getProfile() {
	      var firefoxApp = this.firefoxApp,
	          profilePath = this.profilePath,
	          customPrefs = this.customPrefs,
	          keepProfileChanges = this.keepProfileChanges;
	
	      return new Promise(function (resolve) {
	        if (profilePath) {
	          if (keepProfileChanges) {
	            log.debug('Using Firefox profile from ' + profilePath);
	            resolve(firefoxApp.useProfile(profilePath, { customPrefs: customPrefs }));
	          } else {
	            log.debug('Copying Firefox profile from ' + profilePath);
	            resolve(firefoxApp.copyProfile(profilePath, { customPrefs: customPrefs }));
	          }
	        } else {
	          log.debug('Creating new Firefox profile');
	          resolve(firefoxApp.createProfile({ customPrefs: customPrefs }));
	        }
	      });
	    }
	  }, {
	    key: 'installAsTemporaryAddon',
	    value: function installAsTemporaryAddon(client) {
	      return client.installTemporaryAddon(this.sourceDir);
	    }
	  }, {
	    key: 'installAsProxy',
	    value: function installAsProxy(profile) {
	      var firefoxApp = this.firefoxApp,
	          sourceDir = this.sourceDir,
	          manifestData = this.manifestData;
	
	      return firefoxApp.installExtension({
	        manifestData: manifestData,
	        asProxy: true,
	        extensionPath: sourceDir,
	        profile: profile
	      }).then(function () {
	        return (0, _manifest.getManifestId)(manifestData);
	      });
	    }
	  }, {
	    key: 'run',
	    value: function run(profile) {
	      var binaryArgs = [];
	      var firefoxApp = this.firefoxApp,
	          firefox = this.firefox,
	          startUrl = this.startUrl;
	
	      if (this.browserConsole) {
	        binaryArgs.push('-jsconsole');
	      }
	      if (this.marionette) {
	        binaryArgs.push('--marionette');
	      }
	      if (startUrl) {
	        var urls = Array.isArray(startUrl) ? startUrl : [startUrl];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = urls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var url = _step.value;
	
	            binaryArgs.push('--url', url);
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
	      }
	      return firefoxApp.run(profile, {
	        firefoxBinary: firefox, binaryArgs: binaryArgs
	      });
	    }
	  }]);
	  return ExtensionRunner;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/run.js"))

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.showDesktopNotification = showDesktopNotification;
	
	var _nodeNotifier = __webpack_require__(158);
	
	var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultLog = (0, _logger.createLogger)(__filename);
	
	function showDesktopNotification(_ref) {
	  var title = _ref.title,
	      message = _ref.message,
	      icon = _ref.icon;
	
	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$notifier = _ref2.notifier,
	      notifier = _ref2$notifier === undefined ? _nodeNotifier2.default : _ref2$notifier,
	      _ref2$log = _ref2.log,
	      log = _ref2$log === undefined ? defaultLog : _ref2$log;
	
	  return new Promise(function (resolve, reject) {
	    notifier.notify({ title: title, message: message, icon: icon }, function (err, res) {
	      if (err) {
	        log.debug('Desktop notifier error: ' + err.message + ',' + (' response: ' + res));
	        reject(err);
	      } else {
	        resolve();
	      }
	    });
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/util/desktop-notifier.js"))

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = require("node-notifier");

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.installExtension = exports.copyProfile = exports.createProfile = exports.useProfile = exports.run = exports.defaultRemotePortFinder = exports.defaultFirefoxEnv = undefined;
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var defaultRemotePortFinder = exports.defaultRemotePortFinder = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref2$portToTry = _ref2.portToTry,
	        portToTry = _ref2$portToTry === undefined ? _remote.REMOTE_PORT : _ref2$portToTry,
	        _ref2$retriesLeft = _ref2.retriesLeft,
	        retriesLeft = _ref2$retriesLeft === undefined ? 10 : _ref2$retriesLeft,
	        _ref2$connectToFirefo = _ref2.connectToFirefox,
	        connectToFirefox = _ref2$connectToFirefo === undefined ? _remote2.default : _ref2$connectToFirefo;
	
	    var client;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            log.debug('Checking if remote Firefox port ' + portToTry + ' is available');
	
	            client = void 0;
	
	          case 2:
	            if (!(retriesLeft >= 0)) {
	              _context.next = 20;
	              break;
	            }
	
	            _context.prev = 3;
	            _context.next = 6;
	            return connectToFirefox(portToTry);
	
	          case 6:
	            client = _context.sent;
	
	            log.debug('Remote Firefox port ' + portToTry + ' is in use ' + ('(retries remaining: ' + retriesLeft + ')'));
	            _context.next = 15;
	            break;
	
	          case 10:
	            _context.prev = 10;
	            _context.t0 = _context['catch'](3);
	
	            if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context.t0)) {
	              _context.next = 14;
	              break;
	            }
	
	            return _context.abrupt('return', portToTry);
	
	          case 14:
	            throw _context.t0;
	
	          case 15:
	
	            client.disconnect();
	            portToTry++;
	            retriesLeft--;
	            _context.next = 2;
	            break;
	
	          case 20:
	            throw new _errors.WebExtError('Too many retries on port search');
	
	          case 21:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[3, 10]]);
	  }));
	
	  return function defaultRemotePortFinder() {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	// Declare the needed 'fx-runner' module flow types.
	
	// Run command types and implementaion.
	
	/*
	 * Runs Firefox with the given profile object and resolves a promise on exit.
	 */
	var run = exports.run = function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(profile) {
	    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref4$fxRunner = _ref4.fxRunner,
	        fxRunner = _ref4$fxRunner === undefined ? _fxRunner2.default : _ref4$fxRunner,
	        _ref4$findRemotePort = _ref4.findRemotePort,
	        findRemotePort = _ref4$findRemotePort === undefined ? defaultRemotePortFinder : _ref4$findRemotePort,
	        firefoxBinary = _ref4.firefoxBinary,
	        binaryArgs = _ref4.binaryArgs;
	
	    var remotePort, results, firefox;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	
	            log.debug('Running Firefox with profile at ' + profile.path());
	
	            _context2.next = 3;
	            return findRemotePort();
	
	          case 3:
	            remotePort = _context2.sent;
	            _context2.next = 6;
	            return fxRunner({
	              // if this is falsey, fxRunner tries to find the default one.
	              'binary': firefoxBinary,
	              'binary-args': binaryArgs,
	              // This ensures a new instance of Firefox is created. It has nothing
	              // to do with the devtools remote debugger.
	              'no-remote': true,
	              'listen': remotePort,
	              'foreground': true,
	              'profile': profile.path(),
	              'env': (0, _extends3.default)({}, process.env, defaultFirefoxEnv),
	              'verbose': true
	            });
	
	          case 6:
	            results = _context2.sent;
	            firefox = results.process;
	
	
	            log.debug('Executing Firefox binary: ' + results.binary);
	            log.debug('Firefox args: ' + results.args.join(' '));
	
	            firefox.on('error', function (error) {
	              // TODO: show a nice error when it can't find Firefox.
	              // if (/No such file/.test(err) || err.code === 'ENOENT') {
	              log.error('Firefox error: ' + error);
	              throw error;
	            });
	
	            log.info('Use --verbose or open Tools > Web Developer > Browser Console ' + 'to see logging');
	
	            firefox.stderr.on('data', function (data) {
	              log.debug('Firefox stderr: ' + data.toString().trim());
	            });
	
	            firefox.stdout.on('data', function (data) {
	              log.debug('Firefox stdout: ' + data.toString().trim());
	            });
	
	            firefox.on('close', function () {
	              log.debug('Firefox closed');
	            });
	
	            return _context2.abrupt('return', firefox);
	
	          case 16:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function run(_x2) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	// configureProfile types and implementation.
	
	// Use the target path as a Firefox profile without cloning it
	
	var useProfile = exports.useProfile = function () {
	  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(profilePath) {
	    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        app = _ref7.app,
	        _ref7$configureThisPr = _ref7.configureThisProfile,
	        configureThisProfile = _ref7$configureThisPr === undefined ? configureProfile : _ref7$configureThisPr,
	        _ref7$customPrefs = _ref7.customPrefs,
	        customPrefs = _ref7$customPrefs === undefined ? {} : _ref7$customPrefs;
	
	    var profile;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            profile = new _firefoxProfile2.default({ destinationDirectory: profilePath });
	            _context3.next = 3;
	            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });
	
	          case 3:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 4:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function useProfile(_x5) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	// createProfile types and implementation.
	
	/*
	 * Creates a new temporary profile and resolves with the profile object.
	 *
	 * The profile will be deleted when the system process exits.
	 */
	var createProfile = exports.createProfile = function () {
	  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
	    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        app = _ref9.app,
	        _ref9$configureThisPr = _ref9.configureThisProfile,
	        configureThisProfile = _ref9$configureThisPr === undefined ? configureProfile : _ref9$configureThisPr,
	        _ref9$customPrefs = _ref9.customPrefs,
	        customPrefs = _ref9$customPrefs === undefined ? {} : _ref9$customPrefs;
	
	    var profile;
	    return _regenerator2.default.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            profile = new _firefoxProfile2.default();
	            _context4.next = 3;
	            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });
	
	          case 3:
	            return _context4.abrupt('return', _context4.sent);
	
	          case 4:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function createProfile() {
	    return _ref8.apply(this, arguments);
	  };
	}();
	
	// copyProfile types and implementation.
	
	/*
	 * Copies an existing Firefox profile and creates a new temporary profile.
	 * The new profile will be configured with some preferences required to
	 * activate extension development.
	 *
	 * It resolves with the new profile object.
	 *
	 * The temporary profile will be deleted when the system process exits.
	 *
	 * The existing profile can be specified as a directory path or a name of
	 * one that exists in the current user's Firefox directory.
	 */
	var copyProfile = exports.copyProfile = function () {
	  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(profileDirectory) {
	    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        app = _ref11.app,
	        _ref11$configureThisP = _ref11.configureThisProfile,
	        configureThisProfile = _ref11$configureThisP === undefined ? configureProfile : _ref11$configureThisP,
	        _ref11$copyFromUserPr = _ref11.copyFromUserProfile,
	        copyFromUserProfile = _ref11$copyFromUserPr === undefined ? _firefoxProfile.copyFromUserProfile : _ref11$copyFromUserPr,
	        _ref11$customPrefs = _ref11.customPrefs,
	        customPrefs = _ref11$customPrefs === undefined ? {} : _ref11$customPrefs;
	
	    var copy, copyByName, dirExists, _profile;
	
	    return _regenerator2.default.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            copy = (0, _es6Promisify2.default)(_firefoxProfile2.default.copy);
	            copyByName = (0, _es6Promisify2.default)(copyFromUserProfile);
	            _context5.prev = 2;
	            _context5.next = 5;
	            return (0, _isDirectory2.default)(profileDirectory);
	
	          case 5:
	            dirExists = _context5.sent;
	            _profile = void 0;
	
	            if (!dirExists) {
	              _context5.next = 14;
	              break;
	            }
	
	            log.debug('Copying profile directory from "' + profileDirectory + '"');
	            _context5.next = 11;
	            return copy({ profileDirectory: profileDirectory });
	
	          case 11:
	            _profile = _context5.sent;
	            _context5.next = 18;
	            break;
	
	          case 14:
	            log.debug('Assuming ' + profileDirectory + ' is a named profile');
	            _context5.next = 17;
	            return copyByName({ name: profileDirectory });
	
	          case 17:
	            _profile = _context5.sent;
	
	          case 18:
	            return _context5.abrupt('return', configureThisProfile(_profile, { app: app, customPrefs: customPrefs }));
	
	          case 21:
	            _context5.prev = 21;
	            _context5.t0 = _context5['catch'](2);
	            throw new _errors.WebExtError('Could not copy Firefox profile from ' + profileDirectory + ': ' + _context5.t0);
	
	          case 24:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this, [[2, 21]]);
	  }));
	
	  return function copyProfile(_x8) {
	    return _ref10.apply(this, arguments);
	  };
	}();
	
	// installExtension types and implementation.
	
	/*
	 * Installs an extension into the given Firefox profile object.
	 * Resolves when complete.
	 *
	 * The extension is copied into a special location and you need to turn
	 * on some preferences to allow this. See extensions.autoDisableScopes in
	 * ./preferences.js.
	 *
	 * When asProxy is true, a special proxy file will be installed. This is a
	 * text file that contains the path to the extension source.
	 */
	var installExtension = exports.installExtension = function () {
	  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref13) {
	    var _ref13$asProxy = _ref13.asProxy,
	        asProxy = _ref13$asProxy === undefined ? false : _ref13$asProxy,
	        manifestData = _ref13.manifestData,
	        profile = _ref13.profile,
	        extensionPath = _ref13.extensionPath;
	
	    var id, isDir, destPath, writeStream, readStream, _destPath, _writeStream;
	
	    return _regenerator2.default.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            if (profile.extensionsDir) {
	              _context6.next = 2;
	              break;
	            }
	
	            throw new _errors.WebExtError('profile.extensionsDir was unexpectedly empty');
	
	          case 2:
	            _context6.prev = 2;
	            _context6.next = 5;
	            return _mz.fs.stat(profile.extensionsDir);
	
	          case 5:
	            _context6.next = 16;
	            break;
	
	          case 7:
	            _context6.prev = 7;
	            _context6.t0 = _context6['catch'](2);
	
	            if (!(0, _errors.isErrorWithCode)('ENOENT', _context6.t0)) {
	              _context6.next = 15;
	              break;
	            }
	
	            log.debug('Creating extensions directory: ' + profile.extensionsDir);
	            _context6.next = 13;
	            return _mz.fs.mkdir(profile.extensionsDir);
	
	          case 13:
	            _context6.next = 16;
	            break;
	
	          case 15:
	            throw _context6.t0;
	
	          case 16:
	            id = (0, _manifest.getManifestId)(manifestData);
	
	            if (id) {
	              _context6.next = 19;
	              break;
	            }
	
	            throw new _errors.UsageError('An explicit extension ID is required when installing to ' + 'a profile (applications.gecko.id not found in manifest.json)');
	
	          case 19:
	            if (!asProxy) {
	              _context6.next = 35;
	              break;
	            }
	
	            log.debug('Installing as an extension proxy; source: ' + extensionPath);
	
	            _context6.next = 23;
	            return (0, _isDirectory2.default)(extensionPath);
	
	          case 23:
	            isDir = _context6.sent;
	
	            if (isDir) {
	              _context6.next = 26;
	              break;
	            }
	
	            throw new _errors.WebExtError('proxy install: extensionPath must be the extension source ' + ('directory; got: ' + extensionPath));
	
	          case 26:
	
	            // Write a special extension proxy file containing the source
	            // directory. See:
	            // https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Firefox_extension_proxy_file
	            destPath = _path2.default.join(profile.extensionsDir, '' + id);
	            writeStream = _fs2.default.createWriteStream(destPath);
	
	            writeStream.write(extensionPath);
	            writeStream.end();
	            _context6.next = 32;
	            return (0, _eventToPromise2.default)(writeStream, 'close');
	
	          case 32:
	            return _context6.abrupt('return', _context6.sent);
	
	          case 35:
	            // Write the XPI file to the profile.
	            readStream = _fs2.default.createReadStream(extensionPath);
	            _destPath = _path2.default.join(profile.extensionsDir, id + '.xpi');
	            _writeStream = _fs2.default.createWriteStream(_destPath);
	
	
	            log.debug('Installing extension from ' + extensionPath + ' to ' + _destPath);
	            readStream.pipe(_writeStream);
	
	            _context6.next = 42;
	            return Promise.all([(0, _eventToPromise2.default)(readStream, 'close'), (0, _eventToPromise2.default)(_writeStream, 'close')]);
	
	          case 42:
	            return _context6.abrupt('return', _context6.sent);
	
	          case 43:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this, [[2, 7]]);
	  }));
	
	  return function installExtension(_x10) {
	    return _ref12.apply(this, arguments);
	  };
	}();
	
	exports.configureProfile = configureProfile;
	
	var _fs = __webpack_require__(78);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _fxRunner = __webpack_require__(160);
	
	var _fxRunner2 = _interopRequireDefault(_fxRunner);
	
	var _firefoxProfile = __webpack_require__(161);
	
	var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);
	
	var _mz = __webpack_require__(5);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _eventToPromise = __webpack_require__(80);
	
	var _eventToPromise2 = _interopRequireDefault(_eventToPromise);
	
	var _isDirectory = __webpack_require__(162);
	
	var _isDirectory2 = _interopRequireDefault(_isDirectory);
	
	var _errors = __webpack_require__(95);
	
	var _preferences = __webpack_require__(163);
	
	var _manifest = __webpack_require__(94);
	
	var _logger = __webpack_require__(84);
	
	var _remote = __webpack_require__(164);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import flow types
	var log = (0, _logger.createLogger)(__filename);
	var defaultFirefoxEnv = exports.defaultFirefoxEnv = {
	  XPCOM_DEBUG_BREAK: 'stack',
	  NS_TRACE_MALLOC_DISABLE_STACKS: '1'
	};
	
	// defaultRemotePortFinder types and implementation.
	
	/*
	 * Configures a profile with common preferences that are required to
	 * activate extension development.
	 *
	 * Returns a promise that resolves with the original profile object.
	 */
	function configureProfile(profile) {
	  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref5$app = _ref5.app,
	      app = _ref5$app === undefined ? 'firefox' : _ref5$app,
	      _ref5$getPrefs = _ref5.getPrefs,
	      getPrefs = _ref5$getPrefs === undefined ? _preferences.getPrefs : _ref5$getPrefs,
	      _ref5$customPrefs = _ref5.customPrefs,
	      customPrefs = _ref5$customPrefs === undefined ? {} : _ref5$customPrefs;
	
	  // Set default preferences. Some of these are required for the add-on to
	  // operate, such as disabling signatures.
	  var prefs = getPrefs(app);
	  Object.keys(prefs).forEach(function (pref) {
	    profile.setPreference(pref, prefs[pref]);
	  });
	  if (Object.keys(customPrefs).length > 0) {
	    var customPrefsStr = JSON.stringify(customPrefs, null, 2);
	    log.info('Setting custom Firefox preferences: ' + customPrefsStr);
	    Object.keys(customPrefs).forEach(function (custom) {
	      profile.setPreference(custom, customPrefs[custom]);
	    });
	  }
	  profile.updatePreferences();
	  return Promise.resolve(profile);
	}
	
	// useProfile types and implementation.
	/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/index.js"))

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = require("fx-runner");

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = require("firefox-profile");

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDirectory;
	
	var _mz = __webpack_require__(5);
	
	var _errors = __webpack_require__(95);
	
	/*
	 * Resolves true if the path is a readable directory.
	 *
	 * Usage:
	 *
	 * isDirectory('/some/path')
	 *  .then((dirExists) => {
	 *    // dirExists will be true or false.
	 *  });
	 *
	 * */
	function isDirectory(path) {
	  return _mz.fs.stat(path).then(function (stats) {
	    return stats.isDirectory();
	  }).catch((0, _errors.onlyErrorsWithCode)(['ENOENT', 'ENOTDIR'], function () {
	    return false;
	  }));
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nonOverridablePreferences = undefined;
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.getPrefs = getPrefs;
	exports.coerceCLICustomPreference = coerceCLICustomPreference;
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	var nonOverridablePreferences = exports.nonOverridablePreferences = ['devtools.debugger.remote-enabled', 'devtools.debugger.prompt-connection', 'xpinstall.signatures.required'];
	
	// Flow Types
	
	// Preferences Maps
	
	var prefsCommon = {
	  // Allow debug output via dump to be printed to the system console
	  'browser.dom.window.dump.enabled': true,
	  // Warn about possibly incorrect code.
	  'javascript.options.strict': true,
	  'javascript.options.showInConsole': true,
	
	  // Allow remote connections to the debugger.
	  'devtools.debugger.remote-enabled': true,
	  // Disable the prompt for allowing connections.
	  'devtools.debugger.prompt-connection': false,
	
	  // Turn off platform logging because it is a lot of info.
	  'extensions.logging.enabled': false,
	
	  // Disable extension updates and notifications.
	  'extensions.checkCompatibility.nightly': false,
	  'extensions.update.enabled': false,
	  'extensions.update.notifyUser': false,
	
	  // From:
	  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l372
	  // Only load extensions from the application and user profile.
	  // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
	  'extensions.enabledScopes': 5,
	  // Disable metadata caching for installed add-ons by default.
	  'extensions.getAddons.cache.enabled': false,
	  // Disable intalling any distribution add-ons.
	  'extensions.installDistroAddons': false,
	  // Allow installing extensions dropped into the profile folder.
	  'extensions.autoDisableScopes': 10,
	
	  // Disable app update.
	  'app.update.enabled': false,
	
	  // Point update checks to a nonexistent local URL for fast failures.
	  'extensions.update.url': 'http://localhost/extensions-dummy/updateURL',
	  'extensions.blocklist.url': 'http://localhost/extensions-dummy/blocklistURL',
	
	  // Make sure opening about:addons won't hit the network.
	  'extensions.webservice.discoverURL': 'http://localhost/extensions-dummy/discoveryURL',
	
	  // Allow unsigned add-ons.
	  'xpinstall.signatures.required': false
	};
	
	// Prefs specific to Firefox for Android.
	var prefsFennec = {
	  'browser.console.showInPanel': true,
	  'browser.firstrun.show.uidiscovery': false
	};
	
	// Prefs specific to Firefox for desktop.
	var prefsFirefox = {
	  'browser.startup.homepage': 'about:blank',
	  'startup.homepage_welcome_url': 'about:blank',
	  'startup.homepage_welcome_url.additional': '',
	  'devtools.errorconsole.enabled': true,
	  'devtools.chrome.enabled': true,
	
	  // From:
	  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l388
	  // Make url-classifier updates so rare that they won't affect tests.
	  'urlclassifier.updateinterval': 172800,
	  // Point the url-classifier to a nonexistent local URL for fast failures.
	  'browser.safebrowsing.provider.0.gethashURL': 'http://localhost/safebrowsing-dummy/gethash',
	  'browser.safebrowsing.provider.0.keyURL': 'http://localhost/safebrowsing-dummy/newkey',
	  'browser.safebrowsing.provider.0.updateURL': 'http://localhost/safebrowsing-dummy/update',
	
	  // Disable self repair/SHIELD
	  'browser.selfsupport.url': 'https://localhost/selfrepair',
	  // Disable Reader Mode UI tour
	  'browser.reader.detectedFirstArticle': true
	};
	
	var prefs = {
	  common: prefsCommon,
	  fennec: prefsFennec,
	  firefox: prefsFirefox
	};
	
	// Module exports
	
	function getPrefs() {
	  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'firefox';
	
	  var appPrefs = prefs[app];
	  if (!appPrefs) {
	    throw new _errors.WebExtError('Unsupported application: ' + app);
	  }
	  return (0, _extends3.default)({}, prefsCommon, appPrefs);
	}
	
	function coerceCLICustomPreference(cliPrefs) {
	  var customPrefs = {};
	
	  if (!Array.isArray(cliPrefs)) {
	    cliPrefs = [cliPrefs];
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = cliPrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var pref = _step.value;
	
	      var prefsAry = pref.split('=');
	
	      if (prefsAry.length < 2) {
	        throw new _errors.UsageError('Incomplete custom preference: "' + pref + '". ' + 'Syntax expected: "prefname=prefvalue".');
	      }
	
	      var _key = prefsAry[0];
	      var value = prefsAry.slice(1).join('=');
	
	      if (/[^\w{@}.-]/.test(_key)) {
	        throw new _errors.UsageError('Invalid custom preference name: ' + _key);
	      }
	
	      if (value === '' + parseInt(value)) {
	        value = parseInt(value, 10);
	      } else if (value === 'true' || value === 'false') {
	        value = value === 'true';
	      }
	
	      if (nonOverridablePreferences.includes(_key)) {
	        log.warn('\'' + _key + '\' preference cannot be customized.');
	        continue;
	      }
	      customPrefs['' + _key] = value;
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
	
	  return customPrefs;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/preferences.js"))

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RemoteFirefox = exports.REMOTE_PORT = undefined;
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _nodeFirefoxConnect = __webpack_require__(165);
	
	var _nodeFirefoxConnect2 = _interopRequireDefault(_nodeFirefoxConnect);
	
	var _logger = __webpack_require__(84);
	
	var _errors = __webpack_require__(95);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//eslint-disable-line import/no-extraneous-dependencies
	
	// RemoteFirefox types and implementation
	var log = (0, _logger.createLogger)(__filename);
	
	// The default port that Firefox's remote debugger will listen on and the
	// client will connect to.
	
	var REMOTE_PORT = exports.REMOTE_PORT = 6005;
	
	// NOTE: this type aliases Object to catch any other possible response.
	
	var RemoteFirefox = exports.RemoteFirefox = function () {
	  function RemoteFirefox(client) {
	    (0, _classCallCheck3.default)(this, RemoteFirefox);
	
	    this.client = client;
	    this.checkedForAddonReloading = false;
	
	    client.client.on('disconnect', function () {
	      log.debug('Received "disconnect" from Firefox client');
	    });
	    client.client.on('end', function () {
	      log.debug('Received "end" from Firefox client');
	    });
	    client.client.on('message', function (info) {
	      // These are arbitrary messages that the client library ignores.
	      log.debug('Received message from client: ' + JSON.stringify(info));
	    });
	  }
	
	  (0, _createClass3.default)(RemoteFirefox, [{
	    key: 'disconnect',
	    value: function disconnect() {
	      this.client.disconnect();
	    }
	  }, {
	    key: 'addonRequest',
	    value: function addonRequest(addon, request) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this.client.client.makeRequest({ to: addon.actor, type: request }, function (response) {
	          if (response.error) {
	            var _error = response.error + ': ' + response.message;
	            log.debug('Client responded to \'' + request + '\' request with error:', _error);
	            reject(new _errors.WebExtError(_error));
	          } else {
	            resolve(response);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'installTemporaryAddon',
	    value: function installTemporaryAddon(addonPath) {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        _this2.client.request('listTabs', function (error, tabsResponse) {
	          if (error) {
	            return reject(new _errors.WebExtError('Remote Firefox: listTabs() error: ' + error));
	          }
	          if (!tabsResponse.addonsActor) {
	            log.debug('listTabs returned a falsey addonsActor: ' + ('' + tabsResponse.addonsActor));
	            return reject(new _errors.RemoteTempInstallNotSupported('This is an older version of Firefox that does not provide an ' + 'add-ons actor for remote installation. Try Firefox 49 or ' + 'higher.'));
	          }
	
	          _this2.client.client.makeRequest({
	            to: tabsResponse.addonsActor,
	            type: 'installTemporaryAddon',
	            addonPath: addonPath
	          }, function (installResponse) {
	            if (installResponse.error) {
	              return reject(new _errors.WebExtError('installTemporaryAddon: Error: ' + (installResponse.error + ': ' + installResponse.message)));
	            }
	            log.debug('installTemporaryAddon: ' + JSON.stringify(installResponse));
	            log.info('Installed ' + addonPath + ' as a temporary add-on');
	            resolve(installResponse);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'getInstalledAddon',
	    value: function getInstalledAddon(addonId) {
	      var _this3 = this;
	
	      return new Promise(function (resolve, reject) {
	        _this3.client.request('listAddons', function (error, response) {
	          if (error) {
	            reject(new _errors.WebExtError('Remote Firefox: listAddons() error: ' + error));
	          } else {
	            resolve(response.addons);
	          }
	        });
	      }).then(function (addons) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = addons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _addon = _step.value;
	
	            if (_addon.id === addonId) {
	              return _addon;
	            }
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
	
	        log.debug('Remote Firefox has these addons: ' + addons.map(function (a) {
	          return a.id;
	        }));
	        throw new _errors.WebExtError('The remote Firefox does not have your extension installed');
	      });
	    }
	  }, {
	    key: 'checkForAddonReloading',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(addon) {
	        var response, supportedRequestTypes;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!this.checkedForAddonReloading) {
	                  _context.next = 4;
	                  break;
	                }
	
	                return _context.abrupt('return', addon);
	
	              case 4:
	                _context.next = 6;
	                return this.addonRequest(addon, 'requestTypes');
	
	              case 6:
	                response = _context.sent;
	
	                if (!(response.requestTypes.indexOf('reload') === -1)) {
	                  _context.next = 13;
	                  break;
	                }
	
	                supportedRequestTypes = JSON.stringify(response.requestTypes);
	
	                log.debug('Remote Firefox only supports: ' + supportedRequestTypes);
	                throw new _errors.UsageError('This Firefox version does not support add-on reloading. ' + 'Re-run with --no-reload');
	
	              case 13:
	                this.checkedForAddonReloading = true;
	                return _context.abrupt('return', addon);
	
	              case 15:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	
	      function checkForAddonReloading(_x) {
	        return _ref.apply(this, arguments);
	      }
	
	      return checkForAddonReloading;
	    }()
	  }, {
	    key: 'reloadAddon',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(addonId) {
	        var addon;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this.getInstalledAddon(addonId);
	
	              case 2:
	                addon = _context2.sent;
	                _context2.next = 5;
	                return this.checkForAddonReloading(addon);
	
	              case 5:
	                _context2.next = 7;
	                return this.addonRequest(addon, 'reload');
	
	              case 7:
	                process.stdout.write('\rLast extension reload: ' + new Date().toTimeString());
	                log.debug('\n');
	
	              case 9:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));
	
	      function reloadAddon(_x2) {
	        return _ref2.apply(this, arguments);
	      }
	
	      return reloadAddon;
	    }()
	  }]);
	  return RemoteFirefox;
	}();
	
	// Connect types and implementation
	
	// NOTE: this fixes an issue with flow and default exports (which currently
	// lose their type signatures) by explicitly declaring the default export
	// signature. Reference: https://github.com/facebook/flow/issues/449
	// eslint-disable-next-line no-shadow
	
	
	exports.default = function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
	    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REMOTE_PORT;
	
	    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref4$connectToFirefo = _ref4.connectToFirefox,
	        connectToFirefox = _ref4$connectToFirefo === undefined ? _nodeFirefoxConnect2.default : _ref4$connectToFirefo;
	
	    var client;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            log.debug('Connecting to Firefox on port ' + port);
	            _context3.next = 3;
	            return connectToFirefox(port);
	
	          case 3:
	            client = _context3.sent;
	
	            log.debug('Connected to the remote Firefox debugger');
	            return _context3.abrupt('return', new RemoteFirefox(client));
	
	          case 6:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  function connect() {
	    return _ref3.apply(this, arguments);
	  }
	
	  return connect;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/remote.js"))

/***/ },
/* 165 */
/***/ function(module, exports) {

	module.exports = require("node-firefox-connect");

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _copyDir = __webpack_require__(167);
	
	var _copyDir2 = _interopRequireDefault(_copyDir);
	
	var _mz = __webpack_require__(5);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _es6Promisify = __webpack_require__(93);
	
	var _es6Promisify2 = _interopRequireDefault(_es6Promisify);
	
	var _errors = __webpack_require__(95);
	
	var _manifest = __webpack_require__(94);
	
	var _tempDir = __webpack_require__(129);
	
	var _test = __webpack_require__(140);
	
	var _sign2 = __webpack_require__(168);
	
	var _sign3 = _interopRequireDefault(_sign2);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import flow type
	(0, _mocha.describe)('sign', function () {
	
	  function getStubs() {
	    var signingConfig = {
	      apiKey: 'AMO JWT issuer',
	      apiSecret: 'AMO JWT secret',
	      apiUrlPrefix: 'http://not-the-real-amo.com/api/v3',
	      apiProxy: 'http://yourproxy:6000',
	      timeout: 999
	    };
	
	    var buildResult = {
	      extensionPath: '/tmp/built-web-extension.xpi'
	    };
	    var build = _sinon2.default.spy(function () {
	      return Promise.resolve(buildResult);
	    });
	
	    var signingResult = {
	      id: 'some-addon-id',
	      success: true,
	      downloadedFiles: []
	    };
	    var signAddon = _sinon2.default.spy(function () {
	      return Promise.resolve(signingResult);
	    });
	
	    return {
	      signingConfig: signingConfig,
	      build: build,
	      buildResult: buildResult,
	      signAddon: signAddon,
	      signingResult: signingResult,
	      preValidatedManifest: _test.basicManifest
	    };
	  }
	
	  /*
	   * Run the sign command with stubs for all dependencies.
	   */
	  function sign(tmpDir, stubs) {
	    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	        _ref$extraArgs = _ref.extraArgs,
	        extraArgs = _ref$extraArgs === undefined ? {} : _ref$extraArgs,
	        _ref$extraOptions = _ref.extraOptions,
	        extraOptions = _ref$extraOptions === undefined ? {} : _ref$extraOptions;
	
	    return (0, _sign3.default)((0, _extends3.default)({
	      verbose: false,
	      artifactsDir: _path2.default.join(tmpDir.path(), 'artifacts-dir'),
	      sourceDir: tmpDir.path()
	    }, stubs.signingConfig, extraArgs), (0, _extends3.default)({}, stubs, extraOptions));
	  }
	
	  (0, _mocha.it)('builds and signs an extension', function () {
	    return (0, _tempDir.withTempDir)(
	    // This test only stubs out the signer in an effort to integrate
	    // all other parts of the process.
	    function (tmpDir) {
	      var stubs = getStubs();
	      var sourceDir = _path2.default.join(tmpDir.path(), 'source-dir');
	      var copyDirAsPromised = (0, _es6Promisify2.default)(_copyDir2.default);
	      return copyDirAsPromised((0, _helpers.fixturePath)('minimal-web-ext'), sourceDir).then(function () {
	        return (0, _sign3.default)((0, _extends3.default)({
	          sourceDir: sourceDir,
	          artifactsDir: _path2.default.join(tmpDir.path(), 'artifacts')
	        }, stubs.signingConfig), {
	          signAddon: stubs.signAddon
	        });
	      }).then(function (result) {
	        _chai.assert.equal(result.success, true);
	        // Do a sanity check that a built extension was passed to the
	        // signer.
	        _chai.assert.include(stubs.signAddon.firstCall.args[0].xpiPath, 'minimal_extension-1.0.zip');
	      });
	    });
	  });
	
	  (0, _mocha.it)('allows an empty application ID when signing', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      return sign(tmpDir, stubs, {
	        extraOptions: {
	          preValidatedManifest: _test.manifestWithoutApps
	        }
	      }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        _chai.assert.strictEqual(stubs.signAddon.firstCall.args[0].id, (0, _manifest.getManifestId)(_test.manifestWithoutApps));
	      });
	    });
	  });
	
	  (0, _mocha.it)('allows a custom ID when no ID in manifest.json', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var customId = 'some-custom-id';
	      var stubs = getStubs();
	      return sign(tmpDir, stubs, {
	        extraArgs: {
	          id: customId
	        },
	        extraOptions: {
	          preValidatedManifest: _test.manifestWithoutApps
	        }
	      }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        _chai.assert.equal(stubs.signAddon.firstCall.args[0].id, customId);
	      });
	    });
	  });
	
	  (0, _mocha.it)('prefers a custom ID over an ID file', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var sourceDir = _path2.default.join(tmpDir.path(), 'source-dir');
	      var customId = 'some-custom-id';
	      var stubs = getStubs();
	      // First, save an extension ID like a previous signing call.
	      return _mz.fs.mkdir(sourceDir).then(function () {
	        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-other-id');
	      })
	      // Now, make a signing call with a custom ID.
	      .then(function () {
	        return sign(tmpDir, stubs, {
	          extraArgs: {
	            sourceDir: sourceDir,
	            id: customId
	          },
	          extraOptions: {
	            preValidatedManifest: _test.manifestWithoutApps
	          }
	        });
	      }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        _chai.assert.equal(stubs.signAddon.firstCall.args[0].id, customId);
	      });
	    });
	  });
	
	  (0, _mocha.it)('disallows a custom ID when manifest.json has ID', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var customId = 'some-custom-id';
	      var stubs = getStubs();
	      return sign(tmpDir, stubs, {
	        extraArgs: {
	          id: customId
	        },
	        extraOptions: {
	          // This manifest has an ID in it.
	          preValidatedManifest: _test.basicManifest
	        }
	      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	        _chai.assert.match(error.message, /Cannot set custom ID some-custom-id/);
	        _chai.assert.match(error.message, /manifest\.json declares ID basic-manifest@web-ext-test-suite/);
	      }));
	    });
	  });
	
	  (0, _mocha.it)('remembers auto-generated IDs for successive signing', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	
	      function _sign() {
	        var signAddon = _sinon2.default.spy(function () {
	          return Promise.resolve((0, _extends3.default)({}, stubs.signingResult, {
	            id: 'auto-generated-id'
	          }));
	        });
	
	        return sign(tmpDir, (0, _extends3.default)({}, stubs, {
	          signAddon: signAddon
	        }), {
	          extraOptions: {
	            preValidatedManifest: _test.manifestWithoutApps
	          }
	        }).then(function (signingResult) {
	          return { signingResult: signingResult, signAddon: signAddon };
	        });
	      }
	
	      var stubs = getStubs();
	
	      // Run an initial sign command which will yield a server generated ID.
	      return _sign().then(function (_ref2) {
	        var signAddon = _ref2.signAddon,
	            signingResult = _ref2.signingResult;
	
	        _chai.assert.equal(signAddon.called, true);
	        _chai.assert.strictEqual(signAddon.firstCall.args[0].id, undefined);
	        _chai.assert.equal(signingResult.id, 'auto-generated-id');
	
	        // Re-run the sign command again.
	        return _sign();
	      }).then(function (_ref3) {
	        var signAddon = _ref3.signAddon;
	
	        _chai.assert.equal(signAddon.called, true);
	        // This should call signAddon() with the server generated
	        // ID that was saved to the source directory from the previous
	        // signing result.
	        _chai.assert.equal(signAddon.firstCall.args[0].id, 'auto-generated-id');
	      });
	    });
	  });
	
	  (0, _mocha.it)('returns a signing result', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      return sign(tmpDir, stubs).then(function (realResult) {
	        _chai.assert.deepEqual(realResult, stubs.signingResult);
	      });
	    });
	  });
	
	  (0, _mocha.it)('might fail', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return sign(tmpDir, (0, _extends3.default)({}, getStubs(), {
	        signAddon: function signAddon() {
	          return Promise.resolve({
	            success: false
	          });
	        }
	      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.instanceOf(error, _errors.WebExtError);
	        _chai.assert.match(error.message, /The WebExtension could not be signed/);
	      });
	    });
	  });
	
	  (0, _mocha.it)('calls the add-on signer', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'some-artifacts-dir');
	      return sign(tmpDir, stubs, { extraArgs: { artifactsDir: artifactsDir } }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        var signedAddonCall = stubs.signAddon.firstCall.args[0];
	        _chai.assert.equal(signedAddonCall.apiKey, stubs.signingConfig.apiKey);
	        _chai.assert.equal(signedAddonCall.apiSecret, stubs.signingConfig.apiSecret);
	        _chai.assert.equal(signedAddonCall.apiUrlPrefix, stubs.signingConfig.apiUrlPrefix);
	        _chai.assert.equal(signedAddonCall.apiProxy, stubs.signingConfig.apiProxy);
	        _chai.assert.equal(signedAddonCall.timeout, stubs.signingConfig.timeout);
	        _chai.assert.equal(signedAddonCall.xpiPath, stubs.buildResult.extensionPath);
	
	        var applications = stubs.preValidatedManifest.applications || { gecko: {} };
	        _chai.assert.equal(signedAddonCall.id, applications.gecko.id);
	
	        _chai.assert.equal(signedAddonCall.version, stubs.preValidatedManifest.version);
	        _chai.assert.equal(signedAddonCall.downloadDir, artifactsDir);
	      });
	    });
	  });
	
	  (0, _mocha.it)('passes the verbose flag to the signer', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      return sign(tmpDir, stubs, { extraArgs: { verbose: true } }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        _chai.assert.equal(stubs.signAddon.firstCall.args[0].verbose, true);
	      });
	    });
	  });
	
	  (0, _mocha.it)('passes the ignoreFiles flag to the builder', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      var ignoreFiles = ['*'];
	      return sign(tmpDir, stubs, { extraArgs: { ignoreFiles: ignoreFiles } }).then(function () {
	        _chai.assert.equal(stubs.signAddon.called, true);
	        _chai.assert.equal(stubs.build.firstCall.args[0].ignoreFiles, ignoreFiles);
	      });
	    });
	  });
	
	  (0, _mocha.it)('passes through a signing exception', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var stubs = getStubs();
	      stubs.signAddon = function () {
	        return Promise.reject(new Error('some signing error'));
	      };
	
	      return sign(tmpDir, stubs).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.match(error.message, /signing error/);
	      });
	    });
	  });
	
	  (0, _mocha.describe)('saveIdToSourceDir', function () {
	
	    (0, _mocha.it)('saves an extension ID to file', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var sourceDir = tmpDir.path();
	        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-id').then(function () {
	          return _mz.fs.readFile(_path2.default.join(sourceDir, _sign2.extensionIdFile));
	        }).then(function (content) {
	          _chai.assert.include(content.toString(), 'some-id');
	        });
	      });
	    });
	
	    (0, _mocha.it)('will overwrite an existing file', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var sourceDir = tmpDir.path();
	        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'first-id').then(function () {
	          return (0, _sign2.saveIdToSourceDir)(sourceDir, 'second-id');
	        }).then(function () {
	          return (0, _sign2.getIdFromSourceDir)(sourceDir);
	        }).then(function (savedId) {
	          _chai.assert.equal(savedId, 'second-id');
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('getIdFromSourceDir', function () {
	
	    (0, _mocha.it)('gets a saved extension ID', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var sourceDir = tmpDir.path();
	        return (0, _sign2.saveIdToSourceDir)(sourceDir, 'some-id').then(function () {
	          return (0, _sign2.getIdFromSourceDir)(sourceDir);
	        }).then(function (extensionId) {
	          _chai.assert.equal(extensionId, 'some-id');
	        });
	      });
	    });
	
	    (0, _mocha.it)('throws an error for empty files', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var sourceDir = tmpDir.path();
	        return _mz.fs.writeFile(_path2.default.join(sourceDir, _sign2.extensionIdFile), '').then(function () {
	          return (0, _sign2.getIdFromSourceDir)(sourceDir);
	        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /No ID found in extension ID file/);
	        }));
	      });
	    });
	
	    (0, _mocha.it)('returns empty ID when extension file does not exist', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var sourceDir = tmpDir.path();
	        return (0, _sign2.getIdFromSourceDir)(sourceDir).then(function (savedId) {
	          _chai.assert.strictEqual(savedId, undefined);
	        });
	      });
	    });
	  });
	});

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = require("copy-dir");

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.saveIdToSourceDir = exports.getIdFromSourceDir = exports.extensionIdFile = undefined;
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(130);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var getIdFromSourceDir = exports.getIdFromSourceDir = function () {
	  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sourceDir) {
	    var filePath, content, lines, id;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            filePath = _path2.default.join(sourceDir, extensionIdFile);
	            content = void 0;
	            _context2.prev = 2;
	            _context2.next = 5;
	            return _mz.fs.readFile(filePath);
	
	          case 5:
	            content = _context2.sent;
	            _context2.next = 14;
	            break;
	
	          case 8:
	            _context2.prev = 8;
	            _context2.t0 = _context2['catch'](2);
	
	            if (!(0, _errors.isErrorWithCode)('ENOENT', _context2.t0)) {
	              _context2.next = 13;
	              break;
	            }
	
	            log.debug('No ID file found at: ' + filePath);
	            return _context2.abrupt('return');
	
	          case 13:
	            throw _context2.t0;
	
	          case 14:
	            lines = content.toString().split('\n');
	
	            lines = lines.filter(function (line) {
	              line = line.trim();
	              if (line && !line.startsWith('#')) {
	                return line;
	              }
	            });
	
	            id = lines[0];
	
	            log.debug('Found extension ID ' + id + ' in ' + filePath);
	
	            if (id) {
	              _context2.next = 20;
	              break;
	            }
	
	            throw new _errors.UsageError('No ID found in extension ID file ' + filePath);
	
	          case 20:
	            return _context2.abrupt('return', id);
	
	          case 21:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this, [[2, 8]]);
	  }));
	
	  return function getIdFromSourceDir(_x3) {
	    return _ref6.apply(this, arguments);
	  };
	}();
	
	var saveIdToSourceDir = exports.saveIdToSourceDir = function () {
	  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sourceDir, id) {
	    var filePath;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            filePath = _path2.default.join(sourceDir, extensionIdFile);
	            _context3.next = 3;
	            return _mz.fs.writeFile(filePath, ['# This file was created by https://github.com/mozilla/web-ext', '# Your auto-generated extension ID for addons.mozilla.org is:', id.toString()].join('\n'));
	
	          case 3:
	
	            log.debug('Saved auto-generated ID ' + id + ' to ' + filePath);
	
	          case 4:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function saveIdToSourceDir(_x4, _x5) {
	    return _ref7.apply(this, arguments);
	  };
	}();
	
	exports.default = sign;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mz = __webpack_require__(5);
	
	var _signAddon = __webpack_require__(169);
	
	var _signAddon2 = _interopRequireDefault(_signAddon);
	
	var _build = __webpack_require__(9);
	
	var _build2 = _interopRequireDefault(_build);
	
	var _manifest = __webpack_require__(94);
	
	var _manifest2 = _interopRequireDefault(_manifest);
	
	var _tempDir = __webpack_require__(129);
	
	var _errors = __webpack_require__(95);
	
	var _artifacts = __webpack_require__(125);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	var extensionIdFile = exports.extensionIdFile = '.web-extension-id';
	
	// Sign command types and implementation.
	
	function sign(_ref) {
	  var verbose = _ref.verbose,
	      sourceDir = _ref.sourceDir,
	      artifactsDir = _ref.artifactsDir,
	      _ref$ignoreFiles = _ref.ignoreFiles,
	      ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
	      apiKey = _ref.apiKey,
	      apiSecret = _ref.apiSecret,
	      apiUrlPrefix = _ref.apiUrlPrefix,
	      apiProxy = _ref.apiProxy,
	      id = _ref.id,
	      timeout = _ref.timeout;
	
	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$build = _ref2.build,
	      build = _ref2$build === undefined ? _build2.default : _ref2$build,
	      _ref2$signAddon = _ref2.signAddon,
	      signAddon = _ref2$signAddon === undefined ? _signAddon2.default : _ref2$signAddon,
	      preValidatedManifest = _ref2.preValidatedManifest;
	
	  return (0, _tempDir.withTempDir)(function () {
	    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(tmpDir) {
	      var manifestData, _ref4, _ref5, buildResult, idFromSourceDir, manifestId, signingResult;
	
	      return _regenerator2.default.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return (0, _artifacts.prepareArtifactsDir)(artifactsDir);
	
	            case 2:
	              manifestData = void 0;
	
	              if (!preValidatedManifest) {
	                _context.next = 7;
	                break;
	              }
	
	              manifestData = preValidatedManifest;
	              _context.next = 10;
	              break;
	
	            case 7:
	              _context.next = 9;
	              return (0, _manifest2.default)(sourceDir);
	
	            case 9:
	              manifestData = _context.sent;
	
	            case 10:
	              _context.next = 12;
	              return Promise.all([build({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: tmpDir.path() }, { manifestData: manifestData, showReadyMessage: false }), getIdFromSourceDir(sourceDir)]);
	
	            case 12:
	              _ref4 = _context.sent;
	              _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
	              buildResult = _ref5[0];
	              idFromSourceDir = _ref5[1];
	              manifestId = (0, _manifest.getManifestId)(manifestData);
	
	              if (!(id && manifestId)) {
	                _context.next = 19;
	                break;
	              }
	
	              throw new _errors.UsageError('Cannot set custom ID ' + id + ' because manifest.json ' + ('declares ID ' + manifestId));
	
	            case 19:
	              if (id) {
	                log.debug('Using custom ID declared as --id=' + id);
	              }
	
	              if (manifestId) {
	                id = manifestId;
	              }
	
	              if (!id && idFromSourceDir) {
	                log.info('Using previously auto-generated extension ID: ' + idFromSourceDir);
	                id = idFromSourceDir;
	              }
	
	              if (!id) {
	                log.warn('No extension ID specified (it will be auto-generated)');
	              }
	
	              _context.next = 25;
	              return signAddon({
	                apiKey: apiKey,
	                apiSecret: apiSecret,
	                apiUrlPrefix: apiUrlPrefix,
	                apiProxy: apiProxy,
	                timeout: timeout,
	                verbose: verbose,
	                id: id,
	                xpiPath: buildResult.extensionPath,
	                version: manifestData.version,
	                downloadDir: artifactsDir
	              });
	
	            case 25:
	              signingResult = _context.sent;
	
	              if (!signingResult.id) {
	                _context.next = 29;
	                break;
	              }
	
	              _context.next = 29;
	              return saveIdToSourceDir(sourceDir, signingResult.id);
	
	            case 29:
	              if (!signingResult.success) {
	                _context.next = 34;
	                break;
	              }
	
	              log.info('Extension ID: ' + signingResult.id);
	              log.info('SUCCESS');
	              _context.next = 36;
	              break;
	
	            case 34:
	              log.info('FAIL');
	              throw new _errors.WebExtError('The WebExtension could not be signed');
	
	            case 36:
	              return _context.abrupt('return', signingResult);
	
	            case 37:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));
	
	    return function (_x2) {
	      return _ref3.apply(this, arguments);
	    };
	  }());
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/sign.js"))

/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = require("sign-addon");

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties2 = __webpack_require__(154);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _deepcopy = __webpack_require__(141);
	
	var _deepcopy2 = _interopRequireDefault(_deepcopy);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _firefoxProfile = __webpack_require__(161);
	
	var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _mz = __webpack_require__(5);
	
	var _firefox = __webpack_require__(159);
	
	var firefox = _interopRequireWildcard(_firefox);
	
	var _errors = __webpack_require__(95);
	
	var _tempDir = __webpack_require__(129);
	
	var _helpers = __webpack_require__(138);
	
	var _test = __webpack_require__(140);
	
	var _remote = __webpack_require__(164);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultFirefoxEnv = firefox.defaultFirefoxEnv;
	
	
	function withBaseProfile(callback) {
	  return (0, _tempDir.withTempDir)(function (tmpDir) {
	    var baseProfile = new _firefoxProfile2.default({
	      destinationDirectory: tmpDir.path()
	    });
	    return callback(baseProfile);
	  });
	}
	
	(0, _mocha.describe)('firefox', function () {
	
	  (0, _mocha.describe)('run', function () {
	
	    var fakeProfile = {
	      path: function path() {
	        return '/dev/null/some-profile-path';
	      }
	    };
	
	    var fakeFirefoxProcess = {
	      on: function on(eventName, callback) {
	        if (eventName === 'close') {
	          // Immediately "emit" a close event to complete the test.
	          callback();
	        }
	      },
	      stdout: { on: function on() {} },
	      stderr: { on: function on() {} }
	    };
	
	    function createFakeFxRunner() {
	      var firefoxOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var fxProcess = (0, _extends3.default)({}, (0, _deepcopy2.default)(fakeFirefoxProcess), firefoxOverrides);
	      return _sinon2.default.spy(function () {
	        return Promise.resolve({ args: [], process: fxProcess });
	      });
	    }
	
	    // TODO: This object should accept dynamic properties since those are passed to firefox.run()
	
	    function runFirefox() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var _ref$profile = _ref.profile,
	          profile = _ref$profile === undefined ? fakeProfile : _ref$profile,
	          args = (0, _objectWithoutProperties3.default)(_ref, ['profile']);
	
	      return firefox.run(profile, (0, _extends3.default)({
	        fxRunner: createFakeFxRunner(),
	        findRemotePort: function findRemotePort() {
	          return Promise.resolve(6000);
	        }
	      }, args));
	    }
	
	    (0, _mocha.it)('executes the Firefox runner with a given profile', function () {
	      var runner = createFakeFxRunner();
	      var profile = fakeProfile;
	      return runFirefox({ fxRunner: runner, profile: profile }).then(function () {
	        _chai.assert.equal(runner.called, true);
	        _chai.assert.equal(runner.firstCall.args[0].profile, profile.path());
	      });
	    });
	
	    (0, _mocha.it)('starts the remote debugger on a discovered port', function () {
	      var port = 6001;
	      var runner = createFakeFxRunner();
	      var findRemotePort = _sinon2.default.spy(function () {
	        return Promise.resolve(port);
	      });
	      return runFirefox({ fxRunner: runner, findRemotePort: findRemotePort }).then(function () {
	        _chai.assert.equal(runner.called, true);
	        _chai.assert.equal(runner.firstCall.args[0].listen, port);
	      });
	    });
	
	    (0, _mocha.it)('passes binary args to Firefox', function () {
	      var fxRunner = createFakeFxRunner();
	      var binaryArgs = '--safe-mode';
	      return runFirefox({ fxRunner: fxRunner, binaryArgs: binaryArgs }).then(function () {
	        _chai.assert.equal(fxRunner.called, true);
	        _chai.assert.equal(fxRunner.firstCall.args[0]['binary-args'], binaryArgs);
	      });
	    });
	
	    (0, _mocha.it)('sets up a Firefox process environment', function () {
	      var runner = createFakeFxRunner();
	      // Make sure it passes through process environment variables.
	      process.env._WEB_EXT_FIREFOX_ENV_TEST = 'thing';
	      return runFirefox({ fxRunner: runner }).then(function () {
	        var declaredEnv = runner.firstCall.args[0].env;
	        for (var key in defaultFirefoxEnv) {
	          _chai.assert.equal(declaredEnv[key], defaultFirefoxEnv[key]);
	        }
	        _chai.assert.equal(declaredEnv._WEB_EXT_FIREFOX_ENV_TEST, 'thing');
	      });
	    });
	
	    (0, _mocha.it)('fails on a firefox error', function () {
	      var someError = new Error('some internal firefox error');
	      var runner = createFakeFxRunner({
	        on: function on(eventName, callback) {
	          if (eventName === 'error') {
	            // Immediately "emit" an error event.
	            callback(someError);
	          }
	        }
	      });
	
	      return runFirefox({ fxRunner: runner }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(error.message, someError.message);
	      });
	    });
	
	    (0, _mocha.it)('passes a custom Firefox binary when specified', function () {
	      var runner = createFakeFxRunner();
	      var firefoxBinary = '/pretend/path/to/firefox-bin';
	      return runFirefox({ fxRunner: runner, firefoxBinary: firefoxBinary }).then(function () {
	        _chai.assert.equal(runner.called, true);
	        _chai.assert.equal(runner.firstCall.args[0].binary, firefoxBinary);
	      });
	    });
	
	    (0, _mocha.it)('logs stdout and stderr without errors', function () {
	      // Store a registry of handlers that we can execute directly.
	      var firefoxApp = {};
	      var runner = createFakeFxRunner({
	        stdout: {
	          on: function on(event, handler) {
	            firefoxApp.writeStdout = handler;
	          }
	        },
	        stderr: {
	          on: function on(event, handler) {
	            firefoxApp.writeStderr = handler;
	          }
	        }
	      });
	
	      return runFirefox({ fxRunner: runner }).then(function () {
	        // This makes sure that when each handler writes to the
	        // logger they don't raise any exceptions.
	        firefoxApp.writeStdout('example of stdout');
	        firefoxApp.writeStderr('example of stderr');
	      });
	    });
	  });
	
	  (0, _mocha.describe)('copyProfile', function () {
	
	    (0, _mocha.it)('copies a profile', function () {
	      return withBaseProfile(function (baseProfile) {
	        baseProfile.setPreference('webext.customSetting', true);
	        baseProfile.updatePreferences();
	
	        return firefox.copyProfile(baseProfile.path(), { configureThisProfile: function configureThisProfile(profile) {
	            return Promise.resolve(profile);
	          } }).then(function (profile) {
	          return _mz.fs.readFile(profile.userPrefs);
	        }).then(function (userPrefs) {
	          _chai.assert.include(userPrefs.toString(), 'webext.customSetting');
	        });
	      });
	    });
	
	    (0, _mocha.it)('requires a valid profile directory', function () {
	      // This stubs out the code that looks for a named
	      // profile because on Travis CI there will not be a Firefox
	      // user directory.
	      var copyFromUserProfile = _sinon2.default.spy(function (config, cb) {
	        return cb(new Error('simulated: could not find profile'));
	      });
	
	      return firefox.copyProfile('/dev/null/non_existent_path', {
	        copyFromUserProfile: copyFromUserProfile,
	        configureThisProfile: function configureThisProfile(profile) {
	          return Promise.resolve(profile);
	        }
	      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	        _chai.assert.equal(copyFromUserProfile.called, true);
	        _chai.assert.match(error.message, /Could not copy Firefox profile from .*non_existent_path/);
	      }));
	    });
	
	    (0, _mocha.it)('can copy a profile by name', function () {
	      var name = 'some-fake-firefox-profile-name';
	      // Fake profile object:
	      var profileToCopy = {
	        defaultPreferences: {
	          thing: 'value'
	        }
	      };
	      var copyFromUserProfile = _sinon2.default.spy(function (config, callback) {
	        return callback(null, profileToCopy);
	      });
	
	      return firefox.copyProfile(name, {
	        copyFromUserProfile: copyFromUserProfile,
	        configureThisProfile: function configureThisProfile(profile) {
	          return Promise.resolve(profile);
	        }
	      }).then(function (profile) {
	        _chai.assert.equal(copyFromUserProfile.called, true);
	        _chai.assert.equal(copyFromUserProfile.firstCall.args[0].name, name);
	        _chai.assert.equal(profile.defaultPreferences.thing, profileToCopy.defaultPreferences.thing);
	      });
	    });
	
	    (0, _mocha.it)('configures the copied profile', function () {
	      return withBaseProfile(function (baseProfile) {
	        var app = 'fennec';
	        var configureThisProfile = _sinon2.default.spy(function (profile) {
	          return Promise.resolve(profile);
	        });
	
	        return firefox.copyProfile(baseProfile.path(), { app: app, configureThisProfile: configureThisProfile }).then(function (profile) {
	          _chai.assert.equal(configureThisProfile.called, true);
	          _chai.assert.equal(configureThisProfile.firstCall.args[0], profile);
	          _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('createProfile', function () {
	
	    (0, _mocha.it)('resolves with a profile object', function () {
	      return firefox.createProfile({ configureThisProfile: function configureThisProfile(profile) {
	          return Promise.resolve(profile);
	        } }).then(function (profile) {
	        _chai.assert.instanceOf(profile, _firefoxProfile2.default);
	      });
	    });
	
	    (0, _mocha.it)('creates a Firefox profile', function () {
	      // This is a quick and paranoid sanity check that the FirefoxProfile
	      // object is real and has some preferences.
	      return firefox.createProfile({ configureThisProfile: function configureThisProfile(profile) {
	          return Promise.resolve(profile);
	        } }).then(function (profile) {
	        profile.updatePreferences();
	        return _mz.fs.readFile(_path2.default.join(profile.path(), 'user.js'));
	      }).then(function (prefFile) {
	        // Check for some default pref set by FirefoxProfile.
	        _chai.assert.include(prefFile.toString(), '"startup.homepage_welcome_url", "about:blank"');
	      });
	    });
	
	    (0, _mocha.it)('configures a profile', function () {
	      var configureThisProfile = _sinon2.default.spy(function (profile) {
	        return Promise.resolve(profile);
	      });
	      var app = 'fennec';
	      return firefox.createProfile({ app: app, configureThisProfile: configureThisProfile }).then(function (profile) {
	        _chai.assert.equal(configureThisProfile.called, true);
	        _chai.assert.equal(configureThisProfile.firstCall.args[0], profile);
	        _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
	      });
	    });
	  });
	
	  (0, _mocha.describe)('useProfile', function () {
	
	    (0, _mocha.it)('resolves to a FirefoxProfile instance', function () {
	      return withBaseProfile(function (baseProfile) {
	        var configureThisProfile = function configureThisProfile(profile) {
	          return Promise.resolve(profile);
	        };
	        return firefox.useProfile(baseProfile.path(), { configureThisProfile: configureThisProfile }).then(function (profile) {
	          _chai.assert.instanceOf(profile, _firefoxProfile2.default);
	        });
	      });
	    });
	
	    (0, _mocha.it)('configures a profile', function () {
	      return withBaseProfile(function (baseProfile) {
	        var configureThisProfile = _sinon2.default.spy(function (profile) {
	          return Promise.resolve(profile);
	        });
	        var app = 'fennec';
	        var profilePath = baseProfile.path();
	        return firefox.useProfile(profilePath, { app: app, configureThisProfile: configureThisProfile }).then(function (profile) {
	          _chai.assert.equal(configureThisProfile.called, true);
	          _chai.assert.equal(configureThisProfile.firstCall.args[0], profile);
	          _chai.assert.equal(configureThisProfile.firstCall.args[1].app, app);
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('configureProfile', function () {
	
	    function withTempProfile(callback) {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var profile = new _firefoxProfile2.default({
	          destinationDirectory: tmpDir.path()
	        });
	        return callback(profile);
	      });
	    }
	
	    (0, _mocha.it)('resolves with a profile', function () {
	      return withTempProfile(function (profile) {
	        var fakePrefGetter = _sinon2.default.stub().returns({});
	        return firefox.configureProfile(profile, { getPrefs: fakePrefGetter }).then(function (configuredProfile) {
	          _chai.assert.instanceOf(configuredProfile, _firefoxProfile2.default);
	        });
	      });
	    });
	
	    (0, _mocha.it)('sets Firefox preferences', function () {
	      return withTempProfile(function (profile) {
	        var fakePrefGetter = _sinon2.default.stub().returns({});
	        return firefox.configureProfile(profile, { getPrefs: fakePrefGetter }).then(function () {
	          _chai.assert.equal(fakePrefGetter.firstCall.args[0], 'firefox');
	        });
	      });
	    });
	
	    (0, _mocha.it)('sets Fennec preferences', function () {
	      return withTempProfile(function (profile) {
	        var fakePrefGetter = _sinon2.default.stub().returns({});
	        return firefox.configureProfile(profile, {
	          getPrefs: fakePrefGetter,
	          app: 'fennec'
	        }).then(function () {
	          _chai.assert.equal(fakePrefGetter.firstCall.args[0], 'fennec');
	        });
	      });
	    });
	
	    (0, _mocha.it)('writes new preferences', function () {
	      return withTempProfile(function (profile) {
	        // This is a quick sanity check that real preferences were
	        // written to disk.
	        return firefox.configureProfile(profile).then(function (configuredProfile) {
	          return _mz.fs.readFile(_path2.default.join(configuredProfile.path(), 'user.js'));
	        }).then(function (prefFile) {
	          // Check for some pref set by configureProfile().
	          _chai.assert.include(prefFile.toString(), '"devtools.debugger.remote-enabled", true');
	        });
	      });
	    });
	
	    (0, _mocha.it)('writes custom preferences', function () {
	      return withTempProfile(function (profile) {
	        var customPrefs = { 'extensions.checkCompatibility.nightly': true };
	        return firefox.configureProfile(profile, { customPrefs: customPrefs }).then(function (configuredProfile) {
	          return _mz.fs.readFile(_path2.default.join(configuredProfile.path(), 'user.js'));
	        }).then(function (prefFile) {
	          // Check for custom pref set by configureProfile().
	          _chai.assert.include(prefFile.toString(), '"extensions.checkCompatibility.nightly", true');
	          // Check that one of the default preferences is set as well
	          _chai.assert.include(prefFile.toString(), '"devtools.debugger.remote-enabled", true');
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('installExtension', function () {
	
	    function setUp(testPromise) {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var data = {
	          extensionPath: (0, _helpers.fixturePath)('minimal_extension-1.0.zip'),
	          profile: undefined,
	          profileDir: _path2.default.join(tmpDir.path(), 'profile')
	        };
	        return _mz.fs.mkdir(data.profileDir).then(function () {
	          data.profile = new _firefoxProfile2.default({
	            destinationDirectory: data.profileDir
	          });
	        }).then(function () {
	          return testPromise(data);
	        });
	      });
	    }
	
	    function installBasicExt(data) {
	      return firefox.installExtension({
	        manifestData: _test.basicManifest,
	        profile: data.profile,
	        extensionPath: data.extensionPath
	      });
	    }
	
	    (0, _mocha.it)('installs an extension file into a profile', function () {
	      return setUp(function (data) {
	        return installBasicExt(data).then(function () {
	          return _mz.fs.readdir(data.profile.extensionsDir);
	        }).then(function (files) {
	          _chai.assert.deepEqual(files, ['basic-manifest@web-ext-test-suite.xpi']);
	        });
	      });
	    });
	
	    (0, _mocha.it)('requires a manifest ID', function () {
	      return setUp(function (data) {
	        return firefox.installExtension({
	          manifestData: _test.manifestWithoutApps,
	          profile: data.profile,
	          extensionPath: data.extensionPath
	        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /explicit extension ID is required/);
	        }));
	      });
	    });
	
	    (0, _mocha.it)('can install the extension as a proxy', function () {
	      return setUp(function (data) {
	        var sourceDir = (0, _helpers.fixturePath)('minimal-web-ext');
	        return firefox.installExtension({
	          manifestData: _test.basicManifest,
	          profile: data.profile,
	          extensionPath: sourceDir,
	          asProxy: true
	        }).then(function () {
	          var proxyFile = _path2.default.join(data.profile.extensionsDir, 'basic-manifest@web-ext-test-suite');
	          return _mz.fs.readFile(proxyFile);
	        }).then(function (proxyData) {
	          // The proxy file should contain the path to the extension.
	          _chai.assert.equal(proxyData.toString(), sourceDir);
	        });
	      });
	    });
	
	    (0, _mocha.it)('requires a directory path for proxy installs', function () {
	      return setUp(function (data) {
	        var extensionPath = (0, _helpers.fixturePath)('minimal_extension-1.0.zip');
	        return firefox.installExtension({
	          manifestData: _test.basicManifest,
	          profile: data.profile,
	          extensionPath: extensionPath,
	          asProxy: true
	        }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.match(error.message, /must be the extension source directory/);
	          _chai.assert.include(error.message, extensionPath);
	        }));
	      });
	    });
	
	    (0, _mocha.it)('re-uses an existing extension directory', function () {
	      return setUp(function (data) {
	        return _mz.fs.mkdir(_path2.default.join(data.profile.extensionsDir)).then(function () {
	          return installBasicExt(data);
	        }).then(function () {
	          return _mz.fs.stat(data.profile.extensionsDir);
	        });
	      });
	    });
	
	    (0, _mocha.it)('checks for an empty extensionsDir', function () {
	      return setUp(function (data) {
	        data.profile.extensionsDir = undefined;
	        return installBasicExt(data).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.match(error.message, /unexpectedly empty/);
	        }));
	      });
	    });
	  });
	
	  (0, _mocha.describe)('defaultRemotePortFinder', function () {
	
	    function findRemotePort() {
	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      var args = (0, _objectWithoutProperties3.default)(_ref2, []);
	
	      return firefox.defaultRemotePortFinder((0, _extends3.default)({}, args));
	    }
	
	    (0, _mocha.it)('resolves to an open port', function () {
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return Promise.reject(new _helpers.TCPConnectError());
	      });
	      return findRemotePort({ connectToFirefox: connectToFirefox }).then(function (port) {
	        _chai.assert.isNumber(port);
	      });
	    });
	
	    (0, _mocha.it)('returns a port on first try', function () {
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return new Promise(function (resolve, reject) {
	          reject(new _helpers.TCPConnectError('first call connection fails - port is free'));
	        });
	      });
	      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).then(function (port) {
	        _chai.assert.equal(connectToFirefox.callCount, 1);
	        _chai.assert.isNumber(port);
	      });
	    });
	
	    (0, _mocha.it)('cancels search after too many fails', function () {
	      var client = (0, _helpers.fake)(_remote.RemoteFirefox.prototype);
	      var connectToFirefox = _sinon2.default.spy(function () {
	        return new Promise(function (resolve) {
	          return resolve(client);
	        });
	      });
	      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).catch(function (err) {
	        _chai.assert.equal(err, 'WebExtError: Too many retries on port search');
	        _chai.assert.equal(connectToFirefox.callCount, 3);
	      });
	    });
	
	    (0, _mocha.it)('retries port discovery after first failure', function () {
	      var client = (0, _helpers.fake)(_remote.RemoteFirefox.prototype);
	      var callCount = 0;
	      var connectToFirefox = _sinon2.default.spy(function () {
	        callCount++;
	        return new Promise(function (resolve, reject) {
	          if (callCount === 2) {
	            reject(new _helpers.TCPConnectError('port is free'));
	          } else {
	            resolve(client);
	          }
	        });
	      });
	      return findRemotePort({ connectToFirefox: connectToFirefox, retriesLeft: 2 }).then(function (port) {
	        _chai.assert.isNumber(port);
	        _chai.assert.equal(connectToFirefox.callCount, 2);
	      });
	    });
	  });
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _errors = __webpack_require__(95);
	
	var _preferences = __webpack_require__(163);
	
	(0, _mocha.describe)('firefox/preferences', function () {
	
	  (0, _mocha.describe)('getPrefs', function () {
	
	    (0, _mocha.it)('gets Firefox prefs with some defaults', function () {
	      var prefs = (0, _preferences.getPrefs)();
	      // This is a commonly shared pref.
	      _chai.assert.equal(prefs['devtools.debugger.remote-enabled'], true);
	      // This is a Firefox only pref.
	      _chai.assert.equal(prefs['devtools.chrome.enabled'], true);
	    });
	
	    (0, _mocha.it)('gets Fennec prefs with some defaults', function () {
	      var prefs = (0, _preferences.getPrefs)('fennec');
	      // This is a commonly shared pref.
	      _chai.assert.equal(prefs['devtools.debugger.remote-enabled'], true);
	      // This is a Fennec only pref.
	      _chai.assert.equal(prefs['browser.console.showInPanel'], true);
	    });
	
	    (0, _mocha.it)('throws an error for unsupported apps', function () {
	      // $FLOW_IGNORE: ignore type errors on testing nonexistent 'thunderbird' prefs
	      _chai.assert.throws(function () {
	        return (0, _preferences.getPrefs)('thunderbird');
	      }, _errors.WebExtError, /Unsupported application: thunderbird/);
	    });
	  });
	
	  (0, _mocha.describe)('coerceCLICustomPreference', function () {
	
	    (0, _mocha.it)('converts a single --pref cli option from string to object', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)('valid.preference=true');
	      _chai.assert.isObject(prefs);
	      _chai.assert.equal(prefs['valid.preference'], true);
	    });
	
	    (0, _mocha.it)('converts array of --pref cli option values into object', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)(['valid.preference=true', 'valid.preference2=false']);
	      _chai.assert.isObject(prefs);
	      _chai.assert.equal(prefs['valid.preference'], true);
	      _chai.assert.equal(prefs['valid.preference2'], false);
	    });
	
	    (0, _mocha.it)('converts boolean values', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)('valid.preference=true');
	      _chai.assert.equal(prefs['valid.preference'], true);
	    });
	
	    (0, _mocha.it)('converts number values', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)('valid.preference=455');
	      _chai.assert.equal(prefs['valid.preference'], 455);
	    });
	
	    (0, _mocha.it)('converts float values', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)('valid.preference=4.55');
	      _chai.assert.equal(prefs['valid.preference'], '4.55');
	    });
	
	    (0, _mocha.it)('supports string values with "=" chars', function () {
	      var prefs = (0, _preferences.coerceCLICustomPreference)('valid.preference=value=withequals=chars');
	      _chai.assert.equal(prefs['valid.preference'], 'value=withequals=chars');
	    });
	
	    (0, _mocha.it)('does not allow certain default preferences to be customized', function () {
	      var nonChangeablePrefs = _preferences.nonOverridablePreferences.map(function (prop) {
	        return prop += '=true';
	      });
	      var prefs = (0, _preferences.coerceCLICustomPreference)(nonChangeablePrefs);
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = nonChangeablePrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var pref = _step.value;
	
	          _chai.assert.isUndefined(prefs[pref], pref + ' should be undefined');
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
	    });
	
	    (0, _mocha.it)('throws an error for invalid or incomplete preferences', function () {
	      _chai.assert.throws(function () {
	        return (0, _preferences.coerceCLICustomPreference)('test.invalid.prop');
	      }, _errors.UsageError, 'UsageError: Incomplete custom preference: "test.invalid.prop". ' + 'Syntax expected: "prefname=prefvalue".');
	
	      _chai.assert.throws(function () {
	        return (0, _preferences.coerceCLICustomPreference)('*&%£=true');
	      }, _errors.UsageError, 'UsageError: Invalid custom preference name: *&%£');
	    });
	  });
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _errors = __webpack_require__(95);
	
	var _helpers = __webpack_require__(138);
	
	var _remote = __webpack_require__(164);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('firefox.remote', function () {
	
	  (0, _mocha.describe)('connect', function () {
	
	    function prepareConnection() {
	      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      options = (0, _extends3.default)({
	        connectToFirefox: _sinon2.default.spy(function () {
	          return Promise.resolve((0, _helpers.fakeFirefoxClient)());
	        })
	      }, options);
	      var connect = (0, _remote2.default)(port, options);
	      return { options: options, connect: connect };
	    }
	
	    (0, _mocha.it)('resolves with a RemoteFirefox instance', function () {
	      return prepareConnection().connect.then(function (client) {
	        _chai.assert.instanceOf(client, _remote.RemoteFirefox);
	      });
	    });
	
	    (0, _mocha.it)('connects on the default port', function () {
	      var _prepareConnection = prepareConnection(),
	          connect = _prepareConnection.connect,
	          options = _prepareConnection.options;
	
	      return connect.then(function () {
	        _chai.assert.equal(options.connectToFirefox.firstCall.args[0], 6005);
	      });
	    });
	
	    (0, _mocha.it)('lets you configure the port', function () {
	      var _prepareConnection2 = prepareConnection(7000),
	          connect = _prepareConnection2.connect,
	          options = _prepareConnection2.options;
	
	      return connect.then(function () {
	        _chai.assert.equal(options.connectToFirefox.args[0], 7000);
	      });
	    });
	  });
	
	  (0, _mocha.describe)('RemoteFirefox', function () {
	
	    function fakeAddon() {
	      return { id: 'some-id', actor: 'serv1.localhost' };
	    }
	
	    function makeInstance() {
	      var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.fakeFirefoxClient)();
	
	      return new _remote.RemoteFirefox(client);
	    }
	
	    (0, _mocha.it)('listens to client events', function () {
	      var client = (0, _helpers.fakeFirefoxClient)();
	      var listener = _sinon2.default.spy(function () {});
	      client.client.on = listener;
	      makeInstance(client); // this will register listeners
	      // Make sure no errors are thrown when the client emits
	      // events and calls each handler.
	      listener.firstCall.args[1](); // disconnect
	      listener.secondCall.args[1](); // end
	      listener.thirdCall.args[1]({}); // message
	    });
	
	    (0, _mocha.describe)('disconnect', function () {
	      (0, _mocha.it)('lets you disconnect', function () {
	        var client = (0, _helpers.fakeFirefoxClient)();
	        var conn = makeInstance(client);
	        conn.disconnect();
	        _chai.assert.equal(client.disconnect.called, true);
	      });
	    });
	
	    (0, _mocha.describe)('addonRequest', function () {
	
	      (0, _mocha.it)('makes requests to an add-on actor', function () {
	        var addon = fakeAddon();
	        var stubResponse = { requestTypes: ['reload'] };
	        var client = (0, _helpers.fakeFirefoxClient)({
	          makeRequestResult: stubResponse
	        });
	
	        var conn = makeInstance(client);
	        return conn.addonRequest(addon, 'requestTypes').then(function (response) {
	
	          _chai.assert.equal(client.client.makeRequest.called, true);
	          var args = client.client.makeRequest.firstCall.args;
	          _chai.assert.equal(args[0].type, 'requestTypes');
	          _chai.assert.equal(args[0].to, 'serv1.localhost');
	
	          _chai.assert.deepEqual(response, stubResponse);
	        });
	      });
	
	      (0, _mocha.it)('throws when add-on actor requests fail', function () {
	        var addon = fakeAddon();
	        var client = (0, _helpers.fakeFirefoxClient)({
	          makeRequestError: {
	            error: 'unknownError',
	            message: 'some actor failure'
	          }
	        });
	
	        var conn = makeInstance(client);
	        return conn.addonRequest(addon, 'requestTypes').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.equal(error.message, 'unknownError: some actor failure');
	        }));
	      });
	    });
	
	    (0, _mocha.describe)('getInstalledAddon', function () {
	
	      (0, _mocha.it)('gets an installed add-on by ID', function () {
	        var someAddonId = 'some-id';
	        var client = (0, _helpers.fakeFirefoxClient)({
	          requestResult: {
	            addons: [{ id: 'another-id' }, { id: someAddonId }, { id: 'bazinga' }]
	          }
	        });
	        var conn = makeInstance(client);
	        return conn.getInstalledAddon(someAddonId).then(function (addon) {
	          _chai.assert.equal(addon.id, someAddonId);
	        });
	      });
	
	      (0, _mocha.it)('throws an error when the add-on is not installed', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          requestResult: {
	            addons: [{ id: 'one-id' }, { id: 'other-id' }]
	          }
	        });
	        var conn = makeInstance(client);
	        return conn.getInstalledAddon('missing-id').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.match(error.message, /does not have your extension installed/);
	        }));
	      });
	
	      (0, _mocha.it)('throws an error when listAddons() fails', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          requestError: new Error('some internal error')
	        });
	        var conn = makeInstance(client);
	        return conn.getInstalledAddon('some-id').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.equal(error.message, 'Remote Firefox: listAddons() error: Error: some internal error');
	        }));
	      });
	    });
	
	    (0, _mocha.describe)('checkForAddonReloading', function () {
	
	      (0, _mocha.it)('checks for reload requestType in remote debugger', function () {
	        var addon = fakeAddon();
	        var stubResponse = { requestTypes: ['reload'] };
	
	        var conn = makeInstance();
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.addonRequest = _sinon2.default.spy(function () {
	          return Promise.resolve(stubResponse);
	        });
	
	        return conn.checkForAddonReloading(addon).then(function (returnedAddon) {
	          _chai.assert.equal(conn.addonRequest.called, true);
	          var args = conn.addonRequest.firstCall.args;
	
	          _chai.assert.equal(args[0].id, addon.id);
	          _chai.assert.equal(args[1], 'requestTypes');
	
	          _chai.assert.deepEqual(returnedAddon, addon);
	        });
	      });
	
	      (0, _mocha.it)('throws an error if reload is not supported', function () {
	        var addon = fakeAddon();
	        var stubResponse = { requestTypes: ['install'] };
	        var conn = makeInstance();
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.addonRequest = function () {
	          return Promise.resolve(stubResponse);
	        };
	
	        return conn.checkForAddonReloading(addon).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /does not support add-on reloading/);
	        }));
	      });
	
	      (0, _mocha.it)('only checks for reloading once', function () {
	        var addon = fakeAddon();
	        var conn = makeInstance();
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.addonRequest = _sinon2.default.spy(function () {
	          return Promise.resolve({ requestTypes: ['reload'] });
	        });
	        return conn.checkForAddonReloading(addon).then(function (checkedAddon) {
	          return conn.checkForAddonReloading(checkedAddon);
	        }).then(function (finalAddon) {
	          // This should remember not to check a second time.
	          _chai.assert.equal(conn.addonRequest.callCount, 1);
	          _chai.assert.deepEqual(finalAddon, addon);
	        });
	      });
	    });
	
	    (0, _mocha.describe)('installTemporaryAddon', function () {
	
	      (0, _mocha.it)('throws listTabs errors', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          // listTabs response:
	          requestError: new Error('some listTabs error')
	        });
	        var conn = makeInstance(client);
	        return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.match(error.message, /some listTabs error/);
	        }));
	      });
	
	      (0, _mocha.it)('fails when there is no add-ons actor', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          // A listTabs response that does not contain addonsActor.
	          requestResult: {}
	        });
	        var conn = makeInstance(client);
	        return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.RemoteTempInstallNotSupported, function (error) {
	          _chai.assert.match(error.message, /does not provide an add-ons actor/);
	        }));
	      });
	
	      (0, _mocha.it)('lets you install an add-on temporarily', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          // listTabs response:
	          requestResult: {
	            addonsActor: 'addons1.actor.conn'
	          },
	          // installTemporaryAddon response:
	          makeRequestResult: {
	            addon: { id: 'abc123@temporary-addon' }
	          }
	        });
	        var conn = makeInstance(client);
	        return conn.installTemporaryAddon('/path/to/addon').then(function (response) {
	          _chai.assert.equal(response.addon.id, 'abc123@temporary-addon');
	        });
	      });
	
	      (0, _mocha.it)('throws install errors', function () {
	        var client = (0, _helpers.fakeFirefoxClient)({
	          // listTabs response:
	          requestResult: {
	            addonsActor: 'addons1.actor.conn'
	          },
	          // installTemporaryAddon response:
	          makeRequestError: {
	            error: 'install error',
	            message: 'error message'
	          }
	        });
	        var conn = makeInstance(client);
	        return conn.installTemporaryAddon('/path/to/addon').then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.WebExtError, function (error) {
	          _chai.assert.match(error.message, /install error: error message/);
	        }));
	      });
	    });
	
	    (0, _mocha.describe)('reloadAddon', function () {
	
	      (0, _mocha.it)('asks the actor to reload the add-on', function () {
	        var addon = fakeAddon();
	        var conn = makeInstance();
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.getInstalledAddon = _sinon2.default.spy(function () {
	          return Promise.resolve(addon);
	        });
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.checkForAddonReloading = function (addonToCheck) {
	          return Promise.resolve(addonToCheck);
	        };
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.addonRequest = _sinon2.default.spy(function () {
	          return Promise.resolve({});
	        });
	
	        return conn.reloadAddon('some-id').then(function () {
	          _chai.assert.equal(conn.getInstalledAddon.called, true);
	          _chai.assert.equal(conn.getInstalledAddon.firstCall.args[0], 'some-id');
	
	          _chai.assert.equal(conn.addonRequest.called, true);
	          var requestArgs = conn.addonRequest.firstCall.args;
	          _chai.assert.deepEqual(requestArgs[0], addon);
	          _chai.assert.equal(requestArgs[1], 'reload');
	        });
	      });
	
	      (0, _mocha.it)('makes sure the addon can be reloaded', function () {
	        var addon = fakeAddon();
	        var conn = makeInstance();
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.getInstalledAddon = function () {
	          return Promise.resolve(addon);
	        };
	        // $FLOW_IGNORE: override class method for testing reasons.
	        conn.checkForAddonReloading = _sinon2.default.spy(function (addonToCheck) {
	          return Promise.resolve(addonToCheck);
	        });
	
	        return conn.reloadAddon(addon.id).then(function () {
	          _chai.assert.equal(conn.checkForAddonReloading.called, true);
	          _chai.assert.deepEqual(conn.checkForAddonReloading.firstCall.args[0], addon);
	        });
	      });
	    });
	  });
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _mz = __webpack_require__(5);
	
	var _errors = __webpack_require__(95);
	
	var _tempDir = __webpack_require__(129);
	
	var _artifacts = __webpack_require__(125);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('prepareArtifactsDir', function () {
	
	  (0, _mocha.it)('creates an artifacts dir if needed', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'build');
	      return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then(function () {
	        // This should not throw an error if created properly.
	        return _mz.fs.stat(artifactsDir);
	      });
	    });
	  });
	
	  (0, _mocha.it)('ignores existing artifacts dir', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _artifacts.prepareArtifactsDir)(tmpDir.path()).then(function () {
	        // Make sure everything is still cool with this path.
	        return _mz.fs.stat(tmpDir.path());
	      });
	    });
	  });
	
	  (0, _mocha.it)('ensures the path is really a directory', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var someFile = _path2.default.join(tmpDir.path(), 'some-file.txt');
	      return _mz.fs.writeFile(someFile, 'some content').then(function () {
	        return (0, _artifacts.prepareArtifactsDir)(someFile);
	      }).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	        _chai.assert.match(error.message, /not a directory/);
	      }));
	    });
	  });
	
	  (0, _mocha.it)('resolves with the artifacts dir', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'artifacts');
	      return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then(function (resolvedDir) {
	        _chai.assert.equal(resolvedDir, artifactsDir);
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws an UsageError when it lacks permissions to stat the directory', function () {
	    var _this = this;
	
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      if (process.platform === 'win32') {
	        _this.skip();
	        return;
	      }
	      var tmpPath = _path2.default.join(tmpDir.path(), 'build');
	      return _mz.fs.mkdir(tmpPath, '0622').then(function () {
	        var artifactsDir = _path2.default.join(tmpPath, 'artifacts');
	        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /Cannot access.*lacks permissions/);
	        }));
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws error when directory exists but lacks writing permissions', function () {
	    var _this2 = this;
	
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      if (process.platform === 'win32') {
	        _this2.skip();
	        return;
	      }
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'dir-nowrite');
	      return _mz.fs.mkdir(artifactsDir, '0555').then(function () {
	        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /exists.*lacks permissions/);
	        }));
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws error when creating a folder if lacks writing permissions', function () {
	    var _this3 = this;
	
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      if (process.platform === 'win32') {
	        _this3.skip();
	        return;
	      }
	      var parentDir = _path2.default.join(tmpDir.path(), 'dir-nowrite');
	      var artifactsDir = _path2.default.join(parentDir, 'artifacts');
	      return _mz.fs.mkdir(parentDir, '0555').then(function () {
	        return (0, _artifacts.prepareArtifactsDir)(artifactsDir).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	          _chai.assert.match(error.message, /Cannot create.*lacks permissions/);
	        }));
	      });
	    });
	  });
	
	  (0, _mocha.it)('creates the artifacts dir successfully if the parent dir does not exist', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var tmpPath = _path2.default.join(tmpDir.path(), 'build', 'subdir');
	      return (0, _artifacts.prepareArtifactsDir)(tmpPath).then(function (resolvedDir) {
	        _chai.assert.equal(resolvedDir, tmpPath);
	      });
	    });
	  });
	
	  (0, _mocha.it)('throws error when creating a folder if there is not enough space', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var fakeAsyncMkdirp = _sinon2.default.spy(function () {
	        return Promise.reject(new _helpers.ErrorWithCode('ENOSPC', 'an error'));
	      });
	      var tmpPath = _path2.default.join(tmpDir.path(), 'build', 'subdir');
	      return (0, _artifacts.prepareArtifactsDir)(tmpPath, { asyncMkdirp: fakeAsyncMkdirp }).then((0, _helpers.makeSureItFails)(), function (error) {
	        _chai.assert.ok(fakeAsyncMkdirp.called);
	        _chai.assert.equal(error.message, 'an error');
	      });
	    });
	  });
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _desktopNotifier = __webpack_require__(157);
	
	var _logger = __webpack_require__(84);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('util/desktop-notifier', function () {
	  (0, _mocha.describe)('desktopNotifications()', function () {
	    var expectedNotification = {
	      title: 'web-ext run: title',
	      message: 'message'
	    };
	
	    (0, _mocha.it)('is called and creates a message with correct parameters', function () {
	      var fakeNotifier = {
	        notify: _sinon2.default.spy(function (options, callback) {
	          return callback();
	        })
	      };
	      return (0, _desktopNotifier.showDesktopNotification)(expectedNotification, {
	        notifier: fakeNotifier
	      }).then(function () {
	        _chai.assert.ok(fakeNotifier.notify.called);
	        _chai.assert.equal(fakeNotifier.notify.firstCall.args[0].title, 'web-ext run: title');
	        _chai.assert.equal(fakeNotifier.notify.firstCall.args[0].message, 'message');
	      });
	    });
	
	    (0, _mocha.it)('logs error when notifier fails', function () {
	      var expectedError = new Error('an error');
	      var fakeLog = (0, _logger.createLogger)(__filename);
	      _sinon2.default.spy(fakeLog, 'debug');
	      var fakeNotifier = {
	        notify: function notify(obj, callback) {
	          callback(expectedError, 'response');
	        }
	      };
	
	      return (0, _desktopNotifier.showDesktopNotification)(expectedNotification, {
	        notifier: fakeNotifier,
	        log: fakeLog
	      }).then((0, _helpers.makeSureItFails)()).catch(function () {
	        _chai.assert.ok(fakeLog.debug.called);
	        _chai.assert.equal(fakeLog.debug.firstCall.args[0], 'Desktop notifier error: ' + expectedError.message + ', ' + 'response: response');
	      });
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit/test-util/test.desktop-notifier.js"))

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _fileFilter = __webpack_require__(127);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('util/file-filter', function () {
	
	  var newFileFilter = function newFileFilter() {
	    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    return new _fileFilter.FileFilter((0, _extends3.default)({
	      sourceDir: '.'
	    }, params));
	  };
	
	  (0, _mocha.describe)('default', function () {
	    var defaultFilter = newFileFilter();
	
	    (0, _mocha.it)('ignores long XPI paths', function () {
	      _chai.assert.equal(defaultFilter.wantFile('path/to/some.xpi'), false);
	    });
	
	    (0, _mocha.it)('ignores short XPI paths', function () {
	      _chai.assert.equal(defaultFilter.wantFile('some.xpi'), false);
	    });
	
	    (0, _mocha.it)('ignores .git directories', function () {
	      _chai.assert.equal(defaultFilter.wantFile('.git'), false);
	    });
	
	    (0, _mocha.it)('ignores nested .git directories', function () {
	      _chai.assert.equal(defaultFilter.wantFile('path/to/.git'), false);
	    });
	
	    (0, _mocha.it)('ignores any hidden file', function () {
	      _chai.assert.equal(defaultFilter.wantFile('.whatever'), false);
	    });
	
	    (0, _mocha.it)('ignores subdirectories within hidden folders', function () {
	      _chai.assert.equal(defaultFilter.wantFile('.git/some/other/stuff'), false);
	    });
	
	    (0, _mocha.it)('ignores ZPI paths', function () {
	      _chai.assert.equal(defaultFilter.wantFile('path/to/some.zip'), false);
	    });
	
	    (0, _mocha.it)('allows other files', function () {
	      _chai.assert.equal(defaultFilter.wantFile('manifest.json'), true);
	    });
	
	    (0, _mocha.it)('ignores node_modules by default', function () {
	      _chai.assert.equal(defaultFilter.wantFile('path/to/node_modules'), false);
	    });
	
	    (0, _mocha.it)('ignores module content within node_modules by default', function () {
	      _chai.assert.equal(defaultFilter.wantFile('node_modules/something/file.js'), false);
	    });
	  });
	
	  (0, _mocha.describe)('options', function () {
	
	    (0, _mocha.it)('override the defaults with baseIgnoredPatterns', function () {
	      var filter = newFileFilter({
	        baseIgnoredPatterns: ['manifest.json']
	      });
	      _chai.assert.equal(filter.wantFile('some.xpi'), true);
	      _chai.assert.equal(filter.wantFile('manifest.json'), false);
	    });
	
	    (0, _mocha.it)('add more files to ignore with ignoreFiles', function () {
	      var filter = newFileFilter({
	        ignoreFiles: ['*.log']
	      });
	      _chai.assert.equal(filter.wantFile('some.xpi'), false);
	      _chai.assert.equal(filter.wantFile('some.log'), false);
	    });
	
	    (0, _mocha.it)('ignore artifactsDir and its content', function () {
	      var filter = newFileFilter({
	        artifactsDir: 'artifacts'
	      });
	      _chai.assert.equal(filter.wantFile('artifacts'), false);
	      _chai.assert.equal(filter.wantFile('artifacts/some.js'), false);
	    });
	
	    (0, _mocha.it)('does not ignore an artifactsDir outside of sourceDir', function () {
	      var filter = newFileFilter({
	        artifactsDir: '.',
	        sourceDir: 'dist'
	      });
	      _chai.assert.equal(filter.wantFile('file'), true);
	      _chai.assert.equal(filter.wantFile('dist/file'), true);
	    });
	
	    (0, _mocha.it)('resolve relative path', function () {
	      var filter = newFileFilter({
	        sourceDir: '/src',
	        artifactsDir: 'artifacts',
	        ignoreFiles: ['ignore-dir/', 'some.js', '**/some.log', 'ignore/dir/content/**/*']
	      });
	      _chai.assert.equal(filter.wantFile('/src/artifacts'), true);
	      _chai.assert.equal(filter.wantFile('/src/ignore-dir'), false);
	      _chai.assert.equal(filter.wantFile('/src/ignore-dir/some.css'), true);
	      _chai.assert.equal(filter.wantFile('/src/some.js'), false);
	      _chai.assert.equal(filter.wantFile('/src/some.log'), false);
	      _chai.assert.equal(filter.wantFile('/src/other/some.js'), true);
	      _chai.assert.equal(filter.wantFile('/src/other/some.log'), false);
	      _chai.assert.equal(filter.wantFile('/src/ignore/dir/content'), true);
	      _chai.assert.equal(filter.wantFile('/src/ignore/dir/content/file.js'), false);
	      // This file is not ignored because it's not relative to /src:
	      _chai.assert.equal(filter.wantFile('/some.js'), true);
	    });
	  });
	
	  (0, _mocha.describe)('isSubPath', function () {
	    (0, _mocha.it)('test if target is a sub directory of src', function () {
	      _chai.assert.equal((0, _fileFilter.isSubPath)('dist', '.'), false);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('.', 'artifacts'), true);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('.', '.'), false);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/src/dist', '/src'), false);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/artifacts'), true);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src'), false);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/firstroot', '/secondroot'), false);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/.dir'), true);
	      _chai.assert.equal((0, _fileFilter.isSubPath)('/src', '/src/..dir'), true);
	    });
	  });
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mz = __webpack_require__(5);
	
	var _chai = __webpack_require__(7);
	
	var _mocha = __webpack_require__(6);
	
	var _isDirectory = __webpack_require__(162);
	
	var _isDirectory2 = _interopRequireDefault(_isDirectory);
	
	var _tempDir = __webpack_require__(129);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('util.isDirectory', function () {
	
	  (0, _mocha.it)('resolves true for a directory', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _isDirectory2.default)(tmpDir.path()).then(function (dirExists) {
	        _chai.assert.equal(dirExists, true);
	      });
	    });
	  });
	
	  (0, _mocha.it)('resolves false for non-existent paths', function () {
	    return (0, _isDirectory2.default)('/dev/null/not-a-real-path-at-all').then(function (dirExists) {
	      _chai.assert.equal(dirExists, false);
	    });
	  });
	
	  (0, _mocha.it)('resolves false for non-directory paths', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var filePath = _path2.default.join(tmpDir.path(), 'some.txt');
	      return _mz.fs.writeFile(filePath, 'some text').then(function () {
	        return (0, _isDirectory2.default)(filePath);
	      }).then(function (dirExists) {
	        _chai.assert.equal(dirExists, false);
	      });
	    });
	  });
	
	  (0, _mocha.it)('resolves false for incomplete directory paths', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return (0, _isDirectory2.default)(_path2.default.join(tmpDir.path(), 'missing-leaf')).then(function (dirExists) {
	        _chai.assert.equal(dirExists, false);
	      });
	    });
	  });
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(96);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(116);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _tty = __webpack_require__(178);
	
	var _bunyan = __webpack_require__(90);
	
	var _bunyan2 = _interopRequireDefault(_bunyan);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('logger', function () {
	
	  (0, _mocha.describe)('createLogger', function () {
	
	    (0, _mocha.it)('makes file names less redundant', function () {
	      var createBunyanLog = _sinon2.default.spy(function () {});
	      (0, _logger.createLogger)('src/some-file.js', { createBunyanLog: createBunyanLog });
	      _chai.assert.equal(createBunyanLog.firstCall.args[0].name, 'some-file.js');
	    });
	  });
	
	  (0, _mocha.describe)('ConsoleStream', function () {
	
	    function packet(overrides) {
	      return (0, _extends3.default)({
	        name: 'some name',
	        msg: 'some messge',
	        level: _bunyan2.default.INFO
	      }, overrides);
	    }
	
	    // NOTE: create a fake process that makes flow happy.
	    function fakeProcess() {
	      var FakeWritableStream = function (_WriteStream) {
	        (0, _inherits3.default)(FakeWritableStream, _WriteStream);
	
	        function FakeWritableStream() {
	          (0, _classCallCheck3.default)(this, FakeWritableStream);
	          return (0, _possibleConstructorReturn3.default)(this, (FakeWritableStream.__proto__ || Object.getPrototypeOf(FakeWritableStream)).apply(this, arguments));
	        }
	
	        (0, _createClass3.default)(FakeWritableStream, [{
	          key: 'write',
	          value: function write() {
	            return true;
	          }
	        }]);
	        return FakeWritableStream;
	      }(_tty.WriteStream);
	
	      var fakeWritableStream = new FakeWritableStream();
	      _sinon2.default.spy(fakeWritableStream, 'write');
	
	      return {
	        stdout: fakeWritableStream
	      };
	    }
	
	    (0, _mocha.it)('lets you turn on verbose logging', function () {
	      var log = new _logger.ConsoleStream({ verbose: false });
	      log.makeVerbose();
	      _chai.assert.equal(log.verbose, true);
	    });
	
	    (0, _mocha.it)('logs names in verbose mode', function () {
	      var log = new _logger.ConsoleStream({ verbose: true });
	      _chai.assert.equal(log.format(packet({
	        name: 'foo',
	        msg: 'some message',
	        level: _bunyan2.default.DEBUG
	      })), '[foo][debug] some message\n');
	    });
	
	    (0, _mocha.it)('does not log names in non-verbose mode', function () {
	      var log = new _logger.ConsoleStream({ verbose: false });
	      _chai.assert.equal(log.format(packet({ name: 'foo', msg: 'some message' })), 'some message\n');
	    });
	
	    (0, _mocha.it)('does not log debug packets unless verbose', function () {
	      var log = new _logger.ConsoleStream({ verbose: false });
	      var localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.DEBUG }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, false);
	    });
	
	    (0, _mocha.it)('does not log trace packets unless verbose', function () {
	      var log = new _logger.ConsoleStream({ verbose: false });
	      var localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.TRACE }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, false);
	    });
	
	    (0, _mocha.it)('logs debug packets when verbose', function () {
	      var log = new _logger.ConsoleStream({ verbose: true });
	      var localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.DEBUG }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, true);
	    });
	
	    (0, _mocha.it)('logs trace packets when verbose', function () {
	      var log = new _logger.ConsoleStream({ verbose: true });
	      var localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.TRACE }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, true);
	    });
	
	    (0, _mocha.it)('logs info packets when verbose or not', function () {
	      var log = new _logger.ConsoleStream({ verbose: false });
	      var localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.INFO }), { localProcess: localProcess });
	      log.makeVerbose();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ level: _bunyan2.default.INFO }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.callCount, 2);
	    });
	
	    (0, _mocha.it)('lets you capture logging', function () {
	      var log = new _logger.ConsoleStream();
	      var localProcess = fakeProcess();
	
	      log.startCapturing();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet({ msg: 'message' }), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, false);
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.flushCapturedLogs({ localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.called, true);
	      _chai.assert.equal(localProcess.stdout.write.firstCall.args[0], 'message\n');
	    });
	
	    (0, _mocha.it)('only flushes captured messages once', function () {
	      var log = new _logger.ConsoleStream();
	      var localProcess = fakeProcess();
	
	      log.startCapturing();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet(), { localProcess: localProcess });
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.flushCapturedLogs({ localProcess: localProcess });
	
	      // Make sure there is nothing more to flush.
	      localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.flushCapturedLogs({ localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.callCount, 0);
	    });
	
	    (0, _mocha.it)('lets you start and stop capturing', function () {
	      var log = new _logger.ConsoleStream();
	      var localProcess = fakeProcess();
	
	      log.startCapturing();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet(), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.callCount, 0);
	
	      log.stopCapturing();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.write(packet(), { localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.callCount, 1);
	
	      // Make sure that when we start capturing again,
	      // the queue gets reset.
	      log.startCapturing();
	      log.write(packet());
	      localProcess = fakeProcess();
	      // $FLOW_IGNORE: fake process for testing reasons.
	      log.flushCapturedLogs({ localProcess: localProcess });
	      _chai.assert.equal(localProcess.stdout.write.callCount, 1);
	    });
	  });
	});

/***/ },
/* 178 */
/***/ function(module, exports) {

	module.exports = require("tty");

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _mz = __webpack_require__(5);
	
	var _chai = __webpack_require__(7);
	
	var _tempDir = __webpack_require__(129);
	
	var _helpers = __webpack_require__(138);
	
	(0, _mocha.describe)('util.withTempDir', function () {
	
	  (0, _mocha.it)('creates a temp directory', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      // Make sure the directory exists.
	      return _mz.fs.stat(tmpDir.path());
	    });
	  });
	
	  (0, _mocha.it)('destroys the directory on completion', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      return Promise.resolve(tmpDir.path());
	    }).then(function (tmpPath) {
	      return _mz.fs.stat(tmpPath);
	    }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /ENOENT.* stat/);
	    });
	  });
	
	  (0, _mocha.it)('destroys the directory on error', function () {
	    var tmpPath;
	    var tmpPathExisted = false;
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      tmpPath = tmpDir.path();
	      return _mz.fs.stat(tmpPath).then(function () {
	        tmpPathExisted = true;
	        throw new Error('simulated error');
	      });
	    }).then((0, _helpers.makeSureItFails)()).catch(function () {
	      _chai.assert.equal(tmpPathExisted, true);
	      return _mz.fs.stat(tmpPath);
	    }).catch(function (error) {
	      _chai.assert.match(error.message, /ENOENT.* stat/);
	    });
	  });
	});
	
	
	(0, _mocha.describe)('util.TempDir', function () {
	
	  (0, _mocha.it)('requires you to create the directory before accessing path()', function () {
	    var tmp = new _tempDir.TempDir();
	    _chai.assert.throws(function () {
	      return tmp.path();
	    }, /cannot access path.* before.* create/);
	  });
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _updates = __webpack_require__(181);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('util/updates', function () {
	  (0, _mocha.describe)('checkForUpdates()', function () {
	    (0, _mocha.it)('calls the notifier with the correct parameters', function () {
	      var updateNotifierStub = _sinon2.default.spy(function () {
	        return {
	          notify: _sinon2.default.spy()
	        };
	      });
	
	      (0, _updates.checkForUpdates)({
	        version: '1.0.0',
	        updateNotifier: updateNotifierStub
	      });
	      _chai.assert.equal(updateNotifierStub.called, true);
	      _chai.assert.equal(updateNotifierStub.firstCall.args[0].pkg.name, 'web-ext');
	      _chai.assert.equal(updateNotifierStub.firstCall.args[0].pkg.version, '1.0.0');
	      _chai.assert.isNumber(updateNotifierStub.firstCall.args[0].updateCheckInterval);
	      _chai.assert.equal(updateNotifierStub.firstCall.args[0].updateCheckInterval, 1000 * 60 * 60 * 24 * 3);
	    });
	  });
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkForUpdates = checkForUpdates;
	
	var _updateNotifier = __webpack_require__(182);
	
	var _updateNotifier2 = _interopRequireDefault(_updateNotifier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function checkForUpdates(_ref) {
	  var version = _ref.version,
	      _ref$updateNotifier = _ref.updateNotifier,
	      updateNotifier = _ref$updateNotifier === undefined ? _updateNotifier2.default : _ref$updateNotifier;
	
	  var pkg = { name: 'web-ext', version: version };
	
	  updateNotifier({
	    pkg: pkg,
	    updateCheckInterval: 1000 * 60 * 60 * 24 * 3 }).notify();
	}

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = require("update-notifier");

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _chai = __webpack_require__(7);
	
	var _mocha = __webpack_require__(6);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _mz = __webpack_require__(5);
	
	var _program = __webpack_require__(184);
	
	var _config = __webpack_require__(189);
	
	var _tempDir = __webpack_require__(129);
	
	var _errors = __webpack_require__(95);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeArgv(_ref) {
	  var _ref$userCmd = _ref.userCmd,
	      userCmd = _ref$userCmd === undefined ? ['fakecommand'] : _ref$userCmd,
	      _ref$command = _ref.command,
	      command = _ref$command === undefined ? 'fakecommand' : _ref$command,
	      _ref$commandDesc = _ref.commandDesc,
	      commandDesc = _ref$commandDesc === undefined ? 'this is a fake command' : _ref$commandDesc,
	      _ref$commandExecutor = _ref.commandExecutor,
	      commandExecutor = _ref$commandExecutor === undefined ? _sinon2.default.stub() : _ref$commandExecutor,
	      commandOpt = _ref.commandOpt,
	      globalOpt = _ref.globalOpt;
	
	  var program = new _program.Program(userCmd);
	
	  if (globalOpt) {
	    program.setGlobalOptions(globalOpt);
	  }
	  if (commandOpt) {
	    program.command(command, commandDesc, commandExecutor, commandOpt);
	  }
	  return {
	    argv: program.yargs.exitProcess(false).argv,
	    defaultValues: program.defaultValues,
	    commandExecuted: command
	  };
	}
	
	
	var applyConf = function applyConf(params) {
	  return (0, _config.applyConfigToArgv)((0, _extends3.default)({
	    configFileName: 'some/path/to/config.js'
	  }, params));
	};
	
	(0, _mocha.describe)('config', function () {
	  (0, _mocha.describe)('applyConfigToArgv', function () {
	
	    (0, _mocha.it)('preserves a string value on the command line over configured', function () {
	      var cmdLineSrcDir = '/user/specified/source/dir/';
	
	      var _makeArgv = makeArgv({
	        userCmd: ['fakecommand', '--source-dir', cmdLineSrcDir],
	        globalOpt: {
	          'source-dir': {
	            requiresArg: true,
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv.argv,
	          defaultValues = _makeArgv.defaultValues;
	
	      var configObject = {
	        sourceDir: '/configured/source/dir'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
	    });
	
	    (0, _mocha.it)('preserves configured value over default', function () {
	      var _makeArgv2 = makeArgv({
	        globalOpt: {
	          'source-dir': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'default/value/option/definition'
	          }
	        }
	      }),
	          argv = _makeArgv2.argv,
	          defaultValues = _makeArgv2.defaultValues;
	
	      var configObject = {
	        sourceDir: '/configured/source/dir'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, configObject.sourceDir);
	    });
	
	    (0, _mocha.it)('preserves a string value on the command line over all others', function () {
	      var cmdLineSrcDir = '/user/specified/source/dir/';
	
	      var _makeArgv3 = makeArgv({
	        userCmd: ['fakecommand', '--sourceDir', cmdLineSrcDir],
	        globalOpt: {
	          'source-dir': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'default/value/option/definition'
	          }
	        }
	      }),
	          argv = _makeArgv3.argv,
	          defaultValues = _makeArgv3.defaultValues;
	
	      var configObject = {
	        sourceDir: '/configured/source/dir'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
	    });
	
	    (0, _mocha.it)('preserves default value of option if not in config', function () {
	      var _makeArgv4 = makeArgv({
	        globalOpt: {
	          'source-dir': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'default/value/option/definition'
	          },
	          'artifacts-dir': {
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv4.argv,
	          defaultValues = _makeArgv4.defaultValues;
	
	      var configObject = {
	        artifactsDir: '/configured/artifacts/dir'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, 'default/value/option/definition');
	    });
	
	    (0, _mocha.it)('preserves value on the command line if not in config', function () {
	      var cmdLineSrcDir = '/user/specified/source/dir/';
	
	      var _makeArgv5 = makeArgv({
	        userCmd: ['fakecommand', '--sourceDir', cmdLineSrcDir],
	        globalOpt: {
	          'source-dir': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'default/value/option/definition'
	          },
	          'artifacts-dir': {
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv5.argv,
	          defaultValues = _makeArgv5.defaultValues;
	
	      var configObject = {
	        artifactsDir: '/configured/artifacts/dir'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
	    });
	
	    (0, _mocha.it)('uses a configured boolean value over an implicit default', function () {
	      var _makeArgv6 = makeArgv({
	        globalOpt: {
	          'overwrite-files': {
	            type: 'boolean'
	          }
	        }
	      }),
	          argv = _makeArgv6.argv,
	          defaultValues = _makeArgv6.defaultValues;
	
	      var configObject = {
	        overwriteFiles: true
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
	    });
	
	    (0, _mocha.it)('uses a configured boolean value over an explicit default', function () {
	      var _makeArgv7 = makeArgv({
	        globalOpt: {
	          'overwrite-files': {
	            type: 'boolean',
	            default: false
	          }
	        }
	      }),
	          argv = _makeArgv7.argv,
	          defaultValues = _makeArgv7.defaultValues;
	
	      var configObject = {
	        overwriteFiles: true
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
	    });
	
	    (0, _mocha.it)('uses a CLI boolean value over a configured one', function () {
	      var _makeArgv8 = makeArgv({
	        userCmd: ['fakecommand', '--overwrite-files'],
	        globalOpt: {
	          'overwrite-files': {
	            type: 'boolean'
	          }
	        }
	      }),
	          argv = _makeArgv8.argv,
	          defaultValues = _makeArgv8.defaultValues;
	
	      var configObject = {
	        overwriteFiles: false
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.overwriteFiles, true);
	    });
	
	    (0, _mocha.it)('uses CLI option over undefined configured option and default', function () {
	      var cmdLineSrcDir = '/user/specified/source/dir/';
	
	      var _makeArgv9 = makeArgv({
	        userCmd: ['fakecommand', '--source-dir', cmdLineSrcDir],
	        globalOpt: {
	          'source-dir': {
	            type: 'string'
	          },
	          'verbose': {
	            type: 'boolean'
	          }
	        }
	      }),
	          argv = _makeArgv9.argv,
	          defaultValues = _makeArgv9.defaultValues;
	
	      var configObject = {
	        verbose: true
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, cmdLineSrcDir);
	    });
	
	    (0, _mocha.it)('uses a configured number value over a falsey default', function () {
	      var _makeArgv10 = makeArgv({
	        userCmd: ['fakecommand'],
	        globalOpt: {
	          'number-of-retries': {
	            type: 'number',
	            default: 0
	          }
	        }
	      }),
	          argv = _makeArgv10.argv,
	          defaultValues = _makeArgv10.defaultValues;
	
	      var configObject = {
	        numberOfRetries: 1
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.numberOfRetries, 1);
	    });
	
	    (0, _mocha.it)('uses a falsey CLI number value over a configured one', function () {
	      var _makeArgv11 = makeArgv({
	        userCmd: ['fakecommand', '--number-of-retries=0'],
	        globalOpt: {
	          'number-of-retries': {
	            type: 'number',
	            default: 1
	          }
	        }
	      }),
	          argv = _makeArgv11.argv,
	          defaultValues = _makeArgv11.defaultValues;
	
	      var configObject = {
	        numberOfRetries: 1
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.numberOfRetries, 0);
	    });
	
	    (0, _mocha.it)('uses configured value even when option defaults to undefined', function () {
	      var _makeArgv12 = makeArgv({
	        globalOpt: {
	          'source-dir': {
	            type: 'string',
	            default: undefined
	          }
	        }
	      }),
	          argv = _makeArgv12.argv,
	          defaultValues = _makeArgv12.defaultValues;
	
	      var configObject = {
	        sourceDir: '/configured/directory'
	      };
	      var newArgv = applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      _chai.assert.strictEqual(newArgv.sourceDir, '/configured/directory');
	    });
	
	    (0, _mocha.it)('throws an error when an option is not camel cased', function () {
	      var _makeArgv13 = makeArgv({
	        globalOpt: {
	          'source-dir': {
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv13.argv,
	          defaultValues = _makeArgv13.defaultValues;
	
	      var configObject = {
	        'source-dir': 'fake/value/'
	      };
	      _chai.assert.throws(function () {
	        applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues });
	      }, _errors.UsageError, 'UsageError: The config option "source-dir" must be ' + 'specified in camel case: "sourceDir"');
	    });
	
	    (0, _mocha.it)('throws an error when an option is invalid', function () {
	      var _makeArgv14 = makeArgv({
	        globalOpt: {
	          'source-dir': {
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv14.argv,
	          defaultValues = _makeArgv14.defaultValues;
	
	      var configFileName = 'fake/path/to/config';
	      var configObject = {
	        artifactsDir: 'fake/artifacts/dir'
	      };
	      _chai.assert.throws(function () {
	        applyConf({ argv: argv, configObject: configObject, defaultValues: defaultValues, configFileName: configFileName });
	      }, _errors.UsageError, 'UsageError: The config file at fake/path/to/config ' + 'specified an unknown option: "artifactsDir"');
	    });
	  });
	
	  (0, _mocha.describe)('sub commands', function () {
	    (0, _mocha.it)('preserves configured value over default', function () {
	      var _makeArgv15 = makeArgv({
	        userCmd: ['sign'],
	        command: 'sign',
	        commandOpt: {
	          'api-key': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value'
	          }
	        }
	      }),
	          argv = _makeArgv15.argv,
	          defaultValues = _makeArgv15.defaultValues,
	          commandExecuted = _makeArgv15.commandExecuted;
	
	      var configObject = {
	        sign: {
	          apiKey: 'custom-configured-key'
	        }
	      };
	      var newArgv = applyConf({
	        argv: argv,
	        configObject: configObject,
	        defaultValues: defaultValues,
	        commandExecuted: commandExecuted
	      });
	      _chai.assert.strictEqual(newArgv.apiKey, configObject.sign.apiKey);
	    });
	
	    (0, _mocha.it)('preserves CLI value over default and configured', function () {
	      var cmdApiKey = 'api-key-cmd';
	
	      var _makeArgv16 = makeArgv({
	        userCmd: ['sign', '--api-key', cmdApiKey],
	        command: 'sign',
	        commandOpt: {
	          'api-key': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value'
	          }
	        }
	      }),
	          argv = _makeArgv16.argv,
	          defaultValues = _makeArgv16.defaultValues,
	          commandExecuted = _makeArgv16.commandExecuted;
	
	      var configObject = {
	        sign: {
	          apiKey: 'custom-configured-key'
	        }
	      };
	      var newArgv = applyConf({
	        argv: argv,
	        configObject: configObject,
	        defaultValues: defaultValues,
	        commandExecuted: commandExecuted
	      });
	      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
	    });
	
	    (0, _mocha.it)('preserves CLI value over configured', function () {
	      var cmdApiKey = 'api-key-cmd';
	
	      var _makeArgv17 = makeArgv({
	        userCmd: ['sign', '--api-key', cmdApiKey],
	        command: 'sign',
	        commandOpt: {
	          'api-key': {
	            requiresArg: true,
	            type: 'string',
	            demand: false
	          }
	        }
	      }),
	          argv = _makeArgv17.argv,
	          defaultValues = _makeArgv17.defaultValues,
	          commandExecuted = _makeArgv17.commandExecuted;
	
	      var configObject = {
	        sign: {
	          apiKey: 'custom-configured-key'
	        }
	      };
	      var newArgv = applyConf({
	        argv: argv,
	        configObject: configObject,
	        defaultValues: defaultValues,
	        commandExecuted: commandExecuted
	      });
	      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
	    });
	
	    (0, _mocha.it)('preserves default value if not in config', function () {
	      var _makeArgv18 = makeArgv({
	        userCmd: ['sign'],
	        command: 'sign',
	        commandOpt: {
	          'api-key': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value-of-apiKey'
	          },
	          'api-url': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value-of-apiUrl'
	          }
	        }
	      }),
	          argv = _makeArgv18.argv,
	          defaultValues = _makeArgv18.defaultValues,
	          commandExecuted = _makeArgv18.commandExecuted;
	
	      var configObject = {
	        sign: {
	          apiKey: 'custom-configured-key'
	        }
	      };
	      var newArgv = applyConf({
	        argv: argv,
	        configObject: configObject,
	        defaultValues: defaultValues,
	        commandExecuted: commandExecuted
	      });
	      _chai.assert.strictEqual(newArgv.apiUrl, 'pretend-default-value-of-apiUrl');
	    });
	
	    (0, _mocha.it)('preserves CLI value if not in config', function () {
	      var cmdApiKey = 'api-key-cmd';
	
	      var _makeArgv19 = makeArgv({
	        userCmd: ['sign', '--api-key', cmdApiKey],
	        command: 'sign',
	        commandOpt: {
	          'api-key': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value-of-apiKey'
	          },
	          'api-url': {
	            requiresArg: true,
	            type: 'string',
	            demand: false,
	            default: 'pretend-default-value-of-apiUrl'
	          }
	        }
	      }),
	          argv = _makeArgv19.argv,
	          defaultValues = _makeArgv19.defaultValues,
	          commandExecuted = _makeArgv19.commandExecuted;
	
	      var configObject = {
	        sign: {
	          apiUrl: 'custom-configured-url'
	        }
	      };
	      var newArgv = applyConf({
	        argv: argv,
	        configObject: configObject,
	        defaultValues: defaultValues,
	        commandExecuted: commandExecuted
	      });
	      _chai.assert.strictEqual(newArgv.apiKey, cmdApiKey);
	    });
	  });
	
	  (0, _mocha.describe)('loadJSConfigFile', function () {
	    (0, _mocha.it)('throws an error if the config file does not exist', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        _chai.assert.throws(function () {
	          (0, _config.loadJSConfigFile)(_path2.default.join(tmpDir.path(), 'non-existant-config.js'));
	        }, _errors.UsageError, /Cannot read config file/);
	      });
	    });
	
	    (0, _mocha.it)('throws an error if the config file has syntax errors', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
	        _mz.fs.writeFileSync(configFilePath,
	        // missing = in two places
	        'module.exports {\n                sourceDir \'path/to/fake/source/dir\',\n              };');
	        _chai.assert.throws(function () {
	          (0, _config.loadJSConfigFile)(configFilePath);
	        }, _errors.UsageError);
	      });
	    });
	
	    (0, _mocha.it)('parses the configuration file correctly', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
	        _mz.fs.writeFileSync(configFilePath, 'module.exports = {\n              sourceDir: \'path/to/fake/source/dir\',\n            };');
	        var configObj = (0, _config.loadJSConfigFile)(configFilePath);
	        _chai.assert.equal(configObj.sourceDir, 'path/to/fake/source/dir');
	      });
	    });
	
	    (0, _mocha.it)('does not throw an error for an empty config', function () {
	      return (0, _tempDir.withTempDir)(function (tmpDir) {
	        var configFilePath = _path2.default.join(tmpDir.path(), 'config.js');
	        _mz.fs.writeFileSync(configFilePath, '{};');
	        (0, _config.loadJSConfigFile)(configFilePath);
	      });
	    });
	  });
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Program = undefined;
	
	var _regenerator = __webpack_require__(10);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(12);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(86);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	exports.defaultVersionGetter = defaultVersionGetter;
	exports.main = main;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _fs = __webpack_require__(78);
	
	var _gitRevSync = __webpack_require__(185);
	
	var _gitRevSync2 = _interopRequireDefault(_gitRevSync);
	
	var _yargs = __webpack_require__(186);
	
	var _yargs2 = _interopRequireDefault(_yargs);
	
	var _camelcase = __webpack_require__(187);
	
	var _camelcase2 = _interopRequireDefault(_camelcase);
	
	var _cmd = __webpack_require__(188);
	
	var _cmd2 = _interopRequireDefault(_cmd);
	
	var _errors = __webpack_require__(95);
	
	var _logger = __webpack_require__(84);
	
	var _preferences = __webpack_require__(163);
	
	var _updates = __webpack_require__(181);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	var envPrefix = 'WEB_EXT';
	
	// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed
	
	/*
	 * The command line program.
	 */
	var Program = exports.Program = function () {
	  function Program(argv) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref$absolutePackageD = _ref.absolutePackageDir,
	        absolutePackageDir = _ref$absolutePackageD === undefined ? process.cwd() : _ref$absolutePackageD;
	
	    (0, _classCallCheck3.default)(this, Program);
	
	    // This allows us to override the process argv which is useful for
	    // testing.
	    // NOTE: process.argv.slice(2) removes the path to node and web-ext
	    // executables from the process.argv array.
	    argv = argv || process.argv.slice(2);
	
	    // NOTE: always initialize yargs explicitly with the package dir
	    // so that we are sure that it is going to load the 'boolean-negation: false'
	    // config (See web-ext#469 for rationale).
	    var yargsInstance = (0, _yargs2.default)(argv, absolutePackageDir);
	
	    this.shouldExitProgram = true;
	    this.yargs = yargsInstance;
	    this.yargs.strict();
	
	    this.commands = {};
	    this.defaultValues = {};
	  }
	
	  (0, _createClass3.default)(Program, [{
	    key: 'command',
	    value: function command(name, description, executor) {
	      var _this = this;
	
	      var commandOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	      this.defaultValues[name] = setDefaultValues(commandOptions);
	      this.yargs.command(name, description, function (yargsForCmd) {
	        if (!commandOptions) {
	          return;
	        }
	        return yargsForCmd
	        // Make sure the user does not add any extra commands. For example,
	        // this would be a mistake because lint does not accept arguments:
	        // web-ext lint ./src/path/to/file.js
	        .demandCommand(0, 0, undefined, 'This command does not take any arguments').strict().exitProcess(_this.shouldExitProgram)
	        // Calling env() will be unnecessary after
	        // https://github.com/yargs/yargs/issues/486 is fixed
	        .env(envPrefix).options(commandOptions);
	      });
	      this.commands[name] = executor;
	      return this;
	    }
	  }, {
	    key: 'setGlobalOptions',
	    value: function setGlobalOptions(options) {
	      // This is a convenience for setting global options.
	      // An option is only global (i.e. available to all sub commands)
	      // with the `global` flag so this makes sure every option has it.
	      this.defaultValues = (0, _extends3.default)({}, this.defaultValues, setDefaultValues(options));
	      Object.keys(options).forEach(function (key) {
	        options[key].global = true;
	        if (options[key].demand === undefined) {
	          // By default, all options should be "demanded" otherwise
	          // yargs.strict() will think they are missing when declared.
	          options[key].demand = true;
	        }
	      });
	      this.yargs.options(options);
	      return this;
	    }
	  }, {
	    key: 'execute',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(absolutePackageDir) {
	        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	            _ref3$checkForUpdates = _ref3.checkForUpdates,
	            checkForUpdates = _ref3$checkForUpdates === undefined ? _updates.checkForUpdates : _ref3$checkForUpdates,
	            _ref3$systemProcess = _ref3.systemProcess,
	            systemProcess = _ref3$systemProcess === undefined ? process : _ref3$systemProcess,
	            _ref3$logStream = _ref3.logStream,
	            logStream = _ref3$logStream === undefined ? _logger.consoleStream : _ref3$logStream,
	            _ref3$getVersion = _ref3.getVersion,
	            getVersion = _ref3$getVersion === undefined ? defaultVersionGetter : _ref3$getVersion,
	            _ref3$shouldExitProgr = _ref3.shouldExitProgram,
	            shouldExitProgram = _ref3$shouldExitProgr === undefined ? true : _ref3$shouldExitProgr,
	            _ref3$globalEnv = _ref3.globalEnv,
	            globalEnv = _ref3$globalEnv === undefined ? ("development") : _ref3$globalEnv;
	
	        var argv, cmd, runCommand, prefix;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	
	                this.shouldExitProgram = shouldExitProgram;
	                this.yargs.exitProcess(this.shouldExitProgram);
	
	                argv = this.yargs.argv;
	                cmd = argv._[0];
	
	                // Command line option (pref) renamed for internal use (customPref).
	
	                argv.customPrefs = argv.pref;
	
	                runCommand = this.commands[cmd];
	
	
	                if (argv.verbose) {
	                  logStream.makeVerbose();
	                  log.info('Version:', getVersion(absolutePackageDir));
	                }
	
	                _context.prev = 7;
	
	                if (!(cmd === undefined)) {
	                  _context.next = 10;
	                  break;
	                }
	
	                throw new _errors.UsageError('No sub-command was specified in the args');
	
	              case 10:
	                if (runCommand) {
	                  _context.next = 12;
	                  break;
	                }
	
	                throw new _errors.UsageError('Unknown command: ' + cmd);
	
	              case 12:
	                if (globalEnv === 'production') {
	                  checkForUpdates({
	                    version: getVersion(absolutePackageDir)
	                  });
	                }
	
	                _context.next = 15;
	                return runCommand(argv);
	
	              case 15:
	                _context.next = 27;
	                break;
	
	              case 17:
	                _context.prev = 17;
	                _context.t0 = _context['catch'](7);
	                prefix = cmd ? cmd + ': ' : '';
	
	                if (!(_context.t0 instanceof _errors.UsageError) || argv.verbose) {
	                  log.error('\n' + prefix + _context.t0.stack + '\n');
	                } else {
	                  log.error('\n' + prefix + _context.t0 + '\n');
	                }
	                if (_context.t0.code) {
	                  log.error(prefix + 'Error code: ' + _context.t0.code + '\n');
	                }
	
	                if (!this.shouldExitProgram) {
	                  _context.next = 26;
	                  break;
	                }
	
	                systemProcess.exit(1);
	                _context.next = 27;
	                break;
	
	              case 26:
	                throw _context.t0;
	
	              case 27:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[7, 17]]);
	      }));
	
	      function execute(_x3) {
	        return _ref2.apply(this, arguments);
	      }
	
	      return execute;
	    }()
	  }]);
	  return Program;
	}();
	
	// A global variable generated by DefinePlugin, generated in webpack.config.js
	
	
	function setDefaultValues(options) {
	  var defaultValues = {};
	  Object.keys(options).forEach(function (key) {
	    var camelCasedKey = (0, _camelcase2.default)(key);
	    if (options[key].type === 'boolean') {
	      defaultValues[camelCasedKey] = false;
	    }
	    if (typeof options[key].default !== 'undefined') {
	      defaultValues[camelCasedKey] = options[key].default;
	    }
	  });
	  return defaultValues;
	}
	
	//A defintion of type of argument for defaultVersionGetter
	function defaultVersionGetter(absolutePackageDir) {
	  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref4$globalEnv = _ref4.globalEnv,
	      globalEnv = _ref4$globalEnv === undefined ? ("development") : _ref4$globalEnv;
	
	  if (globalEnv === 'production') {
	    log.debug('Getting the version from package.json');
	    var packageData = (0, _fs.readFileSync)(_path2.default.join(absolutePackageDir, 'package.json'));
	    return JSON.parse(packageData).version;
	  } else {
	    log.debug('Getting version from the git revision');
	    return _gitRevSync2.default.branch(absolutePackageDir) + '-' + _gitRevSync2.default.long(absolutePackageDir);
	  }
	}
	
	// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed
	
	function main(absolutePackageDir) {
	  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref5$getVersion = _ref5.getVersion,
	      getVersion = _ref5$getVersion === undefined ? defaultVersionGetter : _ref5$getVersion,
	      _ref5$commands = _ref5.commands,
	      commands = _ref5$commands === undefined ? _cmd2.default : _ref5$commands,
	      argv = _ref5.argv,
	      _ref5$runOptions = _ref5.runOptions,
	      runOptions = _ref5$runOptions === undefined ? {} : _ref5$runOptions;
	
	  var program = new Program(argv, { absolutePackageDir: absolutePackageDir });
	
	  // yargs uses magic camel case expansion to expose options on the
	  // final argv object. For example, the 'artifacts-dir' option is alternatively
	  // available as argv.artifactsDir.
	  program.yargs.usage('Usage: $0 [options] command\n\nOption values can also be set by declaring an environment variable prefixed\nwith $' + envPrefix + '_. For example: $' + envPrefix + '_SOURCE_DIR=/path is the same as\n--source-dir=/path.\n\nTo view specific help for any given command, add the command name.\nExample: $0 --help run.\n').help('help').alias('h', 'help').env(envPrefix).version(function () {
	    return getVersion(absolutePackageDir);
	  }).demandCommand(1, 'You must specify a command').strict();
	
	  program.setGlobalOptions({
	    'source-dir': {
	      alias: 's',
	      describe: 'Web extension source directory.',
	      default: process.cwd(),
	      requiresArg: true,
	      type: 'string',
	      coerce: _path2.default.resolve
	    },
	    'artifacts-dir': {
	      alias: 'a',
	      describe: 'Directory where artifacts will be saved.',
	      default: _path2.default.join(process.cwd(), 'web-ext-artifacts'),
	      normalize: true,
	      requiresArg: true,
	      type: 'string'
	    },
	    'verbose': {
	      alias: 'v',
	      describe: 'Show verbose output',
	      type: 'boolean'
	    },
	    'ignore-files': {
	      alias: 'i',
	      describe: 'A list of glob patterns to define which files should be ' + 'ignored. (Example: --ignore-files=path/to/first.js ' + 'path/to/second.js "**/*.log")',
	      demand: false,
	      requiresArg: true,
	      type: 'array'
	    }
	  });
	
	  program.command('build', 'Create a web extension package from source', commands.build, {
	    'as-needed': {
	      describe: 'Watch for file changes and re-build as needed',
	      type: 'boolean'
	    }
	  }).command('sign', 'Sign the web extension so it can be installed in Firefox', commands.sign, {
	    'api-key': {
	      describe: 'API key (JWT issuer) from addons.mozilla.org',
	      demand: true,
	      type: 'string'
	    },
	    'api-secret': {
	      describe: 'API secret (JWT secret) from addons.mozilla.org',
	      demand: true,
	      type: 'string'
	    },
	    'api-url-prefix': {
	      describe: 'Signing API URL prefix',
	      default: 'https://addons.mozilla.org/api/v3',
	      demand: true,
	      type: 'string'
	    },
	    'api-proxy': {
	      describe: 'Use a proxy to access the signing API. ' + 'Example: https://yourproxy:6000 ',
	      demand: false,
	      type: 'string'
	    },
	    'id': {
	      describe: 'A custom ID for the extension. This has no effect if the ' + 'extension already declares an explicit ID in its manifest.',
	      demand: false,
	      type: 'string'
	    },
	    'timeout': {
	      describe: 'Number of milliseconds to wait before giving up',
	      type: 'number'
	    }
	  }).command('run', 'Run the web extension', commands.run, {
	    'firefox': {
	      alias: ['f', 'firefox-binary'],
	      describe: 'Path or alias to a Firefox executable such as firefox-bin ' + 'or firefox.exe. ' + 'If not specified, the default Firefox will be used. ' + 'You can specify the following aliases in lieu of a path: ' + 'firefox, beta, nightly, firefoxdeveloperedition.',
	      demand: false,
	      type: 'string'
	    },
	    'firefox-profile': {
	      alias: ['p', 'profile'],
	      describe: 'Run Firefox using a copy of this profile. The profile ' + 'can be specified as a directory or a name, such as one ' + 'you would see in the Profile Manager. If not specified, ' + 'a new temporary profile will be created.',
	      demand: false,
	      type: 'string'
	    },
	    'keep-profile-changes': {
	      describe: 'Run Firefox directly in custom profile. Any changes to ' + 'the profile will be saved.',
	      demand: false,
	      type: 'boolean'
	    },
	    'marionette': {
	      describe: 'Enable marionette after installation',
	      demand: false,
	      type: 'boolean'
	    },
	    'no-reload': {
	      describe: 'Do not reload the extension when source files change',
	      demand: false,
	      type: 'boolean'
	    },
	    'pre-install': {
	      describe: 'Pre-install the extension into the profile before ' + 'startup. This is only needed to support older versions ' + 'of Firefox.',
	      demand: false,
	      type: 'boolean'
	    },
	    'pref': {
	      describe: 'Launch firefox with a custom preference ' + '(example: --pref=general.useragent.locale=fr-FR). ' + 'You can repeat this option to set more than one ' + 'preference.',
	      demand: false,
	      requiresArg: true,
	      type: 'string',
	      coerce: _preferences.coerceCLICustomPreference
	    },
	    'start-url': {
	      alias: ['u', 'url'],
	      describe: 'Launch firefox at specified page',
	      demand: false,
	      requiresArg: true,
	      type: 'string'
	    },
	    'browser-console': {
	      alias: ['bc'],
	      describe: 'Open the DevTools Browser Console.',
	      demand: false,
	      type: 'boolean'
	    }
	  }).command('lint', 'Validate the web extension source', commands.lint, {
	    'output': {
	      alias: 'o',
	      describe: 'The type of output to generate',
	      type: 'string',
	      default: 'text',
	      choices: ['json', 'text']
	    },
	    'metadata': {
	      describe: 'Output only metadata as JSON',
	      type: 'boolean',
	      default: false
	    },
	    'warnings-as-errors': {
	      describe: 'Treat warnings as errors by exiting non-zero for warnings',
	      alias: 'w',
	      type: 'boolean',
	      default: false
	    },
	    'pretty': {
	      describe: 'Prettify JSON output',
	      type: 'boolean',
	      default: false
	    },
	    'self-hosted': {
	      describe: 'Your extension will be self-hosted. This disables messages ' + 'related to hosting on addons.mozilla.org.',
	      type: 'boolean',
	      default: false
	    },
	    'boring': {
	      describe: 'Disables colorful shell output',
	      type: 'boolean',
	      default: false
	    }
	  }).command('docs', 'Open the web-ext documentation in a browser', commands.docs, {});
	
	  return program.execute(absolutePackageDir, runOptions);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/program.js"))

/***/ },
/* 185 */
/***/ function(module, exports) {

	module.exports = require("git-rev-sync");

/***/ },
/* 186 */
/***/ function(module, exports) {

	module.exports = require("yargs");

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = require("camelcase");

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _build = __webpack_require__(9);
	
	var _build2 = _interopRequireDefault(_build);
	
	var _lint = __webpack_require__(151);
	
	var _lint2 = _interopRequireDefault(_lint);
	
	var _run = __webpack_require__(156);
	
	var _run2 = _interopRequireDefault(_run);
	
	var _sign = __webpack_require__(168);
	
	var _sign2 = _interopRequireDefault(_sign);
	
	var _docs = __webpack_require__(143);
	
	var _docs2 = _interopRequireDefault(_docs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { build: _build2.default, lint: _lint2.default, run: _run2.default, sign: _sign2.default, docs: _docs2.default };

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.applyConfigToArgv = applyConfigToArgv;
	exports.loadJSConfigFile = loadJSConfigFile;
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _requireUncached = __webpack_require__(190);
	
	var _requireUncached2 = _interopRequireDefault(_requireUncached);
	
	var _camelcase = __webpack_require__(187);
	
	var _camelcase2 = _interopRequireDefault(_camelcase);
	
	var _decamelize = __webpack_require__(191);
	
	var _decamelize2 = _interopRequireDefault(_decamelize);
	
	var _logger = __webpack_require__(84);
	
	var _errors = __webpack_require__(95);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = (0, _logger.createLogger)(__filename);
	
	function applyConfigToArgv(_ref) {
	  var argv = _ref.argv,
	      configObject = _ref.configObject,
	      defaultValues = _ref.defaultValues,
	      configFileName = _ref.configFileName,
	      commandExecuted = _ref.commandExecuted;
	
	  var newArgv = (0, _extends3.default)({}, argv);
	  for (var option in configObject) {
	
	    if ((0, _camelcase2.default)(option) !== option) {
	      throw new _errors.UsageError('The config option "' + option + '" must be ' + ('specified in camel case: "' + (0, _camelcase2.default)(option) + '"'));
	    }
	
	    if (option === commandExecuted) {
	      newArgv = applyConfigToArgv({
	        argv: argv,
	        configObject: configObject[commandExecuted],
	        defaultValues: defaultValues[commandExecuted],
	        configFileName: configFileName });
	      continue;
	    }
	
	    // we assume the value was set on the CLI if the default value is
	    // not the same as that on the argv object as there is a very rare chance
	    // of this happening
	    var wasValueSetOnCLI = typeof argv[option] !== 'undefined' && argv[option] !== defaultValues[option];
	    if (wasValueSetOnCLI) {
	      log.debug('Favoring CLI: ' + option + '=' + argv[option] + ' over ' + ('configuration: ' + option + '=' + configObject[option]));
	      continue;
	    }
	
	    if (!argv.hasOwnProperty((0, _decamelize2.default)(option, '-'))) {
	      throw new _errors.UsageError('The config file at ' + configFileName + ' specified ' + ('an unknown option: "' + option + '"'));
	    }
	
	    newArgv[option] = configObject[option];
	  }
	  return newArgv;
	}
	
	function loadJSConfigFile(filePath) {
	  var resolvedFilePath = _path2.default.resolve(filePath);
	  log.debug('Loading JS config file: "' + filePath + '" ' + ('(resolved to "' + resolvedFilePath + '")'));
	  var configObject = void 0;
	  try {
	    configObject = (0, _requireUncached2.default)(resolvedFilePath);
	  } catch (error) {
	    log.debug('Handling error:', error);
	    throw new _errors.UsageError('Cannot read config file: ' + resolvedFilePath + '\n' + ('Error: ' + error.message));
	  }
	  if (Object.keys(configObject).length === 0) {
	    log.debug('Config file ' + resolvedFilePath + ' did not define any options. ' + 'Did you set module.exports = {...}?');
	  }
	  return configObject;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "src/config.js"))

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = require("require-uncached");

/***/ },
/* 191 */
/***/ function(module, exports) {

	module.exports = require("decamelize");

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(85);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(96);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(116);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _mocha = __webpack_require__(6);
	
	var _chai = __webpack_require__(7);
	
	var _errors = __webpack_require__(95);
	
	var _helpers = __webpack_require__(138);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('errors', function () {
	
	  (0, _mocha.describe)('onlyInstancesOf', function () {
	
	    (0, _mocha.it)('lets you catch a certain error', function () {
	      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyInstancesOf)(SyntaxError, function (error) {
	        _chai.assert.instanceOf(error, SyntaxError);
	      }));
	    });
	
	    (0, _mocha.it)('throws instances of other errors', function () {
	      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyInstancesOf)(TypeError, function () {
	        throw new Error('Unexpectedly caught the wrong error');
	      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.match(error.message, /simulated error/);
	      });
	    });
	  });
	
	  (0, _mocha.describe)('onlyErrorsWithCode', function () {
	    var ErrorWithErrno = function (_Error) {
	      (0, _inherits3.default)(ErrorWithErrno, _Error);
	
	      function ErrorWithErrno() {
	        (0, _classCallCheck3.default)(this, ErrorWithErrno);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (ErrorWithErrno.__proto__ || Object.getPrototypeOf(ErrorWithErrno)).call(this, 'pretend this is a system error'));
	
	        _this.errno = 53;
	        return _this;
	      }
	
	      return ErrorWithErrno;
	    }(Error);
	
	    (0, _mocha.it)('catches errors having a code', function () {
	      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)('SOME_CODE', function (error) {
	        _chai.assert.equal(error.code, 'SOME_CODE');
	      }));
	    });
	
	    (0, _mocha.it)('catches errors having a error no', function () {
	      return Promise.reject(new ErrorWithErrno()).catch((0, _errors.onlyErrorsWithCode)(53, function (error) {
	        _chai.assert.equal(error.errno, 53);
	      }));
	    });
	
	    (0, _mocha.it)('throws errors that do not match the code', function () {
	      return Promise.reject(new SyntaxError('simulated error')).catch((0, _errors.onlyErrorsWithCode)('SOME_CODE', function () {
	        throw new Error('Unexpectedly caught the wrong error');
	      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.match(error.message, /simulated error/);
	      });
	    });
	
	    (0, _mocha.it)('catches errors having one of many codes', function () {
	      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)(['OTHER_CODE', 'SOME_CODE'], function (error) {
	        _chai.assert.equal(error.code, 'SOME_CODE');
	      }));
	    });
	
	    (0, _mocha.it)('catches errors having one of many errno', function () {
	      return Promise.reject(new ErrorWithErrno()).catch((0, _errors.onlyErrorsWithCode)([34, 53], function (error) {
	        _chai.assert.equal(error.errno, 53);
	      }));
	    });
	
	    (0, _mocha.it)('throws errors that are not in an array of codes', function () {
	      return Promise.reject(new _helpers.ErrorWithCode()).catch((0, _errors.onlyErrorsWithCode)(['OTHER_CODE', 'ANOTHER_CODE'], function () {
	        throw new Error('Unexpectedly caught the wrong error');
	      })).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	        _chai.assert.equal(error.code, 'SOME_CODE');
	      });
	    });
	  });
	
	  (0, _mocha.describe)('isErrorWithCode', function () {
	
	    (0, _mocha.it)('returns true on errors that do match the code', function () {
	      _chai.assert.equal((0, _errors.isErrorWithCode)('SOME_CODE', new _helpers.ErrorWithCode()), true);
	      _chai.assert.equal((0, _errors.isErrorWithCode)(['SOME_CODE', 'OTHER_CODE'], new _helpers.ErrorWithCode()), true);
	    });
	
	    (0, _mocha.it)('returns false on errors that do not match the code', function () {
	      _chai.assert.equal((0, _errors.isErrorWithCode)('OTHER_CODE', new _helpers.ErrorWithCode()), false);
	      _chai.assert.equal((0, _errors.isErrorWithCode)(['OTHER_CODE', 'ANOTHER_CODE'], new _helpers.ErrorWithCode()), false);
	      _chai.assert.equal((0, _errors.isErrorWithCode)('ANY_CODE', new Error()), false);
	    });
	  });
	});

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _objectWithoutProperties2 = __webpack_require__(154);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mocha = __webpack_require__(6);
	
	var _gitRevSync = __webpack_require__(185);
	
	var _gitRevSync2 = _interopRequireDefault(_gitRevSync);
	
	var _mz = __webpack_require__(5);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _chai = __webpack_require__(7);
	
	var _program = __webpack_require__(184);
	
	var _cmd = __webpack_require__(188);
	
	var _cmd2 = _interopRequireDefault(_cmd);
	
	var _errors = __webpack_require__(95);
	
	var _helpers = __webpack_require__(138);
	
	var _logger = __webpack_require__(84);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('program.Program', function () {
	
	  function execProgram(program) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var fakeProcess = (0, _helpers.fake)(process);
	    var absolutePackageDir = _path2.default.join(__dirname, '..', '..');
	    return program.execute(absolutePackageDir, (0, _extends3.default)({
	      getVersion: function getVersion() {
	        return (0, _sinon.spy)();
	      },
	      checkForUpdates: (0, _sinon.spy)(),
	      systemProcess: fakeProcess,
	      shouldExitProgram: false
	    }, options));
	  }
	
	  (0, _mocha.it)('executes a command callback', function () {
	    var thing = (0, _sinon.spy)(function () {
	      return Promise.resolve();
	    });
	    var program = new _program.Program(['thing']).command('thing', 'does a thing', thing);
	    return execProgram(program).then(function () {
	      _chai.assert.equal(thing.called, true);
	    });
	  });
	
	  (0, _mocha.it)('reports unknown commands', function () {
	    var program = new _program.Program(['thing']);
	    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	      _chai.assert.match(error.message, /Unknown command: thing/);
	    }));
	  });
	
	  (0, _mocha.it)('reports missing command', function () {
	    var program = new _program.Program([]);
	    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch((0, _errors.onlyInstancesOf)(_errors.UsageError, function (error) {
	      _chai.assert.match(error.message, /No sub-command was specified/);
	    }));
	  });
	
	  (0, _mocha.it)('exits 1 on a thrown error', function () {
	    var fakeProcess = (0, _helpers.fake)(process);
	    var program = new _program.Program(['cmd']).command('cmd', 'some command', function () {
	      throw new Error('this is an error from a command handler');
	    });
	    return execProgram(program, {
	      systemProcess: fakeProcess,
	      shouldExitProgram: true
	    }).then(function () {
	      _chai.assert.equal(fakeProcess.exit.called, true);
	      _chai.assert.equal(fakeProcess.exit.firstCall.args[0], 1);
	    });
	  });
	
	  (0, _mocha.it)('throws an error if sub-command is given an argument', function () {
	    var program = new _program.Program(['thing', 'nope']).command('thing', '', function () {});
	    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /This command does not take any arguments/);
	    });
	  });
	
	  (0, _mocha.it)('handles errors that have codes', function () {
	
	    var program = new _program.Program(['cmd']).command('cmd', 'some command', function () {
	      var error = new _helpers.ErrorWithCode();
	      throw error;
	    });
	    // This is just a smoke test to make sure the error code doesn't
	    // introduce an unexpected exception.
	    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /pretend this is a system error/);
	    });
	  });
	
	  (0, _mocha.it)('lets commands define options', function () {
	    var handler = (0, _sinon.spy)(function () {
	      return Promise.resolve();
	    });
	    var program = new _program.Program(['cmd']).command('cmd', 'some command', handler, {
	      'some-option': {
	        default: 'default value'
	      }
	    });
	    return execProgram(program).then(function () {
	      _chai.assert.equal(handler.called, true);
	      // This ensures that the default configuration for the option has
	      // been applied.
	      _chai.assert.equal(handler.firstCall.args[0].someOption, 'default value');
	    });
	  });
	
	  (0, _mocha.it)('preserves global option configuration', function () {
	    var handler = (0, _sinon.spy)(function () {
	      return Promise.resolve();
	    });
	    var program = new _program.Program(['cmd']).setGlobalOptions({
	      'global-option': {
	        type: 'string',
	        default: 'the default'
	      }
	    }).command('cmd', 'some command', handler, {
	      'some-option': {
	        default: 'default value'
	      }
	    });
	    return execProgram(program).then(function () {
	      _chai.assert.equal(handler.called, true);
	      // By checking the global default, it ensures that default configuration
	      // will be applied to sub commands.
	      _chai.assert.equal(handler.firstCall.args[0].globalOption, 'the default');
	      _chai.assert.equal(handler.firstCall.args[0].someOption, 'default value');
	    });
	  });
	
	  (0, _mocha.it)('reads option values from env vars in sub commands', function () {
	    // Set an env var that mimics web-ext cmd --some-opt=value
	    process.env.WEB_EXT_SOME_OPT = 'value';
	    var valueReceived = void 0;
	    var program = new _program.Program(['cmd']).command('cmd', 'some command', function (_ref) {
	      var someOpt = _ref.someOpt;
	
	      valueReceived = someOpt;
	    }, {
	      'some-opt': {
	        describe: 'example option'
	      }
	    });
	    return execProgram(program, { shouldExitProgram: true }).then(function () {
	      _chai.assert.equal(valueReceived, 'value');
	      delete process.env.WEB_EXT_SOME_OPT;
	    });
	  });
	
	  (0, _mocha.it)('configures the logger when verbose', function () {
	    var logStream = (0, _helpers.fake)(new _logger.ConsoleStream());
	
	    var program = new _program.Program(['--verbose', 'thing']);
	    program.setGlobalOptions({
	      verbose: {
	        type: 'boolean'
	      }
	    });
	    program.command('thing', 'does a thing', function () {});
	
	    return execProgram(program, {
	      getVersion: (0, _sinon.spy)(),
	      logStream: logStream
	    }).then(function () {
	      _chai.assert.equal(logStream.makeVerbose.called, true);
	    });
	  });
	
	  (0, _mocha.it)('checks the version when verbose', function () {
	    var version = (0, _sinon.spy)();
	    var program = new _program.Program(['--verbose', 'thing']);
	    program.setGlobalOptions({
	      verbose: {
	        type: 'boolean'
	      }
	    });
	    program.command('thing', 'does a thing', function () {});
	    return execProgram(program, { getVersion: version }).then(function () {
	      _chai.assert.equal(version.firstCall.args[0], _path2.default.join(__dirname, '..', '..'));
	    });
	  });
	
	  (0, _mocha.it)('does not configure the logger unless verbose', function () {
	    var logStream = (0, _helpers.fake)(new _logger.ConsoleStream());
	    var program = new _program.Program(['thing']).command('thing', '', function () {});
	    program.setGlobalOptions({
	      verbose: {
	        type: 'boolean'
	      }
	    });
	    return execProgram(program, { logStream: logStream }).then(function () {
	      _chai.assert.equal(logStream.makeVerbose.called, false);
	    });
	  });
	
	  (0, _mocha.it)('throws an error about unknown commands', function () {
	    return execProgram(new _program.Program(['nope'])).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /Unknown command: nope/);
	    });
	  });
	
	  (0, _mocha.it)('throws an error about unknown options', function () {
	    return execProgram(new _program.Program(['--nope'])).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      // Make sure that the option name is in the error message.
	      // Be careful not to rely on any text from yargs since it's localized.
	      _chai.assert.match(error.message, /nope/);
	    });
	  });
	
	  (0, _mocha.it)('throws an error about unknown sub-command options', function () {
	    var program = new _program.Program(['thing', '--nope']).command('thing', '', function () {});
	    return execProgram(program).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      // Make sure that the option name is in the error message.
	      // Be careful not to rely on any text from yargs since it's localized.
	      _chai.assert.match(error.message, /nope/);
	    });
	  });
	
	  (0, _mocha.it)('checks for updates automatically', function () {
	    var handler = (0, _sinon.spy)();
	    var getVersion = function getVersion() {
	      return 'some-package-version';
	    };
	    var checkForUpdates = _sinon2.default.stub();
	    var program = new _program.Program(['run']).command('run', 'some command', handler);
	    return execProgram(program, {
	      checkForUpdates: checkForUpdates,
	      getVersion: getVersion,
	      globalEnv: 'production'
	    }).then(function () {
	      _chai.assert.equal(checkForUpdates.firstCall.args[0].version, 'some-package-version');
	    });
	  });
	
	  (0, _mocha.it)('does not check for updates during development', function () {
	    var handler = (0, _sinon.spy)();
	    var getVersion = function getVersion() {
	      return 'some-package-version';
	    };
	    var checkForUpdates = _sinon2.default.stub();
	    var program = new _program.Program(['run']).command('run', 'some command', handler);
	    return execProgram(program, {
	      checkForUpdates: checkForUpdates,
	      getVersion: getVersion,
	      globalEnv: 'development'
	    }).then(function () {
	      _chai.assert.equal(checkForUpdates.called, false);
	    });
	  });
	});
	
	
	(0, _mocha.describe)('program.main', function () {
	
	  function execProgram(argv) {
	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var _ref2$projectRoot = _ref2.projectRoot,
	        projectRoot = _ref2$projectRoot === undefined ? '' : _ref2$projectRoot,
	        mainOptions = (0, _objectWithoutProperties3.default)(_ref2, ['projectRoot']);
	
	    var runOptions = {
	      getVersion: function getVersion() {
	        return 'not-a-real-version';
	      },
	      checkForUpdates: (0, _sinon.spy)(),
	      shouldExitProgram: false,
	      systemProcess: (0, _helpers.fake)(process)
	    };
	    return (0, _program.main)(projectRoot, (0, _extends3.default)({ argv: argv, runOptions: runOptions }, mainOptions));
	  }
	
	  (0, _mocha.it)('executes a command handler', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      build: function build() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['build'], { commands: fakeCommands }).then(function () {
	      // This is a smoke test mainly to make sure main() configures
	      // options with handlers. It does not extensively test the
	      // configuration of all handlers.
	      _chai.assert.equal(fakeCommands.build.called, true);
	    });
	  });
	
	  (0, _mocha.it)('throws an error if no command is given', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {});
	    return execProgram([], { commands: fakeCommands }).then((0, _helpers.makeSureItFails)()).catch(function (error) {
	      _chai.assert.match(error.message, /You must specify a command/);
	    });
	  });
	
	  (0, _mocha.it)('can get the program version', function () {
	    var fakeVersionGetter = _sinon2.default.spy(function () {
	      return '<version>';
	    });
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      build: function build() {
	        return Promise.resolve();
	      }
	    });
	    var projectRoot = '/pretend/project/root';
	    // For some reason, executing --version like this
	    // requires a command. In the real CLI, it does not.
	    return execProgram(['--version', 'build'], {
	      projectRoot: projectRoot,
	      commands: fakeCommands,
	      getVersion: fakeVersionGetter
	    }).then(function () {
	      _chai.assert.equal(fakeVersionGetter.called, true);
	      _chai.assert.equal(fakeVersionGetter.firstCall.args[0], projectRoot);
	    });
	  });
	
	  (0, _mocha.it)('turns sourceDir into an absolute path', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      build: function build() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['build', '--source-dir', '..'], { commands: fakeCommands }).then(function () {
	      _chai.assert.equal(fakeCommands.build.called, true);
	      _chai.assert.equal(fakeCommands.build.firstCall.args[0].sourceDir, _path2.default.resolve(_path2.default.join(process.cwd(), '..')));
	    });
	  });
	
	  (0, _mocha.it)('normalizes the artifactsDir path', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      build: function build() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(
	    // Add a double slash to the path, which will be fixed by normalization.
	    ['build', '--artifacts-dir', process.cwd() + _path2.default.sep + _path2.default.sep], { commands: fakeCommands }).then(function () {
	      _chai.assert.equal(fakeCommands.build.called, true);
	      _chai.assert.equal(fakeCommands.build.firstCall.args[0].artifactsDir, process.cwd() + _path2.default.sep);
	    });
	  });
	
	  (0, _mocha.it)('passes the path of a firefox binary when specified', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      run: function run() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['run', '--firefox-binary', '/path/to/firefox-binary'], { commands: fakeCommands }).then(function () {
	      _chai.assert.equal(fakeCommands.run.called, true);
	      _chai.assert.equal(fakeCommands.run.firstCall.args[0].firefox, '/path/to/firefox-binary');
	    });
	  });
	
	  (0, _mocha.it)('passes the url of a firefox binary when specified', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      run: function run() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['run', '--start-url', 'www.example.com'], { commands: fakeCommands }).then(function () {
	      _chai.assert.equal(fakeCommands.run.called, true);
	      _chai.assert.equal(fakeCommands.run.firstCall.args[0].startUrl, 'www.example.com');
	    });
	  });
	
	  (0, _mocha.it)('opens browser console when --browser-console is specified', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      run: function run() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['run', '--browser-console'], { commands: fakeCommands }).then(function () {
	      _chai.assert.equal(fakeCommands.run.called, true);
	      _chai.assert.equal(fakeCommands.run.firstCall.args[0].browserConsole, true);
	    });
	  });
	
	  (0, _mocha.it)('converts custom preferences into an object', function () {
	    var fakeCommands = (0, _helpers.fake)(_cmd2.default, {
	      run: function run() {
	        return Promise.resolve();
	      }
	    });
	    return execProgram(['run', '--pref', 'prop=true', '--pref', 'prop2=value2'], { commands: fakeCommands }).then(function () {
	      var customPrefs = fakeCommands.run.firstCall.args[0].customPrefs;
	
	      _chai.assert.isObject(customPrefs);
	      _chai.assert.equal(customPrefs.prop, true);
	      _chai.assert.equal(customPrefs.prop2, 'value2');
	    });
	  });
	});
	
	(0, _mocha.describe)('program.defaultVersionGetter', function () {
	  var projectRoot = _path2.default.join(__dirname, '..', '..');
	
	  (0, _mocha.it)('returns the package version in production', function () {
	    var pkgFile = _path2.default.join(projectRoot, 'package.json');
	    return _mz.fs.readFile(pkgFile).then(function (pkgData) {
	      var testBuildEnv = { globalEnv: 'production' };
	      _chai.assert.equal((0, _program.defaultVersionGetter)(projectRoot, testBuildEnv), JSON.parse(pkgData).version);
	    });
	  });
	
	  (0, _mocha.it)('returns git commit information in development', function () {
	    if (process.env.APPVEYOR) {
	      // Test skipped because of $APPVEYOR' issues with git-rev-sync (mozilla/web-ext#774)
	      this.skip();
	      return;
	    }
	    var commit = _gitRevSync2.default.branch() + '-' + _gitRevSync2.default.long();
	    var testBuildEnv = { globalEnv: 'development' };
	    _chai.assert.equal((0, _program.defaultVersionGetter)(projectRoot, testBuildEnv), commit);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "tests/unit"))

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mocha = __webpack_require__(6);
	
	var _logger = __webpack_require__(84);
	
	(0, _mocha.beforeEach)(function () {
	  _logger.consoleStream.makeVerbose();
	  _logger.consoleStream.startCapturing();
	});
	
	(0, _mocha.afterEach)(function () {
	  if (this.currentTest.state !== 'passed') {
	    _logger.consoleStream.flushCapturedLogs();
	  }
	  _logger.consoleStream.stopCapturing();
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(146);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _mocha = __webpack_require__(6);
	
	var _mz = __webpack_require__(5);
	
	var _sinon = __webpack_require__(8);
	
	var _sinon2 = _interopRequireDefault(_sinon);
	
	var _chai = __webpack_require__(7);
	
	var _watcher = __webpack_require__(81);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _tempDir = __webpack_require__(129);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mocha.describe)('watcher', function () {
	
	  (0, _mocha.it)('watches for file changes', function () {
	    return (0, _tempDir.withTempDir)(function (tmpDir) {
	      var artifactsDir = _path2.default.join(tmpDir.path(), 'web-ext-artifacts');
	      var someFile = _path2.default.join(tmpDir.path(), 'foo.txt');
	
	      var resolveChange;
	      var whenFilesChanged = new Promise(function (resolve) {
	        resolveChange = resolve;
	      });
	      var onChange = _sinon2.default.spy(function () {
	        resolveChange();
	      });
	
	      return _mz.fs.writeFile(someFile, '<contents>').then(function () {
	        return (0, _watcher2.default)({
	          sourceDir: tmpDir.path(),
	          artifactsDir: artifactsDir,
	          onChange: onChange,
	          shouldWatchFile: function shouldWatchFile() {
	            return true;
	          }
	        });
	      }).then(function (watcher) {
	        return _mz.fs.utimes(someFile, Date.now() / 1000, Date.now() / 1000).then(function () {
	          return watcher;
	        });
	      }).then(function (watcher) {
	        return whenFilesChanged.then(function () {
	          watcher.close();
	          _chai.assert.equal(onChange.callCount, 1);
	          // This delay seems to avoid stat errors from the watcher
	          // which can happen when the temp dir is deleted (presumably
	          // before watcher.close() has removed all listeners).
	          return new Promise(function (resolve) {
	            return setTimeout(resolve, 2);
	          });
	        });
	      });
	    });
	  });
	
	  (0, _mocha.describe)('proxyFileChanges', function () {
	
	    var defaults = {
	      artifactsDir: '/some/artifacts/dir/',
	      onChange: function onChange() {},
	      shouldWatchFile: function shouldWatchFile() {
	        return true;
	      }
	    };
	
	    (0, _mocha.it)('proxies file changes', function () {
	      var onChange = _sinon2.default.spy(function () {});
	      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, defaults, {
	        filePath: '/some/file.js',
	        onChange: onChange
	      }));
	      _chai.assert.equal(onChange.called, true);
	    });
	
	    (0, _mocha.it)('ignores changes to artifacts', function () {
	      var onChange = _sinon2.default.spy(function () {});
	      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, defaults, {
	        filePath: '/some/artifacts/dir/build.xpi',
	        artifactsDir: '/some/artifacts/dir/',
	        onChange: onChange
	      }));
	      _chai.assert.equal(onChange.called, false);
	    });
	
	    (0, _mocha.it)('provides a callback for ignoring files', function () {
	
	      function shouldWatchFile(filePath) {
	        if (filePath === '/somewhere/freaky') {
	          return false;
	        } else {
	          return true;
	        }
	      }
	
	      var conf = (0, _extends3.default)({}, defaults, {
	        shouldWatchFile: shouldWatchFile,
	        onChange: _sinon2.default.spy(function () {})
	      });
	
	      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, conf, { filePath: '/somewhere/freaky' }));
	      _chai.assert.equal(conf.onChange.called, false);
	
	      (0, _watcher.proxyFileChanges)((0, _extends3.default)({}, conf, { filePath: '/any/file/' }));
	      _chai.assert.equal(conf.onChange.called, true);
	    });
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=unit-tests.js.map