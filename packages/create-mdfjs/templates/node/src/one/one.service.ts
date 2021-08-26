import { Injectable, AppService } from '@mdfjs/node';

/**
 * @file 一个普通 service 的例子
 */

@Injectable()
export default class OneService extends AppService {
  constructor() {
    super('one');
  }

  /**
   * 正常网络请求
   */
  getData(): any {
    return this.send({
      url: ' http://8.131.68.38:9102/v1/api/cm/question/explains/unique/get?id=18083',
    });
  }

  /**
   * 延时 1s 执行
   */
  checkData(): any {
    const res = this.pipeMock({ data: '假的吧' });

    return new Promise(function (resolve) {
      setTimeout(() => resolve(res), 1000);
    });
  }
}
