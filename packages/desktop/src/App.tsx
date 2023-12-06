import '@blocksuite/editor/themes/affine.css';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { FC, useState } from 'react';
import { Compose, ComposeProps } from 'reactgets/components/Compose/index';
import * as uuid from 'uuid';
import { theme } from './theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const DevTools: FC = function () {
  return kDevMode ? (
    <>
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </>
  ) : null;
};

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      key={uuid.v4()}
      theme={theme}
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
