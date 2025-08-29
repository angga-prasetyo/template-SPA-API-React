import { createBrowserRouter } from 'react-router-dom';

import { commonRoute } from './common';
import { thingsRoutes } from './things';

export const router = createBrowserRouter([...commonRoute, ...thingsRoutes]);
