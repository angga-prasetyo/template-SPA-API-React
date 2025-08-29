import { message } from 'antd';
import type { NavigateFunction } from 'react-router-dom';

import { UIEndpointsThings } from '@/constants';
import { APICommonError } from '@/types';
import { capitalize } from '@/utils/string';

export const handleUsersFormSuccess = (
  isEdit: boolean,
  navigate: NavigateFunction
) => {
  message.open({
    content: `User has been ${isEdit ? 'edit' : 'creat'}ed successfully.`,
    type: 'success',
  });
  navigate(UIEndpointsThings.users.BASE, { replace: true });
};

export const handleUsersFormError = (err: APICommonError) => {
  if (typeof err.message !== 'string') {
    err.message.forEach((msg) => {
      message.open({
        content: capitalize(msg, { isFirstCharOnly: true }),
        type: 'error',
      });
    });
    return;
  }

  message.open({
    content: capitalize(err?.message, { isFirstCharOnly: true }),
    type: 'error',
  });
};
