"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  defineConfig: true
};
Object.defineProperty(exports, "defineConfig", {
  enumerable: true,
  get: function get() {
    return _defineConfig.default;
  }
});

var _defineConfig = _interopRequireDefault(require("./defineConfig"));

var _runtime = require("@mdfjs/runtime");

Object.keys(_runtime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _runtime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _runtime[key];
    }
  });
});

var _types = require("@mdfjs/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }