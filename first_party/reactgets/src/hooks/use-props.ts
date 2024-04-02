import { purify } from '../utils';

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
