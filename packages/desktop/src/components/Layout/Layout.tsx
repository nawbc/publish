import { Box, Button, Center, Container } from '@mantine/core';
import { supabase } from '@publish/shared';
import debug from 'debug';
import { type FC, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import * as styles from './layout.css.ts';

export interface DashboardLayoutProps {}
const a = debug('demo:a');
const b = debug('demo:b');
a.log = console.log.bind(console);
b.log = console.log.bind(console);
debug.enable('*');

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {}, []);

  return (
    <Container fluid h="100dvh">
      <PanelGroup direction="horizontal">
        {/* <SideTabBar /> */}
        <Panel collapsible={true} defaultSize={300} maxSize={70} minSize={10}>
          <iframe src="/demo.html" sandbox="allow-scripts" />
          <Button
            onClick={() => {
              // localStorage.debug = 'worker:*';

              b('%c LOG %O', 'color:red', { name: 'demo' });
            }}
          >
            Click
          </Button>
        </Panel>
        <PanelResizeHandle className={styles.panelResizeHandle}>
          <Center h="100%">
            <Box className={styles.panelResizeHandleDivider} />
          </Center>
        </PanelResizeHandle>
        <Panel>
          <Box ml={10}>xxxxxxx</Box>
        </Panel>
      </PanelGroup>
    </Container>
  );
};

export const Component = function () {
  return (
    <>
      <DashboardLayout />
    </>
  );
};
