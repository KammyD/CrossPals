const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });

  // A) 顶栏：页面顶部 + 滚动后
  for (const w of [1920, 1440, 1000, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 700 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: OUT + `new_hdr_top_${w}.png`, clip: { x: 0, y: 0, width: w, height: 92 } });
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(700);
    await page.screenshot({ path: OUT + `new_hdr_scrolled_${w}.png`, clip: { x: 0, y: 0, width: w, height: 92 } });
    await ctx.close();
  }

  // B) 案例卡头部：两列宽度
  const ctx = await browser.newContext({ viewport: { width: 990, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/case-studies/', { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const box = await page.evaluate(() => {
    const el = document.querySelectorAll('.ccard')[1];
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), cols: getComputedStyle(document.querySelector('.cases')).gridTemplateColumns };
  });
  console.log('cols@990:', box.cols);
  await page.screenshot({ path: OUT + 'new_cards_990.png', clip: { x: 0, y: box.top - 40, width: 990, height: 340 } });
  await ctx.close();
  await browser.close();
  console.log('done');
})();
