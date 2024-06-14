import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconCircleOff,
  IconClipboardCopy,
  IconCode,
  IconCodeCircle,
  IconEraser,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHighlight,
  IconItalic,
  IconLineDashed,
  IconList,
  IconListNumbers,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
  IconUnlink,
} from '@tabler/icons-react';

import { fnFactory } from './fn-factory';

export const BoldFn = fnFactory({
  label: 'boldFnLabel',
  trailing: 'Ctrl+B',
  icon: (props) => <IconBold {...props} />,
  isActive: { name: 'bold' },
  operation: { name: 'toggleBold' },
});

export const ItalicFn = fnFactory({
  label: 'italicFnLabel',
  trailing: 'Ctrl+I',
  icon: (props) => <IconItalic {...props} />,
  isActive: { name: 'italic' },
  operation: { name: 'toggleItalic' },
});

export const UnderlineFn = fnFactory({
  label: 'underlineFnLabel',
  trailing: 'Ctrl+U',
  icon: (props) => <IconUnderline {...props} />,
  isActive: { name: 'underline' },
  operation: { name: 'toggleUnderline' },
});

export const StrikeThroughFn = fnFactory({
  label: 'strikeFnLabel',
  trailing: 'Ctrl+Shift+X',
  icon: (props) => <IconStrikethrough {...props} />,
  isActive: { name: 'strike' },
  operation: { name: 'toggleStrike' },
});

export const ClearFormattingFn = fnFactory({
  label: 'clearFormattingFnLabel',
  icon: (props) => {
    return <IconEraser {...props} />;
  },
  operation: { name: 'unsetAllMarks' },
});

export const UnlinkFn = fnFactory({
  label: 'unlinkFnLabel',
  icon: (props) => <IconUnlink {...props} />,
  operation: { name: 'unsetLink' },
});

export const BulletListFn = fnFactory({
  label: 'bulletListFnLabel',
  icon: (props) => <IconList {...props} />,
  isActive: { name: 'bulletList' },
  operation: { name: 'toggleBulletList' },
});

export const OrderedListFn = fnFactory({
  label: 'orderedListFnLabel',
  icon: (props) => <IconListNumbers {...props} />,
  isActive: { name: 'orderedList' },
  operation: { name: 'toggleOrderedList' },
});

export const H1Fn = fnFactory({
  label: 'h1FnLabel',
  trailing: 'Ctrl+Alt+1',
  icon: (props) => <IconH1 {...props} />,
  isActive: { name: 'heading', attributes: { level: 1 } },
  operation: { name: 'toggleHeading', attributes: { level: 1 } },
});

export const H2Fn = fnFactory({
  label: 'h2FnLabel',
  icon: (props) => <IconH2 {...props} />,
  isActive: { name: 'heading', attributes: { level: 2 } },
  operation: { name: 'toggleHeading', attributes: { level: 2 } },
});

export const H3Fn = fnFactory({
  label: 'h3FnLabel',
  icon: (props) => <IconH3 {...props} />,
  isActive: { name: 'heading', attributes: { level: 3 } },
  operation: { name: 'toggleHeading', attributes: { level: 3 } },
});

export const H4Fn = fnFactory({
  label: 'h4FnLabel',
  icon: (props) => <IconH4 {...props} />,
  isActive: { name: 'heading', attributes: { level: 4 } },
  operation: { name: 'toggleHeading', attributes: { level: 4 } },
});

export const H5Fn = fnFactory({
  label: 'h5FnLabel',
  icon: (props) => <IconH5 {...props} />,
  isActive: { name: 'heading', attributes: { level: 5 } },
  operation: { name: 'toggleHeading', attributes: { level: 5 } },
});

export const H6Fn = fnFactory({
  label: 'h6FnLabel',
  icon: (props) => <IconH6 {...props} />,
  isActive: { name: 'heading', attributes: { level: 6 } },
  operation: { name: 'toggleHeading', attributes: { level: 6 } },
});

export const BlockquoteFn = fnFactory({
  label: 'blockquoteFnLabel',
  trailing: 'Ctrl+Alt+B',
  icon: (props) => <IconBlockquote {...props} />,
  isActive: { name: 'blockquote' },
  operation: { name: 'toggleBlockquote' },
});

export const AlignLeftFn = fnFactory({
  label: 'alignLeftFnLabel',
  icon: (props) => <IconAlignLeft {...props} />,
  operation: { name: 'setTextAlign', attributes: 'left' },
});

export const AlignRightFn = fnFactory({
  label: 'alignRightFnLabel',
  icon: (props) => <IconAlignRight {...props} />,
  operation: { name: 'setTextAlign', attributes: 'right' },
});

export const AlignCenterFn = fnFactory({
  label: 'alignCenterFnLabel',
  icon: (props) => <IconAlignCenter {...props} />,
  operation: { name: 'setTextAlign', attributes: 'center' },
});

export const AlignJustifyFn = fnFactory({
  label: 'alignJustifyFnLabel',
  icon: (props) => <IconAlignJustified {...props} />,
  operation: { name: 'setTextAlign', attributes: 'justify' },
});

export const SubscriptFn = fnFactory({
  label: 'subscriptFnLabel',
  icon: (props) => <IconSubscript {...props} />,
  isActive: { name: 'subscript' },
  operation: { name: 'toggleSubscript' },
});

export const SuperscriptFn = fnFactory({
  label: 'superscriptFnLabel',
  icon: (props) => <IconSuperscript {...props} />,
  isActive: { name: 'superscript' },
  operation: { name: 'toggleSuperscript' },
});

export const CodeFn = fnFactory({
  label: 'codeFnLabel',
  trailing: 'Ctrl+E',
  icon: (props) => <IconCode {...props} />,
  isActive: { name: 'code' },
  operation: { name: 'toggleCode' },
});

export const CodeBlockFn = fnFactory({
  label: 'codeBlockFnLabel',
  trailing: 'Ctrl+Alt+C',
  icon: (props) => <IconCodeCircle {...props} />,
  isActive: { name: 'codeBlock' },
  operation: { name: 'toggleCodeBlock' },
});

export const HighlightFn = fnFactory({
  label: 'highlightFnLabel',
  icon: (props) => <IconHighlight {...props} />,
  isActive: { name: 'highlight' },
  operation: { name: 'toggleHighlight' },
});

export const HrFn = fnFactory({
  label: 'hrFnLabel',
  icon: (props) => <IconLineDashed {...props} />,
  operation: { name: 'setHorizontalRule' },
});

export const UnsetColorFn = fnFactory({
  label: 'unsetColorFnLabel',
  icon: (props) => <IconCircleOff {...props} />,
  operation: { name: 'unsetColor' },
});

export const UndoFn = fnFactory({
  label: 'undoFnLabel',
  icon: (props) => <IconArrowBackUp {...props} />,
  isDisabled: (editor) => !(editor?.can() as any).undo(),
  operation: { name: 'undo' },
});

export const RedoFn = fnFactory({
  label: 'redoFnLabel',
  icon: (props) => <IconArrowForwardUp {...props} />,
  isDisabled: (editor) => !(editor?.can() as any).redo(),
  operation: { name: 'redo' },
});

export const CopyFn = fnFactory({
  label: 'copyFnLabel',
  icon: (props) => <IconClipboardCopy {...props} />,
  operation: { name: 'copy' },
});
