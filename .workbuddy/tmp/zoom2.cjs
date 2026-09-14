const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SRC = 'file:///C:/Users/Lenovo/.workbuddy/clipboard-images/clipboard-2026-09-14T06-39-10-810Z-5d9b308c.png';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1086, height: 554 }, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  await page.goto(SRC, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const dim = await page.evaluate(() => { const i = document.querySelector('img'); return i ? i.naturalWidth + 'x' + i.naturalHeight : 'noimg'; });
  console.log('natural:', dim);
  // 左卡顶部 y0-36
  await page.screenshot({ path: OUT + 'zoom_card1top.png', clip: { x: 50, y: 0, width: 500, height: 34 } });
  // 卡片头两行区域
  await page.screenshot({ path: OUT + 'zoom_head.png', clip: { x: 50, y: 20, width: 500, height: 100 } });
  await browser.close();
  console.log('ok');
})();
