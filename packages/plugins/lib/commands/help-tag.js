"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipiTag;

var _utils = require("@mdfjs/utils");

var _child_process = require("child_process");

var _prompt = _interopRequireDefault(require("./prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file git tag 管理
 */
function pipiTag(_x) {
  return _pipiTag.apply(this, arguments);
}

function _pipiTag() {
  _pipiTag = _asyncToGenerator(function* (api) {
    const prompt = new _prompt.default();
    prompt.register('mode', {
      type: 'list',
      message: 'tag 管理',
      name: 'mode',
      choices: [{
        name: '新建',
        value: 'add'
      }, {
        name: '同步',
        value: 'sync'
      }, {
        name: '删除',
        value: 'del'
      }, {
        name: '查看',
        value: 'query'
      }]
    });
    prompt.register('add', {
      type: 'list',
      message: '选择 tag 类型',
      name: 'type',
      choices: [{
        name: 'major',
        value: 'major'
      }, {
        name: 'minor',
        value: 'minor'
      }, {
        name: 'patch',
        value: 'patch'
      }]
    });
    prompt.register('del', {
      type: 'input',
      message: '请输入要删除的版本',
      name: 'ver',
      default: ''
    });

    const _yield$prompt$run = yield prompt.run('mode'),
          mode = _yield$prompt$run.mode;

    try {
      switch (mode) {
        case 'sync':
          return sync();

        case 'add':
          const _yield$prompt$run2 = yield prompt.run('add'),
                type = _yield$prompt$run2.type;

          return add(type);

        case 'del':
          const _yield$prompt$run3 = yield prompt.run('del'),
                ver = _yield$prompt$run3.ver;

          return del(ver);

        case 'query':
          return query();
      }
    } catch (e) {
      (0, _utils.chalkPrint)(e.message, 'red');
    }
    /**
     * 同步远程 git
     */


    function sync() {
      (0, _child_process.execSync)('git tag -l | xargs git tag -d', {
        stdio: [0, 1, 2]
      });
      (0, _child_process.execSync)('git fetch origin --prune --tags', {
        stdio: [0, 1, 2]
      });
    }
    /**
     * 新增 tag
     */


    function add(cmd) {
      const pkg = (0, _utils.getUserPkg)(api.cwd);

      if (pkg) {
        const v = (0, _child_process.execSync)(`npm version ${cmd}`).toString();
        console.log(v);
        v && (0, _child_process.execSync)(`git push origin ${v}`, {
          stdio: [0, 1, 2]
        });
      } else {
        throw new Error(`no package.json found in ${api.cwd}`);
      }
    }

    function del(ver) {
      (0, _child_process.execSync)(`git tag -d ${ver}`, {
        stdio: [0, 1, 2]
      });
    }

    function query() {
      console.log((0, _child_process.execSync)(`git tag`).toString());
    }
  });
  return _pipiTag.apply(this, arguments);
}