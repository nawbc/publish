import { is } from '@deskbtm/gadgets/is';
import { Box, Flex, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LocalStore } from '@publish/shared';
import debounce from 'lodash.debounce';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useLayoutEffect } from 'react';
import { type FC } from 'react';
import type {
  ResizeCallbackArgs,
  UseResizableProps,
} from 'react-resizable-layout';
import { useResizable } from 'react-resizable-layout';

import * as styles from './panel.css';
import { ResizeDivider } from './ResizeDivider';

export interface SplitPanelProps
  extends Partial<UseResizableProps>,
    PropsWithChildren {
  hideDividerWhenCollapsed?: boolean;
  draggableAreaWidth?: number;
}

interface SplitPanelStore {
  position?: number;
  expanded?: boolean;
}

export const SPLIT_PANEL_STORAGE_KEY = 'publish:desktop:SplitPanel';

export const SplitPanelContext = createContext<{
  x: number;
  collapsed: boolean;
  expanded: boolean;
  collapse(): void;
  expand(): void;
  isDragging: boolean;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const useSplitPanel = function () {
  return useContext(SplitPanelContext);
};

export const SplitPanel = function (props) {
  const {
    children,
    hideDividerWhenCollapsed,
    initial,
    draggableAreaWidth,
    ...useResizableProps
  } = props;
  const { isDragging, position, separatorProps, setPosition } = useResizable({
    axis: 'x',
    initial,
    onResizeEnd: debounce(({ position }: ResizeCallbackArgs) => {
      LocalStore.set(SPLIT_PANEL_STORAGE_KEY, { position });
    }, 50),
    ...useResizableProps,
  });
  const [expanded, handlers] = useDisclosure(true);
  const collapsed = !expanded;
  const collapsePosition = draggableAreaWidth! / 2;
  const collapse = function () {
    LocalStore.set<SplitPanelStore>(SPLIT_PANEL_STORAGE_KEY, {
      expanded: false,
    });

    setPosition(collapsePosition);
    handlers.close();
  };
  const expand = function () {
    LocalStore.set<SplitPanelStore>(SPLIT_PANEL_STORAGE_KEY, {
      expanded: true,
    });
    const { position } = LocalStore.get<SplitPanelStore>(
      SPLIT_PANEL_STORAGE_KEY,
    );
    if (is.truthy(position) && !Number.isNaN(position)) {
      setPosition(position!);
      handlers.open();
    }
  };

  useLayoutEffect(() => {
    const { position, expanded } = LocalStore.get<SplitPanelStore>(
      SPLIT_PANEL_STORAGE_KEY,
    );

    if (is.truthy(position) && !Number.isNaN(position) && expanded) {
      setPosition(position!);
      handlers.open();
    } else {
      setPosition(collapsePosition);
      handlers.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let left, right;
  React.Children.forEach(children, (n: unknown) => {
    const node = n as { type: { displayName: string } };
    if (node.type.displayName === '@publish/desktop/SplitPanelLeft') {
      left = n;
    }
    if (node.type.displayName === '@publish/desktop/SplitPanelRight') {
      right = n;
    }
    SplitPanel;
  });

  return (
    <SplitPanelContext.Provider
      value={{
        isDragging,
        x: position,
        collapse,
        expand,
        expanded,
        collapsed,
        setPosition,
      }}
    >
      <Flex direction="row" h="100%">
        <Box
          className={isDragging ? '' : styles.panelSlideTransition}
          style={{ width: position - collapsePosition, overflow: 'hidden' }}
        >
          {left}
        </Box>
        <ResizeDivider
          isDragging={isDragging}
          {...separatorProps}
          style={{
            width: rem(draggableAreaWidth),
            transition:
              !isDragging && collapsed ? 'visibility 0s 400ms' : 'unset',
            visibility:
              hideDividerWhenCollapsed && collapsed ? 'hidden' : 'visible',
          }}
        />
        <Box
          style={{
            width: `calc(100% - ${position}px - ${collapsePosition}px)`,
            overflow: 'hidden',
          }}
        >
          {right}
        </Box>
      </Flex>
    </SplitPanelContext.Provider>
  );
} as FC<SplitPanelProps> & {
  Left: FC<PropsWithChildren>;
  Right: FC<PropsWithChildren>;
};

SplitPanel.Left = function (props) {
  return <>{props.children}</>;
};
SplitPanel.Left.displayName = '@publish/desktop/SplitPanelLeft';

SplitPanel.Right = function (props) {
  return <>{props.children}</>;
};
SplitPanel.Right.displayName = '@publish/desktop/SplitPanelRight';

SplitPanel.displayName = '@publish/desktop/SplitPanel';
SplitPanel.defaultProps = {
  hideDividerWhenCollapsed: false,
  initial: 278,
  min: 208,
  max: 608,
  draggableAreaWidth: 16,
};
