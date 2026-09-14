const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  // mobile: uniform image boxes + border applied
  for (const w of [390, 768]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/services', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.waitForTimeout(300);
    const info = await page.$$eval('.gmod', els => els.map(e => {
      const fig = e.querySelector('.gmod__media .img-ph__wrap');
      const f = e.querySelector('.gmod__media figure');
      const cs = getComputedStyle(f);
      return { box: Math.round(fig.getBoundingClientRect().width) + 'x' + Math.round(fig.getBoundingClientRect().height), border: cs.borderTopWidth + ' ' + cs.borderTopColor, cols: getComputedStyle(e).gridTemplateColumns };
    }));
    console.log(`@${w}`, JSON.stringify(info));
    await ctx.close();
  }

  // homepage guarantees: images unchanged + grid intact
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.evaluate(() => document.querySelector('.guarantee').scrollIntoView({ block: 'center' }));
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.guarantee__img img')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await page.waitForTimeout(600);
    const g = await page.$$eval('.guarantee__item', els => els.map(e => ({
      t: e.querySelector('h4').textContent, b: e.querySelector('p').textContent,
      img: e.querySelector('img').getAttribute('src'),
      box: Math.round(e.querySelector('.img-ph__wrap').getBoundingClientRect().width) + 'x' + Math.round(e.querySelector('.img-ph__wrap').getBoundingClientRect().height),
    })));
    g.forEach(x => console.log('HOME', JSON.stringify(x)));
    const sec = await page.$('.guarantee');
    await sec.screenshot({ path: 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\guar_home_1280.png' });
    // all homepage images to detect in-page repeats
    const all = await page.$$eval('img[src^="/img/"]', els => els.map(e => e.getAttribute('src')));
    const dup = all.filter((v, i) => all.indexOf(v) !== i);
    console.log('homepage repeated image srcs:', JSON.stringify([...new Set(dup)]));
    console.log('shot guar_home_1280');
    await ctx.close();
  }

  await browser.close();
})();
