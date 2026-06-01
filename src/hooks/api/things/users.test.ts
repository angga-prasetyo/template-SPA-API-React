import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const {
  useMutationMock,
  useQueryMock,
  getAllUsersMock,
  getSingleUserMock,
  createUserMock,
  updateUserMock,
} = vi.hoisted(() => {
  return {
    useMutationMock: vi.fn(),
    useQueryMock: vi.fn(),
    getAllUsersMock: vi.fn(),
    getSingleUserMock: vi.fn(),
    createUserMock: vi.fn(),
    updateUserMock: vi.fn(),
  };
});

vi.mock('@tanstack/react-query', () => {
  return {
    useMutation: useMutationMock,
    useQuery: useQueryMock,
  };
});

vi.mock('@/services/things/users', () => {
  return {
    userService: {
      getAllUsers: getAllUsersMock,
      getSingleUser: getSingleUserMock,
      createUser: createUserMock,
      updateUser: updateUserMock,
    },
  };
});

import { QueryKeysUsers } from '@/constants/query-keys/things/users';

import {
  useGetAllUsers,
  useGetSingleUser,
  useCreateUser,
  useUpdateUser,
} from './users';

describe('hooks/api/things/users', () => {
  beforeEach(() => {
    useMutationMock.mockReset();
    useQueryMock.mockReset();
    getAllUsersMock.mockReset();
    getSingleUserMock.mockReset();
    createUserMock.mockReset();
    updateUserMock.mockReset();
  });

  describe('useGetAllUsers', () => {
    it('uses default query key and getAllUsers service', async () => {
      useQueryMock.mockReturnValue({ data: [] });

      renderHook(() => useGetAllUsers());

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([QueryKeysUsers.ALL]);

      await queryOptions.queryFn();
      expect(getAllUsersMock).toHaveBeenCalledTimes(1);
    });

    it('merges query key from options and keeps other query options', () => {
      useQueryMock.mockReturnValue({ isSuccess: true });

      renderHook(() =>
        useGetAllUsers({
          options: {
            queryKey: ['page-1'],
            enabled: true,
          },
        }),
      );

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([QueryKeysUsers.ALL, 'page-1']);
      expect(queryOptions.enabled).toBe(true);
    });
  });

  describe('useGetSingleUser', () => {
    it('uses detail query key with params and calls getSingleUser service', async () => {
      useQueryMock.mockReturnValue({ data: null });
      const params = '42';

      renderHook(() => useGetSingleUser({ params }));

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([QueryKeysUsers.DETAIL, params]);

      await queryOptions.queryFn();
      expect(getSingleUserMock).toHaveBeenCalledTimes(1);
      expect(getSingleUserMock).toHaveBeenCalledWith(params);
    });

    it('supports undefined params', async () => {
      useQueryMock.mockReturnValue({ data: null });

      renderHook(() => useGetSingleUser());

      const queryOptions = useQueryMock.mock.calls[0][0];
      expect(queryOptions.queryKey).toEqual([QueryKeysUsers.DETAIL, undefined]);

      await queryOptions.queryFn();
      expect(getSingleUserMock).toHaveBeenCalledWith(undefined);
    });
  });

  describe('useCreateUser', () => {
    it('configures mutation with createUser service', async () => {
      useMutationMock.mockReturnValue({ mutate: vi.fn() });
      const params = {
        payload: {
          name: 'John',
          email: 'john@mail.com',
          gender: 'male',
          status: 'active',
        },
      };

      renderHook(() => useCreateUser());

      const mutationOptions = useMutationMock.mock.calls[0][0];
      await mutationOptions.mutationFn(params);

      expect(createUserMock).toHaveBeenCalledTimes(1);
      expect(createUserMock).toHaveBeenCalledWith(params);
    });

    it('passes custom mutation options', () => {
      const onError = vi.fn();
      useMutationMock.mockReturnValue({ mutate: vi.fn() });

      renderHook(() => useCreateUser({ options: { onError } }));

      const mutationOptions = useMutationMock.mock.calls[0][0];
      expect(mutationOptions.onError).toBe(onError);
    });
  });

  describe('useUpdateUser', () => {
    it('configures mutation with updateUser service', async () => {
      useMutationMock.mockReturnValue({ mutate: vi.fn() });
      const params = {
        id: '42',
        payload: {
          name: 'Doe',
          email: 'doe@mail.com',
          gender: 'male',
          status: 'inactive',
        },
      };

      renderHook(() => useUpdateUser());

      const mutationOptions = useMutationMock.mock.calls[0][0];
      await mutationOptions.mutationFn(params);

      expect(updateUserMock).toHaveBeenCalledTimes(1);
      expect(updateUserMock).toHaveBeenCalledWith(params);
    });

    it('passes custom mutation options', () => {
      const onSettled = vi.fn();
      useMutationMock.mockReturnValue({ mutate: vi.fn() });

      renderHook(() => useUpdateUser({ options: { onSettled } }));

      const mutationOptions = useMutationMock.mock.calls[0][0];
      expect(mutationOptions.onSettled).toBe(onSettled);
    });
  });
});
