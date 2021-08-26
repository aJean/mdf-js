import request from 'request';
import { errorPrint } from '@mdfjs/utils';

/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */

export default function getVersions(needLibs: any) {
  if (!needLibs || !needLibs.length) {
    return undefined;
  }

  const reqs = needLibs.map((lib: string) => fetch(lib));
  return Promise.all(reqs)
    .then((res) => {
      return {
        [needLibs[0]]: res[0],
        [needLibs[1]]: res[1],
      };
    })
    .catch((e) => {
      errorPrint(e);
      return undefined;
    });
}

/**
 * 查找 lib latest 版本
 */
function fetch(name: string) {
  // 淘宝源版本可能会滞后，但是不需要代理
  const url = `https://registry.npm.taobao.org/${name}`;

  return new Promise(function (resolve, reject) {
    request.get(
      {
        url,
        headers: {
          accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
          agent: 'request',
        },
      },
      function (error, res) {
        if (error) {
          return reject(error);
        }

        try {
          const data = res.toJSON();
          const version = JSON.parse(data.body)['dist-tags'].latest;

          resolve(version);
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}
