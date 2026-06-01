import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutAuthLoader } from '@/layouts/auth/loader';

const ForgotPasswordPage = lazy(() => import('./page'));

export const ForgotPassword = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutAuthLoader />}>
        <ForgotPasswordPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
