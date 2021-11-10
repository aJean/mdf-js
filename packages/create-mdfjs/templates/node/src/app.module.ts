import { Helper } from '@mdfjs/node';
import ExampleModule from './example/example.module';

/**
 * @file 启动模块
 */

export default Helper.createAppModule({
  imports: [ExampleModule],

  /**
   * 自定义 http 异常处理
   */
  handleHttpError(err, req, res) {
    res.send({
      code: 200,
      msg: err.message,
    });
  },

  /**
   * 自定义日志
   */
  handleLog(req, res) {},
});
