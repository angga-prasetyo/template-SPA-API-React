import { useMemo } from 'react';

import { Button, Card, Form, Input, Select } from 'antd';
import { useLocation } from 'react-router-dom';

import { CTForm } from '@/components';
import { CTLayoutDashboard } from '@/layouts';

import { FormFields, pageMeta, formRules } from './constant';

import './style.scss';

const UsersFormPage: React.FC = () => {
  // #region Helper Hooks
  const location = useLocation();
  const [form] = Form.useForm();
  // #endregion

  // #region Variables
  const isEdit = useMemo(
    () => location.pathname.split('/').includes('edit'),
    [location.pathname]
  );
  const makeTitle = useMemo(() => {
    return `${isEdit ? 'Edit' : 'New'} User`;
  }, [isEdit]);
  // #endregion

  if (isEdit) pageMeta.titlePage = 'Edit User || Custom';

  // #endregion

  // #region Event Handler
  const handleSubmit = (value: Record<string, unknown>) => {
    const payload = { ...value };

    delete payload?.conf_password;

    if (!payload?.avatar) {
      payload.avatar = `https://ui-avatars.com/api/?name=${(
        value as { [key: string]: string }
      )?.[FormFields.NAME]?.replace(/\s/g, '+')}`;
    }

    return;
  };
  // #endregion

  return (
    <CTLayoutDashboard titlePage={makeTitle} meta={pageMeta}>
      <Card>
        <CTForm form={form} onFinish={handleSubmit}>
          <Form.Item
            name={FormFields.EMAIL}
            label="Email"
            rules={formRules.email}>
            <Input placeholder="dummy@mail.com" />
          </Form.Item>
          <Form.Item noStyle>
            <div className="ct_users_form__dual">
              <Form.Item
                name={FormFields.PASSWORD}
                label="Password"
                rules={formRules.password}
                style={{ width: '100%' }}>
                <Input.Password />
              </Form.Item>
              <Form.Item
                name={FormFields.CONFIRM_PASSWORD}
                label="Confirm Password"
                rules={formRules.conf_password}
                style={{ width: '100%' }}>
                <Input.Password />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            name={FormFields.NAME}
            rules={formRules.name}
            label="Full Name">
            <Input placeholder="Dummy" />
          </Form.Item>
          <Form.Item
            name={FormFields.ROLE}
            label="Role"
            rules={formRules.role}
            initialValue="">
            <Select>
              <Select.Option value="">---Select Role---</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="customer">Customer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item noStyle>
            <div className="ct_users_form__actions">
              <Form.Item noStyle>
                <Button htmlType="reset" type="primary" ghost>
                  Reset
                </Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form.Item>
        </CTForm>
      </Card>
    </CTLayoutDashboard>
  );
};

export default UsersFormPage;
