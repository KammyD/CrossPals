const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';

const boxes = (page, sel) => page.$$eval(sel, els => els.map(e => {
  const r = e.querySelector('.img-ph__wrap').getBoundingClientRect();
  return Math.round(r.width) + 'x' + Math.round(r.height);
}));

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const pages = ['/', '/services', '/about', '/contact', '/blog', '/case-studies', '/es/', '/es/services', '/es/about', '/es/blog', '/es/case-studies', '/es/contact'];
  let bad = 0;
  for (const p of pages) {
    for (const w of [320, 360, 390, 430, 640, 768, 1024, 1280]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(BASE + p, { waitUntil: 'load', timeout: 30000 });
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
      await page.waitForTimeout(120);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (ov !== 0) { console.log(`!! ${p} @${w} overflow=${ov}`); bad++; }
      await ctx.close();
    }
  }
  console.log(bad === 0 ? 'ALL PAGES CLEAN — no horizontal overflow' : `${bad} overflowing cases`);

  // services modules uniform at mobile + desktop
  for (const w of [1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/services', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.waitForTimeout(200);
    const b = await boxes(page, '.gmod');
    console.log(`SERVICES modules @${w}`, JSON.stringify(b), 'uniform=' + (new Set(b).size === 1));
    await ctx.close();
  }
  // es guarantee grid still uniform
  for (const w of [1280, 768, 430]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/es/services', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.waitForTimeout(200);
    const b = await boxes(page, '.guarantee__item');
    console.log(`ES guarantee grid @${w}`, JSON.stringify(b), 'uniform=' + (new Set(b).size === 1));
    await ctx.close();
  }
  await browser.close();
})();
