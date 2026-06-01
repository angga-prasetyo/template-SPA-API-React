/* eslint-disable import/order */
import { render, screen } from '@testing-library/react';
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

vi.mock('@/stores/component/store', () => ({
  useComponentStore: vi.fn(),
}));

vi.mock('@/constants/ui-endpoints/common', () => ({
  UIEndpointsCommon: { HOME: '/' },
}));

vi.mock('@/constants/ui-endpoints/things/users', () => ({
  UIEndpointsUsers: {
    BASE: '/users',
  },
}));

vi.mock('@/constants/ui-endpoints/things/products', () => ({
  UIEndpointsProducts: {
    BASE: '/products',
  },
}));

vi.mock('@/assets/images/img__company_logo.svg?react', () => ({
  default: () => <div data-testid="company-logo" />,
}));

vi.mock('../../constant', () => ({
  menuSidebarWidth: 240,
}));

// ── Imports (after mocks) ──────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Sidebar } from './component';
import { useComponentStore } from '@/stores/component/store';
import { UseComponentStoreProps } from '@/stores/component/type';

// ── Mock state & helpers ───────────────────────────────────────────────────

const mockNavigate = vi.fn();
const mockToggleMenuSidebarCollapsed = vi.fn();

const buildComponentState = (
  overrides: Partial<UseComponentStoreProps> = {},
): UseComponentStoreProps => ({
  isDarkMode: false,
  toggleIsDarkMode: vi.fn(),
  isMenuSidebarCollapsed: false,
  toggleMenuSidebarCollapsed: mockToggleMenuSidebarCollapsed,
  resetState: vi.fn(),
  ...overrides,
});

const renderComponent = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Sidebar />
    </MemoryRouter>,
  );

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useMediaQuery).mockReturnValue(true); // desktop by default
    vi.mocked(useComponentStore).mockImplementation((selector) =>
      selector(buildComponentState()),
    );
  });

  // ── Desktop Version ──────────────────────────────────────────────────────
  describe('Desktop Version', () => {
    it('renders Layout.Sider on desktop', () => {
      renderComponent();
      expect(document.querySelector('.ant-layout-sider')).toBeInTheDocument();
      expect(document.querySelector('.ant-drawer')).not.toBeInTheDocument();
    });

    it('renders collapse trigger button', () => {
      renderComponent();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows ArrowLeftOutlined when sidebar is expanded', () => {
      renderComponent();
      expect(
        screen.getByRole('img', { name: 'arrow-left' }),
      ).toBeInTheDocument();
    });

    it('shows ArrowRightOutlined when sidebar is collapsed', () => {
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isMenuSidebarCollapsed: true })),
      );
      renderComponent();
      expect(
        screen.getByRole('img', { name: 'arrow-right' }),
      ).toBeInTheDocument();
    });

    it('calls toggleMenuSidebarCollapsed when trigger button is clicked', async () => {
      renderComponent();
      await userEvent.click(screen.getByRole('button'));
      expect(mockToggleMenuSidebarCollapsed).toHaveBeenCalledTimes(1);
    });

    it('renders menu items', () => {
      renderComponent();
      expect(screen.getByText('Homepage')).toBeInTheDocument();
      expect(screen.getByText('Things')).toBeInTheDocument();
    });

    it('navigates when a menu item is selected', async () => {
      renderComponent('/products'); // start on /products so Homepage is not selected
      await userEvent.click(screen.getByText('Homepage'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('does NOT call toggleMenuSidebarCollapsed after menu select on desktop', async () => {
      renderComponent('/products'); // start on /products so Homepage is not selected
      await userEvent.click(screen.getByText('Homepage'));
      expect(mockToggleMenuSidebarCollapsed).not.toHaveBeenCalled();
    });

    it('sets sider width to menuSidebarWidth (240)', () => {
      renderComponent();
      const sider = document.querySelector('.ant-layout-sider') as HTMLElement;
      expect(sider?.style.flex).toContain('240');
    });
  });

  // ── Mobile Version ───────────────────────────────────────────────────────
  describe('Mobile Version', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
    });

    it('renders Drawer on mobile', () => {
      renderComponent();
      expect(document.querySelector('.ant-drawer')).toBeInTheDocument();
      expect(
        document.querySelector('.ant-layout-sider'),
      ).not.toBeInTheDocument();
    });

    it('renders CompanyLogo in drawer title', () => {
      renderComponent();
      expect(screen.getByTestId('company-logo')).toBeInTheDocument();
    });

    it('drawer is open when isMenuSidebarCollapsed is false', () => {
      renderComponent();
      expect(document.querySelector('.ant-drawer-open')).toBeInTheDocument();
    });

    it('drawer is closed when isMenuSidebarCollapsed is true', () => {
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isMenuSidebarCollapsed: true })),
      );
      renderComponent();
      expect(
        document.querySelector('.ant-drawer-open'),
      ).not.toBeInTheDocument();
    });

    it('calls toggleMenuSidebarCollapsed when drawer is closed via onClose', async () => {
      renderComponent();
      const closeBtn = document.querySelector(
        '.ant-drawer-close',
      ) as HTMLElement;
      await userEvent.click(closeBtn);
      expect(mockToggleMenuSidebarCollapsed).toHaveBeenCalledTimes(1);
    });

    it('calls toggleMenuSidebarCollapsed after menu select on mobile', async () => {
      renderComponent('/products'); // start on /products so Homepage is not selected
      await userEvent.click(screen.getByText('Homepage'));
      expect(mockToggleMenuSidebarCollapsed).toHaveBeenCalledTimes(1);
    });

    it('navigates when a menu item is selected on mobile', async () => {
      renderComponent('/products'); // start on /products so Homepage is not selected
      await userEvent.click(screen.getByText('Homepage'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  // ── Dark Mode ────────────────────────────────────────────────────────────
  describe('Dark Mode', () => {
    it('applies dark class on mobile drawer when isDarkMode is true', () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isDarkMode: true })),
      );
      renderComponent();
      expect(
        document.querySelector('.ct_layout_dashboard__sidebar.dark'),
      ).toBeInTheDocument();
    });

    it('does not apply dark class on mobile drawer when isDarkMode is false', () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderComponent();
      expect(
        document.querySelector('.ct_layout_dashboard__sidebar.dark'),
      ).not.toBeInTheDocument();
    });
  });

  // ── Active Menu & Open Keys ──────────────────────────────────────────────
  describe('Active Menu & Open Keys', () => {
    it('highlights Homepage when on / path', () => {
      renderComponent('/');
      expect(
        document.querySelector('.ant-menu-item-selected'),
      ).toHaveTextContent('Homepage');
    });

    it('opens Things submenu when on /products path', () => {
      renderComponent('/products');
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('opens Things submenu when on /users path', () => {
      renderComponent('/users');
      expect(screen.getByText('Users')).toBeInTheDocument();
    });

    it('does NOT open Things submenu when sidebar is collapsed and on /products', () => {
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isMenuSidebarCollapsed: true })),
      );
      // When collapsed, defaultOpenKeys returns [''] — Things is not expanded
      renderComponent('/products');
      expect(
        document.querySelector('.ant-menu-submenu-open'),
      ).not.toBeInTheDocument();
    });
  });
});
