import { ApiClient } from '@modules/shared/services';
import { ControlList } from '@modules/user/models/rbac.types';

export const AccessControlApiClient = {
  get(): Promise<ControlList> {
    return ApiClient.get<ControlList, unknown>('/roles');
  }
};
