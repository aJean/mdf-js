"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 获取用户输入
 */
function _default() {
  return _inquirer.default.prompt([{
    type: 'input',
    message: '输入开发者',
    name: 'author',
    default: 'qy'
  }, {
    type: 'input',
    message: '输入应用描述',
    name: 'description',
    validate: input => {
      if (!input) {
        return '应用描述不能为空';
      }

      return true;
    }
  }, {
    type: 'list',
    message: '选择应用模板',
    name: 'template',
    choices: [{
      name: 'react-web',
      value: 'react'
    }, {
      name: 'vue-web',
      value: 'vue'
    }, {
      name: 'wx-taro',
      value: 'taro'
    }]
  }]);
}