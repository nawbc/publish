import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  Factory,
} from '@mantine/core';
import { factory, rem, UnstyledButton, useProps } from '@mantine/core';
import type { Editor } from '@tiptap/react';
import React, { forwardRef } from 'react';

import { useDocEditorContext } from '../DocEditor.context';
import classes from '../DocEditor.module.css';
import type { DocEditorLabels } from '../labels';

export type DocEditorFnStylesNames = 'fn';

export interface DocEditorFnProps
  extends BoxProps,
    CompoundStylesApiProps<DocEditorFnFactory>,
    ElementProps<'button'> {
  /** Determines whether the fn should have active state, false by default */
  active?: boolean;

  /** Determines whether the fn can be interacted with, set `false` to make the fn to act as a label */
  interactive?: boolean;
}

export type DocEditorFnFactory = Factory<{
  props: DocEditorFnProps;
  ref: HTMLButtonElement;
  stylesNames: DocEditorFnStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DocEditorFnProps> = {
  interactive: true,
};

export const DocEditorFn = factory<DocEditorFnFactory>((_props, ref) => {
  const props = useProps('DocEditorFn', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars: _,
    interactive,
    active,
    onMouseDown,
    disabled,
    ...others
  } = props;
  const ctx = useDocEditorContext();

  return (
    <UnstyledButton
      {...others}
      {...ctx.getStyles('fn', { className, style, classNames, styles })}
      disabled={disabled}
      data-rich-text-editor-fn
      tabIndex={interactive ? 0 : -1}
      data-interactive={interactive || undefined}
      data-disabled={disabled || undefined}
      data-active={active || undefined}
      aria-pressed={(active && interactive) || undefined}
      aria-hidden={!interactive || undefined}
      ref={ref}
      unstyled={ctx.unstyled}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
    />
  );
});

DocEditorFn.classes = classes;
DocEditorFn.displayName = '@mantine/tiptap/DocEditorFn';

export interface DocEditorFnBaseProps extends DocEditorFnProps {
  icon?: React.FC<{ style: React.CSSProperties }>;
}

export const DocEditorFnBase = forwardRef<
  HTMLButtonElement,
  DocEditorFnBaseProps
>(({ className: _, icon: Icon, ...others }, ref) => (
  <DocEditorFn ref={ref} {...others}>
    {Icon && <Icon style={{ width: rem(16), height: rem(16) }} />}
  </DocEditorFn>
));

DocEditorFnBase.displayName = '@mantine/tiptap/DocEditorFnBase';

export interface CreateFnProps {
  label: keyof DocEditorLabels;
  icon: React.FC<{ style: React.CSSProperties }>;
  isActive?: { name: string; attributes?: Record<string, unknown> | string };
  isDisabled?: (editor: Editor | null) => boolean;
  operation: { name: string; attributes?: Record<string, unknown> | string };
}

export function createFn({
  label,
  isActive,
  operation,
  icon,
  isDisabled,
}: CreateFnProps) {
  return forwardRef<HTMLButtonElement, DocEditorFnBaseProps>((props, ref) => {
    const { editor, labels } = useDocEditorContext();
    const _label = labels[label] as string;
    return (
      <DocEditorFnBase
        {...props}
        aria-label={_label}
        title={_label}
        active={
          isActive?.name
            ? editor?.isActive(isActive.name, isActive.attributes)
            : false
        }
        ref={ref}
        onClick={() =>
          editor?.chain().focus()[operation.name](operation.attributes).run()
        }
        icon={props.icon || icon}
        disabled={isDisabled?.(editor) || false}
      />
    );
  });
}
