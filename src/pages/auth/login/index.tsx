import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutAuthLoader } from '@/layouts/auth/loader';

const LoginPage = lazy(() => import('./page'));

export const Login = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutAuthLoader />}>
        <LoginPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
