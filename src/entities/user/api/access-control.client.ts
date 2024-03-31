import { ControlList, UpdateRolePayload } from '../models/rbac/rbac.types';
import { authorizedHttpClient } from '../../../shared/api/factories/http-client.factories';

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
