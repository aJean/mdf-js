"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeBranch;

var _utils = require("@mdfjs/utils");

var _child_process = require("child_process");

var _prompt = _interopRequireDefault(require("./prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file git branch 管理
 */
function pipeBranch(_x) {
  return _pipeBranch.apply(this, arguments);
}
/**
 * 同步远程 branch
 */


function _pipeBranch() {
  _pipeBranch = _asyncToGenerator(function* (api) {
    const prompt = new _prompt.default();
    prompt.register('mode', {
      type: 'list',
      message: 'branch 管理',
      name: 'mode',
      choices: [{
        name: '同步',
        value: 'sync'
      }, {
        name: '删除追踪',
        value: 'del-track'
      }, {
        name: '更改源',
        value: 'update-origin'
      }]
    });
    prompt.register('update-origin', {
      type: 'input',
      message: '请输入 git 源地址',
      name: 'url',
      default: ''
    });

    const _yield$prompt$run = yield prompt.run('mode'),
          mode = _yield$prompt$run.mode;

    try {
      switch (mode) {
        case 'sync':
          return sync();

        case 'del-track':
          return delTrakc();

        case 'update-origin':
          const _yield$prompt$run2 = yield prompt.run('update-origin'),
                url = _yield$prompt$run2.url;

          return updateOrigin(url);
      }
    } catch (e) {
      (0, _utils.chalkPrint)(e.message, 'red');
    }
  });
  return _pipeBranch.apply(this, arguments);
}

function sync() {
  (0, _child_process.execSync)('git remote update origin --prune', {
    stdio: [0, 1, 2]
  });
}
/**
 * 删除远程追踪的分支
 */


function delTrakc() {
  (0, _child_process.execSync)('git remote prune origin', {
    stdio: [0, 1, 2]
  });
}
/**
 * 更新 git 源
 */


function updateOrigin(url) {
  if (!url) {
    throw new Error('必须指定 git 源');
  }

  (0, _child_process.execSync)(`git remote set-url origin ${url}`, {
    stdio: [0, 1, 2]
  });
}