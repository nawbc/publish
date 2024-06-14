import { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight';
import { PlaceholderOptions } from '@tiptap/extension-placeholder';
import { TableOptions } from '@tiptap/extension-table';
import { TaskItemOptions } from '@tiptap/extension-task-item';
import { StarterKitOptions } from '@tiptap/starter-kit';
import { MarkdownOptions } from 'tiptap-markdown';

import {
  builtinCommands,
  FileInputPluginOptions,
  SlashCommandsOptions,
} from '../extensions';
import { registerProgramLanguages } from './languages';
import { placeholders } from './placeholders';

const lowlight = registerProgramLanguages();

/**
 * The collection of TipTap extension configurations.
 */
export class ExtensionConfigs {
  /**
   * Placeholder
   */
  static placeholder = {
    placeholder: ({ node }) => {
      const { attrs, type } = node;
      switch (type.name) {
        case 'heading':
          return placeholders[type.name + attrs?.level];
        case 'paragraph':
          return 'Type / for commands';
        default:
          return type.name;
      }
    },
  } satisfies Partial<PlaceholderOptions>;
  /**
   * FileInput
   */
  static fileInput = {
    onDrop: (currentEditor, files, pos) => {
      files.forEach((file) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(pos, {
              type: 'uploadImage',
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach((file) => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          console.log(htmlContent); // eslint-disable-line no-console
          return false;
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: 'uploadImage',
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
  } satisfies Partial<FileInputPluginOptions>;

  static table = {
    resizable: true,
  } satisfies Partial<TableOptions>;

  /**
   * Markdown
   */
  static markdown = {
    linkify: true,
    transformPastedText: true,
    transformCopiedText: true,
  } satisfies Partial<MarkdownOptions>;

  static taskItem = {
    nested: true,
  } satisfies Partial<TaskItemOptions>;

  static starterKit = {
    codeBlock: false,
  } satisfies Partial<StarterKitOptions>;
  /**
   * CodeBlockLowlight
   */
  static codeBlockLowlight = {
    lowlight,
  } satisfies Partial<CodeBlockLowlightOptions>;
  /**
   * SlashCommands
   */
  static slashCommands = {
    suggestion: builtinCommands,
  } satisfies Partial<SlashCommandsOptions>;
}
