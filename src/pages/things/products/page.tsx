import { Typography } from 'antd';

import { CTLayoutDashboard } from '@/layouts/dashboard';

import { pageMeta } from './constant';

const ProductsPage: React.FC = () => {
  return (
    <CTLayoutDashboard meta={pageMeta} titlePage="Products" searchProps>
      <Typography.Title className="mb--2" level={3}>
        This is an example of products page.
      </Typography.Title>
      <Typography.Paragraph>
        I create this as a placeholder. You can delete this page if unnecessary.
      </Typography.Paragraph>
    </CTLayoutDashboard>
  );
};

export default ProductsPage;
