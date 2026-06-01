import type { RouteObject } from 'react-router-dom';

import { CTRouteGuard } from '@/components/ct-route-guard/component';
import { UIEndpointsUsers } from '@/constants/ui-endpoints/things/users';
import { Users } from '@/pages/things/users';
import { UsersDetail } from '@/pages/things/users-detail';
import { UsersForm } from '@/pages/things/users-form';

export const usersRoute: RouteObject[] = [
  {
    path: UIEndpointsUsers.BASE,
    element: <CTRouteGuard isPrivate />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      { path: UIEndpointsUsers.ADD, element: <UsersForm /> },
      { path: UIEndpointsUsers.EDIT, element: <UsersForm /> },

      {
        path: UIEndpointsUsers.DETAIL,
        element: <UsersDetail />,
      },
    ],
  },
];
