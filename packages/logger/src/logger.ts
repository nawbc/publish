import debug from 'debug';

import { LogLevel } from './i';
import type { Transport, TransportSynth } from './transport';

export interface LogOptions {
  level?: LogLevel;
  timestamp?: boolean;
  transports: TransportSynth[];
}

/**
 * Messages only support data that can be structurally cloned
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types}
 */
export class Logger {
  private readonly _debug: debug.Debugger;
  private readonly _options: LogOptions;
  private readonly _transports = new Set<InstanceType<typeof Transport>>();

  constructor(
    private readonly namespace: string,
    options?: LogOptions,
  ) {
    this._debug = debug(namespace);
    this._options = Object.assign({}, { transports: [] }, options);

    for (const { transport, options } of this._options.transports) {
      const opt = Object.assign(
        {},
        { namespace: this.namespace, level: LogLevel.info, ...this._options },
        options,
      );
      if (transport) {
        const instance = new transport(opt);
        this._transports.add(instance);
        // new Worker();
      }
    }
  }

  public set enabled(enabled: boolean) {
    this._debug.enabled = enabled;
  }

  public get enabled() {
    return this._debug.enabled;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    this._debug.log = console[level].bind(console);
    this._debug(`[${LogLevel[level]}] ${message}`, ...args);

    for (const transport of this._transports) {
      console.log(transport, '-------------------');
    }
  }

  public debug(message: string, ...args: any[]) {
    this.log(LogLevel.debug, message, ...args);
  }

  public info(message: string, ...args: any[]) {
    this.log(LogLevel.info, message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.log(LogLevel.warn, message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.log(LogLevel.error, message, ...args);
  }

  /**
   * Delete all logs from storage by namespace;
   */
  public grind() {}

  public dispose() {
    this._transports.clear();
  }
}
