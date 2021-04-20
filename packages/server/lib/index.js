"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Server: true
};
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function get() {
    return _server.default;
  }
});

var _server = _interopRequireDefault(require("./server"));

var _serverDev = require("./server-dev");

Object.keys(_serverDev).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _serverDev[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _serverDev[key];
    }
  });
});

var _serverWork = require("./server-work");

Object.keys(_serverWork).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _serverWork[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _serverWork[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }