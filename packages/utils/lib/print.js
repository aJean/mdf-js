"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpiner = createSpiner;

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file cli 美化
 */
function createSpiner(text) {
  const spinner = (0, _ora.default)({
    spinner: {
      interval: 120,
      frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
    },
    text
  });
  return spinner;
}