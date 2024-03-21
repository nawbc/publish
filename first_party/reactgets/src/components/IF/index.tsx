import { type FC, type PropsWithChildren } from 'react';

export interface IFProps extends PropsWithChildren {
  is?: boolean;
}

/**
 *
 * @example
 * ```tsx
 *  <IF is={false}>
 *     Hello
 *  </IF>
 * ```
 */
export const IF: FC<IFProps> = function (props) {
  const { is, children } = props;

  return is ? children : null;
};
