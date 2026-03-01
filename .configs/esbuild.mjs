import * as esbuild from 'esbuild';

if (process.env.FORMAT !== 'cjs' && process.env.FORMAT !== 'esm') {
  console.log(`support "cjs" or "esm"`);
  console.log(`eg. FORMAT=cjs node esbuild.mjs`);

  process.exit(1);
}

const ext = process.env.FORMAT === 'esm' ? 'mjs' : 'cjs'
const format = process.env.FORMAT === 'esm' ? 'esm' : 'cjs'

console.log(`outfile: dist/${format}/index.${ext}`);

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format,
  outfile: `dist/${format}/index.${ext}`,
  sourcemap: true,
  minify: true,
  tsconfig: 'tsconfig.prod.json',
});
