const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';
const jobs = [
  ['/', 1280, 'final_home_1280'],
  ['/services', 1280, 'final_services_1280'],
  ['/about', 1280, 'final_about_1280'],
  ['/case-studies', 1280, 'final_cases_1280'],
  ['/blog', 1280, 'final_blog_1280'],
  ['/', 390, 'final_home_390'],
  ['/about', 390, 'final_about_390'],
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const [path, w, name] of jobs) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 25000 });
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: OUT + name + '.png', fullPage: true });
    console.log('shot', name);
    await ctx.close();
  }
  await browser.close();
  console.log('done');
})();
