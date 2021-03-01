"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Server: true,
  DevServer: true
};
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function get() {
    return _server.default;
  }
});
Object.defineProperty(exports, "DevServer", {
  enumerable: true,
  get: function get() {
    return _devServer.default;
  }
});

var _server = _interopRequireDefault(require("./server"));

var _devServer = _interopRequireDefault(require("./devServer"));

var _workServer = require("./workServer");

Object.keys(_workServer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _workServer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _workServer[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }