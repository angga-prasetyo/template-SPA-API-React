import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutDashboardLoader } from '@/layouts/dashboard/loader';

const UsersFormPage = lazy(() => import('./page'));

export const UsersForm = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <UsersFormPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
