import { Card } from '@mantine/core';
import { type FC } from 'react';
import { useBirth } from 'reactgets/hooks/index';

export interface DeviceInfoProps {}

export const DeviceInfo: FC<DeviceInfoProps> = function () {
  useBirth(() => { 
    
  });

  return <Card p="xl"></Card>;
};

DeviceInfo.displayName = '@publish/desktop/DeviceInfo';
