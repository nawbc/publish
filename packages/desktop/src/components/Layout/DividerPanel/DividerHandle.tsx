import { Box, Center } from '@mantine/core';
import { forwardRef } from 'react';

import classes from './DividerPanel.module.css';
import type { DividerProps } from './use-resizable';

export interface DividerHandleProps extends DividerProps {
  isDragging: boolean;
}

export const DividerHandle = forwardRef<HTMLDivElement, DividerHandleProps>(
  ({ isDragging, ...props }, ref) => {
    return (
      <Box ref={ref} className={classes.divider} {...props}>
        <Center h="100%">
          <Box
            className={classes.handle}
            data-dragging={isDragging ? true : undefined}
          />
        </Center>
      </Box>
    );
  },
);

DividerHandle.displayName = '@publish/desktop/DividerHandle';
