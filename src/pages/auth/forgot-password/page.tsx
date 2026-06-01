import { useCallback } from 'react';

import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { CTForm } from '@/components/ct-form/component';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { CTLayoutAuth } from '@/layouts/auth';
import { ForgotPasswordPayload } from '@/types/api/auth';

import { FormFields, pageMeta } from './constant';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (value: ForgotPasswordPayload) => {
    // TODO: Remove console
    // eslint-disable-next-line no-console
    console.info({ value });
  };

  const handleToLogin = useCallback(
    () => navigate(UIEndpointsAuth.LOGIN),
    [navigate],
  );

  return (
    <CTLayoutAuth
      title="Forgot Password Company"
      subtitle="Please input your email and we will send you link to reset your password."
      meta={pageMeta}>
      <CTForm onFinish={handleSubmit} className="w-full mb--5">
        <Form.Item name={FormFields.EMAIL} className="mb--1">
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" block htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </CTForm>
      <Button onClick={handleToLogin} block variant="solid">
        Back to Login
      </Button>
    </CTLayoutAuth>
  );
};

export default ForgotPasswordPage;
