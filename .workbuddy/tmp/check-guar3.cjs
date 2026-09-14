const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

const measure = async (page, sel) => page.$$eval(sel, els => els.map(e => {
  const w = e.querySelector('.img-ph__wrap');
  const r = w.getBoundingClientRect();
  return Math.round(r.width) + 'x' + Math.round(r.height);
}));

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  // 1) homepage guarantee image sizes at several widths
  for (const w of [1280, 1024, 820, 620, 430, 320]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.waitForTimeout(200);
    const sizes = await measure(page, '.guarantee__item');
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const uniq = [...new Set(sizes)];
    console.log(`HOME @${w} boxes=${JSON.stringify(sizes)} uniform=${uniq.length === 1} overflow=${ov}`);
    await ctx.close();
  }

  // 2) full-page overflow + shots
  for (const [path, w, name] of [['/', 1280, 'guar_home_1280'], ['/services', 1280, 'guarantees_1280'], ['/services', 390, 'guarantees_390']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img[src^="/img/"]')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await page.waitForTimeout(600);
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const target = path === '/' ? '.guarantee' : '#guarantees';
    const el = await page.$(target);
    await el.screenshot({ path: OUT + name + '.png' });
    console.log(`shot ${name} (overflow=${ov})`);
    await ctx.close();
  }

  await browser.close();
})();
