import execa from 'execa';
import { logger, series, task } from 'just-task';
import readPackage from 'read-pkg';

// option('env', { default: { env: 'develop' } });

function splitArgs(args: string): string[] {
  return args
    .split(' ')
    .map((line) => line.trim())
    .filter((line) => line != null && line !== '');
}

task('clean', async () => {
  const cmd = 'rimraf';
  const option = 'dist artifact';

  logger.info(cmd, option);

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('clean:dts', async () => {
  const cmd = 'rimraf';
  const option = 'dist/cjs/src dist/esm/src';

  logger.info(cmd, option);

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('ctix', async () => {
  const cmd = 'ctix';
  const option = 'build --config .configs/.ctirc';

  logger.info('Create index file : ', cmd, option);

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('ctix:remove', async () => {
  const cmd = 'ctix';
  const option = 'remove --force-yes --remove-backup';

  logger.info('Remove index file : ', cmd, option);

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+esbuild:dev', async () => {
  const { buildAll } = await import('./esbuild.config.ts');

  logger.info('Building with esbuild (dev)...');
  await buildAll();
});

task('+esbuild:prod', async () => {
  const { buildAll } = await import('./esbuild.config.ts');

  logger.info('Building with esbuild (prod)...');
  await buildAll();
});

task('lint', async () => {
  const cmd = 'eslint';
  const option = '--cache .';

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+build', async () => {
  const cmd = 'tsc';
  const option = '--incremental --project tsconfig.prod.json';
  // const option = '--incremental --project tsconfig.json --tsBuildInfoFile .tsbuildinfo';

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+pub', async () => {
  const cmd = 'npm';
  const option = 'publish --registry http://localhost:8901 --force';

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
      RELEASE_MODE: 'true',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+pub:prod', async () => {
  const cmd = 'npm';
  const option = 'publish --access=public';

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
      RELEASE_MODE: 'true',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+unpub', async () => {
  const pkg = readPackage.sync();
  const cmd = 'npm';
  const option = `unpublish ${pkg.name}@${pkg.version} --registry http://localhost:8901 --force`;

  logger.info('Unpublish: ', cmd, option);

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
      RELEASE_MODE: 'true',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('esbuild:prod', series('clean', 'ctix', '+esbuild:prod', 'ctix:remove', 'clean:dts'));
task('esbuild:dev', series('clean', 'ctix', '+esbuild:dev', 'ctix:remove', 'clean:dts'));
task('build', series('clean', '+build'));
task('pub', series('esbuild:prod', '+pub'));
task('unpub', series('clean', '+unpub'));
task('pub:prod', series('esbuild:prod', '+pub:prod'));
