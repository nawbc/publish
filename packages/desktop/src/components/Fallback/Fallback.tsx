import { Box, Flex } from '@mantine/core';
import type { FC } from 'react';

export const Fallback: FC = function (_props: unknown) {
  return (
    <Flex mih={50} h="100%" justify="center" align="center" wrap="wrap">
      <Box>Something went wrong</Box>
    </Flex>
  );
};
