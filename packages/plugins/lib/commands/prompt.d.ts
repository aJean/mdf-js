import inquirer from 'inquirer';
/**
 * @file 交互式窗口
 */
declare type PromptOpts = {
    type: string;
    message: string;
    name: string;
    default?: any;
    choices?: any;
};
export default class Prompt {
    prompts: {};
    runPrompt: inquirer.PromptModule;
    register(name: string, opts: PromptOpts): void;
    run(name: string, opts?: PromptOpts): any;
}
export {};
