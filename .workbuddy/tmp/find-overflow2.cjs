const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 820 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8088/', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const res = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('.ticker')) return;            // ticker is intentionally wide but clipped
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 50),
          right: Math.round(r.right), w: Math.round(r.width),
          overflow: cs.overflowX || cs.overflow
        });
      }
    });
    // keep the widest/rightmost few, unique by class
    out.sort((a, b) => b.right - a.right);
    return { vw, maxRight: out.length ? out[0].right : null, items: out.slice(0, 15) };
  });
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})();
