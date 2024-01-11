import type { MantineColor } from '@mantine/core';
import { Box, parseThemeColor, useMantineTheme } from '@mantine/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type React from 'react';
import { useRef } from 'react';

import { NOOP } from './constants';
import { contextMenu } from './context-menu';
import * as styles from './contextmenu.css';
import { useItemTrackerContext } from './ItemTrackerProvider';
import type {
  BooleanPredicate,
  BuiltInOrString,
  HandlerParamsEvent,
  InternalProps,
  ItemParams,
} from './types';
import { getPredicateValue, isFn } from './utils';

export interface ItemProps
  extends InternalProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'hidden' | 'disabled' | 'onClick'> {
  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Passed to the `Item` onClick callback. Accessible via `data`
   */
  data?: any;

  /**
   * Disable `Item`. If a function is used, a boolean must be returned
   *
   * @param id The item id, when defined
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Item`
   * @param triggerEvent The event that triggered the context menu
   *
   *
   * ```
   * function isItemDisabled({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
   * <Item disabled={isItemDisabled} data={data}>content</Item>
   * ```
   */
  disabled?: BooleanPredicate;

  /**
   * Hide the `Item`. If a function is used, a boolean must be returned
   *
   * @param id The item id, when defined
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Item`
   * @param triggerEvent The event that triggered the context menu
   *
   *
   * ```
   * function isItemHidden({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
   * <Item hidden={isItemHidden} data={data}>content</Item>
   * ```
   */
  hidden?: BooleanPredicate;

  onClick?: (args: ItemParams) => void;
  keyMatcher?: (e: KeyboardEvent) => boolean;
  closeOnClick?: boolean;
  handlerEvent?: BuiltInOrString<'onClick' | 'onMouseDown' | 'onMouseUp'>;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  color?: MantineColor;
}

export const MenuItem: React.FC<ItemProps> = ({
  id,
  children,
  className,
  style,
  triggerEvent,
  data,
  propsFromTrigger,
  keyMatcher,
  onClick = NOOP,
  disabled = false,
  hidden = false,
  closeOnClick = true,
  handlerEvent = 'onClick',
  leading,
  trailing,
  color,
  ...rest
}) => {
  const itemNode = useRef<HTMLElement>();
  const itemTracker = useItemTrackerContext();
  const handlerParams = {
    id,
    data,
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  } as ItemParams;
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);
  const theme = useMantineTheme();

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    handlerParams.event = e;
    e.stopPropagation();

    if (!isDisabled) {
      !closeOnClick ? onClick(handlerParams) : dispatchUserHandler();
    }
  }

  // provide a feedback to the user that the item has been clicked before closing the menu
  function dispatchUserHandler() {
    const node = itemNode.current!;
    node.focus();
    node.addEventListener(
      'animationend',
      // defer, required for react 17
      () => setTimeout(contextMenu.hideAll),
      { once: true },
    );
    node.classList.add(styles.contextMenuItemFeedback);
    onClick(handlerParams);
  }

  function registerItem(node: HTMLElement | null) {
    if (node && !isDisabled) {
      itemNode.current = node;
      itemTracker.set(node, {
        node,
        isSubMenu: false,
        keyMatcher:
          !isDisabled &&
          isFn(keyMatcher) &&
          ((e: KeyboardEvent) => {
            if (keyMatcher(e)) {
              e.stopPropagation();
              e.preventDefault();
              handlerParams.event = e;
              dispatchUserHandler();
            }
          }),
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      handlerParams.event = e;
      dispatchUserHandler();
    }
  }

  if (isHidden) return null;

  const colors = color
    ? theme.variantColorResolver({ color, theme, variant: 'light' })
    : undefined;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;

  return (
    <Box
      component="div"
      {...{ ...rest, [handlerEvent]: handleClick }}
      className={clsx(styles.contextMenuItem, className)}
      onKeyDown={handleKeyDown}
      ref={registerItem}
      tabIndex={-1}
      style={style}
      role="menuitem"
      aria-disabled={isDisabled}
      __vars={assignInlineVars({
        [styles.contextMenuItemColor]:
          parsedThemeColor?.isThemeColor &&
          parsedThemeColor?.shade === undefined
            ? `var(--mantine-color-${parsedThemeColor.color}-6)`
            : colors?.color,
        [styles.contextMenuItemHover]: colors?.hover,
      })}
    >
      {leading && <div data-position="left">{leading}</div>}
      {children && <div>{children}</div>}
      {trailing && <div data-position="right">{trailing}</div>}
    </Box>
  );
};
