/**
 * @file 复制 app 模板
 */
interface IContext {
    template: string;
    version: string;
    prettierOpts: string;
    createPath: string;
}
export default function copyAndRenderFiles(context: IContext): void;
export {};
