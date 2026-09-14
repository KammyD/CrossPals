const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots';
const jobs = [['.masthead','masthead'],['.blog-prev__head','bloghead'],['.guarantee','guarantee']];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args:['--no-sandbox','--disable-gpu'] });
  const ctx = await b.newContext({ viewport:{width:390,height:820} });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8088/', { waitUntil:'load' });
  await page.waitForTimeout(600);
  for (const [sel,name] of jobs) {
    const el = await page.$(sel);
    if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(400); await el.screenshot({ path: OUT+'\\el3_'+name+'.png' }); }
  }
  await b.close(); console.log('done');
})();
