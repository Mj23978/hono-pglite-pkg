/** @type{import("esbuild").BuildOptions} */

import esbuild from 'esbuild'

const define = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  DATABASE_URL: JSON.stringify(process.env.DATABASE_URL || 'file:./.db'),
}

esbuild
  .build({
    entryPoints: ['./src/server/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: './bundle/server.bundle.js',
    platform: 'node',
    target: ['node20.0'],
    logLevel: 'info',
    define,
    external: ['@electric-sql/pglite', "better-sqlite3"],
  })
  .catch(() => process.exit(1))
