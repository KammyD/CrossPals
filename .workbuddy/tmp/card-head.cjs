const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 990, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/case-studies/', { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const box = await page.evaluate(() => {
    const el = document.querySelectorAll('.ccard')[1];
    const r = el.getBoundingClientRect();
    const img = el.querySelector('.img-ph').getBoundingClientRect().height;
    const head = el.querySelector('.ccard__head').getBoundingClientRect();
    const client = el.querySelector('.ccard__client').getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), imgH: Math.round(img), headH: Math.round(head.height), clientTop: Math.round(client.top - head.top), clientH: Math.round(client.height) };
  });
  console.log(JSON.stringify(box));
  await page.screenshot({ path: OUT + 'new_cards_head.png', clip: { x: 0, y: box.top + box.imgH - 20, width: 990, height: 260 } });
  await browser.close();
})();
