import { APIEndpointsProducts } from './products';
import { APIEndpointsUsers } from './users';

export const APIEndpointsThings = {
  products: { ...APIEndpointsProducts },
  users: { ...APIEndpointsUsers },
};
