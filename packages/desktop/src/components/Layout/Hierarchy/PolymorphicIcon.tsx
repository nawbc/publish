import { IconFileText, IconFolder, IconPhoto } from '@tabler/icons-react';
import type { FC } from 'react';

type NodeTypes = 'image' | 'folder' | 'file' | string;

export type PolymorphicIcon = {
  type?: NodeTypes;
  size?: string | number;
};

export const PolymorphicIcon: FC<PolymorphicIcon> = (props) => {
  const { type, size } = props;

  switch (type) {
    case 'image':
      return <IconPhoto size={size} />;
    case 'file':
      return <IconFileText size={size} />;
    case 'folder':
      return <IconFolder size={size} />;
    default:
      return <IconFileText size={size} />;
  }
};

PolymorphicIcon.defaultProps = {
  size: 16,
};
