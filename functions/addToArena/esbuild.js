// eslint-disable-next-line
const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  external: ['electron'],
  minify: true,
}).catch(() => process.exit(1));
