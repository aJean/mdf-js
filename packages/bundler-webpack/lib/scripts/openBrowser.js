"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openBrowser;

var _open = _interopRequireDefault(require("open"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 打开浏览器
 */
function openBrowser(url) {
  const supportedChromiumBrowsers = ['Google Chrome Canary', 'Google Chrome', 'Microsoft Edge', 'Chromium'];

  for (var _i = 0, _supportedChromiumBro = supportedChromiumBrowsers; _i < _supportedChromiumBro.length; _i++) {
    let chromiumBrowser = _supportedChromiumBro[_i];

    try {
      (0, _child_process.execSync)('ps cax | grep "' + chromiumBrowser + '"');
      (0, _child_process.execSync)('osascript openChrome.applescript "' + encodeURI(url) + '" "' + chromiumBrowser + '"', {
        cwd: __dirname,
        stdio: 'ignore'
      });
      return true;
    } catch (err) {}
  } // 如果复用 tab 失败， 打开新标签页


  try {
    (0, _open.default)(url, {
      wait: false,
      url: true
    }).catch(() => {});
    return true;
  } catch (err) {
    return false;
  }
}