"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file server 路由中间件，更加可控
 *       服务状态控制台展示
 *       gen html，不依赖 html-webpack-plugin
 *       服务端渲染、static server、ws 通信、proxy
 */
function _default(_x, _x2, _x3) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (req, res, next) {
    if (req.path === '/favicon.ico') {
      res.status(204);
    }

    res.setHeader('x-mdf-server', '0.0.0');
    next();
  });
  return _ref.apply(this, arguments);
}

function generateHtml() {
  return '';
}