import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { useAuthStoreMock } = vi.hoisted(() => ({
  useAuthStoreMock: vi.fn(),
}));

vi.mock('@/stores/auth/store', () => ({
  useAuthStore: useAuthStoreMock,
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
  Navigate: ({ to, replace }: { to: string; replace: boolean }) => (
    <div data-replace={String(replace)} data-testid="navigate" data-to={to} />
  ),
}));

import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';

import { CTRouteGuard } from './component';

describe('CTRouteGuard', () => {
  beforeEach(() => {
    useAuthStoreMock.mockReset();
  });

  it('renders Outlet for private route when authenticated', () => {
    useAuthStoreMock.mockImplementation((selector) =>
      selector({ isAuthenticated: true }),
    );

    render(<CTRouteGuard isPrivate />);

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('redirects to login for private route when unauthenticated', () => {
    useAuthStoreMock.mockImplementation((selector) =>
      selector({ isAuthenticated: false }),
    );

    render(<CTRouteGuard isPrivate />);

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      UIEndpointsAuth.LOGIN,
    );
    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-replace',
      'true',
    );
  });

  it('renders Outlet for public route when unauthenticated', () => {
    useAuthStoreMock.mockImplementation((selector) =>
      selector({ isAuthenticated: false }),
    );

    render(<CTRouteGuard />);

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('redirects to home for public route when authenticated', () => {
    useAuthStoreMock.mockImplementation((selector) =>
      selector({ isAuthenticated: true }),
    );

    render(<CTRouteGuard />);

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      UIEndpointsCommon.HOME,
    );
    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-replace',
      'true',
    );
  });
});
