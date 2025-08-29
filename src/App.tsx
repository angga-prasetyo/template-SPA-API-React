import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { antdTheme } from '@/configs';
import { router } from '@/routes';

import { useComponentStore } from './stores';

function App() {
  const { isDarkMode } = useComponentStore((state) => state);
  return (
    <HelmetProvider>
      <ConfigProvider theme={antdTheme(isDarkMode)}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
