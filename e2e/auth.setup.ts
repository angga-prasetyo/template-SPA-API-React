import { test as setup } from '@playwright/test';

import { APIEndpointsAuth } from '@/constants/api-endpoints/auth';
import { ctLocalStorageKey } from '@/constants/localStorage';
import { FormFields } from '@/pages/auth/login/constant';

import { baseUrl, trueCredentials } from './constants';

setup(
  'Save Access Token as Cookies for Access Main Page',
  async ({ request, page }) => {
    const response = await request.post(APIEndpointsAuth.LOGIN, {
      data: {
        [FormFields.EMAIL]: trueCredentials.email,
        [FormFields.PASSWORD]: trueCredentials.password,
      },
    });

    const { access_token, refresh_token } = await response.json();

    await page.goto(baseUrl);

    await page.context().addCookies([
      {
        name: ctLocalStorageKey.cookies.accessToken,
        value: access_token,
        domain: 'localhost',
        path: '/',
      },
      {
        name: ctLocalStorageKey.cookies.refreshToken,
        value: refresh_token,
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page
      .context()
      .storageState({ path: 'playwright/.auth/session.json' });
  },
);
