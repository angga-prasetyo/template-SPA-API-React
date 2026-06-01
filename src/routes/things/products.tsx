import type { RouteObject } from 'react-router-dom';

import { CTRouteGuard } from '@/components/ct-route-guard/component';
import { UIEndpointsProducts } from '@/constants/ui-endpoints/things/products';
import { Products } from '@/pages/things/products';

export const productsRoute: RouteObject[] = [
  {
    path: UIEndpointsProducts.BASE,
    element: <CTRouteGuard isPrivate />,
    children: [
      {
        index: true,
        element: <Products />,
      },
    ],
  },
];
