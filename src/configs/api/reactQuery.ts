import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

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
    ...otherOptions,
  });
};
