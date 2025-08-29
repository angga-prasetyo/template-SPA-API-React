import { QueryKeysProducts } from './products';
import { QueryKeysUsers } from './users';

export const QueryKeysThings = {
  users: { ...QueryKeysUsers },
  products: { ...QueryKeysProducts },
};
