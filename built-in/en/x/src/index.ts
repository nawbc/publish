import type { Manifest } from '@publishjs/sdk';
import { PublishPlugin } from '@publishjs/sdk';

export class Plugin extends PublishPlugin {
  protected override register(): Manifest {
    return {
      permissions: [
        'network:state',
        'network:internet',
        'wifi',
        'bluetooth',
        'geolocation',
        'storage:cookie',
        'storage:local',
        'storage:db',
        'clipboard:write',
        'clipboard:read',
        'storage:external:APP_NAME:cookie',
        'storage:external:APP_NAME:local',
        'storage:external:APP_NAME:db',
        'sys:fs:read',
        'sys:fs:write',
      ],
      name: 'X(twitter)',
      version: '0.0.1',
      manifestVersion: 1,
      author: {
        name: 'Han',
        avatar: '',
        email: 'deskbtm@outlook.com',
        additional: '',
      },
      homepage: '',
      packageName: 'com.deskbtm.publish.x',
      description: 'Publish x(twitter) plugin',
      update: {
        mode: 'npm',
        url: 'https://npm.com',
      },

      locates: ['zh', 'en'],
      fs: {
        scope: [],
      },
      network: {
        hosts: ['*://*twitter.com/*'],
      },
    } satisfies Manifest;
  }
}
