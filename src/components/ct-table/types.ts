import { type PaginationProps, type TableProps } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CTTableProps extends TableProps<any> {
  paginationProps?: PaginationProps;
  customParams?: boolean;
  onChangePagination?: (page: number, limit: number) => void;
  onChangeSort?: (columnKey: string, order: string) => void;
  scrollX?: string;
}
