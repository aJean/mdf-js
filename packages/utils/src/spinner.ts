import ora, { Options } from 'ora';

/**
 * @file 封装 ora
 */

export class Spinner {
  ins: ora.Ora;

  constructor(args?: Options) {
    this.ins = ora(args);
  }

  /**
   * 预设样式
   */
  preset(params: SpinnerParams) {
    const ins = this.ins;

    if (params.color) {
      ins.color = <any>params.color;
    }

    if (params.graph) {
      ins.spinner = <any>params.graph;
    }
  }

  start(params: SpinnerParams = {}) {
    this.preset(params);
    this.ins.start(params.text);

    return this;
  }

  succeed(params: SpinnerParams = {}) {
    this.preset(params);
    this.ins.succeed(params.text);

    return this;
  }

  fail(params: SpinnerParams = {}) {
    this.preset(params);
    this.ins.fail(params.text);

    return this;
  }

  info(params: SpinnerParams = {}) {
    this.preset(params);
    this.ins.info(params.text);

    return this;
  }

  warn(params: SpinnerParams = {}) {
    this.preset(params);
    this.ins.warn(params.text);

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

export type SpinnerParams = {
  text?: string;
  color?: string;
  graph?: string;
};

export type SpinnerIns = ora.Ora;

export type SpinnerOptions = Options;
