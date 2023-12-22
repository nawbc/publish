export enum BFSErrors {
  EEXIST = 'EEXIST',
  ENOENT = 'ENOENT',
  ENOTDIR = 'ENOTDIR',
  ENOTEMPTY = 'ENOTEMPTY',
  ETIMEDOUT = 'ETIMEDOUT',
  EISDIR = 'EISDIR',
}

function E(name: BFSErrors, message: string) {
  return class extends Error {
    public code: BFSErrors;
    constructor(...args) {
      super(...args);
      this.code = name;
      if (this.message) {
        this.message = name + ': ' + this.message;
      } else {
        this.message = message;
      }
    }
  };
}

export const EEXIST = E(BFSErrors.EEXIST, 'Target already exists');
export const ENOENT = E(BFSErrors.ENOENT, 'No such file or directory');
export const ENOTDIR = E(BFSErrors.ENOTDIR, 'Not a directory');
export const ENOTEMPTY = E(BFSErrors.ENOTEMPTY, 'Directory not empty');
export const ETIMEDOUT = E(BFSErrors.ETIMEDOUT, 'Operation timed out');
export const EISDIR = E(BFSErrors.EISDIR, 'Is a directory');
