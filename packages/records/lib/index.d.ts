/**
 * @file 同步所有的包一起更新，每次发布需要手动添加
 */
declare const records: {
    version: string;
    change: string;
}[];
/**
 * 取得所有发布过的版本
 */
export declare function getVersions(): string[];
/**
 * 最新版本
 */
export declare function getVersion(): string;
/**
 * 取得特定版本的 release
 */
export declare function getRelease(vid: string): string | undefined;
export default records;
