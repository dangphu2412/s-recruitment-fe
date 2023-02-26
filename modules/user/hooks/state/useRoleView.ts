import { useEffect, useState } from 'react';
import { useQueryUserRoles } from '@modules/user/hooks/data/useQueryUserRoles';
import { useRouter } from 'next/router';
import { normalizeParam } from '@modules/shared/utils/router.utils';
import { useMutateSaveUserRoles } from '@modules/user/hooks/data/useMutateSaveUserRoles';
import { useQueryControlList } from '@modules/user/hooks/data/useQueryControlList';

type RoleView = {
  name: string;
  id: string;
};

export function useRoleView() {
  const [roleViews, setRoleViews] = useState<RoleView[]>([]);
  const [selectionViews, setSelectionViews] = useState<RoleView[]>([]);
  const [, setOwningRoles] = useState<string[]>([]);

  const {
    query: { userId: userIdPathParam }
  } = useRouter();
  const userId = normalizeParam(userIdPathParam);

  const { userRoles } = useQueryUserRoles(userId);
  const { allRoles } = useQueryControlList();
  const { saveUserRoles } = useMutateSaveUserRoles();

  function addRole(id: string): void {
    setOwningRoles(prevRoleIds => {
      const newRoles = [...prevRoleIds, id];

      saveUserRoles({ userId, roleIds: newRoles });

      return newRoles;
    });
  }

  function removeRole(id: string): void {
    setOwningRoles(prevRoleIds => {
      const newRoles = prevRoleIds.filter(currentId => currentId !== id);

      saveUserRoles({ userId, roleIds: newRoles });

      return newRoles;
    });
  }

  useEffect(() => {
    if (!userRoles || !allRoles) {
      return;
    }

    const owningViews = userRoles?.roles
      ? userRoles.roles.map(role => {
          return {
            id: role.id,
            name: role.name
          };
        })
      : [];
    const owningRoleIds = userRoles?.roles?.map(role => role.id) ?? [];
    const selectionView = allRoles.access
      .map(role => ({
        id: role.id,
        name: role.name
      }))
      .filter(view => !owningRoleIds.includes(view.id));

    setRoleViews(owningViews);
    setOwningRoles(owningRoleIds);
    setSelectionViews(selectionView);
  }, [allRoles, userRoles]);

  return {
    roleViews,
    selectionViews,
    addRole,
    removeRole
  };
}
