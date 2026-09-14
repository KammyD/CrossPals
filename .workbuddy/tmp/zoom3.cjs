const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SRC = 'file:///C:/Users/Lenovo/.workbuddy/clipboard-images/clipboard-2026-09-14T06-39-10-810Z-5d9b308c.png';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1087, height: 559 }, deviceScaleFactor: 4 });
  const page = await ctx.newPage();
  await page.goto(SRC, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + 'zoom_gap.png', clip: { x: 480, y: 0, width: 260, height: 26 } });
  await page.screenshot({ path: OUT + 'zoom_right.png', clip: { x: 540, y: 0, width: 520, height: 26 } });
  await browser.close();
  console.log('ok');
})();
