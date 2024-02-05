export enum LoggerLevel {
  error = 0,
  warn = 1,
  info = 2,
  debug = 3,
}

export type Clz = new (...args: any) => any;
