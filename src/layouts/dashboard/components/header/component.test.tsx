/* eslint-disable import/order */
import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// ── Mock window.matchMedia (required for Ant Design) ───────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ── Module Mocks ───────────────────────────────────────────────────────────

vi.mock('usehooks-ts', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

vi.mock('@/stores/auth/store', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/stores/component/store', () => ({
  useComponentStore: vi.fn(),
}));

vi.mock('@/hooks/api/auth', () => ({
  useGetUserInfo: vi.fn(),
}));

vi.mock('@/utils/other', () => ({
  removeCredential: vi.fn(),
}));

vi.mock('@/components/ct-debounced-search/component', () => ({
  CTDebouncedSearch: ({ width }: { width: string }) => (
    <div data-testid="ct-debounced-search" data-width={width} />
  ),
}));

vi.mock('@/assets/icons/menu-icon.svg?react', () => ({
  default: ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => <div data-testid="menu-icon" className={className} onClick={onClick} />,
}));

vi.mock('@/assets/images/img__company_logo.svg?react', () => ({
  default: () => <div data-testid="company-logo" />,
}));

vi.mock('@/constants/ui-endpoints/common', () => ({
  UIEndpointsCommon: { HOME: '/' },
}));

vi.mock('@/constants/ui-endpoints/auth', () => ({
  UIEndpointsAuth: { LOGIN: '/login' },
}));

// ── Imports (after mocks) ──────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { GetUserInfoResponse } from '@/types/api/auth';
import { removeCredential } from '@/utils/other';

import { Header } from './component';
import type { HeaderProps } from './type';
import { useAuthStore } from '@/stores/auth/store';
import { UseAuthStoreProps } from '@/stores/auth/type';
import { useComponentStore } from '@/stores/component/store';
import { UseComponentStoreProps } from '@/stores/component/type';
import { useGetUserInfo } from '@/hooks/api/auth';

// ── Mock state & helpers ───────────────────────────────────────────────────

const mockNavigate = vi.fn();
const mockUpdateUserInfo = vi.fn();
const mockToggleIsDarkMode = vi.fn();
const mockToggleMenuSidebarCollapsed = vi.fn();

const mockUserInfo = {
  avatar: 'https://example.com/avatar.jpg',
  name: 'John Doe',
  role: 'admin' as GetUserInfoResponse['role'],
};

const buildAuthState = (
  overrides: Partial<UseAuthStoreProps> = {},
): UseAuthStoreProps => ({
  userInfo: mockUserInfo,
  updateUserInfo: mockUpdateUserInfo,
  isAuthenticated: true,
  updateIsAuthenticated: vi.fn(),
  resetState: vi.fn(),
  ...overrides,
});

const buildComponentState = (
  overrides: Partial<UseComponentStoreProps> = {},
): UseComponentStoreProps => ({
  isDarkMode: false,
  toggleIsDarkMode: mockToggleIsDarkMode,
  toggleMenuSidebarCollapsed: mockToggleMenuSidebarCollapsed,
  isMenuSidebarCollapsed: false,
  resetState: vi.fn(),
  ...overrides,
});

// Cast to unknown first to avoid providing all 25+ UseQueryResult fields
const buildQueryResult = (
  overrides: Partial<UseQueryResult<GetUserInfoResponse, Error>> = {},
) =>
  ({
    data: undefined,
    isSuccess: false,
    isPending: true,
    isError: false,
    error: null,
    ...overrides,
  }) as unknown as UseQueryResult<GetUserInfoResponse, Error>;

const defaultProps: HeaderProps = {
  searchProps: undefined,
  titlePage: 'Test Page',
};

