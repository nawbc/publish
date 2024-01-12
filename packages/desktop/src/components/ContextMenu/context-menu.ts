import type { SyntheticEvent } from 'react';

import { ContextMenuEvents } from './enums';
import { eventManager } from './event-manager';
import type { MenuId, TriggerEvent } from './types';

export interface ContextMenuActionProps {
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

const contextMenu: ContextMenuActionProps = {
  show({ event, id, props, position }) {
    if (event.preventDefault) event.preventDefault();

    eventManager.emit(ContextMenuEvents.hideAll).emit(id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
      position,
    });
  },
  hideAll() {
    eventManager.emit(ContextMenuEvents.hideAll);
  },
};

export { contextMenu };
