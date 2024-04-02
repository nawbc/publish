import type { ErrorInfo } from 'react';
import { type FC, type PropsWithChildren, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useProps } from 'reactgets/hooks/use-props';

import { ErrorFallback } from './ErrorFallback';

export interface PublishErrorBoundaryProps extends PropsWithChildren {
  height?: number | string;
}

const defaultProps = {
  height: '100%',
};

export const PublishErrorBoundary: FC<PublishErrorBoundaryProps> = (_props) => {
  const props = useProps(defaultProps, _props);

  const onError = useCallback((error: Error, info: ErrorInfo) => {
    console.error('Uncaught error:', error, info);
  }, []);

  const fallbackRender = useCallback(
    (fallbackProps) => {
      return <ErrorFallback {...fallbackProps} height={props.height} />;
    },
    [props.height],
  );

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={onError}>
      {props.children}
    </ErrorBoundary>
  );
};
