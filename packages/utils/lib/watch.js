"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;

var _chokidar = _interopRequireDefault(require("chokidar"));

var _fs = require("fs");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InternalEvents = ['add', 'unlink', 'addDir', 'unlinkDir', 'change'];

function watch(opts) {
  const path = opts.path,
        keys = opts.keys,
        useMemo = opts.useMemo,
        onChange = opts.onChange;
  const sizeMemo = {};
  let watcher; // 避免开发者在 build 时候误用 watch

  if (process.env.MDF_ENV === 'prod') {
    return;
  }

  try {
    const state = (0, _fs.statSync)(path);
    const events = keys && keys.length ? keys : InternalEvents;
    watcher = _chokidar.default.watch(path, {
      ignoreInitial: true
    }); // 目录监听多种行为

    if (state.isDirectory()) {
      events.forEach(event => {
        watcher.on(event, function (path, data) {
          // data 一直是 undeinfed ?
          if (data && useMemo) {
            if (sizeMemo[path] == data.size) {
              return;
            }

            sizeMemo[path] = data.size;
          }

          onChange(event, path);
        });
      });
    } else if (state.isFile()) {
      // 文件只监听改变
      watcher.on('change', function (path) {
        onChange('change', path);
      });
    }
  } catch (e) {
    (0, _utils.errorPrint)(e);
    process.exit(1);
  }

  return function () {
    watcher ? watcher.close() : (0, _utils.chalkPrint)(`${path} not watched`, 'red');
  };
}