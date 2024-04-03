import { Button, SimpleGrid } from '@mantine/core';
import { Sandbox } from '@publish/addon-rt';
import { createTransport, IndexedDBTransport, Logger } from '@publish/logger';
import { XApi } from '@publish-kit/x-api';
import { type FC, Suspense } from 'react';

import { DeviceInfo } from '../DeviceInfo';

export interface DevExperimentProps {}

const logger = Logger.create({
  transports: [createTransport(IndexedDBTransport)],
});

export const DevExperiment: FC<DevExperimentProps> = function () {
  return (
    <>
      <Suspense>
        <DeviceInfo />
      </Suspense>

      <SimpleGrid cols={8}>
        <Button
          onClick={async () => {
            const res = await fetch('/sw.js');
            console.log(res.body);
            console.log(logger);
            logger.info('test');
          }}
        >
          Test log storage+-
        </Button>
        <Button
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
          }}
        >
          service worker
        </Button>
        <Button onClick={async () => {}}>Worker</Button>
        <Button
          onClick={async () => {
            const sandbox = new Sandbox({
              iframeProps: {
                allowfullscreen: true,
                csp: "frame-ancestors 'self' https://www.example.org;",
              },
            });

            sandbox.run(/* js */ `
            fetch('https://jsonplaceholder.typicode.com/todos/1').then(async (res)=>{
              console.log(await res.json());
            })  
          `);
          }}
        >
          Sandbox
        </Button>
        <Button
          onClick={async () => {
            const xapi = new XApi({
              httpClient: fetch,
              cookie: ``,
            });
            await xapi.tweet(
              `${new Date().toLocaleString()}: Test ${crypto.randomUUID()}`,
            );
          }}
        >
          X
        </Button>
      </SimpleGrid>
    </>
  );
};

DevExperiment.displayName = '@publish/desktop/DevExperiment';
