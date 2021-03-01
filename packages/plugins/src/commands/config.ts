import { IApi } from '@mdfjs/types';
import { getUserConfig } from '@mdfjs/core';

/**
 * @file 读取户配置，在开发时可以用来做配置检查
 */

export default function (api: IApi) {
  api.registerCommand({
    name: 'config',
    fn() {
      const config = getUserConfig();
      console.log(config);
    },
  });
}
