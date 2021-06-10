"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Spinner {
  constructor(opts) {
    this.ins = void 0;

    if (opts && opts.graph) {
      opts['spinner'] = opts.graph;
      delete opts.graph;
    }

    this.ins = (0, _ora.default)(opts);
  }
  /**
   * 预设样式
   */


  preset(opts) {
    const ins = this.ins;

    if (opts.color) {
      ins.color = opts.color;
    }

    if (opts.graph) {
      ins.spinner = opts.graph;
    }
  }

  start(opts = {}) {
    this.preset(opts);
    this.ins.start(opts.text);
    return this;
  }

  succeed(opts = {}) {
    this.preset(opts);
    this.ins.succeed(opts.text);
    return this;
  }

  fail(opts = {}) {
    this.preset(opts);
    this.ins.fail(opts.text);
    return this;
  }

  info(opts = {}) {
    this.preset(opts);
    this.ins.info(opts.text);
    return this;
  }

  warn(opts = {}) {
    this.preset(opts);
    this.ins.warn(opts.text);
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