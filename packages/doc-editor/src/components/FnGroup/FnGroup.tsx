import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  Factory,
} from '@mantine/core';
import { Box, factory, useProps } from '@mantine/core';

import { useDocEditorContext } from '../DocEditor.context';
import classes from '../DocEditor.module.css';

export type DocEditorFnGroupStylesNames = 'fnGroup';
export interface DocEditorFnGroupProps
  extends BoxProps,
    CompoundStylesApiProps<DocEditorFnGroupFactory>,
    ElementProps<'div'> {}

export type DocEditorFnGroupFactory = Factory<{
  props: DocEditorFnGroupProps;
  ref: HTMLDivElement;
  stylesNames: DocEditorFnGroupStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DocEditorFnGroupProps> = {};

export const DocEditorFnGroup = factory<DocEditorFnGroupFactory>(
  (_props, ref) => {
    const props = useProps('DocEditorFnGroup', defaultProps, _props);
    const { classNames, className, style, styles, vars: _, ...others } = props;
    const ctx = useDocEditorContext();
    return (
      <Box
        ref={ref}
        {...ctx.getStyles('fnGroup', {
          className,
          style,
          styles,
          classNames,
        })}
        {...others}
      />
    );
  },
);

DocEditorFnGroup.classes = classes;
DocEditorFnGroup.displayName = '@publish/doc-editor/DocEditorFnGroup';
