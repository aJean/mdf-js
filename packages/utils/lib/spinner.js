"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 封装 ora
 */
class Spinner {
  constructor(args) {
    this.ins = (0, _ora.default)(args);
  }
  /**
   * 预设样式
   */


  preset(params) {
    const ins = this.ins;

    if (params.color) {
      ins.color = params.color;
    }

    if (params.graph) {
      ins.spinner = params.graph;
    }
  }

  start(params = {}) {
    this.preset(params);
    this.ins.start(params.text);
    return this;
  }

  succeed(params = {}) {
    this.preset(params);
    this.ins.succeed(params.text);
    return this;
  }

  fail(params = {}) {
    this.preset(params);
    this.ins.fail(params.text);
    return this;
  }

  stop() {
    this.ins.stop();
    return this;
  }

  clear() {
    this.ins.clear();
    return this;
  }

}

exports.Spinner = Spinner;