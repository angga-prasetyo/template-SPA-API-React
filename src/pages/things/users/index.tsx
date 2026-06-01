import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutDashboardLoader } from '@/layouts/dashboard/loader';

const UsersPage = lazy(() => import('./page'));

export const Users = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <UsersPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
