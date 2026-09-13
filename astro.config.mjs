import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crosspals.com',
  server:{port:9300,},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  output: 'static',
});
