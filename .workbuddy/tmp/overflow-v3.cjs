const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';
const widths = [320, 360, 390, 430, 640, 768];
const pages = [
  '/', '/services', '/about', '/contact', '/blog', '/case-studies',
  '/blog/avoid-fba-rejections', '/blog/read-inspection-report', '/blog/1688-vs-alibaba', '/blog/get-fba-ready',
  '/case-studies/kitchen-defects-caught', '/case-studies/first-private-label-zero-rejections',
  '/case-studies/supplier-vanished-deposit', '/case-studies/fba-shipment-relabelled',
  '/es/', '/es/blog', '/es/case-studies',
  '/es/case-studies/kitchen-defects-caught', '/es/case-studies/fba-shipment-relabelled'
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  let bad = 0, checks = 0;
  for (const p of pages) {
    for (const w of widths) {
      checks++;
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      try {
        await page.goto(BASE + p, { waitUntil: 'load', timeout: 20000 });
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(450);
        const res = await page.evaluate((vw) => {
          const off = [];
          document.querySelectorAll('body *').forEach(el => {
            if (el.closest('.ticker')) return;
            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') return;
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) return;
            if (r.right > vw + 1.5 || r.left < -1.5) {
              const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
              off.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} [${Math.round(r.left)}..${Math.round(r.right)}]`);
            }
          });
          return { total: document.documentElement.scrollWidth - vw, off: [...new Set(off)].slice(0, 6) };
        }, w);
        if (res.total !== 0) { bad++; console.log(`${String(w).padStart(4)}px ${p.padEnd(52)} total=${res.total} :: ${res.off.join(' | ')}`); }
      } catch (e) { bad++; console.log(`${String(w).padStart(4)}px ${p.padEnd(52)} ERR ${e.message.split('\n')[0]}`); }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(`\n${checks} checks — ` + (bad ? `${bad} problem(s)` : 'ALL CLEAN — no horizontal overflow anywhere'));
})();
