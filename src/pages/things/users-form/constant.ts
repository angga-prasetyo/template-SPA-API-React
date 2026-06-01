import type { FormRule } from 'antd';

import { CTSeoMetaPropsMeta } from '@/components/ct-seo-meta/type';


export const pageMeta: CTSeoMetaPropsMeta = {
  descriptionPage: 'User form page for Custom Dashboard',
  titlePage: 'Add New User || Custom',
};

export enum FormFields {
  AVATAR = 'avatar',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'conf_password',
  NAME = 'name',
  ROLE = 'role',
}

export const formRules: Record<FormFields, FormRule[]> = {
  [FormFields.AVATAR]: [],
  [FormFields.EMAIL]: [
    {
      type: 'email',
      message: 'Email is not valid.',
      validateTrigger: 'onSubmit',
    },
    {
      required: true,
      message: 'Email is required.',
      validateTrigger: 'onSubmit',
    },
  ],
  [FormFields.PASSWORD]: [
    {
      required: true,
      message: 'Password is required',
      validateTrigger: 'onSubmit',
    },
    {
      min: 4,
      message: 'Password minimal 4 characters.',
      validateTrigger: 'onSubmit',
    },
  ],
  [FormFields.CONFIRM_PASSWORD]: [
    {
      required: true,
      message: 'Please confirm your password.',
      validateTrigger: 'onSubmit',
    },
    ({ getFieldValue }) => ({
      validator: (_, value) => {
        if (!value || getFieldValue(FormFields.PASSWORD) === value)
          return Promise.resolve();

        return Promise.reject(new Error("Password doesn't match!"));
      },
      validateTrigger: 'onSubmit',
    }),
  ],
  [FormFields.NAME]: [
    {
      required: true,
      message: 'Full name is required.',
      validateTrigger: 'onSubmit',
    },
  ],
  [FormFields.ROLE]: [{ required: true, message: 'Role is required.' }],
};
