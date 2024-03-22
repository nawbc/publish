import { type FC, type PropsWithChildren } from 'react';

export interface IFProps extends PropsWithChildren {
  is?: boolean;
}

/**
 *
 * @example
 * ```tsx
 * <Switch exp={os.type}>
 *   <Case value={['archlinux', 'opensuse']}>linux</Case>
 *   <Case value="darwin">darwin</Case>
 *   <Case value="*nix">*nix</Case>
 *   <Default>windows</Default>
 * </Switch>
 * ```
 */
export const Switch: FC<IFProps> = function (props) {
  const { is, children } = props;

  return is ? children : null;
};
