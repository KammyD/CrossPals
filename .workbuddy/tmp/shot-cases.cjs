const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

const shots = [
  { url: '/case-studies/',                              w: 1280, name: 'cases_list_1280' },
  { url: '/case-studies/',                              w: 390,  name: 'cases_list_390'  },
  { url: '/case-studies/kitchen-defects-caught/',       w: 1280, name: 'case_detail_1280' },
  { url: '/case-studies/kitchen-defects-caught/',       w: 390,  name: 'case_detail_390'  },
  { url: '/es/case-studies/',                           w: 1280, name: 'cases_list_es_1280' },
  { url: '/blog/avoid-fba-rejections/',                 w: 1280, name: 'blog_detail_1280' },
];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: { width: s.w, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + s.url, { waitUntil: 'load', timeout: 20000 });
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    await page.screenshot({ path: OUT + s.name + '.png', fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(`${s.name.padEnd(22)} ${s.w}px  page-height=${h}`);
    await ctx.close();
  }
  await browser.close();
})();
