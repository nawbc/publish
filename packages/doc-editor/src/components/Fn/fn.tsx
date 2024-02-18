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
  IconCode,
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

import { createFn } from './BaseFn';

export const BoldFn = createFn({
  label: 'boldFnLabel',
  icon: (props) => <IconBold {...props} />,
  isActive: { name: 'bold' },
  operation: { name: 'toggleBold' },
});

export const ItalicFn = createFn({
  label: 'italicFnLabel',
  icon: (props) => <IconItalic {...props} />,
  isActive: { name: 'italic' },
  operation: { name: 'toggleItalic' },
});

export const UnderlineFn = createFn({
  label: 'underlineFnLabel',
  icon: (props) => <IconUnderline {...props} />,
  isActive: { name: 'underline' },
  operation: { name: 'toggleUnderline' },
});

export const StrikeThroughFn = createFn({
  label: 'strikeFnLabel',
  icon: (props) => <IconStrikethrough {...props} />,
  isActive: { name: 'strike' },
  operation: { name: 'toggleStrike' },
});

export const ClearFormattingFn = createFn({
  label: 'clearFormattingFnLabel',
  icon: (props) => {
    return <IconEraser {...props} />;
  },
  operation: { name: 'unsetAllMarks' },
});

export const UnlinkFn = createFn({
  label: 'unlinkFnLabel',
  icon: (props) => <IconUnlink {...props} />,
  operation: { name: 'unsetLink' },
});

export const BulletListFn = createFn({
  label: 'bulletListFnLabel',
  icon: (props) => <IconList {...props} />,
  isActive: { name: 'bulletList' },
  operation: { name: 'toggleBulletList' },
});

export const OrderedListFn = createFn({
  label: 'orderedListFnLabel',
  icon: (props) => <IconListNumbers {...props} />,
  isActive: { name: 'orderedList' },
  operation: { name: 'toggleOrderedList' },
});

export const H1Fn = createFn({
  label: 'h1FnLabel',
  icon: (props) => <IconH1 {...props} />,
  isActive: { name: 'heading', attributes: { level: 1 } },
  operation: { name: 'toggleHeading', attributes: { level: 1 } },
});

export const H2Fn = createFn({
  label: 'h2FnLabel',
  icon: (props) => <IconH2 {...props} />,
  isActive: { name: 'heading', attributes: { level: 2 } },
  operation: { name: 'toggleHeading', attributes: { level: 2 } },
});

export const H3Fn = createFn({
  label: 'h3FnLabel',
  icon: (props) => <IconH3 {...props} />,
  isActive: { name: 'heading', attributes: { level: 3 } },
  operation: { name: 'toggleHeading', attributes: { level: 3 } },
});

export const H4Fn = createFn({
  label: 'h4FnLabel',
  icon: (props) => <IconH4 {...props} />,
  isActive: { name: 'heading', attributes: { level: 4 } },
  operation: { name: 'toggleHeading', attributes: { level: 4 } },
});

export const H5Fn = createFn({
  label: 'h5FnLabel',
  icon: (props) => <IconH5 {...props} />,
  isActive: { name: 'heading', attributes: { level: 5 } },
  operation: { name: 'toggleHeading', attributes: { level: 5 } },
});

export const H6Fn = createFn({
  label: 'h6FnLabel',
  icon: (props) => <IconH6 {...props} />,
  isActive: { name: 'heading', attributes: { level: 6 } },
  operation: { name: 'toggleHeading', attributes: { level: 6 } },
});

export const BlockquoteFn = createFn({
  label: 'blockquoteFnLabel',
  icon: (props) => <IconBlockquote {...props} />,
  isActive: { name: 'blockquote' },
  operation: { name: 'toggleBlockquote' },
});

export const AlignLeftFn = createFn({
  label: 'alignLeftFnLabel',
  icon: (props) => <IconAlignLeft {...props} />,
  operation: { name: 'setTextAlign', attributes: 'left' },
});

export const AlignRightFn = createFn({
  label: 'alignRightFnLabel',
  icon: (props) => <IconAlignRight {...props} />,
  operation: { name: 'setTextAlign', attributes: 'right' },
});

export const AlignCenterFn = createFn({
  label: 'alignCenterFnLabel',
  icon: (props) => <IconAlignCenter {...props} />,
  operation: { name: 'setTextAlign', attributes: 'center' },
});

export const AlignJustifyFn = createFn({
  label: 'alignJustifyFnLabel',
  icon: (props) => <IconAlignJustified {...props} />,
  operation: { name: 'setTextAlign', attributes: 'justify' },
});

export const SubscriptFn = createFn({
  label: 'subscriptFnLabel',
  icon: (props) => <IconSubscript {...props} />,
  isActive: { name: 'subscript' },
  operation: { name: 'toggleSubscript' },
});

export const SuperscriptFn = createFn({
  label: 'superscriptFnLabel',
  icon: (props) => <IconSuperscript {...props} />,
  isActive: { name: 'superscript' },
  operation: { name: 'toggleSuperscript' },
});

export const CodeFn = createFn({
  label: 'codeFnLabel',
  icon: (props) => <IconCode {...props} />,
  isActive: { name: 'code' },
  operation: { name: 'toggleCode' },
});

export const CodeBlockFn = createFn({
  label: 'codeBlockFnLabel',
  icon: (props) => <IconCode {...props} />,
  isActive: { name: 'codeBlock' },
  operation: { name: 'toggleCodeBlock' },
});

export const HighlightFn = createFn({
  label: 'highlightFnLabel',
  icon: (props) => <IconHighlight {...props} />,
  isActive: { name: 'highlight' },
  operation: { name: 'toggleHighlight' },
});

export const HrFn = createFn({
  label: 'hrFnLabel',
  icon: (props) => <IconLineDashed {...props} />,
  operation: { name: 'setHorizontalRule' },
});

export const UnsetColorFn = createFn({
  label: 'unsetColorFnLabel',
  icon: (props) => <IconCircleOff {...props} />,
  operation: { name: 'unsetColor' },
});

export const UndoFn = createFn({
  label: 'undoFnLabel',
  icon: (props) => <IconArrowBackUp {...props} />,
  isDisabled: (editor) => !(editor?.can() as any).undo(),
  operation: { name: 'undo' },
});

export const RedoFn = createFn({
  label: 'redoFnLabel',
  icon: (props) => <IconArrowForwardUp {...props} />,
  isDisabled: (editor) => !(editor?.can() as any).redo(),
  operation: { name: 'redo' },
});
