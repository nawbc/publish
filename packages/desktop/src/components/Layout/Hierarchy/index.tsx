import type { MantineStyleProps, MantineThemeColors } from '@mantine/core';
import { Text, UnstyledButton } from '@mantine/core';
import {
  getBackendOptions,
  MultiBackend,
  Tree,
} from '@minoru/react-dnd-treeview';
import type { FC } from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';

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
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginLeft: depth * 10 }}>
            {node.droppable && (
              <span onClick={onToggle}>{isOpen ? '-' : '+'}</span>
            )}
            {node.text}
          </div>
        )}
      />
    </DndProvider>
  );
};
