import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { CTForm } from '@/components/ct-form/component';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { CTLayoutAuth } from '@/layouts/auth';
import { RegisterPayload } from '@/types/api/auth';

import { FormFields, pageMeta } from './constant';

import './style.scss';

const RegisterPage: React.FC = () => {
  const handleSubmit = (value: RegisterPayload) => {
    // TODO: Remove console
    // eslint-disable-next-line no-console
    console.info({ value });
  };

  return (
    <CTLayoutAuth
      title="Register Company"
      subtitle="Let's create an account."
      meta={pageMeta}>
      <CTForm onFinish={handleSubmit} className="ct_register_page__form">
        <Form.Item name={FormFields.EMAIL} className="mb--1">
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name={FormFields.NAME} className="mb--1">
          <Input placeholder="Your name" />
        </Form.Item>
        <div className="ct_register_page__form__dual">
          <Form.Item name={FormFields.PASSWORD} className="mb--2">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name={FormFields.CONFIRM_PASSWORD} className="mb--2">
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </div>
        <Form.Item className="mb--2">
          <Link
            className="px--0"
            to={UIEndpointsAuth.FORGOT_PASSWORD}
            style={{ fontWeight: 600 }}>
            Forgot Password
          </Link>
        </Form.Item>
        <Form.Item className="mb--1">
          <Button type="primary" block htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item noStyle>
          <Link to={UIEndpointsAuth.LOGIN}>
            <Button type="primary" ghost block>
              Login
            </Button>
          </Link>
        </Form.Item>
      </CTForm>
    </CTLayoutAuth>
  );
};

export default RegisterPage;
