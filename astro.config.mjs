import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crosspals.com',
  server:{port:9001,},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  output: 'static',
});
