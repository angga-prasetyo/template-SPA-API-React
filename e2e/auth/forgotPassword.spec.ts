import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const url = 'http://localhost:3000/forgot-password';
  await page.goto(url);
});

test('Show Forgot Password Page for Newcomer', async ({ page }) => {
  await expect(page).toHaveTitle(/Forgot Password/);
  await expect(
    page.getByRole('heading', { name: /Forgot Password/ }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Back to Login' }),
  ).toBeVisible();
});

test('Be able to Go to Login', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveTitle(/Login/);
});
