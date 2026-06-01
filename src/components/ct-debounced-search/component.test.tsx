import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const {
  useLocationMock,
  navigateMock,
  paramParsifyMock,
  paramStringifyMock,
  generateUrlWithParamsMock,
  useDebounceCallbackMock,
} = vi.hoisted(() => ({
  useLocationMock: vi.fn(),
  navigateMock: vi.fn(),
  paramParsifyMock: vi.fn(),
  paramStringifyMock: vi.fn(),
  generateUrlWithParamsMock: vi.fn(),
  useDebounceCallbackMock: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: useLocationMock,
  useNavigate: () => navigateMock,
}));

vi.mock('usehooks-ts', () => ({
  useDebounceCallback: useDebounceCallbackMock,
}));

vi.mock('@/utils/url', () => ({
  paramParsify: paramParsifyMock,
  paramStringify: paramStringifyMock,
  generateUrlWithParams: generateUrlWithParamsMock,
}));

import { CTDebouncedSearch } from './component';

describe('CTDebouncedSearch', () => {
  beforeEach(() => {
    useLocationMock.mockReset();
    navigateMock.mockReset();
    paramParsifyMock.mockReset();
    paramStringifyMock.mockReset();
    generateUrlWithParamsMock.mockReset();
    useDebounceCallbackMock.mockReset();

    useLocationMock.mockReturnValue({
      pathname: '/users',
      search: '?search=john',
      state: { from: 'test' },
    });
    paramParsifyMock.mockReturnValue({ search: 'john', page: '1' });
    paramStringifyMock.mockReturnValue('search=doe&page=1');
    generateUrlWithParamsMock.mockReturnValue('/users?search=doe&page=1');
    useDebounceCallbackMock.mockImplementation((fn) => fn);
  });

  it('renders with default keyword parsed from location', () => {
    render(<CTDebouncedSearch />);

    expect(screen.getByPlaceholderText('Search...')).toHaveValue('john');
  });

  it('updates query params and triggers callbacks on change', () => {
    const onFinishDebounce = vi.fn();
    const onSearching = vi.fn();

    render(
      <CTDebouncedSearch
        onFinishDebounce={onFinishDebounce}
        onSearching={onSearching}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'doe' },
    });

    expect(onSearching).toHaveBeenNthCalledWith(1, true);
    expect(paramStringifyMock).toHaveBeenCalledWith({
      search: 'doe',
      page: '1',
    });
    expect(generateUrlWithParamsMock).toHaveBeenCalledWith(
      '/users',
      'search=doe&page=1',
    );
    expect(navigateMock).toHaveBeenCalledWith('/users?search=doe&page=1', {
      state: { from: 'test' },
    });
    expect(onFinishDebounce).toHaveBeenCalledWith('doe');
    expect(onSearching).toHaveBeenNthCalledWith(2, false);
  });

  it('supports custom search param and disabled URL sync', () => {
    const onFinishDebounce = vi.fn();
    paramParsifyMock.mockReturnValue({ keyword: 'alpha' });

    render(
      <CTDebouncedSearch
        customSearchParams="keyword"
        enableSearchParams={false}
        onFinishDebounce={onFinishDebounce}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'beta' },
    });

    expect(paramStringifyMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
    expect(onFinishDebounce).toHaveBeenCalledWith('beta');
  });

  it('uses empty default value when keyword is not present', () => {
    paramParsifyMock.mockReturnValue({});

    render(<CTDebouncedSearch />);

    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
  });
});
