import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const {
  tablePropsSpy,
  useLocationMock,
  navigateMock,
  useMediaQueryMock,
  paramParsifyMock,
  paramStringifyMock,
  generateUrlWithParamsMock,
} = vi.hoisted(() => ({
  tablePropsSpy: vi.fn(),
  useLocationMock: vi.fn(),
  navigateMock: vi.fn(),
  useMediaQueryMock: vi.fn(),
  paramParsifyMock: vi.fn(),
  paramStringifyMock: vi.fn(),
  generateUrlWithParamsMock: vi.fn(),
}));

vi.mock('antd', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Table: (props: any) => {
    tablePropsSpy(props);
    return <div data-testid="table" />;
  },
}));

vi.mock('react-router-dom', () => ({
  useLocation: useLocationMock,
  useNavigate: () => navigateMock,
}));

vi.mock('usehooks-ts', () => ({
  useMediaQuery: useMediaQueryMock,
}));

vi.mock('@/utils/url', () => ({
  paramParsify: paramParsifyMock,
  paramStringify: paramStringifyMock,
  generateUrlWithParams: generateUrlWithParamsMock,
}));

vi.mock('./style.scss', () => ({}));

import { QueryKeysUsers } from '@/constants/query-keys/things/users';

import { CTTable } from './component';

describe('CTTable', () => {
  beforeEach(() => {
    tablePropsSpy.mockReset();
    useLocationMock.mockReset();
    navigateMock.mockReset();
    useMediaQueryMock.mockReset();
    paramParsifyMock.mockReset();
    paramStringifyMock.mockReset();
    generateUrlWithParamsMock.mockReset();

    useLocationMock.mockReturnValue({
      pathname: '/users',
      search: '?page=2&limit=25',
    });
    useMediaQueryMock.mockReturnValue(true);
    paramParsifyMock.mockReturnValue({ page: '2', limit: '25' });
    paramStringifyMock.mockReturnValue('page=3&limit=10');
    generateUrlWithParamsMock.mockReturnValue('/users?page=3&limit=10');
  });

  it('builds default table props from URL params', () => {
    render(<CTTable dataSource={[]} columns={[]} />);
    const props = tablePropsSpy.mock.calls[0][0];

    expect(props.className).toBe('ct_table ');
    expect(props.rowKey).toBe('id');
    expect(props.scroll).toEqual({ x: '100%' });
    expect(props.pagination.current).toBe(2);
    expect(props.pagination.pageSize).toBe(25);
    expect(props.pagination.defaultCurrent).toBe(2);
    expect(props.pagination.defaultPageSize).toBe(25);
    expect(typeof props.pagination.showTotal).toBe('function');
    expect(props.pagination.showTotal(100, [1, 10])).toBe(
      'Showing 1 - 10 from 100',
    );
  });

  it('navigates with updated params when customParams is false', () => {
    render(<CTTable dataSource={[]} columns={[]} />);
    const props = tablePropsSpy.mock.calls[0][0];

    props.onChange({ current: 3, pageSize: 10 }, {}, {});

    expect(paramStringifyMock).toHaveBeenCalledWith({ page: 3, limit: 10 });
    expect(generateUrlWithParamsMock).toHaveBeenCalledWith(
      '/users',
      'page=3&limit=10',
    );
    expect(navigateMock).toHaveBeenCalledWith('/users?page=3&limit=10', {
      replace: false,
    });
  });

  it('calls pagination and sorting handlers when customParams is true', () => {
    const onChangePagination = vi.fn();
    const onChangeSort = vi.fn();

    render(
      <CTTable
        columns={[]}
        customParams
        dataSource={[]}
        onChangePagination={onChangePagination}
        onChangeSort={onChangeSort}
      />,
    );

    const props = tablePropsSpy.mock.calls[0][0];
    props.onChange(
      { current: 4, pageSize: 50 },
      {},
      { columnKey: QueryKeysUsers.ALL, order: 'ascend' },
    );

    expect(onChangePagination).toHaveBeenCalledWith(4, 50);
    expect(onChangeSort).toHaveBeenCalledWith(QueryKeysUsers.ALL, 'ascend');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('uses mobile pagination config and custom defaults', () => {
    useMediaQueryMock.mockReturnValue(false);

    render(<CTTable dataSource={[]} columns={[]} customParams />);
    const props = tablePropsSpy.mock.calls[0][0];

    expect(props.pagination.showTotal).toBeUndefined();
    expect(props.pagination.defaultCurrent).toBe(1);
    expect(props.pagination.defaultPageSize).toBe(10);
  });

  it('uses fallback pagination defaults when URL has no page/limit', () => {
    paramParsifyMock.mockReturnValue({});

    render(<CTTable dataSource={[]} columns={[]} />);
    const props = tablePropsSpy.mock.calls[0][0];

    expect(props.pagination.current).toBe(1);
    expect(props.pagination.pageSize).toBe(10);
    expect(props.pagination.defaultCurrent).toBe(1);
    expect(props.pagination.defaultPageSize).toBe(10);
  });

  it('keeps parsed params when pagination current is missing', () => {
    render(<CTTable dataSource={[]} columns={[]} />);
    const props = tablePropsSpy.mock.calls[0][0];

    props.onChange({ pageSize: 10 }, {}, {});

    expect(paramStringifyMock).toHaveBeenCalledWith({ page: '2', limit: '25' });
    expect(generateUrlWithParamsMock).toHaveBeenCalledWith(
      '/users',
      'page=3&limit=10',
    );
    expect(navigateMock).toHaveBeenCalledWith('/users?page=3&limit=10', {
      replace: false,
    });
  });
});
