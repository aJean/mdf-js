"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeRender = beforeRender;

/**
 * @file 设置 http 拦截器，用于链路追踪
 *       1. 前端生成 uber-trace-id 与 context，直接打通追踪链路 - 需要 server 配合 extract header
 *       2. 通过拦截器创建 aop 切面，记录请求时间，用于前端性能监控 - 也可以通过 node 开启 server time
 */
function beforeRender() {
  const http = require('mdf').http;

  let spanId = 0; // 为 header 设置 X-Trace-Id (uber-trace-id)

  http.registerInterceptor('before', function (config) {
    console.log('trace start: ', config);
  });
  http.registerInterceptor('after', function (res) {
    console.log('trace end: ', res);
  });
}