import type { Editor } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export type FileInputPluginOptions = {
  /**
   * @default 'fileInput'
   */
  key?: PluginKey;
  /**
   * accept mimeTypes
   *
   * example: ['image/jpeg', 'image/png']
   */
  accept?: string[];
  onPaste?: (editor: Editor, files: File[], pasteContent?: string) => void;
  onDrop?: (editor: Editor, files: File[], pos: number) => void;
  editor: Editor;
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
        if (!onDrop || !event.dataTransfer?.files.length) return;

        const coords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        let files = Array.from(event.dataTransfer!.files);
        if (Array.isArray(accept)) {
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
        if (!onPaste || !event.clipboardData?.files.length) return;

        let files = Array.from(event.clipboardData!.files);
        const clipboardData = event.clipboardData!.getData('text/html');

        if (Array.isArray(accept)) {
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

export const FileInput = Extension.create<FileInputOptions>({
  name: 'fileInput',
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
