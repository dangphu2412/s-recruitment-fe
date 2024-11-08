import { useMemo } from 'react';
import { MoreActionCell } from '../../../../shared/ui/Table/Cell/MoreActionCell';
import {
  useDeleteUserGroupMutation,
  USER_GROUPS_QUERY_KEY
} from '../../../../entities/user/models/user-group.model';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../../shared/models/notify';
import { Tag, Tooltip } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/table-core';

export type UserGroupView = {
  id: string;
  name: string;
  description: string;
  users: { id: string; email: string }[];
};

const columnHelper = createColumnHelper<UserGroupView>();

export function useUserGroupColumns() {
  const { mutate: deleteUserGroup } = useDeleteUserGroupMutation();
  const notify = useNotify();
  const queryClient = useQueryClient();
  return useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name'
      }),
      columnHelper.accessor('description', {
        header: 'Description'
      }),
      columnHelper.accessor('users', {
        header: 'Emails',
        cell: props => {
          return (
            <div className={'flex flex-col gap-1'} key={props.row.id}>
              {props
                .getValue()
                .slice(0, 3)
                .map(user => (
                  <Tag
                    key={user.id}
                    colorScheme="yellow"
                    variant="solid"
                    className={'w-fit'}
                  >
                    {user.email}
                  </Tag>
                ))}
              {props.getValue().length > 3 && (
                <span className={'w-fit'}>
                  <Tooltip
                    label={
                      <div className={'space-y-1'}>
                        {props.getValue().map(user => (
                          <div key={user.id}>{user.email}</div>
                        ))}
                      </div>
                    }
                  >
                    ...
                  </Tooltip>
                </span>
              )}
            </div>
          );
        }
      }),
      columnHelper.display({
        header: 'Actions',
        cell: props => {
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
      })
    ],
    [deleteUserGroup, notify, queryClient]
  );
}
