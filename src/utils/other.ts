import { type AxiosError, HttpStatusCode } from 'axios';

import { useComponentStore } from '@/stores';
import { APICommonError } from '@/types';

export const handleAxiosAPIError = (
  error: AxiosError<APICommonError | undefined>
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
  useComponentStore.getState().resetState();
  localStorage.clear();
};
