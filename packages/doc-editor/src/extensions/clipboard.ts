import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    clipBoard: {
      cut: () => ReturnType;
      copy: () => ReturnType;
    };
  }
}

export const Clipboard = Extension.create({
  name: 'clipboard',

  addCommands() {
    return {
      cut: () => () => {
        document.execCommand('cut');
        return true;
      },
      copy: () => () => {
        document.execCommand('copy');
        return true;
      },
    };
  },
});
