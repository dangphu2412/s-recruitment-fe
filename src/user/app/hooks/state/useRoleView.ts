import { useEffect, useState } from 'react';
import { useQueryUserRoles } from 'src/user/app/hooks/data/useQueryUserRoles';
import { useMutateSaveUserRoles } from 'src/user/app/hooks/data/useMutateSaveUserRoles';
import { useQueryControlList } from 'src/user/app/hooks/data/useQueryControlList';
import { useNotify } from 'src/system/app/internal/hooks/useNotify';

type RoleView = {
  name: string;
  id: string;
};

type RoleViewProps = {
  userId: string;
};

export function useRoleView({ userId }: RoleViewProps) {
  const [roleViews, setRoleViews] = useState<RoleView[]>([]);
  const [selectionViews, setSelectionViews] = useState<RoleView[]>([]);
  const [, setOwningRoles] = useState<string[]>([]);
  const notify = useNotify();

  const { userRoles } = useQueryUserRoles(userId);
  const { allRoles } = useQueryControlList();
  const { saveUserRoles } = useMutateSaveUserRoles();

  function addRole(id: string): void {
    setOwningRoles(prevRoleIds => {
      const newRoles = [...prevRoleIds, id];

      saveUserRoles(
        { userId, roleIds: newRoles },
        {
          onSuccess() {
            notify({
              title: 'Save roles',
              status: 'success'
            });
          }
        }
      );

      return newRoles;
    });
  }

  function removeRole(id: string): void {
    setOwningRoles(prevRoleIds => {
      const newRoles = prevRoleIds.filter(currentId => currentId !== id);

      saveUserRoles(
        { userId, roleIds: newRoles },
        {
          onSuccess() {
            notify({
              title: 'Save roles',
              status: 'success'
            });
          }
        }
      );

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
