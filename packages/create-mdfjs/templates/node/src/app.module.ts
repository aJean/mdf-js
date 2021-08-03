import { Helper } from '@mdfjs/node';
import OneModule from './one/one.module';

/**
 * @file 启动模块
 */

export default Helper.createAppModule({
  imports: [OneModule],
  /**
   * 自定义 http 异常处理
   */
  handleHttpError(err, req, res) {
    console.log(err);
    res.send({
      code: 200,
      msg: 'hahah',
    });
  },
});