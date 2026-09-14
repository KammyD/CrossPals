const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const widths = [320, 360, 375, 390, 414, 430, 540, 640, 768];
const pages = [
  '/', '/services/', '/about/', '/contact/', '/blog/', '/privacy/', '/terms/', '/404/',
  '/case-studies/',
  '/blog/avoid-fba-rejections/', '/blog/read-inspection-report/', '/blog/1688-vs-alibaba/', '/blog/get-fba-ready/',
  '/case-studies/kitchen-defects-caught/', '/case-studies/first-private-label-zero-rejections/',
  '/case-studies/supplier-vanished-deposit/', '/case-studies/fba-shipment-relabelled/',
  '/es/', '/es/services/', '/es/about/', '/es/contact/', '/es/blog/', '/es/privacy/', '/es/terms/',
  '/es/case-studies/',
  '/es/blog/avoid-fba-rejections/', '/es/blog/read-inspection-report/', '/es/blog/1688-vs-alibaba/', '/es/blog/get-fba-ready/',
  '/es/case-studies/kitchen-defects-caught/', '/es/case-studies/first-private-label-zero-rejections/',
  '/es/case-studies/supplier-vanished-deposit/', '/es/case-studies/fba-shipment-relabelled/',
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const rows = [];
  let n = 0;
  for (const w of widths) {
    for (const p of pages) {
      await page.setViewportSize({ width: w, height: 800 });
      let overflow = '?';
      try {
        await page.goto(BASE + p, { waitUntil: 'load', timeout: 15000 });
        await page.waitForTimeout(200);
        overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      } catch (e) { overflow = 'ERR'; }
      n++;
      if (overflow !== 0) rows.push(`${String(w).padStart(4)}px  ${p.padEnd(46)} overflow=${overflow}`);
    }
  }
  await browser.close();
  console.log(`checked ${n} combos (${pages.length} pages x ${widths.length} widths)`);
  console.log(rows.length ? rows.join('\n') : 'ALL CLEAN — no overflow at any tested width/page');
})();
