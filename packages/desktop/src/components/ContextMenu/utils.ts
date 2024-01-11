import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement } from 'react';

import type { BooleanPredicate, PredicateParams, TriggerEvent } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function isStr(v: any): v is string {
  return typeof v === 'string';
}

export function cloneItems(
  children: ReactNode,
  props: { triggerEvent: TriggerEvent; propsFromTrigger?: object },
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(Boolean),
    (item) => cloneElement(item as ReactElement<any>, props),
  );
}

export function getMousePosition(e: TriggerEvent) {
  const pos = {
    x: (e as MouseEvent).clientX,
    y: (e as MouseEvent).clientY,
  };

  const touch = (e as TouchEvent).changedTouches;

  if (touch) {
    pos.x = touch[0].clientX;
    pos.y = touch[0].clientY;
  }

  if (!pos.x || pos.x < 0) pos.x = 0;

  if (!pos.y || pos.y < 0) pos.y = 0;

  return pos;
}

export function getPredicateValue(
  predicate: BooleanPredicate,
  payload: PredicateParams,
) {
  return isFn(predicate) ? predicate(payload) : predicate;
}

export function findElementAncestor(element: HTMLElement, selector: string) {
  let _element: HTMLElement | null = element;
  while ((_element = _element.parentElement) && !_element.matches(selector));
  return _element;
}

export function getContextItemIndex(
  elementSelector: string,
  parentSelector: string,
  node: HTMLElement,
) {
  if (!node) {
    return null;
  }

  return Array.from(
    findElementAncestor(node, parentSelector)?.querySelectorAll(
      elementSelector,
    ) || [],
  ).findIndex((element) => element === node);
}
