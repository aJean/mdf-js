import { join, resolve as resolvePath } from 'path';
import { existsSync } from 'fs';
import { registerRequire, errorPrint } from '@mdfjs/utils';
import Service from './service';
import { esmExport } from './utils';

/**
 * @file 获取用户配置，env、rc
 */

const MDF_ENV = process.env.MDF_ENV || 'dev';
const CONFIG_FILES = getConfigFiles('config');
const ENV_FILES = getConfigFiles('env');

/**
 * 用于插件: 获取用户配置
 */
export function getUserConfig() {
  const cwd = process.cwd();

  // 即时编译 config.ts，还可以有更广泛的使用场景，比如 api 注入、自定义语法糖
  registerRequire(CONFIG_FILES, cwd);

  const requires = CONFIG_FILES.map((file: string) => {
    try {
      const module = require(join(cwd, file));
      return esmExport(module);
    } catch (error) {
      return undefined;
    }
  }).filter(Boolean);

  if (!Object.keys(requires).length) {
    errorPrint(new Error('无法识别 config.ts 文件'));
    process.exit(1);
  }

  const config = Object.assign(
    {
      isDev: MDF_ENV === 'dev',
      // 框架版本
      MDF_VERSION: require('../package.json').version,
      // 约定 MDF_ENV 完全由执行脚本设置
      MDF_ENV,
    },
    ...requires,
  );

  // 自定义插件
  if (config.plugins) {
    config.plugins = config.plugins.map((path: string) => join(cwd, path));
  }

  return config;
}

/**
 * 用于构建: 验证 config 并加入 env 信息
 */
export default function getConfig(service: Service) {
  const config = getUserConfig();
  const pluginConfigs = service.pluginConfigs;

  // 验证传入的参数合法性
  Object.keys(pluginConfigs).forEach(key => {
    const data = pluginConfigs[key];
    const schema = data.schema;
    const old = data.default;
    const cur = config[key];
    const { error } = schema.validate(cur);

    if (error) {
      const e = new Error(`Validate config "${key}" failed, ${error.message}`);
      e.stack = error.stack;
      throw e;
    }

    // 补全插件默认值
    if (cur && old) {
      Object.keys(old).forEach(key => {
        if (cur[key] === undefined) {
          cur[key] = old[key];
        }
      });
    }
  });

  // 为了支持当下的泳道和上线部署
  const DeployEnvPath = resolvePath('.env');
  if (existsSync(DeployEnvPath)) {
    config.envs = [DeployEnvPath];
  } else {
    // env 文件放到 webpack-bundler 里面处理
    config.envs = ENV_FILES.map(path => {
      try {
        const absPath = resolvePath(path);
        return existsSync(absPath) ? absPath : undefined;
      } catch (error) {
        return undefined;
      }
    }).filter(Boolean);
  }

  return config;
}

/**
 * 扩展支持不同的 ext
 */
function getConfigFiles(name: string) {
  const ret: string[] = [];

  switch (name) {
    case 'config':
      ret.push(`config/${name}.ts`);
      ret.push(`config/${name}.${MDF_ENV}.ts`);
      return ret;
    case 'env':
      ret.push(`config/.${name}`);
      ret.push(`config/.${name}.${MDF_ENV}`);
      ret.push(`config/.${name}.local`);
      return ret;
    default:
      return ret;
  }
}
