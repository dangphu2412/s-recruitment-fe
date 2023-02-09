import { ControlList, Right, Role } from '@modules/user/models/rbac.types';
import { useEffect, useState } from 'react';

type AccessControlState = Record<
  string,
  Role & {
    permissions: Record<string, Right>;
  }
>;

function buildState(rbac: ControlList): AccessControlState {
  const state: AccessControlState = {};

  rbac.access.forEach(({ rights, ...role }) => {
    state[role.id] = {
      ...role,
      permissions: {}
    };
    rights.forEach(right => {
      state[role.id].permissions[right.id] = right;
    });
  });

  return state;
}

export function useRBACState(rbac: ControlList | undefined) {
  const [rbacState, setRbacState] = useState<AccessControlState>(
    rbac ? buildState(rbac) : {}
  );

  function togglePermission(roleId: string, permissionId: string): void {
    setRbacState(baseState => {
      const role = baseState[roleId];

      role.permissions[permissionId].canAccess =
        !role.permissions[permissionId].canAccess;

      return {
        ...baseState,
        [roleId]: {
          ...role,
          permissions: {
            ...role.permissions
          }
        }
      };
    });
  }

  function getRolePermissions(roleId: string) {
    return rbacState[roleId].permissions;
  }

  useEffect(() => {
    if (rbac) {
      setRbacState(buildState(rbac));
    }
  }, [rbac]);

  return {
    rbacState,
    togglePermission,
    getPermissionMap: getRolePermissions
  };
}
