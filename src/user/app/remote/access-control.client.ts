import {
  ControlList,
  UpdateRolePayload
} from 'src/user/domain/models/rbac.types';
import { authorizedHttpClient } from '../../../system/infrastructure/factories/http-client.factories';

export const accessControlApiClient = {
  get(): Promise<ControlList> {
    return authorizedHttpClient.request<ControlList>({
      method: 'get',
      url: '/roles'
    });
  },
  async update(payload: UpdateRolePayload): Promise<void> {
    await authorizedHttpClient.request<ControlList>({
      method: 'put',
      url: `/roles/${payload.id}`,
      data: payload
    });
  }
};
