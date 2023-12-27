declare global {
  interface Window {
    __SID__: string;
  }
  const __SID__: string;
}

export * from './components';
export * from './helper';
export * from './message';
export * from './permissions';
export * from './plugin';
export * from './register.interface';
