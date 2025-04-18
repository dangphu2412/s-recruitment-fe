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
    totalUsers?: number;
    rights: Right[];
  })[];
};

export type UpdateRolePayload = {
  id: string;
  rights: Array<string>;
};

export type UpdateAssignedPersonRolePayload = {
  id: number;
  userIds: Array<string>;
};

export type CreateRolePayload = {
  name: string;
  isEditable: boolean;
  description: string;
};

export type GetRolesQuery = {
  hasTotalUsers?: boolean;
};

export const accessControlApiClient = {
  getRoles(query: GetRolesQuery): Promise<ControlList> {
    return authorizedHttpClient.request<ControlList>({
      method: 'get',
      url: '/roles',
      params: query
    });
  },
  getPermissions(): Promise<Permission[]> {
    return authorizedHttpClient.request<Permission[]>({
      method: 'get',
      url: '/permissions'
    });
  },
  createRole(role: CreateRolePayload): Promise<void> {
    return authorizedHttpClient.request<void>({
      method: 'post',
      data: role,
      url: '/roles'
    });
  },
  async updateRolePermissions(payload: UpdateRolePayload): Promise<void> {
    await authorizedHttpClient.request<void>({
      method: 'put',
      url: `/roles/${payload.id}`,
      data: payload
    });
  },
  async updateAssignedPerson(
    payload: UpdateAssignedPersonRolePayload
  ): Promise<void> {
    await authorizedHttpClient.request<void>({
      method: 'put',
      url: `/roles/${payload.id}/users`,
      data: payload
    });
  }
};
