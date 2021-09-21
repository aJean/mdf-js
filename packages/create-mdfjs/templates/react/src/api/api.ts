import request from './request';

/**
 * @file 定义 api 接口
 */

export function changeTitle() {
  return request.get('/platform/checkApp');
}
