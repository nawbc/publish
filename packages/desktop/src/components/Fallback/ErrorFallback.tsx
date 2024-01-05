import type { StyleProp } from '@mantine/core';
import { Flex } from '@mantine/core';
import { type FC /* useCallback */ } from 'react';
import type { FallbackProps } from 'react-error-boundary';

export interface ErrorFallbackProps extends FallbackProps {
  height?: StyleProp<React.CSSProperties['height']>;
}

export const ErrorFallback: FC<ErrorFallbackProps> = function (props) {
  const { /* error, resetErrorBoundary, */ height } = props;

  // const reload = useCallback(() => {
  //   document.location.reload();
  // }, []);

  return (
    <Flex mih={50} h={height} justify="center" align="center" wrap="wrap" />
  );
};
