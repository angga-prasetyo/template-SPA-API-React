import { Layout, Row, Skeleton, Spin } from 'antd';
import { useMediaQuery } from 'usehooks-ts';

import { useComponentStore } from '@/stores/component/store';

import { menuSidebarWidth } from './constant';

import './style.scss';
import './components/header/style.scss';
import './components/sidebar/style.scss';

const { Header, Sider } = Layout;

export const CTLayoutDashboardLoader: React.FC = () => {
  const { isMenuSidebarCollapsed } = useComponentStore((state) => state);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Layout className="ct_layout_dashboard">
      <Header className="ct_layout_dashboard__header">
        <Skeleton.Button rootClassName="ct_layout_dashboard__root_skeleton" />
      </Header>

      <Layout>
        {isDesktop && (
          <Sider
            className="ct_layout_dashboard__sidebar"
            collapsed={isMenuSidebarCollapsed}
            width={menuSidebarWidth}>
            <Row justify="center" className="trigger">
              <Skeleton.Button rootClassName="ct_layout_dashboard__root_skeleton mb--2" />
            </Row>
            <div>
              <Skeleton.Button rootClassName="ct_layout_dashboard__root_skeleton mb--2" />
              <Skeleton.Button rootClassName="ct_layout_dashboard__root_skeleton mb--2" />
              <Skeleton.Button rootClassName="ct_layout_dashboard__root_skeleton mb--2" />
            </div>
          </Sider>
        )}
        <div id="content_container">
          <Row justify="center" className="mt--10">
            <Spin />
          </Row>
        </div>
      </Layout>
    </Layout>
  );
};
