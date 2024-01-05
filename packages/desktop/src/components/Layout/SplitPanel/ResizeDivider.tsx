import { Box, Center } from '@mantine/core';
import { forwardRef } from 'react';
import type { SeparatorProps } from 'react-resizable-layout';

import * as styles from './resize-divider.css';

export interface ResizeDividerProps extends SeparatorProps {
  isDragging: boolean;
}

export const ResizeDivider = forwardRef<HTMLDivElement, ResizeDividerProps>(
  ({ isDragging, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={styles.resizeDividerArea[isDragging ? 'active' : 'inactive']}
        {...props}
      >
        <Center h="100%">
          <Box
            className={styles.resizeDivider[isDragging ? 'active' : 'inactive']}
          />
        </Center>
      </Box>
    );
  },
);

ResizeDivider.displayName = '@publish/desktop/ResizeDivider';
