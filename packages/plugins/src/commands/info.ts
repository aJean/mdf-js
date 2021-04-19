import { IApi } from '@mdfjs/types';
import boxen, { BorderStyle } from 'boxen';

/**
 * @file 获取框架信息、文档地址、demo 等都可以在这里输出
 */

export default function (api: IApi) {
  api.registerCommand({
    name: 'info',
    fn() {
      const { MDF_VERSION } = api.getConfig();

      const data = boxen(`mdf-js\nversion: ${MDF_VERSION}`, {
        padding: {
          top: 1,
          left: 20,
          right: 20,
          bottom: 1,
        },
        margin: 1,
        align: 'center',
        borderStyle: BorderStyle.Classic,
        borderColor: 'cyan',
      });

      console.log(data);
    },
  });
}
