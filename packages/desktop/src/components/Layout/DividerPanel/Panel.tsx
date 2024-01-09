import type { PropsWithChildren } from 'react';
import { memo } from 'react';

// eslint-disable-next-line react/display-name
export const Panel = memo<PropsWithChildren>(function (props) {
  return <>{props.children}</>;
});
