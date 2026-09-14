const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const jobs = [
    { url: '/case-studies/', w: 1000, name: 'hdr_scrolled_cs_1000' },
    { url: '/case-studies/', w: 1440, name: 'hdr_scrolled_cs_1440' },
    { url: '/', w: 1440, name: 'hdr_scrolled_home_1440' },
  ];
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w, height: 700 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + j.url, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(400);
    // 向下滚过一屏再回滚一点，触发 --hdr--solid（顶栏浮在白色内容上）
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(700);
    const cls = await page.evaluate(() => document.querySelector('.hdr').className);
    console.log(j.name, '|', cls);
    await page.screenshot({ path: OUT + j.name + '.png', clip: { x: 0, y: 0, width: j.w, height: 96 } });
    await ctx.close();
  }
  await browser.close();
})();
