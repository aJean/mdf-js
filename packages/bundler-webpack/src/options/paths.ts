import { join, resolve as resolvePath } from 'path';
import fs from 'fs';

/**
 * @file paths
 */

function resolveAlias() {
  try {
    const tsPath = resolvePath('./tsconfig.json');
    const tsconfig = require(tsPath);
    const { paths, baseUrl = '' } = tsconfig.compilerOptions;
    const alias = paths
      ? Object.keys(paths).reduce((prev, key) => {
          let _key = key.replace(/(\/)?\*+$/g, '');
          let value = paths[key];
          if (!Array.isArray(value)) {
            value = [value];
          }

          value.forEach((item: any) => {
            prev[_key] = resolvePath(join(baseUrl, item.replace(/(\/)?\*+$/g, '')));
          });

          return prev;
        }, {})
      : {};

    return alias;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function resolveJestAlias() {
  const alias = resolveAlias();
  const jestAlias = Object.keys(alias).reduce((prev, key) => {
    prev['^' + key + '(.+)$'] = alias[key] + '$1';
    return prev;
  }, {});
  return jestAlias;
}

export default function(userConfig: any) {
  let htmlTemplatePath = join(resolvePath('./public'), 'index.html');

  if (!fs.existsSync(htmlTemplatePath)) {
    htmlTemplatePath = join(__dirname, '../../public/index.html');
  }

  // publicPath、entry、alias 留给插件取修改
  const paths: any = {
    publicPath: userConfig.publicPath || '/',
    appEntry: userConfig.appEntry,
    appSrc: resolvePath('./src'),
    appDist: resolvePath('./dist'),
    appPublic: resolvePath('./public'),
    jestModuleAlias: resolveJestAlias(),
    moduleAlias: resolveAlias(),
    htmlTemplatePath,
  };

  // 注意这个属性在 dev 模式是无效的，开发环境应该使用相对路径
  if (userConfig.runtimePublicPath) {
    paths.rtEntry = join(__dirname, './runtimeEntry');
    paths.rtScript = `<script>window.webpackPublicPath = '${userConfig.runtimePublicPath}';</script>`;
  }

  return paths;
}
