/**
 * @file 监控文件目录
 */
export declare type IWatchOpts = {
    path: string;
    keys?: string[];
    useMemo?: boolean;
    exclude?: RegExp;
    onChange: (type: string, path: string) => void;
};
export declare function watch(opts: IWatchOpts): () => void;
