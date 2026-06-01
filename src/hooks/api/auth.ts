import { useMemo } from 'react';

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { QueryKeysAuth } from '@/constants/query-keys/auth';
import { authService } from '@/services/auth';
import {
  GetUserInfoResponse,
  LoginPayload,
  LoginResponse,
} from '@/types/api/auth';
import { APICommonError } from '@/types/api/common';

export function useLogin({
  options = {},
}: {
  options?: Partial<
    UseMutationOptions<LoginResponse, APICommonError, LoginPayload>
  >;
} = {}) {
  return useMutation({
    mutationFn: (params) => authService.login(params),
    ...options,
  });
}

export function useGetUserInfo({
  options = {},
}: {
  options?: Partial<UseQueryOptions<GetUserInfoResponse>>;
} = {}) {
  const queryKey = useMemo(
    () => [QueryKeysAuth.GET_USER_INFO, ...(options?.queryKey || [])],
    [options],
  );
  const { queryKey: _queryKeyFrmOptions, ...restOptions } = options;
  return useQuery({
    queryKey,
    queryFn: () => authService.getUserInfo(),
    ...restOptions,
  });
}
