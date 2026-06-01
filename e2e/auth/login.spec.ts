import { test, expect, Locator } from '@playwright/test';

import { APIEndpointsAuth } from '@/constants/api-endpoints/auth';
import { FormFields } from '@/pages/auth/login/constant';

import { baseUrl, falsyCredentials, trueCredentials } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('Show Login Page for Newcomer', async ({ page }) => {
  await expect(page).toHaveTitle(/Login/);
  await expect(page.getByRole('heading', { name: /Login/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Forgot Password' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

test('Be able to Go to Forgot Password', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot Password' }).click();
  await expect(page).toHaveTitle(/Forgot Password/);
});

test('Be able to Go to Register', async ({ page }) => {
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveTitle(/Register/);
});

test.describe('Login Form Input', () => {
  let loginBtn: Locator;
  let emailInputForm: Locator;
  let invalidEmailErrorMesssage: Locator;
  let blankEmailErrorMesssage: Locator;
  let passwordInputForm: Locator;
  let blankPasswordErrorMesssage: Locator;
  let notMatchedErrorMessage: Locator;

  test.beforeEach(async ({ page }) => {
    loginBtn = page.getByRole('button', { name: 'Login' });
    emailInputForm = page.getByRole('textbox', { name: FormFields.EMAIL });
    invalidEmailErrorMesssage = page.getByText(/Email is not valid/);
    blankEmailErrorMesssage = page.getByText(/Please insert your email/);

    passwordInputForm = page.getByRole('textbox', {
      name: FormFields.PASSWORD,
    });
    blankPasswordErrorMesssage = page.getByText(/Please insert your password/);
    notMatchedErrorMessage = page.getByText(/Email and Password don't match/);
  });

  test('show email and password error message when user not input any', async () => {
    await loginBtn.click();
    await expect(blankEmailErrorMesssage).toBeVisible();
    await expect(blankPasswordErrorMesssage).toBeVisible();
  });

  test('show password error message when user only input email', async () => {
    await emailInputForm.click();
    await expect(emailInputForm).toBeFocused();
    await emailInputForm.fill(falsyCredentials.email);
    await loginBtn.click();
    await expect(blankPasswordErrorMesssage).toBeVisible();
  });

  test('show email error message when user only input password', async () => {
    await passwordInputForm.click();
    await expect(passwordInputForm).toBeFocused();
    await passwordInputForm.fill(falsyCredentials.password);
    await loginBtn.click();
    await expect(blankEmailErrorMesssage).toBeVisible();
  });

  test('show email error message when user input email with invalid format', async () => {
    await emailInputForm.click();
    await expect(emailInputForm).toBeFocused();
    await emailInputForm.fill(falsyCredentials.invalidEmail);
    await passwordInputForm.click();
    await expect(passwordInputForm).toBeFocused();
    await passwordInputForm.fill(falsyCredentials.password);
    await loginBtn.click();
    await expect(invalidEmailErrorMesssage).toBeVisible();
  });

  test('show error message when user input wrong email or password', async ({
    request,
  }) => {
    await emailInputForm.click();
    await expect(emailInputForm).toBeFocused();
    await emailInputForm.fill(falsyCredentials.email);
    await passwordInputForm.click();
    await expect(passwordInputForm).toBeFocused();
    await passwordInputForm.fill(falsyCredentials.password);
    await loginBtn.click();
    await expect(notMatchedErrorMessage).toBeVisible();

    // API Call Test
    const response = await request.post(APIEndpointsAuth.LOGIN, {
      data: {
        [FormFields.EMAIL]: falsyCredentials.email,
        [FormFields.PASSWORD]: falsyCredentials.password,
      },
    });
    expect(await response.json()).toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });

  test('go to homepage if valid credentials', async ({ page, request }) => {
    await emailInputForm.click();
    await expect(emailInputForm).toBeFocused();
    await emailInputForm.fill(trueCredentials.email);
    await passwordInputForm.click();
    await expect(passwordInputForm).toBeFocused();
    await passwordInputForm.fill(trueCredentials.password);
    await loginBtn.click();
    await expect(page).toHaveTitle(/Home/);
    await expect(page.getByRole('heading', { name: /Homepage/ })).toBeVisible();

    // API Call Test
    const response = await request.post(APIEndpointsAuth.LOGIN, {
      data: {
        [FormFields.EMAIL]: trueCredentials.email,
        [FormFields.PASSWORD]: trueCredentials.password,
      },
    });

    const responseJson = await response.json();
    expect(Object.keys(responseJson)).toMatchObject([
      'access_token',
      'refresh_token',
    ]);
    expect(await response.status()).toBe(201);
  });
});
