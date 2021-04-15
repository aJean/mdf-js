/**
 * @file utils
 */
export declare const yapi_cookie = "_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJpYXQiOjE2MTg0NTkwNDQsImV4cCI6MTYxOTA2Mzg0NH0.8SEf_LQhUsZHiJ1cMAnDE6XlRKbOXu8t4LyE3PvjpaY; _yapi_uid=11";
/**
 * yapi 的 cookie
 */
export declare function getYapiToken(): string;
/**
 * 实时读取 proxy.json，而 serverOpts 只起到开关的作用
 */
export declare function loadUserProxy(): any;
/**
 * 允许的跨区头
 */
export declare function getCorsHeaders(): string;
