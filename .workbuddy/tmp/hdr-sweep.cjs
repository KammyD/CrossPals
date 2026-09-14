const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots\\';

const widths = [1920, 1600, 1440, 1280, 1180, 1100, 1000, 900, 768, 640, 390];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 600 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(350);
    const g = await page.evaluate(() => {
      const box = (sel) => { const el = document.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || b.width === 0) return 'hidden'; return [Math.round(b.x), Math.round(b.x + b.width)]; };
      const hdr = document.querySelector('.hdr');
      const cs = getComputedStyle(hdr);
      return {
        logo: box('.hdr .logo, .hdr a'),
        nav: box('.hdr__nav'),
        navFirst: box('.hdr__nav a'),
        burger: box('.hdr__burger, .hdr__toggle, .hdr__menu-btn'),
        lang: box('.hdr__lang'),
        cta: box('.hdr__cta, .hdr .btn'),
        wz: cs.getPropertyValue('--hdr-wz').trim(),
        fade: cs.getPropertyValue('--hdr-fade').trim(),
      };
    });
    console.log(String(w).padEnd(6), JSON.stringify(g));
    await page.screenshot({ path: OUT + `hdrw_${w}.png`, clip: { x: 0, y: 0, width: w, height: 92 } });
    await ctx.close();
  }
  await browser.close();
})();
