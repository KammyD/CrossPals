const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8088';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/case-studies/', { waitUntil: 'load', timeout: 20000 });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const out = [];
    const card = document.querySelector('.ccard');
    const parts = ['.ccard', '.img-ph', '.img-ph__wrap', '.ccard__body', '.ccard__head', '.ccard__n', '.ccard__client'];
    for (const sel of parts) {
      const el = card.querySelector(sel);
      if (!el) { out.push(sel + ' :: (not found)'); continue; }
      const cs = getComputedStyle(el);
      const af = getComputedStyle(el, '::after');
      const bf = getComputedStyle(el, '::before');
      out.push(`${sel} | bg=${cs.backgroundImage} | before=${bf.content}/${bf.backgroundImage} | after=${af.content}/${af.backgroundImage}`);
    }
    // grid: how many columns at this width
    out.push('grid-cols=' + getComputedStyle(document.querySelector('.cases')).gridTemplateColumns);
    return out.join('\n');
  });
  console.log(info);
  await browser.close();
})();
