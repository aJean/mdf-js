import glob from 'glob';
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
 * node require 支持 .ts
 * 目前只兼容 config 和 plugins 目录
 */
export declare function registerRequire(Files: string[], basePath: string): void;
/**
 * 查找用户的 package.json
 */
export declare function getUserPkg(path: string, prop?: string): any;
