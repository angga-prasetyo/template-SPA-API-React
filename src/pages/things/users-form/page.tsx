import { useEffect, useMemo } from 'react';

import { Button, Card, Form, Input, Select } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CTForm } from '@/components';
import { APIHooksThings } from '@/hooks';
import { CTLayoutDashboard } from '@/layouts';
import { UserCommonPayload } from '@/types';

import { FormFields, pageMeta, formRules } from './constant';
import { handleUsersFormError, handleUsersFormSuccess } from './util';

import './style.scss';

const UsersFormPage: React.FC = () => {
  // #region Helper Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams() || {};
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

  // #region Mutator and Query
  const {
    mutate: mutateCreateUser,
    isPending: isCreating,
    error: errorCreate,
    isSuccess: successCreate,
  } = APIHooksThings.useCreateUser();
  useEffect(() => {
    if (successCreate) {
      handleUsersFormSuccess(isEdit, navigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCreate]);
  useEffect(() => {
    if (errorCreate) {
      handleUsersFormError(errorCreate);
    }
  }, [errorCreate]);
  const {
    mutate: mutateUpdateUser,
    isPending: isUpdating,
    error: errorUpdate,
    isSuccess: successUpdate,
  } = APIHooksThings.useUpdateUser();
  useEffect(() => {
    if (successUpdate) {
      handleUsersFormSuccess(isEdit, navigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successUpdate]);
  useEffect(() => {
    if (errorUpdate) {
      handleUsersFormError(errorUpdate);
    }
  }, [errorUpdate]);

  const { data: getSingleUserData, isSuccess } =
    APIHooksThings.useGetSingleUser({
      params: params.id,
      options: {
        enabled: Boolean(isEdit && params.id),
      },
    });
  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        ...getSingleUserData,
        [FormFields.CONFIRM_PASSWORD]: getSingleUserData.password,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, getSingleUserData]);

  // #endregion

  const isSubmitting = isCreating || isUpdating;

  // #region Event Handler
  const handleSubmit = (value: UserCommonPayload) => {
    const payload = { ...value };

    delete payload?.conf_password;

    if (!payload?.avatar) {
      payload.avatar = `https://ui-avatars.com/api/?name=${value[
        FormFields.NAME
      ]?.replace(/\s/g, '+')}`;
    }

    if (isEdit) {
      mutateUpdateUser({ id: params.id || '', payload });
      return;
    }

    mutateCreateUser({ payload });
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
                <Button
                  htmlType="reset"
                  type="primary"
                  ghost
                  disabled={isSubmitting}>
                  Reset
                </Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button htmlType="submit" type="primary" loading={isSubmitting}>
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
