"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Prompt {
  constructor() {
    this.prompts = {};
    this.runPrompt = _inquirer.default.prompt;
  }

  register(name, opts) {
    this.prompts[name] = opts;
  }

  run(name, opts) {
    const config = this.prompts[name];
    return this.runPrompt(Object.assign({}, config, opts));
  }

}

exports.default = Prompt;