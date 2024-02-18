import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  Factory,
} from '@mantine/core';
import { Box, factory, useProps } from '@mantine/core';

import { useDocEditorContext } from '../DocEditor.context';
import classes from '../DocEditor.module.css';

export type BaseFnGroupStylesNames = 'fnGroup';
export interface BaseFnGroupProps
  extends BoxProps,
    CompoundStylesApiProps<BaseFnGroupFactory>,
    ElementProps<'div'> {}

export type BaseFnGroupFactory = Factory<{
  props: BaseFnGroupProps;
  ref: HTMLDivElement;
  stylesNames: BaseFnGroupStylesNames;
  compound: true;
}>;

const defaultProps: Partial<BaseFnGroupProps> = {};

export const BaseFnGroup = factory<BaseFnGroupFactory>((_props, ref) => {
  const props = useProps('BaseFnGroup', defaultProps, _props);
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
});

BaseFnGroup.classes = classes;
BaseFnGroup.displayName = '@publish/doc-editor/BaseFnGroup';
