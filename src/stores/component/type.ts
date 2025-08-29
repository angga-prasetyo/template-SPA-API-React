export interface UseComponentStoreProps {
  isDarkMode: boolean;
  toggleIsDarkMode: (forcedValue?: boolean) => void;
  isMenuSidebarCollapsed: boolean;
  toggleMenuSidebarCollapsed: (forcedValue?: boolean) => void;
  resetState: () => void;
}
