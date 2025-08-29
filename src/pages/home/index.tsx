import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components';
import { CTLayoutDashboardLoader } from '@/layouts/dashboard';

const HomePage = lazy(() => import('./page'));

export const Home = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <HomePage />
      </Suspense>
    </CTErrorBoundary>
  );
};
