import ora from 'ora';

/**
 * @file 封装 ora
 */

export type SpinnerOptions = {
  text?: string;
  color?: any;
  graph?: any;
};

export type SpinnerIns = ora.Ora;

export class Spinner {
  ins: ora.Ora;

  constructor(opts?: SpinnerOptions) {
    if (opts && opts.graph) {
      opts['spinner'] = opts.graph;
      delete opts.graph;
    }

    this.ins = ora(opts);
  }

  /**
   * 预设样式
   */
  preset(opts: SpinnerOptions) {
    const ins = this.ins;

    if (opts.color) {
      ins.color = opts.color;
    }

    if (opts.graph) {
      ins.spinner = opts.graph;
    }
  }

  start(opts: SpinnerOptions = {}) {
    this.preset(opts);
    this.ins.start(opts.text);

    return this;
  }

  succeed(opts: SpinnerOptions = {}) {
    this.preset(opts);
    this.ins.succeed(opts.text);

    return this;
  }

  fail(opts: SpinnerOptions = {}) {
    this.preset(opts);
    this.ins.fail(opts.text);

    return this;
  }

  info(opts: SpinnerOptions = {}) {
    this.preset(opts);
    this.ins.info(opts.text);

    return this;
  }

  warn(opts: SpinnerOptions = {}) {
    this.preset(opts);
    this.ins.warn(opts.text);

    return this;
  }

  stop() {
    this.ins.stop();
    return this;
  }

  clear() {
    this.ins.clear();
    return this;
  }
}
