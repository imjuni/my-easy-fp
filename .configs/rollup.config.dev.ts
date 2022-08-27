import { nodeResolve } from '@rollup/plugin-node-resolve';
import readPackage from 'read-pkg';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

const pkg = readPackage.sync();

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cjs/index.js',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'dist/esm/index.js',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          const isLocal =
            (pkg?.dependencies?.[module] === undefined || pkg?.dependencies?.[module] === null) &&
            (pkg?.devDependencies?.[module] === undefined ||
              pkg?.devDependencies?.[module] === null);

          if (module === 'type-fest') {
            return false;
          }

          return isLocal;
        },
      }),
      ts({ tsconfig: 'tsconfig.json' }),
      terser(),
    ],
  },
];
