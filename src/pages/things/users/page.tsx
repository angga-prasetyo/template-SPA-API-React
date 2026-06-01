import { useCallback } from 'react';

import {
  EditOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Dropdown,
  Row,
  Space,
  type TableColumnsType,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { CTTable } from '@/components/ct-table/component';
import { UIEndpointsUsers } from '@/constants/ui-endpoints/things/users';
import { useGetAllUsers } from '@/hooks/api/things/users';
import { CTLayoutDashboard } from '@/layouts/dashboard';
import { GetSingleUserResponse } from '@/types/api/things/users';
import { capitalize } from '@/utils/string';

import { pageMeta } from './constant';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsers();

  const handleToAddPage = useCallback(() => {
    navigate(UIEndpointsUsers.ADD);
  }, [navigate]);

  const columns: TableColumnsType<GetSingleUserResponse> = [
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
    {
      key: 'id',
      fixed: 'right',
      align: 'center',
      dataIndex: 'id',
      width: 80,
      render: (value) => {
        return (
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: 'EDIT',
                  title: 'Edit',
                  label: <>Edit</>,
                  icon: <EditOutlined />,
                  onClick: () =>
                    navigate(UIEndpointsUsers.EDIT.replace(':id', value)),
                },
                {
                  key: 'DETAIL',
                  title: 'Detail',
                  label: <>Detail</>,
                  icon: <ProfileOutlined />,
                  onClick: () =>
                    navigate(UIEndpointsUsers.DETAIL.replace(':id', value)),
                },
              ],
            }}>
            <Button type="link">
              <MoreOutlined />
            </Button>
          </Dropdown>
        );
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

        <CTTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          scroll={{ x: '200%' }}
        />
      </Card>
    </CTLayoutDashboard>
  );
};

export default UsersPage;
