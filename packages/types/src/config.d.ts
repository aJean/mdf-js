/**
 * @file 用户配置 (没有被 describe 定义的)
 */

interface IConfig {
  project: {
    type?: "web" | "node" | "hybrid";
    framework?: "dva" | "fundamental" | "vue";
    persist?: boolean;
    [k: string]: any;
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