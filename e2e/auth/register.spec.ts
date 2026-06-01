import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const url = 'http://localhost:3000/register';
  await page.goto(url);
});

test('Show Register Page for Newcomer', async ({ page }) => {
  await expect(page).toHaveTitle(/Register/);
  await expect(page.getByRole('heading', { name: /Register/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Password', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: /confirm password/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Forgot Password' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Be able to Go to Forgot Password', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot Password' }).click();
  await expect(page).toHaveTitle(/Forgot Password/);
});

test('Be able to Go to Login', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveTitle(/Login/);
});
