import { Box, Button, Center, Container, Input } from '@mantine/core';
import { type FC, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import * as styles from './layout.css.ts';

export interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {}, []);

  return (
    <Container fluid h="100dvh">
      <PanelGroup direction="horizontal">
        {/* <SideTabBar /> */}
        <Panel
          collapsible={true}
          defaultSizePixels={300}
          maxSizePercentage={70}
          minSizePercentage={10}
        >
          <Input
            size="xs"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            size="xs"
            onClick={async () => {
              // const myWorker = new Worker('http://localhost:8080/index');
              // myWorker.onerror = (err: unknown) => {
              //   console.log(err);
              // };
              // myWorker.onmessage = (err: unknown) => {
              //   console.log(err);
              // };
              // import(
              //   /* @vite-ignore */
              //   value
              // ).then((d) => {
              //   console.log(d);
              // });
              // console.log()
            }}
          >
            Import
          </Button>
          <Button
            size="xs"
            onClick={() => {
              // import('http://localhost:8080/index.mjs').then((v) => {
              //   console.log(v);
              // });
            }}
          >
            Load
          </Button>
        </Panel>
        <PanelResizeHandle className={styles.panelResizeHandle}>
          <Center h="100%">
            <Box className={styles.panelResizeHandleDivider} />
          </Center>
        </PanelResizeHandle>
        <Panel>
          <iframe src="" />
          {/* <Box ml={10}>xxxxxxx</Box> */}
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
