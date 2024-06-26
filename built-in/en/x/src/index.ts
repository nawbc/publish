// import type { Manifest, Preferences } from '@publish-addon/sdk';
// import { channel, Option, OptionKinds, PublishAddon } from '@publish-addon/sdk';

// import XPNG from '../public/X.png';
// import XSVG from '../public/X.svg';

// export class Addon extends PublishAddon {
//   constructor() {
//     super();
//   }

//   protected override preferences(): Preferences {
//     return {
//       hideDefaults: [OptionKinds.checkbox],
//       options: [
//         Option.simple({ title: '', description: '' }),
//         Option.select({ title: 'demo', description: '', data: [] }),
//       ],
//     };
//   }

//   protected override register() {
//     return {
//       type: 'headless',
//       permissions: [
//         'graphical',
//         'network:state',
//         'network:internet',
//         'wifi',
//         'bluetooth',
//         'geolocation',
//         'storage:cookie',
//         'storage:local',
//         'storage:db',
//         'clipboard:write',
//         'clipboard:read',
//         'storage:external:APP_NAME:cookie',
//         'storage:external:APP_NAME:local',
//         'storage:external:APP_NAME:db',
//         'fs:read',
//         'fs:write',
//       ],
//       name: 'X(twitter)',
//       icon: XSVG,
//       version: '0.0.1',
//       manifestVersion: 1,
//       author: {
//         name: 'Han',
//         avatar:
//           'https://avatars.githubusercontent.com/u/45007226?s=400&u=8e6ce9e05f673f26ccaf19b792f74fe9c7b7f39e&v=4',
//         email: 'deskbtm@outlook.com',
//         additional: '',
//       },
//       homepage: '',
//       packageName: 'com.deskbtm.publish.x',
//       description: 'Publish x(twitter) addon',
//       update: {
//         mode: 'npm',
//         registry: 'https://npm.com',
//       },
//       locates: ['zh', 'en'],
//       fs: {
//         scope: [],
//       },
//       network: {
//         hosts: ['*://*twitter.com/*'],
//       },
//     } satisfies Manifest;
//   }
// }

// channel.addEventListener('manifest', (e) => {
//   console.log(e);
//   console.log(XPNG);
// });
