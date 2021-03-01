"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeRender = beforeRender;

var _vconsole = _interopRequireDefault(require("vconsole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 集成 vconsole
 */
function beforeRender() {
  new _vconsole.default();
}