import type { MantineStyleProps, MantineThemeColors } from '@mantine/core';
import { Text, UnstyledButton } from '@mantine/core';
import { getHotkeyHandler, useWindowEvent } from '@mantine/hooks';
import {
  getBackendOptions,
  isAncestor,
  MultiBackend,
  Tree,
} from '@minoru/react-dnd-treeview';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';

import * as styles from './hierarchy.css';
import { TreeNode } from './Node';

const initialData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: 'File 1-1',
    data: {
      fileType: 'csv',
      fileSize: '0.5MB',
    },
  },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: 'File 1-2',
    data: {
      fileType: 'text',
      fileSize: '4.8MB',
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: 'File 2-1-1',
    data: {
      fileType: 'image',
      fileSize: '2.1MB',
    },
  },
  {
    id: 7,
    parent: 0,
    droppable: false,
    text: 'File 3',
    data: {
      fileType: 'image',
      fileSize: '0.8MB',
    },
  },
];

export interface NavMenuTile {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: NavMenuTile[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}

interface NavMenuTileProps {
  label: string;
  active: boolean;
}

const NavMenuTile: FC<NavMenuTileProps> = function ({ label }) {
  return (
    <UnstyledButton>
      <Text size="sm">{label}</Text>
    </UnstyledButton>
  );
};

interface NavMenuProps extends MantineStyleProps {}

export const Hierarchy: FC<NavMenuProps> = function () {
  const [tree, setTree] = useState(initialData);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<{ id: number }[]>([]);

  useWindowEvent(
    'keydown',
    getHotkeyHandler([
      [
        'mod',
        () => {
          setIsCtrlPressing(true);
        },
      ],
      [
        'escape',
        () => {
          setSelectedNodes([]);
        },
      ],
    ]),
  );

  useWindowEvent(
    'keyup',
    getHotkeyHandler([
      [
        'mod',
        () => {
          setIsCtrlPressing(false);
        },
      ],
    ]),
  );

  const handleSingleSelect = (node) => {
    setSelectedNodes([node]);
  };

  const handleMultiSelect = useCallback(
    (clickedNode) => {
      const selectedIds = selectedNodes.map((n) => n.id);

      // ignore if the clicked node is already selected
      if (selectedIds.includes(clickedNode.id)) {
        return;
      }

      // ignore if ancestor node already selected
      if (
        selectedIds.some((selectedId) =>
          isAncestor(tree, selectedId, clickedNode.id),
        )
      ) {
        return;
      }

      let updateNodes = [...selectedNodes];

      updateNodes = updateNodes.filter((selectedNode) => {
        return !isAncestor(tree, clickedNode.id, selectedNode.id);
      });

      updateNodes = [...updateNodes, clickedNode];
      setSelectedNodes(updateNodes);
    },
    [selectedNodes, tree],
  );

  const handleClick = (e, node) => {
    if (e.ctrlKey || e.metaKey) {
      handleMultiSelect(node);
    } else {
      handleSingleSelect(node);
    }
  };

  const handleDragStart = (node) => {
    const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
    setIsDragging(true);

    if (!isCtrlPressing && isSelectedNode) {
      return;
    }

    if (!isCtrlPressing) {
      setSelectedNodes([node]);
      return;
    }

    if (!selectedNodes.some((n) => n.id === node.id)) {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsCtrlPressing(false);
    setSelectedNodes([]);
  };

  const handleDrop = (newTree, options) => {
    const { dropTargetId } = options;

    setTree(
      newTree.map((node) => {
        if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
          return {
            ...node,
            parent: dropTargetId,
          };
        }

        return node;
      }),
    );

    setSelectedNodes([]);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={tree}
        rootId={0}
        classes={{
          root: styles.treeRoot,
          listItem: styles.listItem,
        }}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        canDrop={(tree, options) => {
          if (
            selectedNodes.some(
              (selectedNode) => selectedNode.id === options.dropTargetId,
            )
          ) {
            return false;
          }
        }}
        render={(node, options) => {
          const selected = selectedNodes.some(
            (selectedNode) => selectedNode.id === node.id,
          );

          return (
            <TreeNode
              node={node}
              {...options}
              isSelected={selected}
              isDragging={selected && isDragging}
              onClick={handleClick}
            />
          );
        }}
      />
    </DndProvider>
  );
};
