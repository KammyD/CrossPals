const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const [w, name] of [[1280, 'testi_1280'], [390, 'testi_390']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')); });
    await page.evaluate(() => document.querySelector('section.testi').scrollIntoView({ block: 'center' }));
    // force-load lazy avatars
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.pullquote__avatar, .pq-sm__avatar')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await page.waitForTimeout(700);
    const info = await page.$$eval('.pullquote__avatar, .pq-sm__avatar', els => els.map(e => ({
      src: e.getAttribute('src'), natural: e.naturalWidth + 'x' + e.naturalHeight, loaded: e.complete,
    })));
    console.log(name, JSON.stringify(info));
    const sec = await page.$('section.testi');
    await sec.screenshot({ path: OUT + name + '.png' });
    console.log('shot', name);
    await ctx.close();
  }
  await browser.close();
})();
