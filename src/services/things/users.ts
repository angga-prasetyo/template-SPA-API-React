import { customService } from '@/configs/api/service';
import { APIEndpointsUsers } from '@/constants/api-endpoints/things/users';
import {
  GetAllUsersResponse,
  GetSingleUserParams,
  GetSingleUserResponse,
  CreateUserBody,
  CreateUserResponse,
  UpdateUserBody,
  UpdateUserResponse,
} from '@/types/api/things/users';

export const userService = {
  getAllUsers(): Promise<GetAllUsersResponse> {
    return customService.base.get(APIEndpointsUsers.ALL);
  },
  getSingleUser(params: GetSingleUserParams): Promise<GetSingleUserResponse> {
    return customService.base.get(
      APIEndpointsUsers.DETAIL.replace(':id', params || ''),
    );
  },
  createUser(params: CreateUserBody): Promise<CreateUserResponse> {
    return customService.base.post(APIEndpointsUsers.ALL, params.payload);
  },
  updateUser(params: UpdateUserBody): Promise<UpdateUserResponse> {
    return customService.base.put(
      APIEndpointsUsers.DETAIL.replace(':id', params.id),
      params.payload,
    );
  },
};
