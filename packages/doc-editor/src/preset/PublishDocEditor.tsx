import './theme/global.css.ts';

import { Box } from '@mantine/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { DocEditor } from '../components';
import { Link } from '../extends';
import { FileInput } from '../extensions';
import { blockMap } from './block-map.ts';
import { registerProgramLanguages } from './languages';

const lowlight = registerProgramLanguages();

export const PublishDocEditor = function () {
  const editor = useEditor({
    extensions: [
      Link,
      FileInput,
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          console.log(node);
          const { attrs, type } = node;
          const result = (() => {
            switch (type.name) {
              case 'heading':
                return blockMap[type.name + attrs?.level];
              case 'paragraph':
                return 'Type / for commands';
              default:
                return type.name;
            }
          })();

          return ' ' + result;
        },
      }),
    ],
    // content: Array.from({ length: 100 }).join('<br/>'),
  });
  return (
    <Box m="0 auto" px="xl" maw="var(--publish-doc-editor-max-width)">
      <DocEditor editor={editor}>
        {editor && (
          <BubbleMenu editor={editor}>
            <DocEditor.FnGroup>
              <DocEditor.Bold />
              <DocEditor.Italic />
              <DocEditor.Link />
            </DocEditor.FnGroup>
          </BubbleMenu>
        )}
        <DocEditor.Content />
      </DocEditor>
    </Box>
  );
};
