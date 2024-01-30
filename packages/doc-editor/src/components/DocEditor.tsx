import type {
  BoxProps,
  ElementProps,
  Factory,
  StylesApiProps,
} from '@mantine/core';
import { Box, factory, useProps, useStyles } from '@mantine/core';
import type { Editor } from '@tiptap/react';
import React, { useMemo } from 'react';

import { DocEditorContent } from './Content/Content';
import { DocEditorProvider } from './DocEditor.context';
import classes from './DocEditor.module.css';
import * as fns from './Fn';
import { DocEditorFn } from './Fn/DocEditorFn';
import { DocEditorFnGroup } from './FnGroup/FnGroup';
import type { DocEditorLabels } from './labels';
import { DEFAULT_LABELS } from './labels';

export type DocEditorStylesNames =
  | 'linkEditorSave'
  | 'linkEditorDropdown'
  | 'root'
  | 'content'
  | 'typographyStylesProvider'
  | 'fn'
  | 'fnGroup'
  | 'linkEditor'
  | 'linkEditorInput'
  | 'linkEditorExternalFn';

export interface DocEditorProps
  extends BoxProps,
    StylesApiProps<DocEditorFactory>,
    ElementProps<'div'> {
  /** Tiptap editor instance */
  editor: Editor | null;

  /** Determines whether code highlight styles should be added, `true` by default */
  withCodeHighlightStyles?: boolean;

  /** Determines whether typography styles should be added, `true` by default */
  withTypographyStyles?: boolean;

  /** Labels that are used in fns */
  labels?: Partial<DocEditorLabels>;

  /** Child editor components */
  children: React.ReactNode;
}

export type DocEditorFactory = Factory<{
  props: DocEditorProps;
  ref: HTMLDivElement;
  stylesNames: DocEditorStylesNames;
  staticComponents: {
    Content: typeof DocEditorContent;
    Fn: typeof DocEditorFn;
    FnGroup: typeof DocEditorFnGroup;
    Bold: typeof fns.BoldFn;
    Italic: typeof fns.ItalicFn;
    Strikethrough: typeof fns.StrikeThroughFn;
    Underline: typeof fns.UnderlineFn;
    ClearFormatting: typeof fns.ClearFormattingFn;
    H1: typeof fns.H1Fn;
    H2: typeof fns.H2Fn;
    H3: typeof fns.H3Fn;
    H4: typeof fns.H4Fn;
    H5: typeof fns.H5Fn;
    H6: typeof fns.H6Fn;
    BulletList: typeof fns.BulletListFn;
    OrderedList: typeof fns.OrderedListFn;
    Link: typeof fns.DocEditorLinkFn;
    Unlink: typeof fns.UnlinkFn;
    Blockquote: typeof fns.BlockquoteFn;
    AlignLeft: typeof fns.AlignLeftFn;
    AlignRight: typeof fns.AlignRightFn;
    AlignCenter: typeof fns.AlignCenterFn;
    AlignJustify: typeof fns.AlignJustifyFn;
    Superscript: typeof fns.SuperscriptFn;
    Subscript: typeof fns.SubscriptFn;
    Code: typeof fns.CodeFn;
    CodeBlock: typeof fns.CodeBlockFn;
    ColorPicker: typeof fns.DocEditorColorPickerFn;
    Color: typeof fns.DocEditorColorFn;
    Highlight: typeof fns.HighlightFn;
    Hr: typeof fns.HrFn;
    UnsetColor: typeof fns.UnsetColorFn;
    Undo: typeof fns.UndoFn;
    Redo: typeof fns.RedoFn;
  };
}>;

const defaultProps: Partial<DocEditorProps> = {
  withCodeHighlightStyles: true,
  withTypographyStyles: true,
};

export const DocEditor = factory<DocEditorFactory>((_props, ref) => {
  const props = useProps('DocEditor', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    editor,
    withCodeHighlightStyles,
    withTypographyStyles,
    labels,
    children,
    ...others
  } = props;

  const getStyles = useStyles<DocEditorFactory>({
    name: 'DocEditor',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
  });

  const mergedLabels = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labels }),
    [labels],
  );

  return (
    <DocEditorProvider
      value={{
        editor,
        getStyles,
        labels: mergedLabels,
        withCodeHighlightStyles,
        withTypographyStyles,
        unstyled,
      }}
    >
      <Box {...getStyles('root')} {...others} ref={ref}>
        {children}
      </Box>
    </DocEditorProvider>
  );
});

DocEditor.classes = classes;
DocEditor.displayName = '@mantine/tiptap/DocEditor';

// Generic components
DocEditor.Content = DocEditorContent;
DocEditor.Fn = DocEditorFn;
DocEditor.FnGroup = DocEditorFnGroup;

// Fns components
DocEditor.Bold = fns.BoldFn;
DocEditor.Italic = fns.ItalicFn;
DocEditor.Strikethrough = fns.StrikeThroughFn;
DocEditor.Underline = fns.UnderlineFn;
DocEditor.ClearFormatting = fns.ClearFormattingFn;
DocEditor.H1 = fns.H1Fn;
DocEditor.H2 = fns.H2Fn;
DocEditor.H3 = fns.H3Fn;
DocEditor.H4 = fns.H4Fn;
DocEditor.H5 = fns.H5Fn;
DocEditor.H6 = fns.H6Fn;
DocEditor.BulletList = fns.BulletListFn;
DocEditor.OrderedList = fns.OrderedListFn;
DocEditor.Link = fns.DocEditorLinkFn;
DocEditor.Unlink = fns.UnlinkFn;
DocEditor.Blockquote = fns.BlockquoteFn;
DocEditor.AlignLeft = fns.AlignLeftFn;
DocEditor.AlignRight = fns.AlignRightFn;
DocEditor.AlignCenter = fns.AlignCenterFn;
DocEditor.AlignJustify = fns.AlignJustifyFn;
DocEditor.Superscript = fns.SuperscriptFn;
DocEditor.Subscript = fns.SubscriptFn;
DocEditor.Code = fns.CodeFn;
DocEditor.CodeBlock = fns.CodeBlockFn;
DocEditor.ColorPicker = fns.DocEditorColorPickerFn;
DocEditor.Color = fns.DocEditorColorFn;
DocEditor.Highlight = fns.HighlightFn;
DocEditor.Hr = fns.HrFn;
DocEditor.UnsetColor = fns.UnsetColorFn;
DocEditor.Undo = fns.UndoFn;
DocEditor.Redo = fns.RedoFn;
