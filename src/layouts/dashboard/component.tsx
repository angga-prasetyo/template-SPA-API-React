import { useMemo } from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout } from 'antd';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { CTSeoMeta } from '@/components';
import { editUIEndpointName } from '@/constants';
import { useComponentStore } from '@/stores';
import { capitalize } from '@/utils';

import { Header, Sidebar } from './components';
import { CTLayoutDashboardProps } from './type';

import './style.scss';

const CTLayoutDashboardComponent: React.FC<CTLayoutDashboardProps> = ({
  breadcrumbProps,
  children,
  className,
  meta,
  titlePage,
  searchProps,
  ...rest
}) => {
  const { pathname } = useLocation();
  const { isDarkMode } = useComponentStore((state) => state);

  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split('/');

    const renderTitle = (path: string, idx: number) => {
      const pathLink = `/${path}` || '/';
      const titleText = capitalize(path || 'home');
      const lastIdx = paths?.length - 1;
      const isEdit = path === editUIEndpointName;

      if (idx === lastIdx || isEdit) {
        return titleText;
      }

      return <Link to={pathLink}>{titleText}</Link>;
    };

    return paths.map((path, idx) => ({
      title: renderTitle(path, idx),
    }));
  }, [pathname]);

  return (
    <Layout
      className={cx('ct_layout_dashboard', className, isDarkMode && 'dark')}
      {...rest}>
      <CTSeoMeta meta={meta} />

      <Header searchProps={searchProps} titlePage={titlePage} />
      <Layout>
        <Sidebar />
        <div id="content_container">
          {!breadcrumbProps?.isHidden && (
            <Breadcrumb
              className={cx(
                'ct_layout_dashboard__breadcrumb',
                breadcrumbProps?.className
              )}
              items={breadcrumbItems}
              separator={<RightOutlined />}
              {...breadcrumbProps}
            />
          )}

          <div id="content">{children}</div>
        </div>
      </Layout>
    </Layout>
  );
};

export default CTLayoutDashboardComponent;
