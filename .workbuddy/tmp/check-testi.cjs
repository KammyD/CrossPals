const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  // 1) overflow check on the two homepages
  for (const path of ['/', '/es/']) {
    for (const w of [320, 360, 375, 390, 414, 430, 640, 768, 1280]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(BASE + path, { waitUntil: 'load', timeout: 25000 });
      await page.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')); });
      await page.waitForTimeout(250);
      const m = await page.evaluate(() => ({
        ov: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      console.log(`${path} @${w}  overflow=${m.ov}`);
      await ctx.close();
    }
  }

  // 2) testimonial section: rendered avatar boxes + natural sizes at 1280
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 25000 });
    await page.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')); });
    await page.waitForTimeout(500);
    const info = await page.$$eval('.pullquote__avatar, .pq-sm__avatar', els => els.map(e => ({
      cls: e.className, src: e.getAttribute('src'),
      natural: e.naturalWidth + 'x' + e.naturalHeight,
      box: Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height),
      complete: e.complete,
    })));
    console.log('--- rendered avatars (desktop 1280) ---');
    info.forEach(i => console.log(JSON.stringify(i)));
    const sec = await page.$('section.testi');
    await sec.screenshot({ path: OUT + 'testi_1280.png' });
    console.log('shot testi_1280');
    // mobile variant
    await ctx.close();
    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const p2 = await ctx2.newPage();
    await p2.goto(BASE + '/', { waitUntil: 'load', timeout: 25000 });
    await p2.evaluate(() => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')); });
    await p2.waitForTimeout(500);
    const sec2 = await p2.$('section.testi');
    await sec2.screenshot({ path: OUT + 'testi_390.png' });
    console.log('shot testi_390');
    await ctx2.close();
  }

  await browser.close();
})();
