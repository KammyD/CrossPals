const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const P = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1040, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file:///' + P.replace(/\\/g, '/') + 'compare.html', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log('height', h);
  await page.setViewportSize({ width: 1040, height: Math.min(h, 4000) });
  await page.waitForTimeout(400);
  await page.screenshot({ path: P + 'before-after.png', fullPage: true });
  await browser.close();
  console.log('ok');
})();
