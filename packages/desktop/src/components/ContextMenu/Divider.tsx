import type React from 'react';

import type {
  BooleanPredicate,
  HandlerParamsEvent,
  InternalProps,
} from './types';
import { getPredicateValue } from './utils';

export interface DividerProps extends InternalProps {
  /**
   * Passed to the `Separator` hidden predicate. Accessible via `data`
   */
  data?: any;

  /**
   * Hide the `Separator`. If a function is used, a boolean must be returned
   *
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Separator`
   * @param triggerEvent The event that triggered the context menu
   *
   *
   * ```
   * function isSeparatorHidden({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
   * <Separator hidden={isSeparatorHidden} data={data}/>
   * ```
   */
  hidden?: BooleanPredicate;
}

export const ContextMenuDivider: React.FC<DividerProps> = ({
  triggerEvent,
  data,
  propsFromTrigger,
  hidden = false,
}) =>
  getPredicateValue(hidden, {
    data,
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  }) ? null : (
    <div className='' />
  );
