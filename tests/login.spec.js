import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.custimoo.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('super@custimoo.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Customwear4all2024!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Hey, SuperAdmin' }).click();
});