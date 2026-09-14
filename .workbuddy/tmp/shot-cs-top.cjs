const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/case-studies/', { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + 'cs_full.png', fullPage: true });

  // 定位卡片在页面中的位置
  const box = await page.evaluate(() => {
    const el = document.querySelector('.ccard');
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height, imgH: el.querySelector('.img-ph').getBoundingClientRect().height };
  });
  console.log('card:', JSON.stringify(box));
  await page.screenshot({ path: OUT + 'cs_cardtop.png', clip: { x: 0, y: box.top - 60, width: 1280, height: 320 } });
  await browser.close();
})();
