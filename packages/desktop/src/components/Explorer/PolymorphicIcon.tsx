import type { ThemeIconProps } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';
import { IconFileText, IconFolder, IconPhoto } from '@tabler/icons-react';
import type { FC } from 'react';

import type { NodeDataType } from './types';

export interface PolymorphicIconProps extends ThemeIconProps {
  type?: NodeDataType;
  size?: number;
}

export const PolymorphicIcon: FC<PolymorphicIconProps> = (props) => {
  const {
    type,
    size,
    variant: _,
    ...rest
  } = props as Required<PolymorphicIconProps>;

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
    <ThemeIcon size={size} variant="transparent" {...rest}>
      {icon}
    </ThemeIcon>
  );
};

PolymorphicIcon.defaultProps = {
  size: 21,
  c: 'gray.7',
};
