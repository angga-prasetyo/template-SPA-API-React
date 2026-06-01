import type { FormRule } from 'antd';

import { CTSeoMetaPropsMeta } from '@/components/ct-seo-meta/type';


export const pageMeta: CTSeoMetaPropsMeta = {
  descriptionPage: 'Login page for Custom Dashboard',
  titlePage: 'Login || Custom',
};

export enum FormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const formRules: Record<FormFields, FormRule[]> = {
  [FormFields.EMAIL]: [
    {
      type: 'email',
      message: 'Email is not valid.',
      validateTrigger: 'onSubmit',
    },
    {
      required: true,
      message: 'Please insert your email',
      validateTrigger: 'onSubmit',
    },
  ],
  [FormFields.PASSWORD]: [
    {
      required: true,
      message: 'Please insert your password',
      validateTrigger: 'onSubmit',
    },
  ],
};
