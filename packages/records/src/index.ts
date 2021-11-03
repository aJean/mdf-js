/**
 * @file 同步所有的包一起更新，每次发布需要手动添加
 */

const records = [
  { version: '0.2.0', change: '升级依赖' },
  { version: '0.2.1', change: 'mdf-cli 优化' },
  { version: '0.2.2', change: 'mdf-cli 优化' },
  { version: '0.2.3', change: 'mdf 命令执行逻辑优化' },
  { version: '0.2.4', change: '升级 mdf node 模板' },
  { version: '0.2.5', change: '升级 webpack5' },
  { version: '0.2.6', change: '升级 webpack5' },
  { version: '0.2.7', change: '升级 webpack5' },
  { version: '0.2.8', change: '升级 webpack5' },
  { version: '0.2.9', change: '日常更新' },
  { version: '0.2.10', change: '更新 loader' },
  { version: '0.2.11', change: '拆分 lint' },
  { version: '0.2.12', change: '优化 lint' },
  { version: '0.2.13', change: '优化安装包' },
  { version: '0.2.14', change: '优化 lint' },
  { version: '0.2.15', change: '升级 vue template' },
  { version: '0.2.16', change: 'mdf-react 日常优化' },
  { version: '0.2.17', change: 'mdf-react 日常优化' },
  { version: '0.2.18', change: 'vue 多入口支持' },
  { version: '0.2.19', change: 'vue 多入口优化' },
];

/**
 * 取得所有发布过的版本
 */
export function getVersions() {
  return records.map((record) => record.version);
}

/**
 * 最新版本
 */
export function getVersion() {
  return records[records.length - 1].version;
}

/**
 * 取得特定版本的 release
 */
export function getRelease(vid: string) {
  const data = records.find((record) => record.version == vid);
  return data ? data.change : undefined;
}

export default records;
