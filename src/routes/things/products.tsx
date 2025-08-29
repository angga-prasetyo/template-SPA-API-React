import type { RouteObject } from 'react-router-dom';

import { UIEndpointsThings } from '@/constants';
import { Products } from '@/pages';

export const productsRoute: RouteObject[] = [
  {
    path: UIEndpointsThings.products.BASE,
    children: [
      {
        index: true,
        element: <Products />,
      },
    ],
  },
];
