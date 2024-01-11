import { Box, type MantineColor } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import type React from 'react';
import { useRef } from 'react';

// import { CssClass } from './constants';
import * as styles from './contextmenu.css';
import { useItemTracker } from './hooks';
import {
  ItemTrackerProvider,
  useItemTrackerContext,
} from './ItemTrackerProvider';
import type {
  BooleanPredicate,
  HandlerParamsEvent,
  InternalProps,
} from './types';
import { cloneItems, getPredicateValue } from './utils';

export interface SubMenuProps
  extends InternalProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'hidden'> {
  /**
   * Any valid node that can be rendered
   */
  label: ReactNode;

  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Render a custom arrow
   */
  trailing?: ReactNode;

  /**
   * Disable the `SubMenu`. If a function is used, a boolean must be returned
   */
  disabled?: BooleanPredicate;

  /**
   * Hide the `SubMenu` and his children. If a function is used, a boolean must be returned
   */
  hidden?: BooleanPredicate;

  color?: MantineColor;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  trailing,
  children,
  disabled = false,
  hidden = false,
  label,
  className,
  triggerEvent,
  propsFromTrigger,
  style,
  ...rest
}) => {
  const parentItemTracker = useItemTrackerContext();
  const itemTracker = useItemTracker();
  const subMenuNode = useRef<HTMLDivElement>(null);
  const handlerParams = {
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  };
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  function setPosition() {
    const node = subMenuNode.current;
    if (node) {
      const bottom = styles.subBottom;
      const right = styles.subRight;
      // reset to default position before computing position
      node.classList.remove(bottom, right);

      const rect = node.getBoundingClientRect();

      if (rect.right > window.innerWidth) node.classList.add(right);
      if (rect.bottom > window.innerHeight) node.classList.add(bottom);
    }
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled)
      parentItemTracker.set(node, {
        node,
        isSubMenu: true,
        subMenuRefTracker: itemTracker,
        setSubMenuPosition: setPosition,
      });
  }

  if (isHidden) return null;

  return (
    <ItemTrackerProvider value={itemTracker}>
      <Box
        {...rest}
        className={clsx(styles.contextMenuItem, className)}
        ref={trackRef}
        tabIndex={-1}
        role="menuitem"
        aria-haspopup
        aria-disabled={isDisabled}
        onMouseEnter={setPosition}
        onTouchStart={setPosition}
      >
        <div>
          {label}
          {trailing ?? <IconChevronRight size={14} />}
        </div>
        <div className={clsx(styles.sub)} ref={subMenuNode} style={style}>
          {cloneItems(children, {
            propsFromTrigger,
            // @ts-ignore: injected by the parent
            triggerEvent,
          })}
        </div>
      </Box>
    </ItemTrackerProvider>
  );
};
