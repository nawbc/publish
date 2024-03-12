import { ActionIcon, Box, Container, rem, Tooltip } from '@mantine/core';
import { Sandbox } from '@publish/addon-rt';
import { PublishDocEditor } from '@publish/doc-editor/preset/index.ts';
import { createTransport, IndexedDBTransport, Logger } from '@publish/logger';
import { XApi } from '@publishjs/x-api';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
// import { fetch } from '@tauri-apps/plugin-http';
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
            // requestClient: fetch,
            cookie:
              'guest_id_marketing=v1%3A170493863664099238; guest_id_ads=v1%3A170493863664099238; guest_id=v1%3A170493863664099238; _ga=GA1.2.1143746520.1704938644; kdt=ZAfnUDFhA2fcekzeAtLDfDqi5eFgyDtb7ZPKD5F7; external_referer=padhuUp37zj9xuUOXCNFvE4dUQCSCK7c7bhcgOxHHM4%3D|0|8e8t2xd8A2w%3D; auth_token=883b271b6b8868f3c0d807d86015d97cd2ba9495; ct0=a5549a93d89f776d5c96461b277fd2f00517d288fb42cecc693afdc6cc860ebad28375d6814c75a58f4dd77a40d6e0f3d575ae21e44b26d3d72ebdfd6d0843b61b00933be86ca82ec79a8d7b1916293e; twid=u%3D1132207287626477568; att=1-UWrJTigNhe5LAz3PUxpgyIJIizVAqerWDJvsOzzN; dnt=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCO0IxDCOAToMY3NyZl9p%250AZCIlMDdlNjVhNTk5MWI2NTM0NGZmMjliNWE0Mjk3YTg4OWE6B2lkIiU1MzRm%250AN2IzZGZjMzAwNjUyYWRkNGRiZTViMDJmNjRjMA%253D%253D--226696bde574970a07f7673840bda37965a78f49; personalization_id="v1_plosZk3aWbz9Bq3v/GRe0Q=="',
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
