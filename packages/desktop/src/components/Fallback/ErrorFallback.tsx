import type { StyleProp } from '@mantine/core';
import { Flex } from '@mantine/core';
import { type FC, useMemo } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { ErrorDetail } from './ErrorDetail';
import { UnknownError } from './Errors';

export interface ErrorFallbackProps extends FallbackProps {
  height?: StyleProp<React.CSSProperties['height']>;
}

export const ErrorFallback: FC<ErrorFallbackProps> = function (props) {
  const { error, resetErrorBoundary, height } = props;
  const { t } = useTranslation();

  const content = useMemo<{ title?: string; description?: string }>(() => {
    switch (true) {
      case error instanceof UnknownError:
      default:
        return {
          title: t('Whoops') + ' !!!',
          description: t('Something went wrong') + '.',
        };
    }
  }, [error, t]);

  return (
    <Flex direction="column" justify="center" h={height}>
      <ErrorDetail error={error} onRetry={resetErrorBoundary} {...content} />
    </Flex>
  );
};
