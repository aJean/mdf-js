"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeRender = beforeRender;

/**
 * @file 设置 http 拦截器，用于链路追踪
 */
function beforeRender() {
  const http = require('mdf').http;

  let spanId = 0;
  http.registerInterceptor('before', function (config) {
    console.log('trace start: ', config);
  });
  http.registerInterceptor('after', function (res) {
    console.log('trace end: ', res);
  });
}