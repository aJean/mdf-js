import { getUserConfig } from '@mdfjs/core';
import { IApi } from '@mdfjs/types';
import boxen, { BorderStyle } from 'boxen';
import { Table } from 'console-table-printer';
import { tagPipeline } from './tag';

/**
 * @file 内部辅助命令
 */

type MdfOpts = {
  info?: boolean;
  config?: boolean;
  tag?: boolean;
  branch?: boolean;
};

export default function (api: IApi) {
  api.registerCommand({
    name: 'help',
    fn(opts: MdfOpts) {
      if (opts.config) {
        doConfig(api);
      } else if (opts.tag) {
        tagPipeline(api);
      } else if (opts.branch) {
        // 分支管理: 删除、同步远程
        // git remote prune origin
      } else {
        doInfo(api);
      }
    },
  });
}

/**
 * mdf 框架信息
 */
function doInfo(api: IApi) {
  const { MDF_VERSION } = api.getConfig();
  const padding = { top: 1, left: 20, right: 20, bottom: 1 };
  const data = boxen(`mdf-js\nversion: ${MDF_VERSION}`, {
    padding,
    margin: 1,
    align: 'center',
    borderStyle: BorderStyle.Classic,
    borderColor: 'cyan',
  });

  console.log(data);
}

/**
 * 用户配置
 */
function doConfig(api: IApi) {
  function toTable(data: Object): Table {
    const table = new Table({
      columns: [
        { name: 'index', alignment: 'left', color: 'cyan' },
        { name: 'key', alignment: 'right', color: 'green' },
        { name: 'value', alignment: 'left' },
      ],
    });

    Object.keys(data).forEach((key: string, index: number) => {
      const value = data[key];
      table.addRow(
        { index, key, value: JSON.stringify(value) },
        { color: typeof value == 'object' ? '' : 'yellow' },
      );
    });

    return table;
  }

  console.log('------------------------ user config ------------------------');
  toTable(getUserConfig()).printTable();
  console.log('------------------------ env config ------------------------');
  toTable(api.getConfig().envs).printTable();
}
