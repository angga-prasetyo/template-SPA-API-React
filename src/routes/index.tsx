import { createBrowserRouter } from 'react-router-dom';

import { authRoute } from './auth';
import { commonRoute } from './common';
import { productsRoute } from './things/products';
import { usersRoute } from './things/users';

export const router = createBrowserRouter([
  ...authRoute,
  ...commonRoute,
  ...productsRoute,
  ...usersRoute,
]);
