import fs from 'fs';

/**
 * @file utils
 */

export function getYapiToken() {
  // 应该申请一个通用最高权限的 token
  return '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjY3LCJpYXQiOjE2MDk3NjY0NzcsImV4cCI6MTYxMDM3MTI3N30.bxB_UxDVUEtBQbB0F6JL_EZZp2KStNvMD94_d0aufjk;_yapi_uid=67';
}

/**
 * 实时读取 proxy.json，而 serverOpts 只起到开关的作用
 */
export function loadUserProxy() {
  try {
    const path = `${process.cwd()}/config/proxy.json`;
    const content = fs.readFileSync(path, 'utf-8');
    const module = JSON.parse(content);

    return module;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
