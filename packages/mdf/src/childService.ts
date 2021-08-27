import { Service, PluginType } from '@mdfjs/core';
import { errorPrint } from '@mdfjs/utils';
import getPresets from './presets';

/**
 * @file 启动 core service
 */

try {
  const presets = getPresets();
  const service = new Service(presets);

  service.runCommand('dev', JSON.parse(process.env.mdfArgs!));

  let closed = false;
  // kill(2) ctrl-c
  process.once('SIGINT', () => onSignal('SIGINT'));
  // kill(3) ctrl-\
  process.once('SIGQUIT', () => onSignal('SIGQUIT'));
  // kill(15) default
  process.once('SIGTERM', () => onSignal('SIGTERM'));

  function onSignal(signal: string) {
    if (closed) {
      return;
    }

    closed = true;

    // 退出时触发插件中的 onExit 事件
    service.invokePlugin({
      key: 'processExit',
      type: PluginType.event,
      args: [signal],
    });
    process.exit(0);
  }
} catch (e: any) {
  errorPrint(e);
  process.exit(1);
}
