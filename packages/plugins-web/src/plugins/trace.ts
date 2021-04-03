/**
 * @file 设置 http 拦截器，用于链路追踪
 */

export function beforeRender() {
  const http = require('mdf').http;
  let spanId = 0;

  http.registerInterceptor('before', function (config: any) {
    console.log('trace start: ', config);
  });

  http.registerInterceptor('after', function (res: any) {
    console.log('trace end: ', res);
  });
}
