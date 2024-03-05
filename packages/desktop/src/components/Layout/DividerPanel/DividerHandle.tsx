import { Box, Center } from '@mantine/core';
import { forwardRef } from 'react';

// import * as styles from './DividerHandle.css';
import styles from './DividerHandle.module.css';
import type { DividerProps } from './useResizable';

export interface DividerHandleProps extends DividerProps {
  isDragging: boolean;
}

export const DividerHandle = forwardRef<HTMLDivElement, DividerHandleProps>(
  ({ isDragging, ...props }, ref) => {
    return (
      <Box ref={ref} className={styles.primitiveResizeDividerArea} {...props}>
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
