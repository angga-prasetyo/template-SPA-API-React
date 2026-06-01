import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components/ct-error-boundary/component';
import { CTLayoutDashboardLoader } from '@/layouts/dashboard/loader';

const ProductsPage = lazy(() => import('./page'));

export const Products = () => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <ProductsPage />
      </Suspense>
    </CTErrorBoundary>
  );
};
