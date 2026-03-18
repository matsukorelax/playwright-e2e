import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from "node:fs";
dotenv.config();

test('正常ログイン: ログイン完了までのHARを取得する', async ({ page }) => {
    await page.goto('/');

    fs.mkdirSync

    await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
    await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);
    await page.click('#login-button');

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
});
