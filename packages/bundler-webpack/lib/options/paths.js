"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file paths
 */
function resolveAlias() {
  try {
    const tsPath = (0, _path.resolve)('./tsconfig.json');

    const tsconfig = require(tsPath);

    const _tsconfig$compilerOpt = tsconfig.compilerOptions,
          paths = _tsconfig$compilerOpt.paths,
          _tsconfig$compilerOpt2 = _tsconfig$compilerOpt.baseUrl,
          baseUrl = _tsconfig$compilerOpt2 === void 0 ? '' : _tsconfig$compilerOpt2;
    const alias = paths ? Object.keys(paths).reduce((prev, key) => {
      let _key = key.replace(/(\/)?\*+$/g, '');

      let value = paths[key];

      if (!Array.isArray(value)) {
        value = [value];
      }

      value.forEach(item => {
        prev[_key] = (0, _path.resolve)((0, _path.join)(baseUrl, item.replace(/(\/)?\*+$/g, '')));
      });
      return prev;
    }, {}) : {};
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

function _default(userConfig) {
  let htmlTemplatePath = (0, _path.join)((0, _path.resolve)('./public'), 'index.html');

  if (!_fs.default.existsSync(htmlTemplatePath)) {
    htmlTemplatePath = (0, _path.join)(__dirname, '../../public/index.html');
  } // publicPath、entry、alias 留给插件取修改


  const paths = {
    publicPath: userConfig.publicPath || '/',
    appEntry: userConfig.appEntry,
    appSrc: (0, _path.resolve)('./src'),
    appDist: (0, _path.resolve)('./dist'),
    appPublic: (0, _path.resolve)('./public'),
    jestModuleAlias: resolveJestAlias(),
    moduleAlias: resolveAlias(),
    htmlTemplatePath
  }; // 注意这个属性在 dev 模式是无效的，开发环境应该使用相对路径

  if (userConfig.runtimePublicPath) {
    paths.rtEntry = (0, _path.join)(__dirname, './runtimeEntry');
    paths.rtScript = `<script>window.webpackPublicPath = '${userConfig.runtimePublicPath}';</script>`;
  }

  return paths;
}