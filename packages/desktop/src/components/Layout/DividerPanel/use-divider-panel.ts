import { useContext } from 'react';

import { DividerPanelContext } from './DividerPanelContext';

export const useDividerPanel = function () {
  return useContext(DividerPanelContext);
};
