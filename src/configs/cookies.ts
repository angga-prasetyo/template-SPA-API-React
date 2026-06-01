import dayjs from 'dayjs';
import type { CookieSetOptions } from 'universal-cookie';

import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';

export const configCookiesOptions: CookieSetOptions = {
  expires: dayjs().add(30, 'days').toDate(), // * Adjust how many days the token will be expired by discussing with BE
  path: UIEndpointsCommon.HOME,
};
