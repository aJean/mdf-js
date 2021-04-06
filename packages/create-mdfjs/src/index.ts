import { join } from 'path';
import { chalkPrints, getUserPkg } from '@mdfjs/utils';
import getUserInputs from './input';
import copyAndRenderFiles from './generate';
import { getVersions } from './version';

/**
 * @file 创建 mdf project，暂时仅支持 react
 */

const yargs = require('yargs');
// 默认项目路径 + 目录名，create-msfjs -p ./mdf-project
yargs.default('p', () => './mdf-project');

export default async function () {
  const opts = yargs.argv;
  const version = getUserPkg(join(__dirname, '../'), 'version');

  if (opts.v) {
    return console.log(version);
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
    case 'taro':
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

  chalkPrints([['end:', 'yellow'], ' create project success']);
}
