const base = '/users';

export enum APIEndpointsUsers {
  ALL = base,
  DETAIL = `${base}/:id`,
  CHECK_EMAIL = `${base}/is-available`,
}
