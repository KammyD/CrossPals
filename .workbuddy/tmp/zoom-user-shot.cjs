const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SRC = 'file:///C:/Users/Lenovo/.workbuddy/clipboard-images/clipboard-2026-09-14T06-39-10-810Z-5d9b308c.png';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1086 * 3, height: 240 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.setContent(`<html><body style="margin:0;background:#fff"><img src="${SRC}" style="width:${1086 * 3}px;display:block;image-rendering:pixelated"></body></html>`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + 'usr_top_zoom.png', clip: { x: 0, y: 0, width: 1086 * 3, height: 240 } });
  await browser.close();
  console.log('ok');
})();
