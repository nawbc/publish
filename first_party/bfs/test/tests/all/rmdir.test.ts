import { promisify } from 'node:util';

import { backends, configure, fs } from '../../common';

describe.each(backends)('%s Directory Removal', (name, options) => {
  const configured = configure({ fs: name, options });

  it('Cannot remove non-empty directories', async () => {
    await configured;

    await promisify(fs.mkdir)('/rmdirTest');
    await promisify(fs.mkdir)('/rmdirTest/rmdirTest2');

    try {
      await promisify(fs.rmdir)('/rmdirTest');
    } catch (err: any) {
      expect(err).not.toBeNull();
      expect(err.code).toBe('ENOTEMPTY');
    }
  });
});
