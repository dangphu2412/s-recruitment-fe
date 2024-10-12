import { useEffect, useState } from 'react';
import { useNotify } from '../../../../shared/models/notify';
import {
  QUERY_USER_DETAIL_KEY,
  QUERY_USERS_KEY,
  useMutateSaveUserRoles,
  useQueryControlList,
  useQueryUserRoles
} from '../../../../entities/user/models';
import { useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();

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
            queryClient.invalidateQueries({
              queryKey: [QUERY_USERS_KEY]
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_USER_DETAIL_KEY]
            });
            notify({
              title: 'Roles Saved',
              status: 'success'
            });
          },
          onError() {
            notify({
              title: 'Roles Save Failed due to system error',
              status: 'error'
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
        name: role.name,
        isEditable: role.isEditable
      }))
      .filter(view => !owningRoleIds.includes(view.id))
      .filter(view => view.isEditable);

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
