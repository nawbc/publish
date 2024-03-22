import { type FC, type PropsWithChildren } from 'react';

export interface IFProps extends PropsWithChildren {
  is?: boolean;
}

/**
 *
 * @example
 * ```tsx
 * <IF is={os.type === 'windows'}>
 *  <WindowsNativeTitleBar />
 * </IF>
 *
 * <IF value={os.type} eq="windows">
 *  <WindowsNativeTitleBar />
 *
 *  <ELSE eq="linux">linux</ELSE>
 *  <ELSEIF eq="darwin">darwin</ELSEIF>
 * </IF>
 * ```
 */
export const IF: FC<IFProps> = function (props) {
  const { is, children } = props;

  return is ? children : null;
};
