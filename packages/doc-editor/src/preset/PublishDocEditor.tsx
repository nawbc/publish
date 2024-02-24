import './theme/global.module.css';

import { Box, Divider, rem } from '@mantine/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import { DocEditor } from '../components';
import { Link } from '../customs';
import { Clipboard, DragHandle, FileInput, SlashCommands } from '../extensions';
import { registerProgramLanguages } from './languages';
import { placeholders } from './placeholders';

const lowlight = registerProgramLanguages();

export const PublishDocEditor = function () {
  const editor = useEditor({
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
    extensions: [
      Link.configure({
        openOnClick: true,
      }),
      FileInput,
      TextStyle,
      Underline,
      DragHandle,
      Clipboard,
      Color,
      TaskList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      TaskItem.configure({
        nested: true,
      }),
      SlashCommands.configure({
        // suggestion,
      }),
      Placeholder.configure({
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
      }),
      Markdown.configure({
        linkify: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    // content: `
    // <ul data-type="taskList"><li data-checked="true"><label contenteditable="false"><input type="checkbox" checked="checked"><span></span></label><div><p>dadas</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>dada</p><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>dada</p><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>dada</p><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>sdadas</p></div></li></ul></div></li></ul></div></li></ul></div></li></ul>
    //     `,
    // content: Array.from({ length: 100 }).join('<br/>'),
  });

  return (
    <Box m="0 auto" px="xl" maw="var(--publish-doc-editor-max-width)">
      <DocEditor editor={editor}>
        {editor && (
          <BubbleMenu
            tippyOptions={{
              maxWidth: 'unset',
            }}
            editor={editor}
          >
            <DocEditor.FnGroup>
              <DocEditor.FnList />
              <Divider my={rem(4)} variant="dashed" orientation="vertical" />
              <DocEditor.Bold />
              <DocEditor.Underline />
              <DocEditor.Strikethrough />
              <DocEditor.Italic />
              <DocEditor.Link />
              <DocEditor.ClearFormatting />
              <DocEditor.ColorPicker />
              <DocEditor.Code />
              <Divider my={rem(4)} variant="dashed" orientation="vertical" />
              <DocEditor.Copy />
            </DocEditor.FnGroup>
          </BubbleMenu>
        )}
        <DocEditor.Content />
      </DocEditor>
    </Box>
  );
};
