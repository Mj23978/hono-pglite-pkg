import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server/index.ts'], // Your entry point
  outDir: 'bundle', // Output directory
  format: ['cjs'], // CommonJS format
  sourcemap: false,
  noExternal: [/(.*)/],
  clean: true,
  external: ['better-sqlite3'], // Externalize third-party packages
  shims: true, // Convert import.meta.url to a shim for CJS
  minify: false, // Set to true if you want to minify the output
  splitting: false, // Disable code splitting
})