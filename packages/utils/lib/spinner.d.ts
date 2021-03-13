import ora, { Options } from 'ora';
/**
 * @file 封装 ora
 */
export declare class Spinner {
    ins: ora.Ora;
    constructor(args?: Options);
    /**
     * 预设样式
     */
    preset(params: SpinnerParams): void;
    start(params?: SpinnerParams): this;
    succeed(params?: SpinnerParams): this;
    fail(params?: SpinnerParams): this;
    info(params?: SpinnerParams): this;
    warn(params?: SpinnerParams): this;
    stop(): this;
    clear(): this;
}
export declare type SpinnerParams = {
    text?: string;
    color?: string;
    graph?: string;
};
export declare type SpinnerIns = ora.Ora;
export declare type SpinnerOptions = Options;
