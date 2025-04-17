import { ControlList } from '../../../../entities/user/api';

export type RolePermissions = Record<string, string[]>;

export function mapToRolePermissions(roles: ControlList): RolePermissions {
  return roles.access.reduce((res, role) => {
    return {
      ...res,
      [role.id]: role.rights
        .filter(right => right.canAccess)
        .map(permission => permission.id)
    };
  }, {});
}
