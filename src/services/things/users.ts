import { customService } from '@/configs';
import { APIEndpointsThings } from '@/constants';
import {
  CreateUserBody,
  CreateUserResponse,
  GetAllUsersResponse,
  GetSingleUserParams,
  GetSingleUserResponse,
  UpdateUserBody,
  UpdateUserResponse,
} from '@/types';

export const userService = {
  getAllUsers(): Promise<GetAllUsersResponse> {
    return customService.base.get(APIEndpointsThings.users.ALL);
  },
  getSingleUser(params: GetSingleUserParams): Promise<GetSingleUserResponse> {
    return customService.base.get(
      APIEndpointsThings.users.DETAIL.replace(':id', params || '')
    );
  },
  createUser(params: CreateUserBody): Promise<CreateUserResponse> {
    return customService.base.post(
      APIEndpointsThings.users.ALL,
      params.payload
    );
  },
  updateUser(params: UpdateUserBody): Promise<UpdateUserResponse> {
    return customService.base.put(
      APIEndpointsThings.users.DETAIL.replace(':id', params.id),
      params.payload
    );
  },
};
