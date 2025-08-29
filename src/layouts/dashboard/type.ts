import { BreadcrumbProps, LayoutProps } from 'antd';

import { CTDebouncedSearchProps, CTSeoMetaProps } from '@/components';

export interface CTLayoutDashboardProps extends LayoutProps, CTSeoMetaProps {
  breadcrumbProps?: BreadcrumbProps & {
    /**
     * For hiding the breadcrumb if unneeded.
     *
     * @default
     * false
     */
    isHidden?: boolean;
  };
  /**
   * Title for your page. The title is customizable by using React Node or simply using a string.
   *
   * @example
   * <CTLayoutDashboard titlePage={<div><p>Welcome back,</p><h1>Custom Admin</h1></div>}>
   *   // .. children
   * </CTLayoutDashboard>
   */
  titlePage?: string | React.ReactNode;
  searchProps?: CTDebouncedSearchProps | boolean;
}
