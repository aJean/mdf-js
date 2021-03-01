/**
 * @file 用户配置 (没有被 describe 定义的)
 */

interface IConfig {
  framework: {
    type?: string;
  };
  defines?: Object;
  publicPath?: string;
  plugins?: string[];
  chainWebpack?: Function;
}

type WithFalse<T> = {
  [P in keyof T]?: T[P] | false;
};

export type IConfig = WithFalse<IConfig>;