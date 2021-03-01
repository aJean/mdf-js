import { IApi } from '@mdfjs/types';
import { globFind } from '@mdfjs/utils';

/**
 * @file 处理全局样式
 */

export default function(api: IApi) {
  const { cwd } = api;
  const files = globFind(`${cwd}/src/styles/*`);

  if (files && files.length) {
    api.addImportsBehind(() => files);
  }
}
