import { HttpStatusCode, type AxiosError } from 'axios';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { removeMock, resetAuthStateMock, resetComponentStateMock } = vi.hoisted(
  () => {
    return {
      removeMock: vi.fn(),
      resetAuthStateMock: vi.fn(),
      resetComponentStateMock: vi.fn(),
    };
  },
);

vi.mock('universal-cookie', () => {
  class MockCookies {
    remove = removeMock;
  }

  return {
    default: MockCookies,
  };
});

vi.mock('@/configs/cookies', () => {
  return {
    configCookiesOptions: {
      path: '/',
      sameSite: 'lax',
    },
  };
});

vi.mock('@/constants/localStorage', () => {
  return {
    ctLocalStorageKey: {
      cookies: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    },
  };
});

vi.mock('@/stores/auth/store', () => {
  return {
    useAuthStore: {
      getState: vi.fn(() => ({
        resetState: resetAuthStateMock,
      })),
    },
  };
});

vi.mock('@/stores/component/store', () => {
  return {
    useComponentStore: {
      getState: vi.fn(() => ({
        resetState: resetComponentStateMock,
      })),
    },
  };
});

import { APICommonError } from '@/types/api/common';

import { handleAxiosAPIError, removeCredential } from './other';

describe('handleAxiosAPIError', () => {
  it('returns response data when available', () => {
    const responseData: APICommonError = {
      statusCode: HttpStatusCode.BadRequest,
      message: 'Bad request',
    };

    const error = {
      response: {
        data: responseData,
      },
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual(responseData);
  });

  it('normalizes internal server error message', () => {
    const error = {
      response: {
        data: {
          statusCode: HttpStatusCode.InternalServerError,
          message: 'any message',
        },
      },
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.InternalServerError,
      message: 'Sorry, Something Went Wrong',
    });
  });

  it('normalizes message when response data has empty message', () => {
    const error = {
      response: {
        data: {
          statusCode: HttpStatusCode.BadGateway,
          message: '',
        },
      },
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.BadGateway,
      message: 'Sorry, Something Went Wrong',
    });
  });

  it('builds fallback from response status when response data is missing', () => {
    const error = {
      message: 'Network issue',
      response: {
        status: HttpStatusCode.Forbidden,
      },
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.Forbidden,
      message: 'Network issue',
    });
  });

  it('normalizes fallback from response status when message is missing', () => {
    const error = {
      response: {
        status: HttpStatusCode.BadRequest,
      },
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Sorry, Something Went Wrong',
    });
  });

  it('uses error status and message when response is missing', () => {
    const error = {
      status: HttpStatusCode.Unauthorized,
      message: 'Unauthorized request',
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.Unauthorized,
      message: 'Unauthorized request',
    });
  });

  it('uses timeout status and connection message when status and message are missing', () => {
    const error = {} as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.RequestTimeout,
      message: 'Please check your connection!',
    });
  });

  it('normalizes message in no-response path when status is internal server error', () => {
    const error = {
      status: HttpStatusCode.InternalServerError,
      message: 'Server exploded',
    } as AxiosError<APICommonError | undefined>;

    expect(handleAxiosAPIError(error)).toEqual({
      statusCode: HttpStatusCode.InternalServerError,
      message: 'Sorry, Something Went Wrong',
    });
  });
});

describe('removeCredential', () => {
  let localStorageClearSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    removeMock.mockClear();
    resetAuthStateMock.mockClear();
    resetComponentStateMock.mockClear();
    localStorageClearSpy = vi.spyOn(Storage.prototype, 'clear');
  });

  afterEach(() => {
    localStorageClearSpy.mockRestore();
  });

  it('removes auth credentials and resets related states', () => {
    removeCredential();

    expect(removeMock).toHaveBeenCalledTimes(2);
    expect(removeMock).toHaveBeenNthCalledWith(1, 'access-token', {
      path: '/',
      sameSite: 'lax',
    });
    expect(removeMock).toHaveBeenNthCalledWith(2, 'refresh-token', {
      path: '/',
      sameSite: 'lax',
    });
    expect(resetAuthStateMock).toHaveBeenCalledTimes(1);
    expect(resetComponentStateMock).toHaveBeenCalledTimes(1);
    expect(localStorageClearSpy).toHaveBeenCalledTimes(1);
  });
});
