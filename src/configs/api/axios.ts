/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/configs';
import { APICommonError } from '@/types';
import { handleAxiosAPIError, paramStringify } from '@/utils';


type TAxiosAfterResponseProps = {
  /** Axios hooks when request has not been sent to server. */
  onRequest?: (
    value: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;

  /** Axios hooks when request has been sent to server and response is successfully received. */
  onSuccess?: (
    value: AxiosResponse<any, any>
  ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
  /** Axios hooks when request has been sent to server and it sends back an error. */
  onError?: (error: AxiosError<any, any>) => any;
};

export class Http {
  instance: AxiosInstance;

  config: AxiosRequestConfig<any>;

  callback: TAxiosAfterResponseProps | undefined;

  constructor(
    config?: AxiosRequestConfig<any>,
    callback?: TAxiosAfterResponseProps
  ) {
    const conf: AxiosRequestConfig<any> = {
      baseURL: env.BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      paramsSerializer: {
        serialize: (params) => paramStringify(params),
      },
      ...config,
    };
    this.instance = axios.create(conf);
    this.config = conf;
    this.callback = callback;
    this.instance.interceptors.request.use(callback?.onRequest);
    this.instance.interceptors.response.use(
      callback?.onSuccess,
      callback?.onError
    );
  }

  /**
   * Updates the configuration of the Http instance, and recreates the http instance with the new config.
   * @param instance axios instance which will translate the response and errors of the promise.
   */
  async axiosHandler(instance: Promise<AxiosResponse<any, any>>) {
    return await instance
      .then((response) => {
        this.callback?.onSuccess?.(response);
        return response.data;
      })
      .catch((error: AxiosError<APICommonError>) => {
        // TODO: Ask back-end to keep the error response consistant
        this.callback?.onError?.(error);

        throw handleAxiosAPIError(error);
      });
  }

  /**
   * Updates the configuration of the Http instance, and recreates the http instance with the new config.
   * @param config axios config
   */
  updateConfig(config: AxiosRequestConfig<any>): void {
    const newConfig = { ...this.config, ...config };
    this.config = newConfig;
    this.instance = axios.create(newConfig);
  }

  /**
   * GET operation
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
   * @param url URL to the endpoint
   * @param config Configuration object
   * @returns The response from endpoint
   */
  async get(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
    return this.axiosHandler(this.instance.get(url, config));
  }

  /**
   * DELETE operation
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)
   * @param url URL to the endpoint
   * @param config Configuration object
   * @returns The response from endpoint
   */
  async delete(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
    return this.axiosHandler(this.instance.delete(url, config));
  }

  /**
   * POST operation
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
   * @param url URL to the endpoint
   * @param data Request params to be sent to the endpoint
   * @param config Configuration object
   * @returns The response from endpoint
   */
  async post(
    url: string,
    data: any = {},
    config?: AxiosRequestConfig<any>
  ): Promise<any> {
    return this.axiosHandler(this.instance.post(url, data, config));
  }

  /**
   * PUT operation
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)
   * @param url URL to the endpoint
   * @param data Request params to be sent to the endpoint
   * @param config Configuration object
   * @returns The response from endpoint
   */
  async put(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<any> {
    return this.axiosHandler(this.instance.put(url, data, config));
  }

  /**
   * PATCH operation
   * [Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
   * @param url URL to the endpoint
   * @param data Request params to be sent to the endpoint
   * @param config Configuration object
   * @returns The response from endpoint
   */
  async patch(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<any> {
    return this.axiosHandler(this.instance.patch(url, data, config));
  }
}
