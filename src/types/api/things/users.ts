export type UserRole = 'admin' | 'customer';
export type UserCommonResponse = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  creationAt: string;
};
export type UserCommonPayload = {
  password: string;
  conf_password?: string;
} & Omit<UserCommonResponse, 'creationAt' | 'id'>;

export type CreateUserBody = {
  payload: UserCommonPayload;
};

export type CreateUserResponse = {
  updatedAt: string;
} & UserCommonResponse;

export type GetSingleUserResponse = {
  password: string;
} & UserCommonResponse;

export type GetAllUsersResponse = GetSingleUserResponse[];

export type GetSingleUserParams = string | undefined;

export type UpdateUserBody = {
  id: string;
  payload: UserCommonPayload;
};

export type UpdateUserResponse = {
  password: string;
  updatedAt: string;
} & UserCommonResponse;
