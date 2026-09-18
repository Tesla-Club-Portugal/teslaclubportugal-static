import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://teslaclubportugal-static-v2.pages.dev',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-PT', en: 'en-GB' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
