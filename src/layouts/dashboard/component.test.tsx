/* eslint-disable import/order */
import { render, screen } from '@testing-library/react';
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

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

vi.mock('@/stores/component/store', () => ({
  useComponentStore: vi.fn(),
}));

vi.mock('@/components/ct-seo-meta/component', () => ({
  CTSeoMeta: ({ meta }: { meta?: object }) => (
    <div data-testid="ct-seo-meta" data-meta={JSON.stringify(meta)} />
  ),
}));

vi.mock('@/constants/ui-endpoints/common', () => ({
  editUIEndpointName: 'edit',
  UIEndpointsCommon: { HOME: '/' },
}));

vi.mock('@/constants/ui-endpoints/things/users', () => ({
  UIEndpointsUsers: { BASE: '/users' },
}));

vi.mock('@/constants/ui-endpoints/things/products', () => ({
  UIEndpointsProducts: { BASE: '/products' },
}));

vi.mock('@/utils/other', () => ({
  capitalize: vi.fn((value: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '',
  ),
  removeCredential: vi.fn(),
}));

vi.mock('./components/header/component', () => ({
  Header: ({ titlePage }: { titlePage?: React.ReactNode }) => (
    <div data-testid="header">{titlePage as React.ReactNode}</div>
  ),
}));

vi.mock('./components/sidebar/component', () => ({
  Sidebar: () => <div data-testid="sidebar" />,
}));

vi.mock('@/assets/images/img__company_logo.svg?react', () => ({
  default: () => <div data-testid="company-logo" />,
}));

// ── Imports (after mocks) ──────────────────────────────────────────────────

import { describe, it, expect, vi, beforeEach } from 'vitest';

import CTLayoutDashboardComponent from './component';
import type { CTLayoutDashboardProps } from './type';
import { useComponentStore } from '@/stores/component/store';
import { UseComponentStoreProps } from '@/stores/component/type';

// ── Mock state & helpers ───────────────────────────────────────────────────

const buildComponentState = (
  overrides: Partial<UseComponentStoreProps> = {},
): UseComponentStoreProps => ({
  isDarkMode: false,
  toggleIsDarkMode: vi.fn(),
  isMenuSidebarCollapsed: false,
  toggleMenuSidebarCollapsed: vi.fn(),
  resetState: vi.fn(),
  ...overrides,
});

const defaultProps: CTLayoutDashboardProps = {
  children: <div data-testid="children">Page Content</div>,
  titlePage: 'Test Page',
  searchProps: undefined,
};

const renderComponent = (
  props: Partial<CTLayoutDashboardProps> = {},
  initialPath = '/',
) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <CTLayoutDashboardComponent {...defaultProps} {...props} />
    </MemoryRouter>,
  );

// ── Tests ──────────────────────────────────────────────────────────────────

describe('CTLayoutDashboardComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useComponentStore).mockImplementation((selector) =>
      selector(buildComponentState()),
    );
  });

  // ── Rendering ─────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });

    it('renders Header', () => {
      renderComponent();
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders Sidebar', () => {
      renderComponent();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('renders CTSeoMeta', () => {
      renderComponent();
      expect(screen.getByTestId('ct-seo-meta')).toBeInTheDocument();
    });

    it('passes meta prop to CTSeoMeta', () => {
      const meta = { titlePage: 'Test', description: 'Desc' };
      renderComponent({ meta });
      expect(screen.getByTestId('ct-seo-meta')).toHaveAttribute(
        'data-meta',
        JSON.stringify(meta),
      );
    });

    it('renders children inside content container', () => {
      renderComponent();
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });
  });

  // ── Dark Mode ──────────────────────────────────────────────────────────
  describe('Dark Mode', () => {
    it('applies dark class when isDarkMode is true', () => {
      vi.mocked(useComponentStore).mockImplementation((selector) =>
        selector(buildComponentState({ isDarkMode: true })),
      );
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass('dark');
    });

    it('does not apply dark class when isDarkMode is false', () => {
      const { container } = renderComponent();
      expect(container.firstChild).not.toHaveClass('dark');
    });
  });

  // ── ClassName ──────────────────────────────────────────────────────────
  describe('ClassName', () => {
    it('always applies base class ct_layout_dashboard', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass('ct_layout_dashboard');
    });

    it('applies custom className when provided', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies both base and custom className together', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      expect(container.firstChild).toHaveClass(
        'ct_layout_dashboard',
        'custom-class',
      );
    });
  });

  // ── Breadcrumb ─────────────────────────────────────────────────────────
  describe('Breadcrumb', () => {
    it('renders breadcrumb by default', () => {
      renderComponent({}, '/products');
      expect(
        document.querySelector('.ct_layout_dashboard__breadcrumb'),
      ).toBeInTheDocument();
    });

    it('hides breadcrumb when isHidden is true', () => {
      renderComponent({ breadcrumbProps: { isHidden: true } });
      expect(
        document.querySelector('.ct_layout_dashboard__breadcrumb'),
      ).not.toBeInTheDocument();
    });

    it('shows breadcrumb when isHidden is false', () => {
      renderComponent({ breadcrumbProps: { isHidden: false } }, '/products');
      expect(
        document.querySelector('.ct_layout_dashboard__breadcrumb'),
      ).toBeInTheDocument();
    });

    it('applies custom breadcrumb className', () => {
      renderComponent(
        { breadcrumbProps: { className: 'custom-breadcrumb' } },
        '/products',
      );
      expect(document.querySelector('.custom-breadcrumb')).toBeInTheDocument();
    });
  });

  // ── Breadcrumb Items — renderTitle logic ───────────────────────────────
  describe('Breadcrumb Items — renderTitle logic', () => {
    it('renders root segment as link and last segment as plain text', () => {
      renderComponent({}, '/products');
      // root "" → idx 0, lastIdx 1 → Link "Home"
      // "products" → idx 1 === lastIdx → plain text "Products"
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: 'Products' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders intermediate path segments as links', () => {
      renderComponent({}, '/products/123');
      // "products" is idx 1, lastIdx is 2 → rendered as Link
      expect(
        screen.getByRole('link', { name: 'Products' }),
      ).toBeInTheDocument();
    });

    it('renders last path segment as plain text', () => {
      renderComponent({}, '/products/123');
      // "123" is last segment → plain text, no link
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: '123' }),
      ).not.toBeInTheDocument();
    });

    it('renders "edit" segment as plain text regardless of position', () => {
      renderComponent({}, '/products/edit/123');
      // "edit" matches editUIEndpointName → always plain text, even if not last
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: 'Edit' }),
      ).not.toBeInTheDocument();
    });

    it('capitalizes each breadcrumb segment', () => {
      renderComponent({}, '/products/detail');
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders correct link href for intermediate segment', () => {
      renderComponent({}, '/products/detail');
      const link = screen.getByRole('link', { name: 'Products' });
      expect(link).toHaveAttribute('href', '/products');
    });
  });
});
