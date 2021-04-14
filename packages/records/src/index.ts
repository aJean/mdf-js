/**
 * @file 同步所有的包一起更新，每次发布需要手动添加
 */

const records = [
  { version: '0.1.7', change: 'publicPath 相关更新' },
  { version: '0.1.8', change: 'request 通过参数决定是否启用代理模式' },
  { version: '0.1.9', change: '抽象 project 配置' },
  { version: '0.1.10', change: 'Spinner 类加入 utils' },
  { version: '0.1.11', change: 'Spinner 优化' },
  { version: '0.1.12', change: 'env 在 config 时进行初始化' },
  { version: '0.1.13', change: 'mdf-vue 发布' },
  { version: '0.1.14', change: 'vue template 问题修复' },
  { version: '0.1.15', change: '日常优化 + 响应式方案调整' },
  { version: '0.1.16', change: 'workserver 支持修改 port' },
  { version: '0.1.17', change: '增加 trace 功能' },
  { version: '0.1.18', change: 'request 增强，info 添加提示' },
];

/**
 * 取得所有发不过的版本
 */
export function getVersions() {
  return records.map(record => record.version);
}

/**
 * 取得特定版本的 release
 */
export function getRelease(vid: string) {
  const data = records.find(record => record.version == vid);
  return data ? data.change : undefined;
}

export default records;
