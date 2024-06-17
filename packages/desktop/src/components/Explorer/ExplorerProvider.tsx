import { useLocalStorage } from '@mantine/hooks';
import type { TreeMethods } from '@publish-kit/react-dnd-treeview';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useRef } from 'react';

import { ExplorerContext } from './ExplorerContext';

export const EXPLORER_STORAGE_KEY = 'publish:desktop:Explorer:allCollapsed';

export interface ExplorerProviderProps extends PropsWithChildren {}

export const ExplorerProvider: FC<ExplorerProviderProps> = function (props) {
  const { children } = props;
  const treeRef = useRef<TreeMethods>(null);

  const [allCollapsed, setAllCollapsed] = useLocalStorage<boolean>({
    key: EXPLORER_STORAGE_KEY,
  });

  const expandAll = useCallback(() => {
    treeRef.current?.openAll();
    setAllCollapsed(false);
  }, [setAllCollapsed]);

  const collapseAll = useCallback(() => {
    treeRef.current?.closeAll();
    setAllCollapsed(true);
  }, [setAllCollapsed]);

  const toggle = useCallback(() => {
    if (allCollapsed) {
      expandAll();
    } else {
      collapseAll();
    }
  }, [allCollapsed, collapseAll, expandAll]);

  const context = useMemo(
    () => ({
      expandAll,
      collapseAll,
      toggle,
      allCollapsed,
      treeRef,
    }),
    [allCollapsed, collapseAll, expandAll, toggle],
  );

  return (
    <ExplorerContext value={context as any}>
      {allCollapsed !== undefined && children}
    </ExplorerContext>
  );
};
