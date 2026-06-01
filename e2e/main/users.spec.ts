import { test, expect } from '@playwright/test';

import { baseUrl } from 'e2e/constants';

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/users`);
});

test('Show Users', async ({ page }) => {
  await expect(page).toHaveTitle(/Users/);
  await expect(page.getByRole('heading', { name: /Users/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add User' })).toBeVisible();
});

test('Be able to go to Add User Page', async ({ page }) => {
  await page.getByRole('button', { name: 'Add User' }).click();
  await expect(page.getByRole('heading', { name: 'New User' })).toBeVisible();
});

test('Be able to go to Edit User Page', async ({ page }) => {
  await page.getByRole('button', { name: 'more' }).nth(0).click();
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
});

test('Be able to go to Detail User Page', async ({ page }) => {
  await page.getByRole('button', { name: 'more' }).nth(0).click();
  await expect(page.getByRole('menuitem', { name: 'Detail' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Detail' }).click();
  await expect(
    page.getByRole('heading', { name: 'User Detail' }),
  ).toBeVisible();
});
