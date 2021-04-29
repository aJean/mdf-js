import { join, resolve as resolvePath } from 'path';
import { registerRequire, errorPrint, getUserPkg } from '@mdfjs/utils';
import Service from './service';
import { esmExport, getFile } from './utils';
import { parse } from 'dotenv';

/**
 * @file 获取用户配置，env、rc
 */

const MDF_ENV = process.env.MDF_ENV || 'dev';
const CONFIG_FILES = genMultiFiles('config');

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
      MDF_ENV,
      // 框架与项目信息
      MDF_VERSION: getUserPkg('..', 'version'),
      PRO_VERSION: getUserPkg(cwd, 'version'),
      PRO_NAME: getUserPkg(cwd, 'name'),
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
export function getConfig(service: Service) {
  const config = getUserConfig();
  const pluginConfigs = service.pluginConfigs;

  // 验证传入的参数合法性
  Object.keys(pluginConfigs).forEach((key) => {
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
      Object.keys(old).forEach((key) => {
        if (cur[key] === undefined) {
          cur[key] = old[key];
        }
      });
    }
  });

  config.envs = genEnvs();
  return config;
}

/**
 * 扩展支持不同的 ext
 */
function genMultiFiles(name: string) {
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

/**
 * 将多环境 .env 转化为对象
 */
function genEnvs() {
  const ENV_FILES = genMultiFiles('env');
  const envs = {};

  ENV_FILES.forEach((path) => {
    try {
      const absPath = resolvePath(path);
      const parsed = parse(getFile(absPath)!) || {};

      Object.keys(parsed).forEach((key: string) => {
        envs[key] = parsed[key];
      });
    } catch (error) {}
  });

  return envs;
}
