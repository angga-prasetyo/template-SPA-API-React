import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  CloseCircleOutlined,
  CloseOutlined,
  LogoutOutlined,
  MoonOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Layout,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd';
import cx from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import MenuIcon from '@/assets/icons/menu-icon.svg?react';
import CompanyLogo from '@/assets/images/img__company_logo.svg?react';
import { CTDebouncedSearch } from '@/components/ct-debounced-search/component';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';
import { useGetUserInfo } from '@/hooks/api/auth';
import { useAuthStore } from '@/stores/auth/store';
import { useComponentStore } from '@/stores/component/store';
import { removeCredential } from '@/utils/other';

import { HeaderProps } from './type';

import './style.scss';

export const Header: React.FC<HeaderProps> = ({ searchProps, titlePage }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const { userInfo, updateUserInfo } = useAuthStore((state) => state);
  const { isDarkMode, toggleIsDarkMode, toggleMenuSidebarCollapsed } =
    useComponentStore((state) => state);

  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleShowSearch = useCallback(() => {
    setShowSearch((state) => !state);
  }, []);

  const toggleShowSettings = useCallback(() => {
    setShowSettings((state) => !state);
  }, []);

  const { data: getUserInfoData, isSuccess: successGetUserInfo } =
    useGetUserInfo({
      options: {
        enabled: !userInfo,
      },
    });
  useEffect(() => {
    if (successGetUserInfo) {
      updateUserInfo({
        avatar: getUserInfoData.avatar,
        name: getUserInfoData.name,
        role: getUserInfoData.role,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserInfoData, successGetUserInfo]);

  const dynamicLeftComponent = useMemo(() => {
    if (!isDesktop) {
      // render mobile version of left component
      return (
        <MenuIcon
          className="clickable menu_trigger"
          onClick={() => toggleMenuSidebarCollapsed()}
        />
      );
    }
    return (
      <Link to={UIEndpointsCommon.HOME}>
        <CompanyLogo />
      </Link>
    );
  }, [isDesktop, toggleMenuSidebarCollapsed]);

  const dynamicCenterComponent = useMemo(() => {
    const width = isDesktop ? '50dvw' : '45dvw';
    if (showSearch) {
      return (
        <CTDebouncedSearch
          width={width}
          autoFocus
          {...(typeof searchProps === 'object' ? searchProps : {})}
        />
      );
    }
    const title =
      typeof titlePage === 'string' ? (
        <Typography.Title
          title={titlePage}
          level={4}
          style={{ width }}
          ellipsis>
          {titlePage}
        </Typography.Title>
      ) : (
        titlePage
      );
    return title;
  }, [isDesktop, searchProps, showSearch, titlePage]);

  const dynamicSearchTrigger = useMemo(() => {
    if (!searchProps) {
      return <></>;
    }

    if (showSearch) {
      return (
        <CloseCircleOutlined
          className="clickable"
          onClick={() => toggleShowSearch()}
        />
      );
    }

    return (
      <SearchOutlined
        className="clickable"
        onClick={() => toggleShowSearch()}
      />
    );
  }, [searchProps, showSearch, toggleShowSearch]);

  const handleLogout = useCallback(() => {
    removeCredential();
    navigate(UIEndpointsAuth.LOGIN, { replace: true });
  }, [navigate]);

  return (
    <Layout.Header className="ct_layout_dashboard__header" ref={headerRef}>
      <div className="left_container">{dynamicLeftComponent}</div>
      <Row className="w-full pl--5" align={'middle'} justify={'space-between'}>
        <div className="center_container">{dynamicCenterComponent}</div>
        <Space size={24} className="right_container pt--1">
          {dynamicSearchTrigger}
          <SettingOutlined className="clickable" onClick={toggleShowSettings} />
        </Space>
      </Row>
      <Drawer
        className={cx('settings_drawer', isDarkMode && 'dark')}
        open={showSettings}
        title={
          <Row justify={'space-between'}>
            <Typography.Title level={4}>Settings</Typography.Title>
            <CloseOutlined className="clickable" onClick={toggleShowSettings} />
          </Row>
        }
        onClose={toggleShowSettings}
        closeIcon={false}
        width={isDesktop ? 375 : '100%'}>
        <div className="content">
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <Row justify={'center'}>
                <Avatar src={userInfo?.avatar} size={150} />
              </Row>
            </Col>
            <Col span={24}>
              <Space className="w-full" direction="vertical" align="center">
                <Typography.Text type="secondary" strong>
                  Name
                </Typography.Text>
                <Typography.Title level={4}>{userInfo?.name}</Typography.Title>
              </Space>
            </Col>
            <Col span={24}>
              <Space className="w-full" direction="vertical" align="center">
                <Typography.Text type="secondary" strong>
                  Role
                </Typography.Text>
                <Typography.Title level={4}>{userInfo?.role}</Typography.Title>
              </Space>
            </Col>
            <Col span={24}>
              <Space className="w-full" direction="vertical" align="center">
                <Typography.Text type="secondary" strong>
                  Dark Mode
                </Typography.Text>
                <Switch
                  checked={isDarkMode}
                  onChange={toggleIsDarkMode}
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                />
              </Space>
            </Col>
          </Row>
          <Button
            onClick={handleLogout}
            className="w-full"
            danger
            size="large"
            type="primary">
            <Space>
              Logout
              <LogoutOutlined />
            </Space>
          </Button>
        </div>
      </Drawer>
    </Layout.Header>
  );
};
