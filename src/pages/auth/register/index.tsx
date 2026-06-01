import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutAuthLoader } from '@/layouts/auth/loader';

const RegisterPage = lazy(() => import('./page'));

export const Register = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutAuthLoader />}>
        <RegisterPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
