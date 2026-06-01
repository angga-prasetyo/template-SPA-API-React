import { Navigate, Outlet } from 'react-router-dom';

import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';
import { useAuthStore } from '@/stores/auth/store';

import type { CTRouteGuardProps } from './type';

export const CTRouteGuard: React.FC<CTRouteGuardProps> = ({
  isPrivate = false,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isPrivate)
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={UIEndpointsAuth.LOGIN} replace />
    );

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={UIEndpointsCommon.HOME} replace />
  );
};
