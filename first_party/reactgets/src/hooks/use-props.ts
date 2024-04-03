import { purify } from '../utils';

/**
 * @param defaultProps Default props for the component.
 * @param props props for the component.
 * @returns
 *
 * @example
 * ```tsx
 * const defaultProps = {foo: 'bar'};
 *
 * function App(_props) {
 *  const props = useProps(defaultProps, _props);
 * }
 * ```
 */
export function useProps<
  T extends Record<string, any>,
  U extends Partial<T> = object,
>(
  defaultProps: U,
  props: T,
): T & {
  [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
  return { ...defaultProps, ...purify(props) };
}
