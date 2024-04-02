import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

/**
 * Only execute once at first time.
 *
 * @param {EffectCallback} effect
 * @returns {boolean}
 * @example
 * ```ts
 * const isFirst = useBirth()
 *
 * // or
 *
 * useBirth(()=>{
 *
 * })
 * ```
 */
export function useBirth(effect?: EffectCallback): boolean {
  const ref = useRef(true);
  useEffect(effect, []);

  if (ref.current) {
    ref.current = false;
    return true;
  }
  return ref.current;
}
