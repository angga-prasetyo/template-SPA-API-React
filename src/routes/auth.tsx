import type { RouteObject } from 'react-router-dom';

import { CTRouteGuard } from '@/components/ct-route-guard/component';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { ForgotPassword } from '@/pages/auth/forgot-password';
import { Login } from '@/pages/auth/login';
import { Register } from '@/pages/auth/register';

export const authRoute: RouteObject[] = [
  {
    path: UIEndpointsAuth.LOGIN,
    element: <CTRouteGuard />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: UIEndpointsAuth.REGISTER,
    element: <CTRouteGuard />,
    children: [{ index: true, element: <Register /> }],
  },
  {
    path: UIEndpointsAuth.FORGOT_PASSWORD,
    element: <CTRouteGuard />,
    children: [{ index: true, element: <ForgotPassword /> }],
  },
];
