import { useMemo } from 'react';

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { QueryKeysUsers } from '@/constants/query-keys/things/users';
import { userService } from '@/services/things/users';
import { APICommonError } from '@/types/api/common';
import {
  GetAllUsersResponse,
  GetSingleUserParams,
  GetSingleUserResponse,
  CreateUserResponse,
  CreateUserBody,
  UpdateUserResponse,
  UpdateUserBody,
} from '@/types/api/things/users';

export function useGetAllUsers({
  options = {},
}: {
  options?: Partial<UseQueryOptions<GetAllUsersResponse>>;
} = {}) {
  const queryKey = useMemo(
    () => [QueryKeysUsers.ALL, ...(options?.queryKey || [])],
    [options],
  );
  const { queryKey: _queryKeyFrmOptions, ...restOptions } = options;

  return useQuery({
    queryKey,
    queryFn: () => userService.getAllUsers(),
    ...restOptions,
  });
}

export function useGetSingleUser({
  params,
  options = {},
}: {
  params?: GetSingleUserParams;
  options?: Partial<UseQueryOptions<GetSingleUserResponse>>;
} = {}) {
  const queryKey = useMemo(() => [QueryKeysUsers.DETAIL, params], [params]);
  const { queryKey: _queryKeyFrmOptions, ...restOptions } = options;

  return useQuery({
    queryKey,
    queryFn: () => userService.getSingleUser(params),
    ...restOptions,
  });
}

export function useCreateUser({
  options = {},
}: {
  options?: Partial<
    UseMutationOptions<CreateUserResponse, APICommonError, CreateUserBody>
  >;
} = {}) {
  return useMutation({
    mutationFn: (params) => userService.createUser(params),
    ...options,
  });
}

export function useUpdateUser({
  options = {},
}: {
  options?: Partial<
    UseMutationOptions<UpdateUserResponse, APICommonError, UpdateUserBody>
  >;
} = {}) {
  return useMutation({
    mutationFn: (params) => userService.updateUser(params),
    ...options,
  });
}
