import { Card, Col, Row } from 'antd';

import { CTLayoutDashboard } from '@/layouts';

import { pageMeta } from './constant';

const HomePage: React.FC = () => {
  return (
    <CTLayoutDashboard
      breadcrumbProps={{
        isHidden: true,
      }}
      meta={pageMeta}
      titlePage="Homepage">
      <Row gutter={[24, 32]}>
        <Col xs={24} md={8}>
          <Card />
        </Col>
        <Col xs={24} md={8}>
          <Card />
        </Col>
        <Col xs={24} md={8}>
          <Card />
        </Col>
        <Col span={24}>
          <Card />
        </Col>
        <Col xs={24} md={12}>
          <Card />
        </Col>
        <Col xs={24} md={12}>
          <Card />
        </Col>
      </Row>
    </CTLayoutDashboard>
  );
};

export default HomePage;
