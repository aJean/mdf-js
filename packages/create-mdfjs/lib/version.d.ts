/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */
export declare function getVersions(needLibs: any): Promise<{
    [x: number]: unknown;
} | undefined> | undefined;
