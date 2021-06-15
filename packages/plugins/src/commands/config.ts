import { IApi } from '@mdfjs/types';
import { getUserConfig } from '@mdfjs/core';
import { Table } from 'console-table-printer';

/**
 * @file 读取户配置，在开发时可以用来做配置检查
 */

export default function (api: IApi) {
  api.registerCommand({
    name: 'config',
    fn() {
      console.log('------------------------ user config ------------------------');
      toTable(getUserConfig()).printTable();
      console.log('------------------------ env config ------------------------');
      toTable(api.getConfig().envs).printTable();
    },
  });
}

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
