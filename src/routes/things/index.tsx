import type { RouteObject } from 'react-router-dom';

import { productsRoute } from './products';
import { usersRoute } from './users';

export const thingsRoutes: RouteObject[] = [...usersRoute, ...productsRoute];
