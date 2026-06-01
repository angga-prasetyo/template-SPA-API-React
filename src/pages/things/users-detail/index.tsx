import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutDashboardLoader } from '@/layouts/dashboard/loader';

const UsersDetailPage = lazy(() => import('./page'));

export const UsersDetail = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <UsersDetailPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
