import type { Manifest, Preferences } from '@publishjs/sdk';
import { channel, Option, OptionKinds, PublishPlugin } from '@publishjs/sdk';

import XSVG from '../public/X.svg';

export class Plugin extends PublishPlugin {
  constructor() {
    super();
  }

  protected override preferences(): Preferences {
    return {
      hideDefaults: [OptionKinds.checkbox],
      options: [
        Option.simple({ title: '', description: '' }),
        Option.select({ title: 'demo', description: '', data: [] }),
      ],
    };
  }

  protected override register(): Manifest {
    return {
      mode: 'graphical',
      graphicalMain: './index.html',
      headlessMain: './headless.js',
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
      icon: XSVG,
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

channel.addEventListener('manifest', (e) => {
  console.log(e);
});
