import type { RouteObject } from 'react-router-dom';

import { UIEndpointsCommon } from '@/constants';
import { Error404, Home } from '@/pages';

export const commonRoute: RouteObject[] = [
  {
    path: UIEndpointsCommon.HOME,
    element: <Home />,
  },
  { path: '*', element: <Error404 /> },
];
