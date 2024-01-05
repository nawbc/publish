import type { SyntheticEvent } from 'react';

import { EVENT } from '../constants';
import type { MenuId, TriggerEvent } from '../types';
import { eventManager } from './eventManager';

export interface ContextMenuProps {
  show: <TProps>(params: ShowContextMenuParams<TProps>) => void;
  hideAll: () => void;
}

export interface ShowContextMenuParams<TProps = unknown> {
  id: MenuId;
  event: TriggerEvent;
  props?: TProps;
  position?: {
    x: number;
    y: number;
  } | null;
}

const contextMenu: ContextMenuProps = {
  show({ event, id, props, position }) {
    if (event.preventDefault) event.preventDefault();

    eventManager.emit(EVENT.HIDE_ALL).emit(id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
      position,
    });
  },
  hideAll() {
    eventManager.emit(EVENT.HIDE_ALL);
  },
};

export { contextMenu };
