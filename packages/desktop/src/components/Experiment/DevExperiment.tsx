import { Sandbox } from '@publish/addon-rt';
import { createTransport, IndexedDBTransport, Logger } from '@publish/logger';
import { XApi } from '@publishjs/x-api';
import { type FC } from 'react';

export interface DevExperimentProps {}

const logger = Logger.create({
  transports: [createTransport(IndexedDBTransport)],
});

export const DevExperiment: FC<DevExperimentProps> = function () {
  return (
    kDevMode && (
      <>
        <button
          onClick={async () => {
            const res = await fetch('/sw.js');
            console.log(res.body);
            console.log(logger);
            logger.info('test');
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
            fetch('https://jsonplaceholder.typicode.com/todos/1').then(async (res)=>{
              console.log(await res.json());
            })
          `);
          }}
        >
          Sandbox
        </button>
        {/* <input type="file" id="file" /> */}
        <button
          onClick={async () => {
            const xapi = new XApi({
              httpClient: fetch,
              cookie: `g_state={"i_l":0}; kdt=3TABfZ6ijtRXyXdehQXkycBILub6MEgREVXYizkc; _ga=GA1.2.1156593149.1710385930; _gid=GA1.2.2039107885.1710385930; dnt=1; ads_prefs="HBISAAA="; auth_multi="1124878477847478272:094951ed69955a25aa41b3d19944b35c387f21a7"; auth_token=26d6d1dd4387c113034b3edc7aabc051a074fd8f; guest_id_ads=v1%3A171040591925155477; guest_id_marketing=v1%3A171040591925155477; lang=zh-cn; guest_id=v1%3A171040591925155477; twid=u%3D1132207287626477568; ct0=482da142cfb31c9bf7d727242fc8754a9c8dc368b50767dd3d74d94a2058b0841b3b623a0c04dce10c7c6bfcbb5680933f037cda6e8b47d08cd56c2ffd4619a7d7c041782701120d671f585df8aa4777; personalization_id="v1_UQzdzy607kWZo4SCt34Elw=="`,
            });
            await xapi.tweet(
              `${new Date().toLocaleString()}: Test ${crypto.randomUUID()}`,
            );
          }}
        >
          X
        </button>
        <button
          onClick={async () => {
            console.log(process.env.PUBLISH_BUILD_PLATFORM);
          }}
        >
          Test
        </button>
      </>
    )
  );
};

DevExperiment.displayName = '@publish/desktop/DevExperiment';
