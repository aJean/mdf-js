import request from 'request';
import { errorPrint } from '@mdfjs/utils';

/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */

export function getVersions() {
  return Promise.all([fetch('mdfjs'), fetch('@mdfjs/react')])
    .then((res) => {
      return { mdfjs: res[0], react: res[1] };
    })
    .catch((e) => {
      errorPrint(e);
      return undefined;
    });
}

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

export const versions = {
  mdfjs: '0.0.26',
  '@mdfjs/react': '0.0.28',
};
