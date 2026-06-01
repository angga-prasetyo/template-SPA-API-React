import { Button, Layout, Result } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';

const Error404: React.FC = () => {
  return (
    <Layout className="error_404_page">
      <Result
        className="error_404_page__illust"
        status="404"
        title="Oops..."
        subTitle="Sorry, the page you requested does not exist."
        extra={
          <Link to={UIEndpointsCommon.HOME}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Layout>
  );
};

export default Error404;
