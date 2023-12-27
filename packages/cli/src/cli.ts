import { Command } from 'commander';

import { version } from '../package.json';
import { create } from './create';

const program = new Command();

async function main() {
  program.name('publish').version(version);

  program
    .command('create')
    .description('create a publish app boilerplate')
    .action(create);

  program.command('pack').description('create a publish app boilerplate');

  program
    .command('publish')
    .description('publish a publish app to internet')
    .option('--npm', 'publish to npm')
    .option('--github', 'publish to github')
    .action(async () => {});

  await program.parseAsync(process.argv);
}

main();
