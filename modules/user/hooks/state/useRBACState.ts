import { ControlList, Right, Role } from '@modules/user/models/rbac.types';
import { useEffect, useRef, useState } from 'react';
import produce from 'immer';

type AccessControlState = Record<
  string,
  Role & {
    permissions: Record<string, Right>;
  }
>;
type PermissionMapToRole = Record<string, string>;

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

function buildPermissionMapToRole(rbac: ControlList): PermissionMapToRole {
  const map: Record<string, string> = {};

  rbac.access.forEach(role => {
    role.rights.forEach(right => {
      map[right.id] = role.id;
    });
  });

  return map;
}

export function useRBACState(rbac: ControlList | undefined) {
  const permissionMapToRoleIdRef = useRef<PermissionMapToRole>();
  const [rbacState, setRbacState] = useState<AccessControlState>(
    rbac ? buildState(rbac) : {}
  );

  function togglePermission(permissionId: string): void {
    setRbacState(baseState => {
      return produce(baseState, draft => {
        const roleId = (
          permissionMapToRoleIdRef.current as PermissionMapToRole
        )[permissionId];

        draft[roleId].permissions[permissionId].canAccess =
          !baseState[roleId].permissions[permissionId].canAccess;
      });
    });
  }

  function getRolePermissions(roleId: string) {
    return rbacState[roleId].permissions;
  }

  useEffect(() => {
    if (!permissionMapToRoleIdRef.current && rbac) {
      permissionMapToRoleIdRef.current = buildPermissionMapToRole(rbac);
      setRbacState(buildState(rbac));
    }
  }, [rbac]);

  return {
    rbacState,
    togglePermission,
    getPermissionMap: getRolePermissions
  };
}
