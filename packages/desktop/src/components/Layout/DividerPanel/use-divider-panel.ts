import { use } from 'react';

import { DividerPanelContext } from './DividerPanelContext';

export const useDividerPanel = function () {
  return use(DividerPanelContext);
};
