const base = '/products';

export enum APIEndpointsProducts {
  ALL = base,
  DETAIL = `${base}/:id`,
}
