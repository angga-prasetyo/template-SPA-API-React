import { customService } from '@/configs/api/service';
import { APIEndpointsAuth } from '@/constants/api-endpoints/auth';
import {
  GetUserInfoResponse,
  LoginPayload,
  LoginResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from '@/types/api/auth';

export const authService = {
  login(payload: LoginPayload): Promise<LoginResponse> {
    return customService.base.post(APIEndpointsAuth.LOGIN, payload);
  },
  getUserInfo(): Promise<GetUserInfoResponse> {
    return customService.base.get(APIEndpointsAuth.GET_USER_INFO);
  },
  refreshToken(payload: RefreshTokenPayload): Promise<RefreshTokenResponse> {
    return customService.base.post(APIEndpointsAuth.REFRESH_TOKEN, payload);
  },
};
