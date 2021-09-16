import { join } from 'path';
import { existsSync } from 'fs';
import { chalkPrints, getUserPkg } from '@mdfjs/utils';
import getUserInputs from './input';
import copyAndRenderFiles from './generate';
import getVersions from './version';

/**
 * @file 创建 mdf project，因为 install 可能会很慢，所以交给开发者自己选择时机执行
 */

const yargs = require('yargs');
// 默认项目路径 + 目录名，create-msfjs -p ./mdf-project
yargs.default('p', () => './mdf-project');

export default async function () {
  const opts = yargs.argv;
  const version = getUserPkg(join(__dirname, '../'), 'version');

  if (existsSync(opts.p)) {
    return chalkPrints([['error: ', 'red'], '无法创建已经存在的项目']);
  }

  if (opts.v) {
    return chalkPrints([[version, 'green']]);
  }

  // 信息输入
  const config = await getUserInputs();
  let needLibs;

  switch (config.template) {
    case 'react':
      needLibs = ['mdfjs', '@mdfjs/react'];
      break;
    case 'vue':
      needLibs = ['mdfjs', '@mdfjs/vue'];
      break;
    case 'node':
      needLibs = ['mdfjs', '@mdfjs/node'];
      break;
    case 'remax':
      return chalkPrints([['error: ', 'red'], '想多了，还不支持这个']);
  }

  const versions = await getVersions(needLibs);

  if (!versions) {
    return chalkPrints([['error: ', 'red'], '未找到可用的 mdf lib 版本']);
  }

  copyAndRenderFiles(
    Object.assign(config, versions, {
      // for local test
      createPath: opts.p,
      prettierOpts: JSON.stringify(require('@mdfjs/utils/assets/prettierrc.json'), null, 2),
    }),
  );

  chalkPrints([['end:', 'yellow'], ` create project as ${opts.p}`]);
}
