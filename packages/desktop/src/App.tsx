import '@blocksuite/presets/themes/affine.css';

import { MantineProvider } from '@mantine/core';
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
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </Suspense>
  ) : null;
};

function App() {
  const [queryClient] = useState(() => new QueryClient());

  // useEffect(
  //   (() => {
  //     (async () => {
  //       try {
  //         registerProvider(IndexedDBFileSystem);

  //         await configure({
  //           '/tmp': { fs: 'InMemory' },
  //           '/home': { fs: 'IndexedDB' },
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //     return () => {};
  //   })(),
  // );

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
