import { ActionIcon, Box, Container, rem, Tooltip } from '@mantine/core';
import { Sandbox } from '@publish/addon-rt';
import { PublishDocEditor } from '@publish/doc-editor/preset/index.ts';
import { createTransport, IndexedDBTransport, Logger } from '@publish/logger';
import { XApi } from '@publishjs/x-api';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { fetch } from '@tauri-apps/plugin-http';
import type { PropsWithChildren } from 'react';
import { type FC, useCallback } from 'react';
import { Outlet } from 'react-router';

import { ExplorerProvider } from '../Explorer';
import { ScrollView } from '../ScrollView';
import { DividerPanel, useDividerPanel } from './DividerPanel';
import { PrimitiveSidebar } from './Sidebar';

export interface DashboardLayoutProps extends PropsWithChildren {}

const logger = Logger.create({
  transports: [createTransport(IndexedDBTransport)],
});

const WorkspaceLayout: FC<DashboardLayoutProps> = () => {
  return (
    <ExplorerProvider>
      <Container p="0" fluid h="100dvh">
        <DividerPanel hideDividerCollapsed initial={278} min={208} max={608}>
          <DividerPanel.Leading>
            <PrimitiveSidebar />
          </DividerPanel.Leading>
          <DividerPanel.Trailing>
            <ScrollView>
              <Header />
              <PublishDocEditor />
            </ScrollView>
          </DividerPanel.Trailing>
        </DividerPanel>
      </Container>
    </ExplorerProvider>
  );
};

function Header() {
  const panel = useDividerPanel();

  const handleExpand = useCallback(() => {
    panel?.expand();
  }, [panel]);

  return (
    <Box
      pos="relative"
      component="nav"
      px={rem(18)}
      py="xs"
      h="55px"
      pl={0}
      style={{
        marginRight: rem(8),
        borderBottom: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      <button
        onClick={async () => {
          const res = await fetch('/sw.js');
          console.log(res.body);
          // console.log(logger);
          // logger.info('test');
        }}
      >
        Test local log
      </button>
      <button
        onClick={async () => {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
            },
          );

          if (registration.installing) {
            console.log('Service worker installing');
          } else if (registration.waiting) {
            console.log('Service worker installed');
          } else if (registration.active) {
            console.log('Service worker active');
          }

          // console.log(worker);
          // navigator.serviceWorker.register(worker, {
          //   scope: '/',
          // });
        }}
      >
        service worker
      </button>
      <button
        onClick={async () => {
          new Worker(new URL('../../demo.ts', import.meta.url));
        }}
      >
        worker
      </button>
      <button
        onClick={async () => {
          const sandbox = new Sandbox({
            iframeProps: {
              allowfullscreen: true,
              csp: "frame-ancestors 'self' https://www.example.org;",
            },
          });

          sandbox.run(/* js */ `
            console.log('----------------------')
            fetch('https://jsonplaceholder.typicode.com/todos/1').then(async (res)=>{
              console.log(await res.json());
            })
          `);
        }}
      >
        Sandbox
      </button>
      <input type="file" id="file" />
      <button
        onClick={async () => {
          const xapi = new XApi({
            requestClient: fetch,
            cookie: `_ga=GA1.2.1143746520.1704938644; g_state={"i_l":0}; kdt=ZAfnUDFhA2fcekzeAtLDfDqi5eFgyDtb7ZPKD5F7; dnt=1; auth_multi="1132207287626477568:883b271b6b8868f3c0d807d86015d97cd2ba9495"; auth_token=8d8c2a1f245bb62486210910249912ca0855daac; guest_id_ads=v1%3A171025908550758974; guest_id_marketing=v1%3A171025908550758974; lang=en; guest_id=v1%3A171025908550758974; twid=u%3D1124878477847478272; ct0=5fea3eb36a604cb30d218067d73d2d1087bf9a2d1e8044c1e5408cdf49be282a970b3d2b984d985abbbdb43a2fe3800aedfe57030a7af7577ca9bad10e6eba282d55a11620f6c2aa9b8a7e9b4c7c27de; personalization_id="v1_Dim5thzrLhXSdglQ77JqsA=="`,
          });
          const input = document.querySelector('#file') as HTMLInputElement;

          await xapi.uploadMedia(input.files![0]);
        }}
      >
        X
      </button>
      {panel?.collapsed && (
        <Tooltip openDelay={2000} label="Collapse sidebar">
          <ActionIcon c="gray.7" onClick={handleExpand}>
            <IconLayoutSidebarLeftExpand size={22} />
          </ActionIcon>
        </Tooltip>
      )}
    </Box>
  );
}

export const Component = function () {
  return (
    <>
      <WorkspaceLayout>
        <Outlet />
      </WorkspaceLayout>
    </>
  );
};
