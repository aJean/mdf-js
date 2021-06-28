/**
 * 内部使用到的路径
 */
export declare function getPaths(): {
    absSrcPath: string;
    absTmpPath: string;
    absNodeModulesPath: string;
};
/**
 * 判断文件是否存在
 */
export declare function isExist(path: string): boolean;
/**
 * 创建目录
 */
export declare function makeDir(path: string): void;
/**
 * 安全写
 */
export declare function writeFile(path: string, data: string): void;
/**
 * 读取文件内容
 */
export declare function getFile(path: string): string | null;
/**
 * 带颜色的输出
 */
export declare function chalkPrint(msg: string, color: string): void;
/**
 * 将 path 转化成 plugin obj 保存
 * 会自动生成唯一 id => { id， key, apply }
 */
export declare function resolvePresets(presets: string[]): {
    id: string;
    path: string;
    apply(): any;
}[];
/**
 * 解析插件 path
 */
export declare function pathToObj(path: string): {
    id: string;
    path: string;
    apply(): any;
};
/**
 * 处理 es 模块的 cjs 导出问题
 */
export declare function esmExport(module: any): any;
/**
 * deep array add
 */
export declare function deepArrayAdd(list: Function[], args: any, ret: any[]): any[];
/**
 * 可以赋予更多的能力，比如沙盒环境
 */
export declare function runInContext(fn: Function, args: any[], context?: any): any;
/**
 * 执行并返回 promise
 */
export declare function runPlugin(plugin: any, method: string): Promise<unknown>;
/**
 * 工程错误解析
 */
export declare function parseError(msg: string): string;
