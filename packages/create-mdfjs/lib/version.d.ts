/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */
export declare function getVersions(): Promise<{
    mdfjs: unknown;
    react: unknown;
} | undefined>;
export declare const versions: {
    mdfjs: string;
    '@mdfjs/react': string;
};
