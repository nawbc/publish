import { ThemeIcon } from '@mantine/core';
import { IconFileText, IconFolder, IconPhoto } from '@tabler/icons-react';
import type { FC } from 'react';

import type { NodeDataType } from './type';

export type PolymorphicIconProps = {
  type?: NodeDataType;
  size?: number;
};

export const PolymorphicIcon: FC<PolymorphicIconProps> = (props) => {
  const { type, size } = props as Required<PolymorphicIconProps>;

  let icon;
  switch (type) {
    case 'image':
      icon = <IconPhoto />;
      break;
    case 'file-text':
      icon = <IconFileText />;
      break;
    case 'folder':
      icon = <IconFolder />;
      break;
    default:
      icon = <IconFileText />;
      break;
  }

  return (
    <ThemeIcon size={size} c="gray.7" variant="transparent">
      {icon}
    </ThemeIcon>
  );
};

PolymorphicIcon.defaultProps = {
  size: 18,
};
