import { request } from 'mdf';

/**
 * @file 设置请求的公共参数，只有 create 才能开启 proxy 功能
 */

export default request.create({
  baseURL: process.env.MDF_API_HOST
});
