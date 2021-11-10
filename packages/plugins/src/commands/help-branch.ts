import { IApi } from '@mdfjs/types';
import { chalkPrint } from '@mdfjs/utils';
import { execSync } from 'child_process';
import Prompt from './prompt';

/**
 * @file git branch 管理
 */

export default async function pipeBranch(api: IApi) {
  const prompt = new Prompt();

  prompt.register('mode', {
    type: 'list',
    message: 'branch 管理',
    name: 'mode',
    choices: [
      { name: '同步', value: 'sync' },
      { name: '删除追踪', value: 'del-track' },
      { name: '更改源', value: 'update-origin' },
    ],
  });

  prompt.register('update-origin', {
    type: 'input',
    message: '请输入 git 源地址',
    name: 'url',
    default: '',
  });

  const { mode } = await prompt.run('mode');

  try {
    switch (mode) {
      case 'sync':
        return sync();
      case 'del-track':
        return delTrakc();
      case 'update-origin':
        const { url } = await prompt.run('update-origin');
        return updateOrigin(url);
    }
  } catch (e: any) {
    chalkPrint(e.message, 'red');
  }
}

/**
 * 同步远程 branch
 */
function sync() {
  execSync('git remote update origin --prune', { stdio: [0, 1, 2] });
}

/**
 * 删除远程追踪的分支
 */
function delTrakc() {
  execSync('git remote prune origin', { stdio: [0, 1, 2] });
}

/**
 * 更新 git 源
 */
function updateOrigin(url: string) {
  if (!url) {
    throw new Error('必须指定 git 源');
  }

  execSync(`git remote set-url origin ${url}`, { stdio: [0, 1, 2] });
}
