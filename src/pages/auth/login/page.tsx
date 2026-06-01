import { useEffect } from 'react';

import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { CTForm } from '@/components/ct-form/component';
import { customService } from '@/configs/api/service';
import { UIEndpointsAuth } from '@/constants/ui-endpoints/auth';
import { UIEndpointsCommon } from '@/constants/ui-endpoints/common';
import { useLogin } from '@/hooks/api/auth';
import { CTLayoutAuth } from '@/layouts/auth';
import { useAuthStore } from '@/stores/auth/store';
import { LoginPayload } from '@/types/api/auth';

import { FormFields, formRules, pageMeta } from './constant';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const updateIsAuthenticated = useAuthStore(
    (state) => state.updateIsAuthenticated,
  );

  const { mutate, data, isPending: isLoading, error, isSuccess } = useLogin();
  useEffect(() => {
    if (isSuccess) {
      customService.setCredential({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      updateIsAuthenticated(true);
      navigate(UIEndpointsCommon.HOME, { replace: true });
      message.open({ content: 'Login successful.', type: 'success' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);
  useEffect(() => {
    if (error) {
      message.open({ content: error.message, type: 'error' });
      if (error?.statusCode === 401) {
        form.setFields([
          { name: FormFields.EMAIL, errors: [''] },
          {
            name: FormFields.PASSWORD,
            errors: ["Email and Password don't match"],
          },
        ]);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleSubmit = (value: LoginPayload) => {
    mutate(value);
  };

  return (
    <CTLayoutAuth
      title="Login Company"
      subtitle="Let's authenticate yourself before continue."
      meta={pageMeta}>
      <CTForm
        form={form}
        onFinish={handleSubmit}
        className="ct_login_page__form">
        <Form.Item
          name={FormFields.EMAIL}
          className="mb--1"
          rules={formRules.email}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name={FormFields.PASSWORD}
          className="mb--2"
          rules={formRules.password}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item className="mb--2">
          <Link
            className="px--0"
            to={UIEndpointsAuth.FORGOT_PASSWORD}
            style={{ fontWeight: 600 }}>
            Forgot Password
          </Link>
        </Form.Item>
        <Form.Item className="mb--1">
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Login
          </Button>
        </Form.Item>
        <Form.Item noStyle>
          <Link to={UIEndpointsAuth.REGISTER}>
            <Button type="primary" ghost block disabled={isLoading}>
              Register
            </Button>
          </Link>
        </Form.Item>
      </CTForm>
    </CTLayoutAuth>
  );
};

export default LoginPage;
