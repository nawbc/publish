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

import { GlobalContextMenus } from './components/context-menus';
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

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      key={uuid.v4()}
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
    />,
    <QueryClientProvider key={uuid.v4()} client={queryClient} />,
  ];
  return (
    <Compose providers={providers}>
      <DevTools />
      <GlobalContextMenus />
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
