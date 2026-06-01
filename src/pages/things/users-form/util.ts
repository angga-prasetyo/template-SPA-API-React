import { message } from 'antd';
import type { NavigateFunction } from 'react-router-dom';

import { UIEndpointsUsers } from '@/constants/ui-endpoints/things/users';
import { APICommonError } from '@/types/api/common';
import { capitalize } from '@/utils/string';

export const handleUsersFormSuccess = (
  isEdit: boolean,
  navigate: NavigateFunction,
) => {
  message.open({
    content: `User has been ${isEdit ? 'edit' : 'creat'}ed successfully.`,
    type: 'success',
  });
  navigate(UIEndpointsUsers.BASE, { replace: true });
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
