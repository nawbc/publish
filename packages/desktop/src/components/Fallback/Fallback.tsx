import { Box, Center, Flex } from '@mantine/core';
import { FC } from 'react';

export const Fallback: FC = function (props) {
  return (
    <Flex mih={50} h="100%" justify="center" align="center" wrap="wrap">
      <Box>Something went wrong</Box>
    </Flex>
  );
};
