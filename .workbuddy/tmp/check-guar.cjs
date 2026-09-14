const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  // overflow audit on the two changed pages
  for (const path of ['/', '/services']) {
    for (const w of [320, 360, 375, 390, 414, 430, 480, 640, 768, 900, 960, 1280]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
      await page.waitForTimeout(200);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      console.log(`${path} @${w}  overflow=${ov}`);
      await ctx.close();
    }
  }

  // structural check of the guarantee modules
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/services#guarantees', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.evaluate(() => document.querySelector('#guarantees').scrollIntoView());
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.gmod__media img')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await page.waitForTimeout(600);
    const mods = await page.$$eval('.gmod', els => els.map(e => {
      const fig = e.querySelector('.gmod__media .img-ph__wrap');
      const img = e.querySelector('.gmod__media img');
      return {
        title: e.querySelector('h3').textContent,
        imgSrc: img.getAttribute('src'),
        natural: img.naturalWidth + 'x' + img.naturalHeight,
        imgBox: Math.round(fig.getBoundingClientRect().width) + 'x' + Math.round(fig.getBoundingClientRect().height),
        steps: e.querySelectorAll('.gmod__steps li').length,
        checks: e.querySelectorAll('.gmod__checks li').length,
        fail: e.querySelector('.gmod__fail-tag').textContent,
        cols: getComputedStyle(e).gridTemplateColumns,
      };
    }));
    mods.forEach(m => console.log(JSON.stringify(m)));
    const sec = await page.$('#guarantees');
    await sec.screenshot({ path: OUT + 'guarantees_1280.png' });
    console.log('shot guarantees_1280');
    await ctx.close();

    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const p2 = await ctx2.newPage();
    await p2.goto(BASE + '/services#guarantees', { waitUntil: 'load', timeout: 30000 });
    await p2.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await p2.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.gmod__media img')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await p2.waitForTimeout(600);
    const sec2 = await p2.$('#guarantees');
    await sec2.screenshot({ path: OUT + 'guarantees_390.png' });
    console.log('shot guarantees_390');
    await ctx2.close();
  }

  await browser.close();
})();
