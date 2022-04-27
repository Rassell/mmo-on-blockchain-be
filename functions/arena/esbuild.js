// eslint-disable-next-line
const { build } = require('esbuild');

build({
  entryPoints: ['index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  external: ['electron'],
}).catch(() => process.exit(1));
