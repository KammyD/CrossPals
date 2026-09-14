const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  for (const [path, sel, name, w] of [
    ['/', 'section:has(.guarantee)', 'guar_home_1280', 1280],
    ['/', '.guarantee', 'guar_home_grid_1280', 1280],
    ['/services', '.gmod:nth-of-type(2)', 'gmod2_qc_1280', 1280],
  ]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
      await document.fonts.ready;
    });
    await page.waitForTimeout(1800);
    const loaded = await page.$$eval('img', els => els.filter(i => i.naturalWidth > 0).length + '/' + els.length);
    const el = await page.$(sel);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: OUT + name + '.png' });
    const fs = require('fs');
    console.log(`${name}: imgs=${loaded} bytes=${fs.statSync(OUT + name + '.png').size}`);
    await ctx.close();
  }

  // mobile services module
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/services', { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach(i => { i.loading = 'eager'; i.src = i.src; });
      await Promise.all(imgs.map(i => i.complete && i.naturalWidth ? null : new Promise(r => { i.onload = r; i.onerror = r; })));
    });
    await page.waitForTimeout(1200);
    const el = await page.$('.gmod:nth-of-type(2)');
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: OUT + 'gmod2_qc_390.png' });
    console.log('gmod2_qc_390 bytes=' + require('fs').statSync(OUT + 'gmod2_qc_390.png').size);
    await ctx.close();
  }

  await browser.close();
})();
