import { useMemo } from 'react';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, MenuProps, Row } from 'antd';
import cx from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import CompanyLogo from '@/assets/images/img__company_logo.svg?react';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';
import { UIEndpointsProducts } from '@/constants/ui-endpoints/things/products';
import { UIEndpointsUsers } from '@/constants/ui-endpoints/things/users';
import { useComponentStore } from '@/stores/component/store';
import { SelectEventHandler } from '@/types/antd';

import { menuSidebarWidth } from '../../constant';

import './style.scss';

const menuItems: MenuProps['items'] = [
  {
    label: 'Homepage',
    key: UIEndpointsCommon.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: 'Things',
    key: 'things',
    icon: <TableOutlined />,
    children: [
      {
        label: 'Products',
        key: UIEndpointsProducts.BASE,
      },
      {
        label: 'Users',
        key: UIEndpointsUsers.BASE,
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDarkMode, isMenuSidebarCollapsed, toggleMenuSidebarCollapsed } =
    useComponentStore((state) => state);

  const currentPath = useMemo(() => `/${pathname.split('/')?.[1]}`, [pathname]);
  // TODO: currentOpen below need an adjustment if the route has children.
  const currentOpenMenu = useMemo(() => {
    if (
      ([UIEndpointsProducts.BASE, UIEndpointsUsers.BASE] as string[]).includes(
        currentPath,
      ) &&
      !isMenuSidebarCollapsed
    ) {
      return ['things'];
    }

    return [pathname.split('/')?.[0]];
  }, [currentPath, isMenuSidebarCollapsed, pathname]);

  const menuContent = useMemo(() => {
    const handleOnSelectMenu = ({ key }: SelectEventHandler) => {
      navigate(key);
      if (!isDesktop) {
        toggleMenuSidebarCollapsed();
      }
    };
    return (
      <Menu
        className="menu"
        defaultOpenKeys={currentOpenMenu}
        selectedKeys={[currentPath]}
        mode="inline"
        onSelect={handleOnSelectMenu}
        items={menuItems}
      />
    );
  }, [
    currentOpenMenu,
    currentPath,
    isDesktop,
    navigate,
    toggleMenuSidebarCollapsed,
  ]);

  // Mobile Version
  if (!isDesktop) {
    return (
      <Drawer
        className={cx('ct_layout_dashboard__sidebar', isDarkMode && 'dark')}
        open={!isMenuSidebarCollapsed}
        width={menuSidebarWidth}
        placement="left"
        title={<CompanyLogo />}
        onClose={() => toggleMenuSidebarCollapsed()}>
        {menuContent}
      </Drawer>
    );
  }

  // Desktop Version
  return (
    <Layout.Sider
      className="ct_layout_dashboard__sidebar"
      collapsed={isMenuSidebarCollapsed}
      width={menuSidebarWidth}>
      <Row justify="center" className="trigger">
        <Button
          onClick={() => toggleMenuSidebarCollapsed()}
          size="large"
          type="primary">
          {isMenuSidebarCollapsed ? (
            <ArrowRightOutlined />
          ) : (
            <ArrowLeftOutlined />
          )}
        </Button>
      </Row>
      {menuContent}
    </Layout.Sider>
  );
};
