import type { Editor } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export type FileInputPluginOptions = {
  /**
   * @default 'fileInput'
   */
  key?: PluginKey;
  editor: Editor;
  /**
   * accept mimeTypes
   *
   * example: ['image/jpeg', 'image/png']
   */
  accept?: string[];
  /**
   * The onPaste callback that is called when a file is pasted.
   * @param editor the editor instance
   * @param files the File array including File objects
   * @param the pasted content as HTML string - this is only available if there is also html copied to the clipboard for example by copying from a website
   */
  onPaste?: (editor: Editor, files: File[], pasteContent?: string) => void;
  /**
   * The onDrop callback that is called when a file is dropped.
   * @param editor the editor instance
   * @param files the File array including File objects
   * @returns Returns nothing.
   */
  onDrop?: (editor: Editor, files: File[], pos: number) => void;
};

export type FileInputOptions = object &
  Omit<FileInputPluginOptions, 'key' | 'editor'>;

export const FileInputPlugin = ({
  key,
  editor,
  onPaste,
  onDrop,
  accept,
}: FileInputPluginOptions) => {
  return new Plugin({
    key: key || new PluginKey('fileInput'),
    props: {
      handleDrop(view, event) {
        if (!onDrop) return;
        if (!event.dataTransfer?.files.length) return;

        const coords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        let files = Array.from(event.dataTransfer!.files);
        if (accept) {
          files = files.filter((e) => accept.includes(e.type));
          if (files.length !== 0) {
            event.preventDefault();
            event.stopPropagation();
            onDrop(editor, files, coords!.pos);
            return true;
          }
        }
        return (
          files.length !== 0 &&
          (event.preventDefault(),
          event.stopPropagation(),
          onDrop(editor, files, (null == coords ? void 0 : coords.pos) || 0),
          !0)
        );
      },
      handlePaste(_view, event) {
        if (!onPaste) return;
        if (!event.clipboardData?.files.length) return;

        let files = Array.from(event.clipboardData!.files);
        const clipboardData = event.clipboardData!.getData('text/html');

        if (accept) {
          files = files.filter((file) => accept.includes(file.type));
          if (files.length !== 0) {
            event.preventDefault();
            event.stopPropagation();
            onPaste?.(editor, files, clipboardData);
            return clipboardData.length <= 0;
          }
        }
      },
    },
  });
};

export const FileInput = Extension.create({
  name: 'fileInput',
  addOptions: () => ({
    onPaste: void 0,
    onDrop: void 0,
    accept: void 0,
  }),
  addProseMirrorPlugins() {
    return [
      FileInputPlugin({
        key: new PluginKey(this.name),
        editor: this.editor,
        accept: this.options.accept,
        onDrop: this.options.onDrop,
        onPaste: this.options.onPaste,
      }),
    ];
  },
});
