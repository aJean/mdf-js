import ora from 'ora';
/**
 * @file 封装 ora
 */
export declare type SpinnerOptions = {
    text?: string;
    color?: any;
    graph?: any;
};
export declare type SpinnerIns = ora.Ora;
export declare class Spinner {
    ins: ora.Ora;
    constructor(opts?: SpinnerOptions);
    /**
     * 预设样式
     */
    preset(opts: SpinnerOptions): void;
    start(opts?: SpinnerOptions): this;
    succeed(opts?: SpinnerOptions): this;
    fail(opts?: SpinnerOptions): this;
    info(opts?: SpinnerOptions): this;
    warn(opts?: SpinnerOptions): this;
    stop(): this;
    clear(): this;
}
