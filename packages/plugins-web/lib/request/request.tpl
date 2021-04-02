import { http } from '{{{ runtimePath }}}';

/**
 * @file 加入代理判断
 */

const originCreate = http.create;

http.create = function(config: any) {
  if (config.useProxy) {
    {{#useProxy}}
      config.headers = {'X-Mdf-Proxy': config.baseURL};
      config.baseURL = 'http://localhost:9000';
    {{/useProxy}}
  }

  return originCreate.call(http, config);
}

export { http as request };