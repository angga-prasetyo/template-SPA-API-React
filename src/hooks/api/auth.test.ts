import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { useMutationMock, useQueryMock, loginMock, getUserInfoMock } =
  vi.hoisted(() => {
    return {
      useMutationMock: vi.fn(),
      useQueryMock: vi.fn(),
      loginMock: vi.fn(),
      getUserInfoMock: vi.fn(),
    };
  });

vi.mock('@tanstack/react-query', () => {
  return {
    useMutation: useMutationMock,
    useQuery: useQueryMock,
  };
});

vi.mock('@/services/auth', () => {
  return {
    authService: {
      login: loginMock,
      getUserInfo: getUserInfoMock,
    },
  };
});

import { QueryKeysAuth } from '@/constants/query-keys/auth';

import { useGetUserInfo, useLogin } from './auth';

describe('hooks/api/auth', () => {
  beforeEach(() => {
    useMutationMock.mockReset();
    useQueryMock.mockReset();
    loginMock.mockReset();
    getUserInfoMock.mockReset();
  });

  describe('useLogin', () => {
    it('configures mutation with auth login service', async () => {
      const mutationResult = { mutate: vi.fn() };
      useMutationMock.mockReturnValue(mutationResult);

      const { result } = renderHook(() => useLogin());

      expect(result.current).toBe(mutationResult);
      expect(useMutationMock).toHaveBeenCalledTimes(1);

      const mutationOptions = useMutationMock.mock.calls[0][0];
      const payload = { username: 'john', password: 'secret' };
      await mutationOptions.mutationFn(payload);

      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith(payload);
    });

    it('passes custom mutation options', () => {
      const onSuccess = vi.fn();
      useMutationMock.mockReturnValue({ mutate: vi.fn() });

      renderHook(() => useLogin({ options: { onSuccess } }));

      const mutationOptions = useMutationMock.mock.calls[0][0];
      expect(mutationOptions.onSuccess).toBe(onSuccess);
    });
  });

  describe('useGetUserInfo', () => {
    it('uses default query key and query function', async () => {
      const queryResult = { data: null };
      useQueryMock.mockReturnValue(queryResult);

      const { result } = renderHook(() => useGetUserInfo());

      expect(result.current).toBe(queryResult);
      expect(useQueryMock).toHaveBeenCalledTimes(1);

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([QueryKeysAuth.GET_USER_INFO]);

      await queryOptions.queryFn();
      expect(getUserInfoMock).toHaveBeenCalledTimes(1);
    });

    it('merges query key from options and keeps other options', () => {
      const queryResult = { isLoading: false };
      useQueryMock.mockReturnValue(queryResult);

      renderHook(() =>
        useGetUserInfo({
          options: {
            queryKey: ['custom-key'],
            staleTime: 1000,
          },
        }),
      );

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([
        QueryKeysAuth.GET_USER_INFO,
        'custom-key',
      ]);
      expect(queryOptions.staleTime).toBe(1000);
    });
  });
});
