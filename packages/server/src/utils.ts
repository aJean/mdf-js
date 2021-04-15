import fs from 'fs';

/**
 * @file utils
 */

export const yapi_cookie =
  '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJpYXQiOjE2MTg0NTkwNDQsImV4cCI6MTYxOTA2Mzg0NH0.8SEf_LQhUsZHiJ1cMAnDE6XlRKbOXu8t4LyE3PvjpaY; _yapi_uid=11';

/**
 * yapi 的 cookie
 */
export function getYapiToken() {
  return yapi_cookie;
}

/**
 * 实时读取 proxy.json，而 serverOpts 只起到开关的作用
 */
export function loadUserProxy() {
  try {
    const path = `${process.cwd()}/config/proxy.json`;
    const content = fs.readFileSync(path, 'utf-8');
    const module = JSON.parse(content);

    return module;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

/**
 * 允许的跨区头
 */
export function getCorsHeaders() {
  return [
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Mdf-Proxy',
    'X-Trace-Id',
    'X-Analysis',
    'Authorization',
  ].join(',');
}
