const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const widths = [320, 360, 375, 390, 414, 430, 540, 640, 768];
const pages = [
  '/', '/services', '/about', '/contact', '/blog', '/privacy', '/terms', '/404',
  '/blog/find-suppliers-1688', '/blog/air-vs-sea-freight', '/blog/cheap-china-products',
  '/blog/avoid-alibaba-scams', '/blog/custom-packaging-guide', '/blog/payment-methods-suppliers',
  '/es/', '/es/services', '/es/about', '/es/contact', '/es/blog', '/es/privacy', '/es/terms'
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const rows = [];
  for (const w of widths) {
    for (const p of pages) {
      await page.setViewportSize({ width: w, height: 800 });
      let overflow = '?';
      try {
        await page.goto(BASE + p, { waitUntil: 'load', timeout: 15000 });
        await page.waitForTimeout(250);
        overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      } catch (e) { overflow = 'ERR'; }
      if (overflow !== 0) rows.push(`${String(w).padStart(4)}px  ${p.padEnd(30)} overflow=${overflow}`);
    }
  }
  await browser.close();
  console.log(rows.length ? rows.join('\n') : 'ALL CLEAN — no overflow at any tested width/page');
})();
