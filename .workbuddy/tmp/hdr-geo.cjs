const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const w of [1440, 1024]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 700 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + '/case-studies/', { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(500);
    const geo = await page.evaluate(() => {
      const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
      const hdr = document.querySelector('.hdr');
      const cs = getComputedStyle(hdr);
      return {
        hdrH: r(hdr),
        logo: r(document.querySelector('.hdr a')),
        nav: r(document.querySelector('.hdr__nav')),
        wz: cs.getPropertyValue('--hdr-wz'), fade: cs.getPropertyValue('--hdr-fade'),
        wa: cs.getPropertyValue('--hdr-w-a'), ka: cs.getPropertyValue('--hdr-k-a'),
      };
    });
    console.log(w, JSON.stringify(geo));
    await page.screenshot({ path: OUT + `hdr_${w}.png`, clip: { x: 0, y: 0, width: w, height: 110 } });
    await ctx.close();
  }
  await browser.close();
})();
