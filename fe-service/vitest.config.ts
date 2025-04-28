import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: ['./src/i18n/**', ...coverageConfigDefaults.exclude],
      },
    },
  }),
);
