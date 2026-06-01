type TUserInfo = {
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
};

export interface UseAuthStoreProps {
  isAuthenticated: boolean;
  updateIsAuthenticated: (value: boolean) => void;
  userInfo: TUserInfo | null;
  updateUserInfo: (value: TUserInfo | null) => void;
  resetState: () => void;
}
