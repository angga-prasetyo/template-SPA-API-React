import { type AxiosError, HttpStatusCode } from 'axios';
import Cookies from 'universal-cookie';

import { configCookiesOptions } from '@/configs/cookies';
import { ctLocalStorageKey } from '@/constants/localStorage';
import { useAuthStore } from '@/stores/auth/store';
import { useComponentStore } from '@/stores/component/store';
import { APICommonError } from '@/types/api/common';

const cookies = new Cookies();

const { accessToken: at, refreshToken: rt } = ctLocalStorageKey.cookies;

export const handleAxiosAPIError = (
  error: AxiosError<APICommonError | undefined>,
): APICommonError => {
  let errorResponse;

  if (error?.response) {
    if (error.response?.data) {
      errorResponse = error.response.data;
    } else {
      errorResponse = {
        statusCode: error.response?.status,
        message: error?.message,
      };
    }
  } else {
    errorResponse = {
      statusCode: error?.status ?? HttpStatusCode.RequestTimeout,
      message: error?.message || 'Please check your connection!',
    };
  }

  if (
    errorResponse.statusCode === HttpStatusCode.InternalServerError ||
    !errorResponse.message
  ) {
    errorResponse = {
      statusCode: errorResponse.statusCode,
      message: 'Sorry, Something Went Wrong',
    };
  }

  return errorResponse;
};

export const removeCredential = () => {
  cookies.remove(at, configCookiesOptions);
  cookies.remove(rt, configCookiesOptions);
  useAuthStore.getState().resetState();
  useComponentStore.getState().resetState();
  localStorage.clear();
};
