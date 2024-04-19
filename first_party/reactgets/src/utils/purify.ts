export type Purify<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

/**
 *
 * Remove object top level useless keys;
 *
 * @param record
 * @returns
 */
export function purify<T extends Record<string, any>>(record: T) {
  return Object.keys(record).reduce<Purify<T>>((acc, key: keyof T) => {
    if (record[key] !== undefined) {
      acc[key] = record[key];
    }
    return acc;
  }, {} as Purify<T>);
}
