import { Button, Card, SimpleGrid } from '@mantine/core';
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

      <SimpleGrid my="xl" cols={4}>
        <Card padding="lg" shadow="sm" radius="md" withBorder>
          <Button
            onClick={async () => {
              const res = await fetch('/sw.js');
              console.debug(res.body);
              logger.info('test');
            }}
          >
            Test log storage
          </Button>
        </Card>

        <Card padding="lg" shadow="sm" radius="md" withBorder>
          <Button
            onClick={async () => {
              const registration = await navigator.serviceWorker.register(
                '/sw.js',
                {
                  scope: '/',
                },
              );

              if (registration.installing) {
                console.debug('Service worker installing');
              } else if (registration.waiting) {
                console.debug('Service worker installed');
              } else if (registration.active) {
                console.debug('Service worker active');
              }
            }}
          >
            Service Worker
          </Button>
        </Card>

        <Card padding="lg" shadow="sm" radius="md" withBorder>
          <Button onClick={async () => {}}>Web Worker</Button>
        </Card>
        <Card padding="lg" shadow="sm" radius="md" withBorder>
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
                  console.debug(await res.json());
                })
              `);
            }}
          >
            Sandbox
          </Button>
        </Card>
        <Card padding="lg" shadow="sm" radius="md" withBorder>
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
            X API
          </Button>
        </Card>
      </SimpleGrid>
    </>
  );
};

DevExperiment.displayName = '@publish/desktop/DevExperiment';
