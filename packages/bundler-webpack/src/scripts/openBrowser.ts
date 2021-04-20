import open from 'open';
import { execSync } from 'child_process';

/**
 * @file 打开浏览器
 */

export default function openBrowser(url: string) {
  const supportedChromiumBrowsers = [
    'Google Chrome Canary',
    'Google Chrome',
    'Microsoft Edge',
    'Chromium',
  ];

  for (let chromiumBrowser of supportedChromiumBrowsers) {
    try {
      execSync('ps cax | grep "' + chromiumBrowser + '"');
      execSync(
        'osascript openChrome.applescript "' + encodeURI(url) + '" "' + chromiumBrowser + '"',
        {
          cwd: __dirname,
          stdio: 'ignore',
        },
      );

      return true;
    } catch (err) {}
  }

  // 如果复用 tab 失败， 打开新标签页
  try {
    open(url, { wait: false, url: true }).catch(() => {});
    return true;
  } catch (err) {
    return false;
  }
}
