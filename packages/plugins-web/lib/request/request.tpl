import { default as request } from '{{{ toolPath }}}';

/**
 * @file request api
 */

const _onBefore: any = [];
const _onAfter: any = [];
const _create = request.create;

request.create = function(config: any) {
  if (config.useProxy) {
    {{#useProxy}}
      config.headers = {'X-Mdf-Proxy': config.baseURL};
      config.baseURL = 'http://localhost:9000';
    {{/useProxy}}
  }

  if (config.beforeSend) {
    _onBefore.push(config.beforeSend);
  }

  config.beforeSend = beforeLink;
  config.onSuccess = genSuccessLink(config.onSuccess);

  return _create.call(request, config);
}

function beforeLink(config: any) {
  const fns = _onBefore.map((fn: Function) => fn(config));
  return (Promise.allSettled || Promise.all).call(Promise, fns).then(
    () => config,
    () => config,
  );
}

function genSuccessLink(callback: Function) {
  return function(res: any, config: any) {
    _onAfter.map((fn: Function) => fn(res, config));
    return callback ? callback(res, config) : res;
  }
}

request['setBeforeInterceptor'] = function (fn: (config: any) => any) {
  _onBefore.push(fn);
};

request['setAfterInterceptor'] = function (fn: (res: any, config: any) => any) {
  _onAfter.push(fn);
};

export { request };