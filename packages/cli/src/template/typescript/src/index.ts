import type { Manifest } from '@publishjs/sdk';
import { PublishPlugin } from '@publishjs/sdk';

import publish from '../public/publish.svg';
import { demo } from './mod';
export class Plugin extends PublishPlugin {
  constructor() {
    super();
    demo();
    console.log(publish);
  }
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
        avatar:
          'https://avatars.githubusercontent.com/u/45007226?s=400&u=8e6ce9e05f673f26ccaf19b792f74fe9c7b7f39e&v=4',
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
