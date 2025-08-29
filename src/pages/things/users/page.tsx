import { useCallback } from 'react';

import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Row, Space, type TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { CTTable } from '@/components';
import { UIEndpointsThings } from '@/constants';
import { CTLayoutDashboard } from '@/layouts';
import { capitalize } from '@/utils';

import { pageMeta } from './constant';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();

  const handleToAddPage = useCallback(() => {
    navigate(UIEndpointsThings.users.ADD);
  }, [navigate]);

  const columns: TableColumnsType<unknown> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (value) => {
        return <>{capitalize(value)}</>;
      },
    },
    {
      key: 'creationAt',
      title: 'Created Date',
      dataIndex: 'creationAt',
      render: (value) => {
        return <>{dayjs(value).format('YYYY-MM-DD')}</>;
      },
    },
  ];

  return (
    <CTLayoutDashboard meta={pageMeta} titlePage="Users">
      <Card>
        <Row className="mb--2" justify={'end'}>
          <Button type="primary" onClick={handleToAddPage}>
            <Space>
              <PlusCircleOutlined />
              Add User
            </Space>
          </Button>
        </Row>

        <CTTable columns={columns} dataSource={[]} scroll={{ x: '200%' }} />
      </Card>
    </CTLayoutDashboard>
  );
};

export default UsersPage;
