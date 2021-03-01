import { fork } from 'child_process';

/**
 * @file 启动子进程
 */

export default function startFork(path: string) {
  // 执行命令的参数，不在 argv 中
  const execArgv = process.execArgv.slice(0);
  // yarn run dev -p 10
  const argv = process.argv.slice(2);
  const child = fork(path, argv);

  child.on('message', (data: any) => {
    const type = (data && data.type) || null;

    // user configs change 重启服务
    if (type === 'RESTART') {
      child.kill();
      startFork(path);
    } else if (type === 'KILL') {
      child.kill();
    }

    // 消息还是发给当前进程，不过大部分情况 send 已经无了
    process.send && process.send(data);
  });

  return child;
}
