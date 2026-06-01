import Cookies from 'universal-cookie';
import { create } from 'zustand';

import { ctLocalStorageKey } from '@/constants/localStorage';

import { UseAuthStoreProps } from './type';

const cookies = new Cookies();

const { accessToken, refreshToken } = ctLocalStorageKey.cookies;
const userInfo = ctLocalStorageKey.userInfo;

const initialState: Partial<UseAuthStoreProps> = {
  isAuthenticated: false,
  userInfo: null,
};
export const useAuthStore = create<UseAuthStoreProps>((set) => {
  return {
    isAuthenticated: Boolean(
      cookies.get(accessToken) && cookies.get(refreshToken),
    ),
    userInfo: JSON.parse(localStorage.getItem(userInfo) || 'null'),
    updateIsAuthenticated(value) {
      set((state) => ({ ...state, isAuthenticated: value }));
    },
    updateUserInfo(value) {
      if (!value) localStorage.removeItem(userInfo);
      else localStorage.setItem(userInfo, JSON.stringify(value));

      return set((state) => ({ ...state, userInfo: value }));
    },
    resetState() {
      set(() => initialState);
    },
  };
});
