/* eslint-disable import/order */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mock window.matchMedia (required for Ant Design Row/breakpoints) ────────
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

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('@/stores/component/store', () => ({
  useComponentStore: vi.fn(),
}));

vi.mock('@/components/ct-seo-meta/component', () => ({
  CTSeoMeta: ({ meta }: { meta?: object }) => (
    <div data-testid="ct-seo-meta" data-meta={JSON.stringify(meta)} />
  ),
}));

vi.mock('@/assets/images/img__company_logo.svg', () => ({
  default: 'img__company_logo.svg',
}));

// ── Helpers ────────────────────────────────────────────────────────────────

import CTLayoutAuthComponent from './component';
import { useComponentStore } from '@/stores/component/store';

const mockUseComponentStore = vi.mocked(useComponentStore);

const mockStoreState = (overrides = {}) => ({
  isDarkMode: false,
  toggleIsDarkMode: vi.fn(),
  isMenuSidebarCollapsed: false,
  toggleMenuSidebarCollapsed: vi.fn(),
  resetState: vi.fn(),
  ...overrides,
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    title: 'Test Title',
    children: <div data-testid="children">Children Content</div>,
  };
  return render(<CTLayoutAuthComponent {...defaultProps} {...props} />);
};

// ── Tests ──────────────────────────────────────────────────────────────────

describe('CTLayoutAuthComponent', () => {
  beforeEach(() => {
    mockUseComponentStore.mockImplementation((selector) =>
      selector(mockStoreState()),
    );
  });

  // Rendering
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders title correctly', () => {
      renderComponent({ title: 'Login' });
      expect(
        screen.getByRole('heading', { name: 'Login' }),
      ).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      renderComponent();
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });

    it('renders CTSeoMeta component', () => {
      renderComponent();
      expect(screen.getByTestId('ct-seo-meta')).toBeInTheDocument();
    });
  });

  // Subtitle
  describe('Subtitle', () => {
    it('renders subtitle when provided', () => {
      renderComponent({ subtitle: 'Please login to continue' });
      expect(screen.getByText('Please login to continue')).toBeInTheDocument();
    });

    it('does not render subtitle when not provided', () => {
      renderComponent();
      expect(
        screen.queryByText('Please login to continue'),
      ).not.toBeInTheDocument();
    });
  });

  // Logo
  describe('Logo', () => {
    it('renders logo by default', () => {
      renderComponent();
      expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
    });

    it('renders logo when isWithoutLogo is false', () => {
      renderComponent({ isWithoutLogo: false });
      expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
    });

    it('does not render logo when isWithoutLogo is true', () => {
      renderComponent({ isWithoutLogo: true });
      expect(screen.queryByAltText('Company Logo')).not.toBeInTheDocument();
    });
  });

  // Dark Mode
  describe('Dark Mode', () => {
    it('applies dark class when isDarkMode is true', () => {
      mockUseComponentStore.mockImplementation((selector) =>
        selector(mockStoreState({ isDarkMode: true })),
      );
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass('dark');
    });

    it('does not apply dark class when isDarkMode is false', () => {
      const { container } = renderComponent();
      expect(container.firstChild).not.toHaveClass('dark');
    });
  });

  // ClassName
  describe('ClassName', () => {
    it('always applies base class ct_layout_auth__main', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass('ct_layout_auth__main');
    });

    it('applies custom className when provided', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies both base and custom className together', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      expect(container.firstChild).toHaveClass(
        'ct_layout_auth__main',
        'custom-class',
      );
    });
  });

  // Meta
  describe('Meta Props', () => {
    it('passes meta prop to CTSeoMeta', () => {
      const meta = { title: 'Login Page', description: 'Login description' };
      renderComponent({ meta });
      const seoMeta = screen.getByTestId('ct-seo-meta');
      expect(seoMeta).toHaveAttribute('data-meta', JSON.stringify(meta));
    });

    it('renders CTSeoMeta even when meta is not provided', () => {
      renderComponent();
      expect(screen.getByTestId('ct-seo-meta')).toBeInTheDocument();
    });
  });

  // Rest Props
  describe('Rest Props', () => {
    it('passes rest props to Layout', () => {
      renderComponent({ 'data-testid': 'custom-layout' });
      expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
    });
  });
});
