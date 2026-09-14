const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = 'D:\\NetSpace\\Websit\\web-crosspals.com-v4\\.workbuddy\\tmp\\shots';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args:['--no-sandbox','--disable-gpu'] });
  // 1) element shots: why section after fix
  const ctx = await b.newContext({ viewport:{width:390,height:820} });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8088/', { waitUntil:'load' }); await page.waitForTimeout(500);
  let el = await page.$('.why'); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await el.screenshot({ path: OUT+'\\after_why390.png' });
  await page.goto('http://localhost:8088/es/', { waitUntil:'load' }); await page.waitForTimeout(500);
  el = await page.$('.why'); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await el.screenshot({ path: OUT+'\\after_why390_es.png' });
  await page.goto('http://localhost:8088/', { waitUntil:'load' }); await page.waitForTimeout(500);
  await page.screenshot({ path: OUT+'\\after_home_full390.png', fullPage:true });
  await ctx.close();
  // 2) top-viewport shots for contact sheet
  const pages = [['/','home'],['/services','services'],['/about','about'],['/contact','contact'],['/blog','blog'],['/blog/find-suppliers-1688','article'],['/es/','es']];
  for (const [p,name] of pages) {
    const c = await b.newContext({ viewport:{width:390,height:820} });
    const pg = await c.newPage();
    await pg.goto('http://localhost:8088'+p, { waitUntil:'load' }); await pg.waitForTimeout(600);
    await pg.screenshot({ path: OUT+'\\top_'+name+'.png' });
    await c.close();
  }
  await b.close(); console.log('done');
})();
