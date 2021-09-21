import { http } from 'mdf';

/**
 * @file 设置请求的公共参数，只有 create 才能开启 proxy 功能
 */

export default http.create({
  baseURL: process.env.MDF_API_HOST,
  useProxy: false,

  onSuccess(res) {
    return res.data;
  }
});
