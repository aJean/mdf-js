import { IApi } from '@mdfjs/types';
import { getUserPkg, chalkPrint } from '@mdfjs/utils';
import { execSync } from 'child_process';
import Prompt from './prompt';

/**
 * @file git tag 管理
 */

export default async function pipiTag(api: IApi) {
  const prompt = new Prompt();

  prompt.register('mode', {
    type: 'list',
    message: 'tag 管理',
    name: 'mode',
    choices: [
      { name: '新建', value: 'add' },
      { name: '同步', value: 'sync' },
      { name: '删除', value: 'del' },
      { name: '查看', value: 'query' },
    ],
  });

  prompt.register('add', {
    type: 'list',
    message: '选择 tag 类型',
    name: 'type',
    choices: [
      { name: 'major', value: 'major' },
      { name: 'minor', value: 'minor' },
      { name: 'patch', value: 'patch' },
    ],
  });

  prompt.register('del', {
    type: 'input',
    message: '请输入要删除的版本',
    name: 'ver',
    default: '',
  });

  const { mode } = await prompt.run('mode');

  try {
    switch (mode) {
      case 'sync':
        return sync();
      case 'add':
        const { type } = await prompt.run('add');
        return add(type);
      case 'del':
        const { ver } = await prompt.run('del');
        return del(ver);
      case 'query':
        return query();
    }
  } catch (e: any) {
    chalkPrint(e.message, 'red');
  }

  /**
   * 同步远程 git
   */
  function sync() {
    execSync('git tag -l | xargs git tag -d', { stdio: [0, 1, 2] });
    execSync('git fetch origin --prune --tags', { stdio: [0, 1, 2] });
  }

  /**
   * 新增 tag
   */
  function add(cmd: string) {
    const pkg = getUserPkg(api.cwd);

    if (pkg) {
      const v = execSync(`npm version ${cmd}`).toString();
      console.log(v);
      v && execSync(`git push origin ${v}`, { stdio: [0, 1, 2] });
    } else {
      throw new Error(`no package.json found in ${api.cwd}`);
    }
  }

  function del(ver: string) {
    execSync(`git tag -d ${ver}`, { stdio: [0, 1, 2] });
  }

  function query() {
    console.log(execSync(`git tag`).toString());
  }
}
