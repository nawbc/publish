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

export type BaseFnStylesNames = 'fn';

export interface BaseFnProps
  extends BoxProps,
    CompoundStylesApiProps<BaseFnFactory>,
    ElementProps<'div'> {
  /** Determines whether the fn should have active state, false by default */
  active?: boolean;

  disabled?: boolean;
  /** Determines whether the fn can be interacted with, set `false` to make the fn to act as a label */
  interactive?: boolean;
}

export type BaseFnFactory = Factory<{
  props: BaseFnProps;
  ref: HTMLDivElement;
  stylesNames: BaseFnStylesNames;
  compound: true;
}>;

const defaultProps: Partial<BaseFnProps> = {
  interactive: true,
};

export const BaseFn = factory<BaseFnFactory>((_props, ref) => {
  const props = useProps('BaseFn', defaultProps, _props);
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
      {...ctx.getStyles('fn', {
        className,
        style,
        classNames,
        styles,
        active: true,
      })}
      // disabled={disabled}
      component="div"
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

BaseFn.classes = classes;
BaseFn.displayName = '@publish/doc-editor/BaseFn';

export interface FnFactoryProps extends BaseFnProps {
  icon?: React.FC<{ style: React.CSSProperties }>;
}

export const FnFactory = forwardRef<HTMLDivElement, FnFactoryProps>(function (
  { className: _, icon: Icon, ...others },
  ref,
) {
  return (
    <BaseFn ref={ref} {...others}>
      {Icon && (
        <Icon
          style={{
            color: 'var(--mantine-color-dark-5)',
            width: rem(20),
            height: rem(20),
          }}
        />
      )}
    </BaseFn>
  );
});

FnFactory.displayName = '@mantine/tiptap/FnFactory';

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
  return forwardRef<HTMLDivElement, FnFactoryProps>((_props, ref) => {
    const props = useProps('BaseFn', defaultProps, _props);
    const { editor, labels } = useDocEditorContext();
    const _label = labels[label] as string;

    return (
      <FnFactory
        {...props}
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
