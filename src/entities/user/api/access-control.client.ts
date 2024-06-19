import { authorizedHttpClient } from '../../../shared/api';

export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Role = {
  id: string;
  name: string;
  isEditable: boolean;
  description: string;
};

export type Right = Permission & { canAccess: boolean };
export type ControlList = {
  access: (Role & {
    rights: Right[];
  })[];
};

export type UpdateRolePayload = {
  id: string;
  rights: Array<string>;
};

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
