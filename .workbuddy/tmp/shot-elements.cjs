const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots';
const jobs = [
  { url: '/', el: '.why', name: 'why390' },
  { url: '/', el: '.svc', name: 'svc390' },
  { url: '/', el: '.hero', name: 'hero390' },
  { url: '/services', el: '.svcs', name: 'svcs390' },
  { url: '/about', el: '.about-grid', name: 'aboutgrid390' },
];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-gpu'] });
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 820 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:8088' + j.url, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const el = await page.$(j.el);
    if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await el.screenshot({ path: OUT + '\\el_' + j.name + '.png' }); }
    const box = el ? await el.boundingBox() : null;
    console.log(j.name, JSON.stringify(box));
    await ctx.close();
  }
  await browser.close();
})();
