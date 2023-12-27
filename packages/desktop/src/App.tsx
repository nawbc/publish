/* eslint-disable prefer-const */
import '@blocksuite/presets/themes/affine.css';

import { Button, MantineProvider, NumberInput } from '@mantine/core';
import { Sandbox } from '@publish/runtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import type { ComposeProps } from 'reactgets/components/Compose/index';
import { Compose } from 'reactgets/components/Compose/index';
import * as uuid from 'uuid';

import { router } from './router';
import { resolver, theme } from './theme';

const DevTools: FC = function () {
  return kDevMode ? (
    <Suspense>
      <NumberInput placeholder="" />
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </Suspense>
  ) : null;
};

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      key={uuid.v4()}
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="light"
    />,
    <QueryClientProvider key={uuid.v4()} client={queryClient} />,
  ];
  return (
    <Compose providers={providers}>
      <Button
        onClick={() => {
          fetch('/index.mjs').then(async (res) => {
            const script = await res.text();
            const sandbox = new Sandbox();
            sandbox.run(script);

            sandbox.addEventListener('load', () => {
              sandbox.postMessage('manifest', { name: '-----------' });
            });

            // sandbox.addEventListener('error', (e) => {
            //   console.log(`Error Sandbox ${sandbox.id}: `, e);
            // });

            // sandbox.addEventListener(
            //   'manifest',
            //   (e) => {
            //     console.log('Sandbox outer message', e);
            //   },
            //   { once: true },
            // );
          });
        }}
      >
        Click
      </Button>
      <DevTools />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Compose>
  );
}

export default App;
