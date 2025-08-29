import { Form } from 'antd';
import cx from 'classnames';

import type { CTFormProps } from './type';
import './style.scss';

export const CTForm: React.FC<CTFormProps> = ({
  children,
  className,
  layout = 'vertical',
  ...rest
}) => {
  return (
    <Form className={cx('ct_form', className)} layout={layout} {...rest}>
      {children}
    </Form>
  );
};
