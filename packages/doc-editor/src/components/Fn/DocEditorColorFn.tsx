import type { BoxProps, ElementProps } from '@mantine/core';
import { ColorSwatch, useProps } from '@mantine/core';
import { forwardRef } from 'react';

import { useDocEditorContext } from '../DocEditor.context';
import { DocEditorFn } from './DocEditorFn';

export interface DocEditorColorFnProps
  extends BoxProps,
    ElementProps<'button'> {
  /** Color that will be set as text color, for example #ef457e */
  color: string;
}

const defaultProps: Partial<DocEditorColorFnProps> = {};

export const DocEditorColorFn = forwardRef<
  HTMLButtonElement,
  DocEditorColorFnProps
>((props, ref) => {
  const { color, ...others } = useProps(
    'DocEditorColorFn',
    defaultProps,
    props,
  );
  const { editor, labels } = useDocEditorContext();
  const currentColor = editor?.getAttributes('textStyle').color || null;
  const label = labels.colorFnLabel(color);

  return (
    <DocEditorFn
      {...others}
      active={currentColor === color}
      aria-label={label}
      title={label}
      onClick={() => (editor?.chain() as any).focus().setColor(color).run()}
      ref={ref}
    >
      <ColorSwatch color={color} size={14} />
    </DocEditorFn>
  );
});
