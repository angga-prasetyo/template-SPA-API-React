import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components';

import CTLayoutDashboardLoader from './loader';
import type { CTLayoutDashboardProps } from './type';

const CTLayoutDashboardComponent = lazy(() => import('./component'));

const CTLayoutDashboard: React.FC<CTLayoutDashboardProps> = (props) => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <CTLayoutDashboardComponent {...props} />
      </Suspense>
    </CTErrorBoundary>
  );
};

export { CTLayoutDashboard, CTLayoutDashboardProps, CTLayoutDashboardLoader };
