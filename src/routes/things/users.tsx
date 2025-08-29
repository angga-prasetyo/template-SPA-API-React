import type { RouteObject } from 'react-router-dom';

import { UIEndpointsThings } from '@/constants';
import { Users, UsersDetail, UsersForm } from '@/pages';

export const usersRoute: RouteObject[] = [
  {
    path: UIEndpointsThings.users.BASE,
    children: [
      {
        index: true,
        element: <Users />,
      },
      { path: UIEndpointsThings.users.ADD, element: <UsersForm /> },
      { path: UIEndpointsThings.users.EDIT, element: <UsersForm /> },

      {
        path: UIEndpointsThings.users.DETAIL,
        element: <UsersDetail />,
      },
    ],
  },
];
