import { is } from '@deskbtm/gadgets';
import type { Factory } from '@mantine/core';
import { Box, factory, Flex, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LocalStore } from '@publish/shared';
import debounce from 'lodash.debounce';
import type { PropsWithChildren } from 'react';
import {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { type FC, forwardRef } from 'react';
import React from 'react';

import * as styles from './divider-panel.css';
import { DividerHandle } from './DividerHandle';
import { DividerPanelContext } from './DividerPanelContext';
import { useDividerPanel } from './hooks';
import { Panel } from './Panel';
import type { ResizeCallbackArgs, UseResizableProps } from './useResizable';
import { useResizable } from './useResizable';

export interface DividerPanelProps
  extends Partial<UseResizableProps>,
    PropsWithChildren {
  hideDividerCollapsed?: boolean;
  dividerWidth?: number;
}

export interface DividerPanelStore {
  position?: number;
  expanded?: boolean;
}

export type DividerPanelFactory = Factory<{
  props: DividerPanelProps;
  ref: HTMLDivElement;
  staticComponents: {
    Leading: FC<PropsWithChildren>;
    Trailing: FC<PropsWithChildren>;
  };
}>;

export interface DividerPanelInnerRef {
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

export const SPLIT_PANEL_STORAGE_KEY = 'publish:desktop:DividerPanel';

export const DividerPanelInner = forwardRef<
  DividerPanelInnerRef,
  DividerPanelProps
>(function (props, ref) {
  const { children, dividerWidth, initial, hideDividerCollapsed, ...rest } =
    props;
  const collapsedPosition = dividerWidth! / 2;
  const { isDragging, position, separatorProps, setPosition } = useResizable({
    axis: 'x',
    initial,
    onResizeEnd: debounce(({ position }: ResizeCallbackArgs) => {
      LocalStore.set(SPLIT_PANEL_STORAGE_KEY, { position, expanded: true });
    }, 50),
    ...rest,
  });
  const panel = useDividerPanel();

  useImperativeHandle(
    ref,
    () => {
      return {
        setPosition,
      };
    },
    [setPosition],
  );

  return (
    <Flex direction="row" h="100%">
      <Box
        pos="relative"
        className={isDragging ? '' : styles.panelSlideTransition}
        style={{
          width: position - collapsedPosition,
          overflow: 'hidden',
          marginLeft: panel?.collapsed ? position * -1 : 0,
        }}
      >
        {children?.[0]}
      </Box>
      <DividerHandle
        isDragging={isDragging}
        {...separatorProps}
        style={{
          width: rem(dividerWidth),
          transition: isDragging ? 'unset' : 'visibility 400ms',
          visibility:
            hideDividerCollapsed && panel?.collapsed ? 'hidden' : 'visible',
        }}
      />
      <Box
        pos="relative"
        style={{
          width: `calc(100% - ${
            panel?.collapsed ? 0 : position
          }px - ${collapsedPosition}px)`,
          overflow: 'hidden',
        }}
      >
        {children?.[1]}
      </Box>
    </Flex>
  );
});

DividerPanelInner.displayName = '@publish/desktop/DividerPanelInner';

export const DividerPanel = factory<DividerPanelFactory>((props, _ref) => {
  const { children } = props;

  const [expanded, handlers] = useDisclosure(true);
  const collapsed = !expanded;
  const panel = useRef<DividerPanelInnerRef>(null);

  const collapse = useCallback(
    function () {
      LocalStore.set<DividerPanelStore>(SPLIT_PANEL_STORAGE_KEY, {
        expanded: false,
      });

      handlers.close();
    },
    [handlers],
  );
  const expand = useCallback(
    function () {
      LocalStore.set<DividerPanelStore>(SPLIT_PANEL_STORAGE_KEY, {
        expanded: true,
      });
      const { position } = LocalStore.get<DividerPanelStore>(
        SPLIT_PANEL_STORAGE_KEY,
      );
      if (is.truthy(position) && !Number.isNaN(position)) {
        handlers.open();
      }
    },
    [handlers],
  );

  if (React.Children.count(children) !== 2) {
    throw new Error('Must have two children');
  }

  const setPosition = useCallback<React.Dispatch<React.SetStateAction<number>>>(
    (p) => {
      panel.current?.setPosition(p);
    },
    [],
  );

  useLayoutEffect(() => {
    const { position, expanded } = LocalStore.get<DividerPanelStore>(
      SPLIT_PANEL_STORAGE_KEY,
    );

    const setPosition = panel.current?.setPosition;
    if (!setPosition) {
      return;
    }

    if (is.truthy(position) && !Number.isNaN(position)) {
      if (expanded) {
        handlers.open();
      } else {
        handlers.close();
      }
      setPosition(position!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = useMemo(
    () => ({
      collapse,
      expand,
      expanded,
      collapsed,
      setPosition,
    }),
    [collapse, collapsed, expand, expanded, setPosition],
  );

  return (
    <DividerPanelContext.Provider value={context}>
      <DividerPanelInner ref={panel} {...props} />
    </DividerPanelContext.Provider>
  );
});

DividerPanel.Leading = Panel;
DividerPanel.Leading.displayName = '@publish/desktop/DividerPanel.Leading';

DividerPanel.Trailing = Panel;
DividerPanel.Trailing.displayName = '@publish/desktop/DividerPanel.Trailing';

DividerPanel.displayName = '@publish/desktop/DividerPanel';
DividerPanel.defaultProps = {
  hideDividerCollapsed: true,
  initial: 278,
  min: 208,
  max: 608,
  dividerWidth: 16,
};
