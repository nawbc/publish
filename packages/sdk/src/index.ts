declare global {
  interface Window {
    __SID__: string;
  }
  const __SID__: string;
}

export * from './components';
export * from './helper';
export * from './manifest.interface';
export * from './message';
export * from './permissions';
export * from './plugin';
