const { chromium } = require('C:\\Users\\Lenovo\\.workbuddy\\binaries\\node\\workspace\\node_modules\\playwright-core');
const EXE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args:['--no-sandbox','--disable-gpu'] });
  for (const w of [1280, 1440, 390, 360]) {
    const ctx = await b.newContext({ viewport:{width:w,height:900} });
    const page = await ctx.newPage();
    await page.goto('http://localhost:8088/', { waitUntil:'load' }); await page.waitForTimeout(300);
    const cols = await page.evaluate(() => {
      const g = document.querySelector('.why__grid');
      return getComputedStyle(g).gridTemplateColumns;
    });
    console.log(`${String(w).padStart(4)}px  .why__grid columns = ${cols}`);
    await ctx.close();
  }
  await b.close();
})();
