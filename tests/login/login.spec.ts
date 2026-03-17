import { test, expect } from '@playwright/test';
                                                                                                                     
  test('正常ログイン: 有効なユーザーでログインし inventory ページへ遷移する', async ({ browser }) => {                   const context = await browser.newContext({                                                                       
      recordHar: { path: 'test-results/login.har' }                                                                  
    });                                                                                                                  const page = await context.newPage(); 
                                                                                                                     
    await page.goto('/');                                                                                                await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
    await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);                                                   
    await page.click('#login-button');
         
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();                                                     
                                                                                                                     
    await context.close();                                                                                           
  }); 