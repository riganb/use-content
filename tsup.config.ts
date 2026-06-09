import { defineConfig } from 'tsup';

export default defineConfig({
  // 1. Core Entry point file
  entry: ['src/index.ts'],

  // 2. Output formats: ESM for modern bundlers, CJS for legacy environments
  format: ['esm', 'cjs'],

  // 3. Generate automatic type declarations (.d.ts)
  dts: true,

  // 4. Clean the /dist directory prior to every new compile sequence
  clean: true,

  // 5. CRITICAL: Do NOT minify or replace process.env.NODE_ENV here.
  // We leave it as a literal string so that the consumer's bundler
  // can evaluate the ternary branch and dead-code-eliminate the /dev tree.
  minify: false,
  sourcemap: true,
  splitting: false,

  // 6. Externalize React so it isn't accidentally bundled into our code
  external: ['react', 'react-dom'],

  // CRITICAL: Tells tsup to inject the RSC client boundary flag at the top of all generated chunks
  banner: {
    js: '"use client";',
  },
});
