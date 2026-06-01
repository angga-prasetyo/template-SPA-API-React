import type { RouteObject } from 'react-router-dom';

import { CTRouteGuard } from '@/components/ct-route-guard/component';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';
import { Error404 } from '@/pages/error/404';
import { Home } from '@/pages/home';

export const commonRoute: RouteObject[] = [
  {
    path: UIEndpointsCommon.HOME,
    element: <CTRouteGuard isPrivate />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: '*', element: <Error404 /> },
];
