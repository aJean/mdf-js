import joi2Types from 'joi2types';
import Joi from 'joi';
import { IApi } from '@mdfjs/types';
import { prettierFormat } from '@mdfjs/utils';

/**
 * @file 将插件 describe 的 config 导出
 */

export default function (api: IApi) {
  // 配置 chainWebpack 的定义
  api.describe({
    key: 'chainWebpack',
    config: {
      schema(joi: typeof Joi) {
        return joi.any();
      },
    },
  });

  // 约定 api.describe 不能放在异步队列里执行
  api.onCodeGenerate({
    name: 'genPluginConfig',
    async fn() {
      const { paths, service } = api;
      const pluginConfigs = service.pluginConfigs;
      let schemas: any = {};

      Object.keys(pluginConfigs).map((key) => {
        const data = pluginConfigs[key];

        if (data.schema) {
          schemas[key] = data.schema;
        }
      });

      schemas = Joi.object(schemas).unknown() as any;

      const data = await joi2Types(schemas, {
        interfaceName: 'IConfigPlugins',
        bannerComment: '/** plugin interface **/',
      });

      api.writeFile(`${paths.absTmpPath}/plugins/pluginConfig.d.ts`, prettierFormat(data));
    },
  });
}
