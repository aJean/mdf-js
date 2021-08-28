import glob from 'glob';
/**
 * 格式化输出
 */
export declare function prettierFormat(data: string): string;
/**
 * 彩色打印
 */
export declare function chalkPrint(msg: string, color: string): void;
/**
 * 自由组合彩色打印
 */
export declare function chalkPrints(tokens: any[]): void;
/**
 * 进程错误
 */
export declare function errorPrint(e: Error): void;
/**
 * 编译错误
 */
export declare function compileErrorPrint(msg: string): void;
/**
 * 查找文件
 */
export declare function globFind(pattern: string, opts?: glob.IOptions): string[];
/**
 * 删除目录
 */
export declare function rmrf(...paths: string[]): void;
/**
 * node require 支持 .ts
 * 目前只兼容 config 和 plugins 目录
 */
export declare function registerRequire(Files: string[], basePath: string): void;
/**
 * 共享模块，用于 link 开发调试
 */
export declare function shareModules(): void;
/**
 * 查找用户的 package.json
 */
export declare function getUserPkg(path: string, prop?: string): any;
/**
 * 根据 project type 适配文件路径，不允许工程模块私自修改
 */
export declare function genStaticPath(api: any): "src/client" | "src";
/**
 * 路由目录 path
 */
export declare function genRoutesPath(api: any): string;
/**
 * 数据目录 path
 */
export declare function genModelsPath(api: any): string;
/**
 * app config path
 */
export declare function genAppPath(api: any): string;
export declare function genServerPath(api: any): "src" | "src/server";
