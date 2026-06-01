import {
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from '@tanstack/react-query';
import Cookies from 'universal-cookie';

import { ctLocalStorageKey } from '@/constants/localStorage';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { removeCredential } from '@/utils/other';

const cookies = new Cookies();

const { accessToken, refreshToken } = ctLocalStorageKey.cookies;

export const queryClient = (queryClientConfig?: QueryClientConfig) => {
  const { defaultOptions = {}, ...otherOptions } = queryClientConfig || {};
  const { queries } = defaultOptions;
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        ...queries,
      },
      ...defaultOptions,
    },
    queryCache: new QueryCache({
      onSettled() {
        if (!cookies.get(accessToken) || !cookies.get(refreshToken)) {
          removeCredential();
          window.location.href = UIEndpointsAuth.LOGIN;
        }
      },
    }),
    ...otherOptions,
  });
};
