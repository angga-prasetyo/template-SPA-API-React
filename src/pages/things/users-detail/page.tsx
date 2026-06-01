import { useMemo, useState } from 'react';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { useGetSingleUser } from '@/hooks/api/things/users';
import { CTLayoutDashboard } from '@/layouts/dashboard';
import { capitalize } from '@/utils/string';

import { pageMeta } from './constant';

const UsersDetailPage: React.FC = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const params = useParams();
  const { data } = useGetSingleUser({ params: params.id });

  const password = useMemo(() => {
    if (!data?.password) return '-';
    return isShowPassword
      ? data?.password
      : data?.password.replace(/[\w\d\s]/g, '•');
  }, [data?.password, isShowPassword]);

  if (data?.name) pageMeta.titlePage = `${data?.name} - User || Custom`;

  const info = useMemo(
    () => [
      {
        label: 'Name',
        value: data?.name,
      },
      {
        label: 'Email',
        value: data?.email,
      },
      {
        label: 'Role',
        value: capitalize(data?.role),
      },
    ],
    [data],
  );

  return (
    <CTLayoutDashboard titlePage="User Detail" meta={pageMeta}>
      <Card>
        <Typography.Title level={4}>Detailed Information</Typography.Title>
        <Divider className="my--2" />
        <Row gutter={[24, 24]}>
          {info?.map(({ label, value }) => {
            return (
              <Col key={label} span={24}>
                <Space direction="vertical">
                  <Typography.Text type="secondary" strong>
                    {label}
                  </Typography.Text>
                  <Typography.Title level={5}>{value}</Typography.Title>
                </Space>
              </Col>
            );
          })}
          <Col span={24}>
            <Space direction="vertical">
              <Typography.Text type="secondary" strong>
                Password
              </Typography.Text>
              <Space align="center">
                <Typography.Text>{password}</Typography.Text>
                <Button
                  // style={{ padding: 0, paddingInline: 4, marginLeft: 4 }}
                  size="small"
                  type="link"
                  onClick={() => setIsShowPassword((prev) => !prev)}>
                  {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
    </CTLayoutDashboard>
  );
};

export default UsersDetailPage;
