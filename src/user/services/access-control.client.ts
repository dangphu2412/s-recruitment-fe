import { ApiClient } from 'src/shared/services';
import { ControlList, UpdateRoleDto } from 'src/user/models/rbac.types';

export const AccessControlApiClient = {
  get(): Promise<ControlList> {
    return ApiClient.get<ControlList, unknown>('/roles');
  },
  async update(dto: UpdateRoleDto): Promise<void> {
    await ApiClient.put<void, UpdateRoleDto>(`/roles/${dto.id}`, dto);
  }
};