const renderComponent = (props: Partial<HeaderProps> = {}) =>
  render(
    <MemoryRouter>
      <Header {...defaultProps} {...props} />
    </MemoryRouter>,
  );

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useMediaQuery).mockReturnValue(true); // desktop by default
    vi.mocked(useAuthStore).mockImplementation((selector) =>
      selector(buildAuthState()),
    );
    vi.mocked(useComponentStore).mockImplementation((selector) =>
      selector(buildComponentState()),
    );
    vi.mocked(useGetUserInfo).mockReturnValue(buildQueryResult());
  });

  // ── Left Component ───────────────────────────────────────────────────────
  describe('Left Component', () => {
    it('renders CompanyLogo on desktop', () => {
      vi.mocked(useMediaQuery).mockReturnValue(true);
      renderComponent();
      expect(screen.getByTestId('company-logo')).toBeInTheDocument();
      expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
    });

    it('renders MenuIcon on mobile', () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderComponent();
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('company-logo')).not.toBeInTheDocument();
    });

    it('calls toggleMenuSidebarCollapsed when MenuIcon is clicked', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderComponent();
      await userEvent.click(screen.getByTestId('menu-icon'));
      expect(mockToggleMenuSidebarCollapsed).toHaveBeenCalledTimes(1);
    });

    it('CompanyLogo wrapped in link pointing to HOME', () => {
      vi.mocked(useMediaQuery).mockReturnValue(true);
      renderComponent();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });
  });

  // ── Center Component ─────────────────────────────────────────────────────
  describe('Center Component', () => {
    it('renders string titlePage as heading', () => {
      renderComponent({ titlePage: 'Dashboard' });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders ReactNode titlePage directly', () => {
      renderComponent({
        titlePage: <span data-testid="custom-title">Custom Title</span>,
      });
      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });

    it('renders CTDebouncedSearch when search is toggled on', async () => {
      renderComponent({ searchProps: { placeholder: 'Search...' } });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(screen.getByTestId('ct-debounced-search')).toBeInTheDocument();
    });

    it('CTDebouncedSearch has width 50dvw on desktop', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(true);
      renderComponent({ searchProps: {} });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(screen.getByTestId('ct-debounced-search')).toHaveAttribute(
        'data-width',
        '50dvw',
      );
    });

    it('CTDebouncedSearch has width 45dvw on mobile', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderComponent({ searchProps: {} });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(screen.getByTestId('ct-debounced-search')).toHaveAttribute(
        'data-width',
        '45dvw',
      );
    });

    it('CTDebouncedSearch renders with no extra props when searchProps is true', async () => {
      renderComponent({ searchProps: true });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(screen.getByTestId('ct-debounced-search')).toBeInTheDocument();
    });
  });

  // ── Search Trigger ───────────────────────────────────────────────────────
  describe('Search Trigger', () => {
    it('does not render search icon when searchProps not provided', () => {
      renderComponent({ searchProps: undefined });
      expect(
        screen.queryByRole('img', { name: 'search' }),
      ).not.toBeInTheDocument();
    });

    it('renders search icon when searchProps is provided', () => {
      renderComponent({ searchProps: {} });
      expect(screen.getByRole('img', { name: 'search' })).toBeInTheDocument();
    });

    it('shows close-circle icon after search is toggled on', async () => {
      renderComponent({ searchProps: {} });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(
        screen.getByRole('img', { name: 'close-circle' }),
      ).toBeInTheDocument();
    });

    it('hides search icon after search is toggled on', async () => {
      renderComponent({ searchProps: {} });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(
        screen.queryByRole('img', { name: 'search' }),
      ).not.toBeInTheDocument();
    });

    it('hides CTDebouncedSearch when close-circle is clicked', async () => {
      renderComponent({ searchProps: {} });
      await userEvent.click(screen.getByRole('img', { name: 'search' }));
      expect(screen.getByTestId('ct-debounced-search')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('img', { name: 'close-circle' }));
      expect(
        screen.queryByTestId('ct-debounced-search'),
      ).not.toBeInTheDocument();
    });
  });

  // ── Settings Drawer ──────────────────────────────────────────────────────
  describe('Settings Drawer', () => {
    it('drawer is closed on initial render', () => {
      renderComponent();
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('opens drawer when settings icon is clicked', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('shows user name in drawer', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('shows user role in drawer', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('closes drawer when close icon in title is clicked', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByText('Settings')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('img', { name: 'close' }));
      await waitFor(() => {
        expect(
          document.querySelector('.ant-drawer-open'),
        ).not.toBeInTheDocument();
      });
    });

    it('dark mode switch is unchecked when isDarkMode is false', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('dark mode switch is checked when isDarkMode is true', async () => {
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isDarkMode: true })),
      );
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('calls toggleIsDarkMode when dark mode switch is clicked', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      await userEvent.click(screen.getByRole('switch'));
      expect(mockToggleIsDarkMode).toHaveBeenCalledTimes(1);
    });

    it('drawer width is 375px on desktop', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(true);
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      const drawerWrapper = document.querySelector(
        '.ant-drawer-content-wrapper',
      ) as HTMLElement;
      expect(drawerWrapper?.style.width).toBe('375px');
    });

    it('drawer width is 100% on mobile', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      const drawerWrapper = document.querySelector(
        '.ant-drawer-content-wrapper',
      ) as HTMLElement;
      expect(drawerWrapper?.style.width).toBe('100%');
    });
  });

  // ── Logout ───────────────────────────────────────────────────────────────
  describe('Logout', () => {
    it('calls removeCredential when logout button is clicked', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      await userEvent.click(screen.getByRole('button', { name: /logout/i }));
      expect(removeCredential).toHaveBeenCalledTimes(1);
    });

    it('navigates to login page after logout', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('img', { name: 'setting' }));
      await userEvent.click(screen.getByRole('button', { name: /logout/i }));
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  // ── useGetUserInfo Effect ─────────────────────────────────────────────────
  describe('useGetUserInfo Effect', () => {
    it('calls updateUserInfo when successGetUserInfo is true', () => {
      const userData = {
        id: 1,
        email: 'jane@test.com',
        password: 'secret',
        avatar: 'new.jpg',
        name: 'Jane',
        role: 'admin' as GetUserInfoResponse['role'],
      };
      vi.mocked(useGetUserInfo).mockReturnValue(
        buildQueryResult({ data: userData, isSuccess: true, isPending: false }),
      );
      renderComponent();
      expect(mockUpdateUserInfo).toHaveBeenCalledWith({
        avatar: userData.avatar,
        name: userData.name,
        role: userData.role,
      });
    });

    it('does not call updateUserInfo when successGetUserInfo is false', () => {
      renderComponent();
      expect(mockUpdateUserInfo).not.toHaveBeenCalled();
    });

    it('disables useGetUserInfo when userInfo already exists', () => {
      renderComponent();
      expect(vi.mocked(useGetUserInfo)).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({ enabled: false }),
        }),
      );
    });

    it('enables useGetUserInfo when userInfo is null', () => {
      vi.mocked(useAuthStore).mockImplementation((selector) =>
        selector(buildAuthState({ userInfo: null })),
      );
      renderComponent();
      expect(vi.mocked(useGetUserInfo)).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({ enabled: true }),
        }),
      );
    });
  });
});
