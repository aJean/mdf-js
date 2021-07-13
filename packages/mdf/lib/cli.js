"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _core = require("@mdfjs/core");

var _utils = require("@mdfjs/utils");

var _fork = _interopRequireDefault(require("./fork"));

var _presets = _interopRequireDefault(require("./presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file cli 命令分配
 */
function _default(name, opts) {
  const args = {
    node: opts.node,
    es: opts.es,
    css: opts.css,
    scss: opts.scss,
    less: opts.less,
    files: opts.files
  };
  process.env.mdfArgs = JSON.stringify(args);
  let service;

  try {
    switch (name) {
      case 'dev':
        const child = (0, _fork.default)(require.resolve('./childService'));
        process.on('message', function (msg) {
          (0, _utils.chalkPrint)(`from child process: ${msg}`, 'grey');
        });
        process.on('SIGINT', () => child.kill('SIGINT'));
        process.on('SIGTERM', () => child.kill('SIGTERM'));
        break;

      case 'build':
        service = new _core.Service((0, _presets.default)());
        service.runCommand(name, args);
        break;

      default:
        service = new _core.Service((0, _presets.default)(true));
        service.runCommand(name, opts);
    }
  } catch (e) {
    (0, _utils.errorPrint)(e);
    process.exit(1);
  }
}