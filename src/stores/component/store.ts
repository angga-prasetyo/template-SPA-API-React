import { create } from 'zustand';

import { ctLocalStorageKey } from '@/constants/localStorage';

import { UseComponentStoreProps } from './type';

const initialState: Partial<UseComponentStoreProps> = {
  isDarkMode: true,
  isMenuSidebarCollapsed: true,
};

export const useComponentStore = create<UseComponentStoreProps>((set) => ({
  isDarkMode: JSON.parse(
    localStorage?.getItem(ctLocalStorageKey.darkmode) ?? 'true',
  ),
  isMenuSidebarCollapsed: JSON.parse(
    localStorage?.getItem(ctLocalStorageKey.menuSidebar) ?? 'true',
  ),
  toggleIsDarkMode(forcedValue) {
    set((state) => {
      const isDarkMode =
        forcedValue === undefined ? !state.isDarkMode : forcedValue;
      localStorage.setItem(ctLocalStorageKey.darkmode, isDarkMode?.toString());
      return { ...state, isDarkMode };
    });
  },
  toggleMenuSidebarCollapsed(forcedValue) {
    set((state) => {
      const isMenuSidebarCollapsed =
        forcedValue === undefined ? !state.isMenuSidebarCollapsed : forcedValue;
      localStorage.setItem(
        ctLocalStorageKey.menuSidebar,
        isMenuSidebarCollapsed?.toString(),
      );
      return { ...state, isMenuSidebarCollapsed };
    });
  },
  resetState() {
    set(() => initialState);
  },
}));
