import { editUIEndpointName } from '../common';

export enum UIEndpointsUsers {
  BASE = '/users',
  DETAIL = ':id',
  EDIT = `${editUIEndpointName}/:id`,
  ADD = 'add',
}
