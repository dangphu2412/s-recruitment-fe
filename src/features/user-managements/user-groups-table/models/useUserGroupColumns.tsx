import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { MoreActionCell } from '../../../../shared/ui/Table/Cell/MoreActionCell';
import {
  useDeleteUserGroupMutation,
  USER_GROUPS_QUERY_KEY
} from '../../../../entities/user/models/user-group.model';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../../shared/models/notify';

export type UserGroupView = {
  id: string;
  name: string;
  description: string;
};

export function useUserGroupColumns(): Column<UserGroupView>[] {
  const { mutate: deleteUserGroup } = useDeleteUserGroupMutation();
  const notify = useNotify();
  const queryClient = useQueryClient();
  return useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        Cell: (props: CellProps<UserGroupView, string>) => {
          function renderActions() {
            return [
              {
                key: `DELETE_GROUP${props.row.original.id}`,
                content: 'Delete',
                onClick: () => {
                  deleteUserGroup(
                    { id: props.row.original.id },
                    {
                      onSuccess: () => {
                        notify({
                          title: 'Delete user group successfully',
                          status: 'success'
                        });
                        queryClient.invalidateQueries({
                          queryKey: [USER_GROUPS_QUERY_KEY]
                        });
                      }
                    }
                  );
                }
              }
            ];
          }

          return <MoreActionCell renderActions={renderActions} />;
        }
      }
    ],
    []
  );
}
