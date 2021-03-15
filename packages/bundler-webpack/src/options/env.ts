/**
 * @file 处理 env 变量和 define
 */

const mdf_keys = ['MDF_VERSION', 'MDF_ENV'];
export default function(opts: any) {
  const envs = opts.envs;
  const defines = opts.defines || {};

  if (!opts.MDF_ENV) {
    throw new Error("can't find MDF_ENV in mdf config !");
  }

  mdf_keys.forEach(key => {
    defines[key] = opts[key];
  });

  Object.keys(envs).forEach((key: string) => {
    defines[key] = envs[key];
  });

  return defines;
}
