import type {
  BoxProps,
  CompoundStylesApiProps,
  Factory,
  PopoverProps,
} from '@mantine/core';
import {
  Button,
  factory,
  Popover,
  rem,
  TextInput,
  Tooltip,
  UnstyledButton,
  useProps,
  useResolvedStylesApi,
} from '@mantine/core';
import { useDisclosure, useInputState, useWindowEvent } from '@mantine/hooks';
import React, { useState } from 'react';

import { IconExternalLink, IconLink } from '../../icons/Icons';
import { useDocEditorContext } from '../DocEditor.context';
import classes from '../DocEditor.module.css';
import type { DocEditorFnBaseProps } from './DocEditorFn';
import { DocEditorFnBase } from './DocEditorFn';

export type DocEditorLinkFnStylesNames =
  | 'fn'
  | 'linkEditor'
  | 'linkEditorDropdown'
  | 'linkEditorSave'
  | 'linkEditorInput'
  | 'linkEditorExternalFn';

export interface DocEditorLinkFnProps
  extends BoxProps,
    Omit<DocEditorFnBaseProps, 'classNames' | 'styles' | 'vars'>,
    CompoundStylesApiProps<DocEditorLinkFnFactory> {
  /** Props passed down to Popover component */
  popoverProps?: Partial<PopoverProps>;

  /** Determines whether external link fn tooltip should be disabled, `false` by default */
  disableTooltips?: boolean;

  /** Initial state for determining whether the link should be an external, `false` by default */
  initialExternal?: boolean;
}

export type DocEditorLinkFnFactory = Factory<{
  props: DocEditorLinkFnProps;
  ref: HTMLButtonElement;
  stylesNames: DocEditorLinkFnStylesNames;
  compound: true;
}>;

const LinkIcon: DocEditorFnBaseProps['icon'] = (props) => (
  <IconLink {...props} />
);

const defaultProps: Partial<DocEditorLinkFnProps> = {};

export const DocEditorLinkFn = factory<DocEditorLinkFnFactory>(
  (_props, ref) => {
    const props = useProps('DocEditorLinkFn', defaultProps, _props);
    const {
      classNames,
      className,
      style,
      styles,
      vars: _,
      icon,
      popoverProps,
      disableTooltips,
      initialExternal,
      ...others
    } = props;

    const ctx = useDocEditorContext();

    const stylesApiProps = { classNames, styles };

    const [url, setUrl] = useInputState('');
    const [external, setExternal] = useState(initialExternal);
    const [opened, { open, close }] = useDisclosure(false);

    const handleOpen = () => {
      open();
      const linkData = ctx.editor?.getAttributes('link');
      setUrl(linkData?.href || '');
      setExternal(linkData?.target === '_blank');
    };

    const handleClose = () => {
      close();
      setUrl('');
      setExternal(initialExternal);
    };

    const setLink = () => {
      handleClose();
      url === ''
        ? ctx.editor?.chain().focus().extendMarkRange('link').unsetLink().run()
        : ctx.editor
            ?.chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url, target: external ? '_blank' : null })
            .run();
    };

    const handleInputKeydown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setLink();
      }
    };

    useWindowEvent('edit-link', handleOpen, false);

    const { resolvedClassNames, resolvedStyles } =
      useResolvedStylesApi<DocEditorLinkFnFactory>({
        classNames,
        styles,
        props,
      });

    return (
      <Popover
        trapFocus
        shadow="md"
        withinPortal
        opened={opened}
        onClose={handleClose}
        offset={-44}
        zIndex={10000}
        {...popoverProps}
      >
        <Popover.Target>
          <DocEditorFnBase
            icon={icon || LinkIcon}
            {...others}
            aria-label={ctx.labels.linkFnLabel}
            title={ctx.labels.linkFnLabel}
            onClick={handleOpen}
            active={ctx.editor?.isActive('link')}
            ref={ref}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            className={className}
            style={style}
          />
        </Popover.Target>

        <Popover.Dropdown
          {...ctx.getStyles('linkEditorDropdown', stylesApiProps)}
        >
          <div {...ctx.getStyles('linkEditor', stylesApiProps)}>
            <TextInput
              placeholder={ctx.labels.linkEditorInputPlaceholder}
              aria-label={ctx.labels.linkEditorInputLabel}
              type="url"
              value={url}
              onChange={setUrl}
              classNames={{
                input: ctx.getStyles('linkEditorInput', stylesApiProps)
                  .className,
              }}
              onKeyDown={handleInputKeydown}
              rightSection={
                <Tooltip
                  label={
                    external
                      ? ctx.labels.linkEditorExternalLink
                      : ctx.labels.linkEditorInternalLink
                  }
                  events={{ hover: true, focus: true, touch: true }}
                  withinPortal
                  withArrow
                  disabled={disableTooltips}
                  zIndex={10000}
                >
                  <UnstyledButton
                    onClick={() => setExternal((e) => !e)}
                    data-active={external || undefined}
                    {...ctx.getStyles('linkEditorExternalFn', stylesApiProps)}
                  >
                    <IconExternalLink
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  </UnstyledButton>
                </Tooltip>
              }
            />

            <Button
              variant="default"
              onClick={setLink}
              {...ctx.getStyles('linkEditorSave', stylesApiProps)}
            >
              {ctx.labels.linkEditorSave}
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    );
  },
);

DocEditorLinkFn.classes = classes;
DocEditorLinkFn.displayName = '@mantine/tiptap/DocEditorLinkFn';
