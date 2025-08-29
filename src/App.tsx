import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { antdTheme, queryClient } from '@/configs';
import { router } from '@/routes';

import { useComponentStore } from './stores';

function App() {
  const { isDarkMode } = useComponentStore((state) => state);
  return (
    <HelmetProvider>
      <ConfigProvider theme={antdTheme(isDarkMode)}>
        <QueryClientProvider client={queryClient()}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
