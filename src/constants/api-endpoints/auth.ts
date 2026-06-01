const base = 'auth';

export enum APIEndpointsAuth {
  LOGIN = `${base}/login`,
  GET_USER_INFO = `${base}/profile`,
  REFRESH_TOKEN = `${base}/refresh-token`,
}
