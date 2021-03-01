/**
 * @file 这个模块将会聚合以下功能：proxy、ws 通信、ui 原子交互
 */
export interface IServerOpts {
    proxy?: any;
    ws?: boolean;
    ui?: boolean;
    onError?: Function;
    onListening?: Function;
    onFinish?: (...args: any) => void;
}
/**
 * 首次创建服务传入外部参数使用这个方法
 */
export declare function startWorkServer(opts?: IServerOpts, callback?: Function): void;
/**
 * watch 变化重启服务使用这个方法
 */
export declare function restartWorkServer(): void;
