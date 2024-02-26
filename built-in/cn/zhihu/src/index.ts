export class ZhihuPlugin extends PublishAddon {
  register() {
    return {
      /**
       * Protection Levels:
       * @example
       * ```
       * Protection Levels:
       * | Value     | Meaning                                                      |
       * | --------- | ------------------------------------------------------------ |
       * | normal    | This is the lowest level of permission and does not require explicit user consent. These permissions do not typically pose a risk to the user's privacy or device security. |
       * | dangerous | *A higher-risk permission that gives a requesting application access to private user data or control over the device that can negatively impact the user.* |
       * ```
       */
      permissions: [
        /**
         * Get network state
         * Level: normal
         */
        'network:state',
        'network:internet',
        /**
         * Level: normal
         */
        'wifi',
        /**
         * Level: normal
         */
        'bluetooth',
        'storage:cookie',
        'storage:local',
        'storage:db',
        /**
         * Read external plugin storage
         * Level: dangerous
         */
        'storage:external:APP_NAME:cookie',
        'storage:external:APP_NAME:local',
        'storage:external:APP_NAME:db',
        /**
         * System file systems
         * Level: dangerous
         */
        'fs:sys',
      ],
      /**
       * Required
       */
      name: '知乎',
      /**
       * Required
       */
      packageName: 'com.deskbtm.publish.zhihu',
      /**
       * Optional
       */
      description: 'Publish知乎插件',
      /**
       * Available locates
       * ISO 3166-1 alpha-2 code
       * @see {@link https://github.com/annexare/Countries}
       */
      locates: ['zh', 'en'],
    };
  }
}
