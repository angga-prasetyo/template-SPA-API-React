import { Card, Layout, Row } from 'antd';
import cx from 'classnames';

import imgCompanyLogo from '@/assets/images/img__company_logo.svg';
import { CTSeoMeta } from '@/components/ct-seo-meta/component';
import { useComponentStore } from '@/stores/component/store';

import type { CTLayoutAuthProps } from './type';

import './style.scss';

const CTLayoutAuthComponent: React.FC<CTLayoutAuthProps> = ({
  children,
  className,
  isWithoutLogo = false,
  meta,
  subtitle,
  title,
  ...rest
}) => {
  const { isDarkMode } = useComponentStore((state) => state);
  return (
    <Layout
      className={cx('ct_layout_auth__main', className, isDarkMode && 'dark')}
      {...rest}>
      <CTSeoMeta meta={meta} />
      <Card className="ct_layout_auth__card">
        {!isWithoutLogo && (
          <Row justify={'center'}>
            <img
              src={imgCompanyLogo}
              alt="Company Logo"
              className="ct_layout_auth__logo"
            />
          </Row>
        )}

        <h1 className="ct_layout_auth__title">{title}</h1>
        {subtitle && <p className="ct_layout_auth__subtitle">{subtitle}</p>}

        <div className="ct_layout_auth__inner">{children}</div>
      </Card>
    </Layout>
  );
};

export default CTLayoutAuthComponent;
