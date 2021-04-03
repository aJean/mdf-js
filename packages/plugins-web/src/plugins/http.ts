/**
 * @file 设置 http 拦截器，用于链路追踪
 */

export function beforeRender() {
  const http = require('mdf').http;

  http.registerInterceptor('before', function (config: any) {
    console.log(config);
  });
}
