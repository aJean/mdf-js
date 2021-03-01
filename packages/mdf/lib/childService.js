"use strict";

var _core = require("@mdfjs/core");

var _utils = require("@mdfjs/utils");

var _presets = _interopRequireDefault(require("./presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 启动 core service
 */
try {
  const presets = (0, _presets.default)();
  const service = new _core.Service(presets);
  service.runCommand('dev', JSON.parse(process.env.mdfArgs));
  let closed = false; // kill(2) ctrl-c

  process.once('SIGINT', () => onSignal('SIGINT')); // kill(3) ctrl-\

  process.once('SIGQUIT', () => onSignal('SIGQUIT')); // kill(15) default

  process.once('SIGTERM', () => onSignal('SIGTERM'));

  function onSignal(signal) {
    if (closed) {
      return;
    }

    closed = true; // 退出时触发插件中的 onExit 事件

    service.invokePlugin({
      key: 'processExit',
      type: _core.PluginType.event,
      args: [signal]
    });
    process.exit(0);
  }
} catch (e) {
  (0, _utils.errorPrint)(e);
  process.exit(1);
}