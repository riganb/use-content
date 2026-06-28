import { defineConfig } from 'tsup';

const shared = {
  // Core Entry point file
  entry: ['src/index.ts'],

  // CRITICAL: Do NOT minify or replace process.env.NODE_ENV here.
  // We leave it as a literal string so that the consumer's bundler
  // can evaluate the ternary branch
  minify: false,
  sourcemap: true,

  // Externalize React so it isn't accidentally bundled into our code
  external: ['react', 'react-dom'],

  // CRITICAL: Tells tsup to inject the RSC client boundary flag at the top of all generated chunks
  banner: {
    js: '"use client";',
  },
};

export default defineConfig([
  {
    ...shared,
    format: ['esm'],
    dts: true,
    clean: true,
    splitting: true,
  },
  {
    ...shared,
    format: ['cjs'],
    dts: true,
    clean: false,
    splitting: false,
  },
]);
