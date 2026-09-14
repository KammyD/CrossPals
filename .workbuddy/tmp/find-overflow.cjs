const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 820 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8088/', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const offenders = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 60),
          left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width)
        });
      }
    });
    // de-dup by class+right, keep widest
    return out.slice(0, 25);
  });
  console.log('viewport', 390);
  console.log(JSON.stringify(offenders, null, 1));
  await browser.close();
})();
