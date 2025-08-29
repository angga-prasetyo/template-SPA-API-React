import { useMemo } from 'react';

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { QueryKeysThings } from '@/constants';
import { APIServices } from '@/services';
import {
  GetSingleUserParams,
  GetAllUsersResponse,
  GetSingleUserResponse,
  CreateUserResponse,
  APICommonError,
  CreateUserBody,
  UpdateUserResponse,
  UpdateUserBody,
} from '@/types';

export function useGetAllUsers({
  options = {},
}: {
  options?: Partial<UseQueryOptions<GetAllUsersResponse>>;
} = {}) {
  const queryKey = useMemo(
    () => [QueryKeysThings.users.ALL, ...(options?.queryKey || [])],
    [options]
  );
  const { queryKey: _queryKeyFrmOptions, ...restOptions } = options;

  return useQuery({
    queryKey,
    queryFn: () => APIServices.things.getAllUsers(),
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
  const queryKey = useMemo(
    () => [QueryKeysThings.users.DETAIL, params],
    [params]
  );
  const { queryKey: _queryKeyFrmOptions, ...restOptions } = options;

  return useQuery({
    queryKey,
    queryFn: () => APIServices.things.getSingleUser(params),
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
    mutationFn: (params) => APIServices.things.createUser(params),
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
    mutationFn: (params) => APIServices.things.updateUser(params),
    ...options,
  });
}
