import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import type { ComposeProps } from 'reactgets/components/Compose/index';
import { Compose } from 'reactgets/components/Compose/index';
import { v4 } from 'uuid';

import { GlobalContextMenus } from './components/context-menus';
import { NativeWindowProvider } from './components/NativeWindow';
import { PublishSpotlight } from './components/Spotlight';
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

  const providers = [
    <MantineProvider
      key={v4()}
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
    />,
    <QueryClientProvider key={v4()} client={queryClient} />,
    process.env.PUBLISH_BUILD_PLATFORM === 'desktop' && (
      <NativeWindowProvider key={v4()} />
    ),
  ].filter(Boolean) as ComposeProps['providers'];

  return (
    <Compose providers={providers}>
      <DevTools />
      <GlobalContextMenus />
      <PublishSpotlight />
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
