import inquirer from 'inquirer';

/**
 * @file 交互式窗口
 */

type PromptOpts = {
  type: string;
  message: string;
  name: string;
  default?: any;
  choices?: any;
};

export default class Prompt {
  prompts = {};
  runPrompt = inquirer.prompt;

  register(name: string, opts: PromptOpts) {
    this.prompts[name] = opts;
  }

  run(name: string, opts?: PromptOpts): any {
    const config = this.prompts[name];
    return this.runPrompt(Object.assign({}, config, opts));
  }
}
