const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const widths = [320, 360, 375, 390, 414, 430];
const pages = ['/about', '/', '/services', '/case-studies'];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  let bad = 0;
  for (const p of pages) {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(BASE + p, { waitUntil: 'load', timeout: 20000 });
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(350);
      const res = await page.evaluate((vw) => {
        const off = [];
        document.querySelectorAll('body *').forEach(el => {
          if (el.closest('.ticker') || el.classList.contains('skiplink')) return;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) return;
          if (r.right > vw + 1.5) {
            const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
            off.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}[..${Math.round(r.right)}]`);
          }
        });
        return { total: document.documentElement.scrollWidth - vw, off: [...new Set(off)].slice(0, 5) };
      }, w);
      if (res.total !== 0) { bad++; console.log(`${w}px ${p} total=${res.total} :: ${res.off.join(' | ')}`); }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(bad ? `${bad} problem(s)` : 'CLEAN — no right-edge overflow');
})();
