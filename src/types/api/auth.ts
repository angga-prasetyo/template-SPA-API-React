export type AuthCommonResponse = {
  access_token: string;
  refresh_token: string;
};

export type AuthCommonPayload = {
  email: string;
  password: string;
};

export type GetUserInfoResponse = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
};

export type LoginPayload = AuthCommonResponse;

export type LoginResponse = AuthCommonResponse;

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type RefreshTokenResponse = AuthCommonResponse;

export type ForgotPasswordPayload = {
  email: string;
};

export type RegisterPayload = {
  name: string;
} & AuthCommonResponse;
