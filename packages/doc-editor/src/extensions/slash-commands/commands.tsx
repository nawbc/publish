import { IconH1, IconH2, IconH3, IconH4, IconH5 } from '@tabler/icons-react';
import { ReactRenderer } from '@tiptap/react';
import { HTMLAttributes } from 'react';
import tippy from 'tippy.js';

import { DEFAULT_LABELS } from '../../components';
import { SlashMenu } from './SlashMenu';

export const textCommands = [
  {
    title: DEFAULT_LABELS['h1FnLabel'],
    icon: (props) => <IconH1 {...props} />,
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 1 });
    },
  },
  {
    title: DEFAULT_LABELS['h2FnLabel'],
    icon: (props) => <IconH2 {...props} />,
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 2 });
    },
  },
  {
    title: DEFAULT_LABELS['h3FnLabel'],
    icon: (props) => <IconH3 {...props} />,
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 3 });
    },
  },
  {
    title: DEFAULT_LABELS['h4FnLabel'],
    icon: (props) => <IconH4 {...props} />,
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 4 });
    },
  },
  {
    title: DEFAULT_LABELS['h5FnLabel'],
    icon: (props) => <IconH5 {...props} />,
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 5 });
    },
  },
  {
    title: DEFAULT_LABELS['h5FnLabel'],
    command: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 6 });
    },
  },
] as const;

export const styleCommands = [
  {
    title: DEFAULT_LABELS['boldFnLabel'],
    command: ({ editor }) => {
      editor.chain().focus().toggleBold();
    },
  },
  {
    title: DEFAULT_LABELS['italicFnLabel'],
    command: ({ editor }) => {
      editor.chain().focus().toggleItalic();
    },
  },
  {
    title: DEFAULT_LABELS['underlineFnLabel'],
    command: ({ editor }) => {
      editor.chain().focus().toggleUnderline();
    },
  },
  {
    title: DEFAULT_LABELS['strikeFnLabel'],
    command: ({ editor }) => {
      editor.chain().focus().toggleStrike();
    },
  },
] as const;

export const builtinCommands = {
  items: ({ query }) => {
    return [
      {
        title: 'Text',
        commands: textCommands,
      },
      {
        title: 'Style',
        commands: textCommands,
      },
      {
        title: 'List',
        commands: textCommands,
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase()),
      )
      .slice(0, 10);
  },

  render: () => {
    let component: ReactRenderer<HTMLAttributes<HTMLDivElement>>;
    let popup: ReturnType<typeof tippy>;

    return {
      onStart: (props) => {
        console.log(props);
        component = new ReactRenderer(SlashMenu, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown!(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
} as const;
