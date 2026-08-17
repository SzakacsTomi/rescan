import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/** No React plugin: Vitest transforms TSX itself using the `jsx` setting in tsconfig.json.
 *  The plugin only adds Fast Refresh, which a test run has no use for. */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    // Mirrors the `@/*` path mapping in tsconfig.json.
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
});
