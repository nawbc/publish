import './theme/global.css.ts';

import { Box, Divider, rem } from '@mantine/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import { DocEditor } from '../components';
import { Link } from '../customs';
import { DragHandle, FileInput, SlashCommands } from '../extensions';
import { registerProgramLanguages } from './languages';
import { placeholders } from './placeholders';

const lowlight = registerProgramLanguages();

const swatches = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
];

export const PublishDocEditor = function () {
  const editor = useEditor({
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
    extensions: [
      Link,
      FileInput,
      TextStyle,
      Color,
      Underline,
      DragHandle,
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommands.configure({
        // suggestion,
      }),
      Color.configure({
        types: ['textStyle'],
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
              <DocEditor.ColorPicker colors={swatches} />
              <DocEditor.Code />
              <Divider my={rem(4)} variant="dashed" orientation="vertical" />
            </DocEditor.FnGroup>
          </BubbleMenu>
        )}
        <DocEditor.FnGroup
          style={{
            zIndex: 1000,
            position: 'absolute',
          }}
        >
          <DocEditor.FnList />
          <Divider my={rem(4)} variant="dashed" orientation="vertical" />
          <DocEditor.Bold />
          <DocEditor.Underline />
          <DocEditor.Strikethrough />
          <DocEditor.Italic />
          <DocEditor.Link />
          <DocEditor.ClearFormatting />
          <DocEditor.ColorPicker colors={swatches} />
          <DocEditor.Code />
          <Divider my={rem(4)} variant="dashed" orientation="vertical" />
        </DocEditor.FnGroup>
        <DocEditor.Content />
      </DocEditor>
    </Box>
  );
};
