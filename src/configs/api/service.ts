import { AxiosError } from 'axios';

import { APICommonError } from '@/types';

import { env } from '../environment';

import { Http } from './axios';

class CustomService {
  // * If there are more than one API url, you can add more Http construction just like `base` on below.
  base: Http;

  constructor() {
    this.base = new Http(
      {
        baseURL: env.BASE_URL,
      },
      { onError: this.onError }
    );
  }

  async onError(error: AxiosError<APICommonError>) {
    // TODO: Ask back-end to keep the error response consistant

    const { config } = error;
    if (!config) return Promise.reject(error);

    // * If your app doesn't have refresh token mechanism, please delete these block
    // * Else, please discuss with BE related to how to know when the token expired.
    return Promise.reject(error);
  }
}

export const customService = new CustomService();
