const { chromium } = require('playwright-core');
const fs = require('fs');

const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots';
const widths = [390, 768, 1280];
const pages = [
  '/', '/services', '/about', '/contact', '/blog',
  '/blog/find-suppliers-1688', '/privacy', '/terms',
  '/es/', '/es/services', '/es/contact', '/es/blog'
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  let report = [];
  for (const w of widths) {
    for (const p of pages) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 820 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      let err = '';
      try {
        await page.goto(BASE + p, { waitUntil: 'load', timeout: 20000 });
        await page.waitForTimeout(500);
      } catch (e) { err = e.message.split('\n')[0]; }
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      }).catch(() => '?');
      const name = `shot_${w}_${p.replace(/\//g, '_') || 'root'}.png`;
      try { await page.screenshot({ path: OUT + '\\' + name, fullPage: true }); } catch (e) { err += ' shot:' + e.message; }
      report.push(`${w}px  ${p.padEnd(28)} overflow=${String(overflow).padStart(5)}  ${err ? 'ERR:' + err : ''}`);
      await ctx.close();
    }
  }
  await browser.close();
  console.log(report.join('\n'));
})();
