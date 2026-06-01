import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';

import { CTLayoutAuthLoader } from './loader';
import type { CTLayoutAuthProps } from './type';

const CTLayoutAuthComponent = lazy(() => import('./component'));

export const CTLayoutAuth: React.FC<CTLayoutAuthProps> = (props) => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutAuthLoader />}>
        <CTLayoutAuthComponent {...props} />
      </Suspense>
    </CTErrorBoundary>
  );
};
