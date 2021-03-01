import { parse } from 'dotenv';
import { readFileSync } from 'fs';

/**
 * @file 处理 env 变量和 define
 */

const mdf_keys = ['MDF_VERSION', 'MDF_ENV'];
export default function(opts: any) {
  const envFiles = opts.envs;
  const defines = opts.defines || {};

  if (!opts.MDF_ENV) {
    throw new Error("can't find MDF_ENV in mdf config !");
  }

  mdf_keys.forEach(key => {
    defines[key] = opts[key];
  });

  envFiles.forEach((path: string) => {
    const parsed = parse(readFileSync(path, 'utf-8')) || {};

    Object.keys(parsed).forEach((key: string) => {
      defines[key] = parsed[key];
    });
  });

  return defines;
}
