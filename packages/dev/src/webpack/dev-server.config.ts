import path from 'node:path';

import type { Certificate } from 'mkcert';
import { createCA, createCert } from 'mkcert';
import type { Configuration } from 'webpack-dev-server';

import { __project } from './utils';
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT) || 3001;
const serverProtocol = process.env.PROTOCOL ?? 'https';
const overlay = process.env.DISABLE_DEV_OVERLAY === 'true' ? false : undefined;

export async function createDevServerConfiguration(): Promise<{
  devServer: Configuration;
}> {
  let cert: Certificate | undefined;

  if (serverProtocol === 'https') {
    const ca = await createCA({
      organization: 'deskbtm',
      countryCode: 'CN',
      state: 'China',
      locality: 'Nanjing',
      validity: 365e10,
    });

    cert = await createCert({
      ca: { key: ca.key, cert: ca.cert },
      domains: ['127.0.0.1', 'localhost', '0.0.0.0'],
      validity: 365e10,
    });
  }

  return {
    devServer: {
      hot: 'only',
      host,
      port,
      liveReload: true,
      client: {
        overlay,
      },
      historyApiFallback: true,
      static: {
        directory: path.resolve(__project, 'public'),
        publicPath: '/',
        watch: true,
      },
      server: {
        type: serverProtocol,
        options: cert,
      },
    },
  };
}
