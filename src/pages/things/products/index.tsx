import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components';
import { CTLayoutDashboardLoader } from '@/layouts';

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
