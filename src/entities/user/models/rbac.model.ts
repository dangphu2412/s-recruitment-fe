import { useMutation, useQuery } from 'react-query';
import {
  accessControlApiClient,
  CreateRolePayload,
  GetRolesQuery,
  UpdateAssignedPersonRolePayload,
  UpdateRolePayload
} from '../api';
import { create } from 'zustand/react';

export function useMutateSaveRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateRolePayload) =>
      accessControlApiClient.updateRolePermissions(request),
    mutationKey: 'MUTATION_SAVE_ROLES'
  });

  return { saveRoles: mutate, isLoading };
}

export function useMutateCreateNewRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: CreateRolePayload) =>
      accessControlApiClient.createRole(request),
    mutationKey: 'MUTATION_NEW_ROLES'
  });

  return { addRole: mutate, isLoading };
}

export function useMutateUpdateAssignedPersonsToRole() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateAssignedPersonRolePayload) =>
      accessControlApiClient.updateAssignedPerson(request),
    mutationKey: 'MUTATION_ASSIGNED_PERSON'
  });

  return { assignUsers: mutate, isLoading };
}

export const QUERY_CONTROL_LIST = 'QUERY_CONTROL_LIST';

export function useQueryControlList(
  query: GetRolesQuery = {} as GetRolesQuery
) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: QUERY_CONTROL_LIST,
    queryFn: () => accessControlApiClient.getRoles(query)
  });

  return { allRoles: data, isLoading, isSuccess };
}

export function useQueryMyRoles() {
  const { data, isLoading } = useQuery({
    queryKey: ['MY_ROLES'],
    queryFn: () => accessControlApiClient.getMyRoles()
  });

  return { myRoles: data, isLoading };
}

export function useQueryPermissions() {
  const { data } = useQuery({
    queryKey: 'QUERY_PERMISSIONS',
    queryFn: () => accessControlApiClient.getPermissions()
  });

  return { data };
}

type RoleStore = {
  selectedRoleId: string | null;
  isAddingRole: boolean;
  hasUnsavedChanges: boolean;
};

export const useRoleStore = create<RoleStore>(() => {
  return {
    selectedRoleId: null,
    isAddingRole: false,
    hasUnsavedChanges: false
  };
});
