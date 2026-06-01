import { Card, Layout, Skeleton } from 'antd';
import cx from 'classnames';

import { useComponentStore } from '@/stores/component/store';

import './style.scss';

export const CTLayoutAuthLoader: React.FC = () => {
  const { isDarkMode } = useComponentStore((state) => state);
  return (
    <Layout className={cx('ct_layout_auth__main', isDarkMode && 'dark')}>
      <Card className="ct_layout_auth__card">
        <Skeleton.Input size="large" className="mb--2" />
        <Skeleton.Input size="large" className="mb--1" />
        <Skeleton.Input size="small" className="mb--2" />
        <Skeleton.Input className="mb--1" />
        <Skeleton.Input />
      </Card>
    </Layout>
  );
};
