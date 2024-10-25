import { useMutation, useQuery } from 'react-query';
import { userGroupApiClient } from '../api/user-group-api-client';

export const USER_GROUPS_QUERY_KEY = 'user-groups';

export function useUserGroupQuery() {
  return useQuery({
    queryKey: [USER_GROUPS_QUERY_KEY],
    queryFn: () =>
      userGroupApiClient.getUserGroups({
        page: 1,
        size: 10
      })
  });
}

export function useCreateUserGroupMutation() {
  return useMutation({
    mutationKey: 'create-user-groups',
    mutationFn: userGroupApiClient.createUserGroup
  });
}

export function useDeleteUserGroupMutation() {
  return useMutation({
    mutationKey: 'delete-user-groups',
    mutationFn: userGroupApiClient.deleteUserGroup
  });
}
