import { useCallback, useMemo } from 'react';

import { Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import {
  generateUrlWithParams,
  paramParsify,
  paramStringify,
} from '@/utils/url';

import type { CTTableProps } from './types';
import './style.scss';

export const CTTable: React.FC<CTTableProps> = ({
  className,
  paginationProps,
  customParams,
  onChangePagination,
  onChangeSort,
  scrollX = '100%',
  ...antdTableProps
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const parsed = useMemo(() => paramParsify(location?.search), [location]);

  const handleOnChangeTable = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pagination: any, _filters: any, sorter: any) => {
      const parsedObj = { ...parsed };
      // handle pagination
      if (pagination?.current) {
        parsedObj.page = pagination?.current;
        parsedObj.limit = pagination?.pageSize;
      }

      // handle manual custom params
      if (customParams) {
        onChangePagination?.(pagination?.current, pagination?.pageSize);
        onChangeSort?.(sorter?.columnKey, sorter?.order);
      } else {
        // handle default use default params
        const stringified = paramStringify({
          ...parsed,
          ...parsedObj,
        });
        navigate(generateUrlWithParams(location?.pathname, stringified), {
          replace: false,
        });
      }
    },
    [
      parsed,
      customParams,
      onChangePagination,
      onChangeSort,
      navigate,
      location?.pathname,
    ],
  );

  return (
    <Table
      className={`ct_table ${className || ''}`}
      bordered
      pagination={{
        className: `ct_table_pagination ${paginationProps?.className || ''}`,
        position: ['bottomRight'],
        pageSizeOptions: [5, 10, 25, 50],
        showSizeChanger: true,
        ...(isDesktop
          ? {
              showTotal: (total, range) =>
                `Showing ${range[0]} - ${range[1]} from ${total}`,
            }
          : {}),
        ...(!customParams
          ? {
              defaultCurrent: Number(parsed?.page || 1),
              defaultPageSize: Number(parsed?.limit || 10),
              current: Number(parsed?.page || 1),
              pageSize: Number(parsed?.limit || 10),
            }
          : {
              defaultCurrent: Number(1),
              defaultPageSize: Number(10),
            }),
        ...paginationProps,
      }}
      onChange={handleOnChangeTable}
      rowKey="id"
      scroll={{ x: scrollX }}
      {...antdTableProps}
    />
  );
};
