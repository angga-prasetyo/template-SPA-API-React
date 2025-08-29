import { useCallback, useMemo, useRef, useState } from 'react';

import {
  CloseCircleOutlined,
  CloseOutlined,
  MoonOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Col,
  Drawer,
  Layout,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import MenuIcon from '@/assets/icons/menu-icon.svg?react';
import CompanyLogo from '@/assets/images/img__company_logo.svg?react';
import { CTDebouncedSearch } from '@/components';
import { UIEndpointsCommon } from '@/constants';
import { useComponentStore } from '@/stores';

import { HeaderProps } from './type';

import './style.scss';

export const Header: React.FC<HeaderProps> = ({ searchProps, titlePage }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const headerRef = useRef<HTMLElement>(null);
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
                <Avatar size={150} />
              </Row>
            </Col>
            <Col span={24}>
              <Space className="w-full" direction="vertical" align="center">
                <Typography.Text type="secondary" strong>
                  Name
                </Typography.Text>
                <Typography.Title level={4}>
                  Expedita Molestiae Et
                </Typography.Title>
              </Space>
            </Col>
            <Col span={24}>
              <Space className="w-full" direction="vertical" align="center">
                <Typography.Text type="secondary" strong>
                  Role
                </Typography.Text>
                <Typography.Title level={4}>Lorem</Typography.Title>
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
        </div>
      </Drawer>
    </Layout.Header>
  );
};
