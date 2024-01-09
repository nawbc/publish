import { Box, Center } from '@mantine/core';
import { forwardRef } from 'react';
import type { SeparatorProps } from 'react-resizable-layout';

import * as styles from './divider-handle.css';

export interface DividerHandleProps extends SeparatorProps {
  isDragging: boolean;
}

export const DividerHandle = forwardRef<HTMLDivElement, DividerHandleProps>(
  ({ isDragging, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={styles.dividerHandleArea[isDragging ? 'active' : 'inactive']}
        {...props}
      >
        <Center h="100%">
          <Box
            className={styles.dividerHandle[isDragging ? 'active' : 'inactive']}
          />
        </Center>
      </Box>
    );
  },
);

DividerHandle.displayName = '@publish/desktop/DividerHandle';
