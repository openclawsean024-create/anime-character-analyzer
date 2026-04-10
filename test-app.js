const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  
  const results = {};
  
  // Capture console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 1. Test homepage - verify 10+ default anime analyzers
  console.log('=== Testing Homepage ===');
  await page.goto('https://anime-character-analyzer.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Check analyzer cards are present
  const analyzerCards = await page.locator('.analyzer-card').count();
  console.log(`Analyzer cards found: ${analyzerCards}`);
  results.analyzerCards = analyzerCards;
  
  // Take screenshot of homepage
  await page.screenshot({ path: '/home/sean/.openclaw/workspace/workspaces/alan/repos/anime-character-analyzer/screenshots/01-homepage.png', fullPage: false });
  console.log('Screenshot: 01-homepage.png');
  
  // 2. Test analysis flow
  console.log('\n=== Testing Analysis Flow ===');
  const firstAnalyzer = page.locator('.analyzer-card').first();
  await firstAnalyzer.click();
  await page.waitForTimeout(500);
  
  await page.fill('.name-input', '小明');
  await page.click('.btn-accent');
  await page.waitForTimeout(2000);
  
  const resultCard = await page.locator('.result-card').count();
  console.log(`Result cards found: ${resultCard}`);
  results.resultCard = resultCard;
  
  await page.screenshot({ path: '/home/sean/.openclaw/workspace/workspaces/alan/repos/anime-character-analyzer/screenshots/02-analysis-result.png', fullPage: false });
  console.log('Screenshot: 02-analysis-result.png');
  
  // 3. Test create tab
  console.log('\n=== Testing Create Tab ===');
  await page.click('button:has-text("創建")');
  await page.waitForTimeout(500);
  
  await page.fill('input[placeholder*="英雄學園"]', '我的英雄學園');
  await page.fill('input[placeholder*="My Hero"]', 'My Hero Academia');
  
  // Fill character 1
  const charInputs = page.locator('.char-item input[placeholder*="角色名稱"]');
  await charInputs.nth(0).fill('綠谷出久');
  await charInputs.nth(1).fill('爆豪勝己');
  await charInputs.nth(2).fill('麗日御茶子');
  
  await page.click('button:has-text("創建分析器")');
  await page.waitForTimeout(1000);
  
  // Should switch to analyze tab and show the new analyzer
  await page.screenshot({ path: '/home/sean/.openclaw/workspace/workspaces/alan/repos/anime-character-analyzer/screenshots/03-create-success.png', fullPage: false });
  console.log('Screenshot: 03-create-success.png');
  
  const currentUrl = page.url();
  console.log(`After create, URL: ${currentUrl}`);
  
  // 4. Test leaderboard tab
  console.log('\n=== Testing Leaderboard Tab ===');
  await page.click('button:has-text("排行榜")');
  await page.waitForTimeout(500);
  
  const lbRows = await page.locator('.lb-row').count();
  console.log(`Leaderboard rows found: ${lbRows}`);
  results.leaderboardRows = lbRows;
  
  // Check for use count and date
  const lbStats = await page.locator('.lb-stat').allTextContents();
  console.log(`Leaderboard stats (first 5): ${lbStats.slice(0, 5).join(', ')}`);
  
  const lbMetas = await page.locator('.lb-meta').allTextContents();
  console.log(`Leaderboard meta (first 5): ${lbMetas.slice(0, 5).join(', ')}`);
  
  await page.screenshot({ path: '/home/sean/.openclaw/workspace/workspaces/alan/repos/anime-character-analyzer/screenshots/04-leaderboard.png', fullPage: false });
  console.log('Screenshot: 04-leaderboard.png');
  
  // 5. Test navigation between tabs
  console.log('\n=== Testing Navigation ===');
  await page.click('button:has-text("分析")');
  await page.waitForTimeout(500);
  const analyzeVisible = await page.locator('.hero-section').isVisible();
  console.log(`Analyze tab hero visible: ${analyzeVisible}`);
  
  await page.click('button:has-text("排行榜")');
  await page.waitForTimeout(500);
  const leaderboardVisible = await page.locator('.leaderboard-section').isVisible();
  console.log(`Leaderboard tab section visible: ${leaderboardVisible}`);
  
  // 6. Console errors summary
  console.log(`\n=== Console Errors: ${errors.length} ===`);
  if (errors.length > 0) {
    errors.forEach((e, i) => console.log(`  Error ${i+1}: ${e}`));
  }
  
  console.log('\n=== RESULTS SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));
  
  await browser.close();
})();
