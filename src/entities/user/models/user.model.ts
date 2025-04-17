import { OperationFee } from '../../monthly-money/models';
import { FilterKey } from '../../../shared/config';
import { DEFAULT_PAGINATION, Pagination } from '../../../shared/models';
import { useEffect } from 'react';
import { useNotify } from '../../../shared/models/notify';
import { AppError, useHandleError } from '../../../shared/models/error';
import { ClientErrorCode } from '../../../shared/config/constants/client-code';
import { useMutation, useQuery } from 'react-query';
import { GetUserQuery, userApiClient } from '../api';
import { parseFilterQuery } from '../../../shared/models/pagination';
import { UserStatus } from '../config';
import { create } from 'zustand';

export type UserDetail = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
};

export function getInitialOverviewState(): UserStore['overview'] {
  const defaultState: OverviewFilters = {
    ...DEFAULT_PAGINATION,
    search: '',
    userStatus: [],
    departmentIds: [],
    periodIds: []
  };
  return {
    filters: { ...defaultState },
    submission: { ...defaultState },
    selectedPaymentUserId: undefined
  };
}

type OverviewFilters = {
  userStatus: string[];
  departmentIds: string[];
  periodIds: string[];
  search: string;
} & Pagination;

type UserStore = {
  currentUser?: UserDetail;
  overview: {
    filters: OverviewFilters;
    submission: OverviewFilters;
    selectedPaymentUserId?: string;
  };
  setPagination: (pagination: Partial<Pagination>) => void;
  setFilter: (filter: Partial<OverviewFilters>) => void;
  toggleUserStatus: (status: UserStatus) => void;
  toggleDepartment: (id: string) => void;
  togglePeriod: (id: string) => void;
  setIsSubmitted: () => void;
  submitWithFilter: (filter: Partial<OverviewFilters>) => void;
  resetFilter: () => void;
  saveCurrentUser: (user: UserDetail) => void;
  setSelectedPaymentUserId: (id?: string) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  overview: getInitialOverviewState(),
  currentUser: undefined,
  sessionStatus: 'unauthenticated',
  setPagination: pagination => {
    set(state => ({
      overview: {
        ...state.overview,
        filters: {
          ...state.overview.filters,
          ...pagination
        },
        submission: {
          ...state.overview.submission,
          ...pagination
        }
      }
    }));
  },
  setFilter: filter => {
    set(state => {
      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            ...filter
          }
        }
      };
    });
  },
  toggleUserStatus: status => {
    set(state => {
      const current = state.overview.filters.userStatus || [];
      const exists = current.includes(status);
      const updated = exists
        ? current.filter(s => s !== status)
        : [...current, status];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            userStatus: updated
          }
        }
      };
    });
  },
  toggleDepartment: id => {
    set(state => {
      const current = state.overview.filters.departmentIds || [];
      const exists = current.includes(id);
      const updated = exists ? current.filter(v => v !== id) : [...current, id];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            departmentIds: updated
          }
        }
      };
    });
  },
  togglePeriod: id => {
    set(state => {
      const current = state.overview.filters.periodIds || [];
      const exists = current.includes(id);
      const updated = exists ? current.filter(v => v !== id) : [...current, id];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            periodIds: updated
          }
        }
      };
    });
  },
  setIsSubmitted: () => {
    set(state => ({
      overview: {
        ...state.overview,
        submission: {
          ...state.overview.filters
        }
      }
    }));
  },
  submitWithFilter: filter => {
    set(state => {
      return {
        overview: {
          ...state.overview,
          filters: { ...state.overview.filters },
          submission: {
            ...state.overview.filters
          }
        }
      };
    });
  },
  resetFilter: () => {
    set(state => ({
      overview: {
        ...state.overview,
        filters: getInitialOverviewState().filters
      }
    }));
  },
  saveCurrentUser: user => {
    set(() => ({ currentUser: user }));
  },
  setSelectedPaymentUserId: id => {
    set(state => ({
      overview: {
        ...state.overview,
        selectedPaymentUserId: id
      }
    }));
  }
}));

type UserSession = {
  user?: UserDetail;
  sessionStatus: 'authenticated' | 'unauthenticated' | 'verifying';
};

export function useUserSession(): UserSession {
  const saveCurrentUser = useUserStore(user => user.saveCurrentUser);
  const { profile, status } = useQueryMyProfile();

  function getSessionStatus() {
    if (status === 'loading') {
      return 'verifying';
    }

    if (status === 'success' && profile) {
      return 'authenticated';
    }

    return 'unauthenticated';
  }

  useEffect(
    function syncUserSession() {
      if (status !== 'success' || !profile) return;

      saveCurrentUser(profile);
    },
    [profile, saveCurrentUser, status]
  );

  return {
    user: profile,
    sessionStatus: getSessionStatus()
  };
}

export function useMutateCreateUser() {
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);
  const notify = useNotify();

  function handleMutateCreateUserError({ clientCode, message }: AppError) {
    if (clientCode === ClientErrorCode.USER_EMAIL_EXISTED) {
      return notify({
        title: 'Email existed',
        status: 'error',
        description: message
      });
    }

    if (clientCode === ClientErrorCode.NOT_FOUND_USER) {
      return notify({
        title: 'This user is not ready to become member',
        status: 'error',
        description: message
      });
    }

    notify({
      title: 'System is facing issue',
      status: 'error',
      description: message
    });
  }

  const handle = useHandleError({
    onHandleClientError: handleMutateCreateUserError
  });

  return useMutation({
    mutationKey: 'MUTATION_CREATE_USER',
    mutationFn: userApiClient.createUser,
    onSuccess() {
      notify({
        title: 'Create user successfully',
        status: 'success'
      });

      setIsSubmitted();
    },
    onError: handle
  });
}

export function useMutateUserActive() {
  const toast = useNotify();
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);

  return useMutation({
    mutationFn: userApiClient.toggleActive,
    mutationKey: 'MUTATION_TOGGLE_USER_STATUS',
    onSuccess() {
      toast({
        title: 'Toggle user active successfully',
        status: 'success'
      });

      setIsSubmitted();
    }
  });
}

export function useQueryMyProfile() {
  const { data, status } = useQuery({
    queryKey: 'QUERY_MY_PROFILE',
    queryFn: userApiClient.getMyProfile,
    enabled: true
  });

  return {
    profile: data,
    status
  };
}
export const QUERY_USER_DETAIL_KEY = 'QUERY_USER_DETAIL';

export function useQueryUserProfile(id: string) {
  const { data, status, isLoading } = useQuery({
    queryKey: [QUERY_USER_DETAIL_KEY, id],
    queryFn: () => userApiClient.getUserDetail(id),
    enabled: !!id
  });

  return {
    userDetail: data,
    status,
    isLoading
  };
}

export const QUERY_USER_ROLE_KEY = 'QUERY_USER_ROLES';

export function useQueryUserRoles(userId: string) {
  const { data, isSuccess } = useQuery({
    queryKey: QUERY_USER_ROLE_KEY,
    queryFn: () => userApiClient.getUserRoles(userId),
    enabled: userId !== ''
  });

  return { userRoles: data, isSuccess };
}

export const QUERY_USERS_KEY = 'QUERY_USERS';

type QueryUserOptions = {
  query: GetUserQuery;
  enabled?: boolean;
  onSuccess?: () => void;
};

export function useQueryUsers({ query, ...options }: QueryUserOptions) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      QUERY_USERS_KEY,
      query.page,
      query.size,
      query.search,
      query.userStatus?.toString(),
      query.departmentIds?.toString(),
      query.periodIds?.toString(),
      query.roleIds?.toString()
    ],
    queryFn: () => userApiClient.getMany(query),
    ...options
  });

  return { data, isLoading, isFetching };
}

export function useUserOverview() {
  const submission = useUserStore(user => user.overview.submission);

  return useQueryUsers({
    query: submission as GetUserQuery
  });
}

export function useProbationUsers({
  departmentId,
  periodId
}: {
  departmentId: string;
  periodId: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['users-probation', departmentId, periodId],
    queryFn: () =>
      userApiClient.getProbationUsers({
        filters: parseFilterQuery({
          departmentId: { type: FilterKey.EXACT, value: departmentId },
          periodId: { type: FilterKey.EXACT, value: periodId }
        }),
        pagination: {
          page: 1,
          size: 50
        }
      }),
    enabled: !!periodId
  });

  return {
    data,
    isLoading
  };
}

export function useMutateSaveUserRoles() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_SAVE_USER_ROLES',
    mutationFn: userApiClient.updateUserRoles
  });

  return { saveUserRoles: mutate, isLoading };
}

export function useMutateUpgradeMembers() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_UPDATE_MEMBERS',
    mutationFn: userApiClient.upgradeMembers
  });

  return { upgradeToMembers: mutate, isLoading };
}

export function useMutateUploadUserByFile() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_UPLOAD_USER_BY_FILE',
    mutationFn: userApiClient.uploadUserByFile
  });

  return { uploadUserByFile: mutate, isLoading };
}

export function useMutateUpdateUser() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_UPDATE_USER',
    mutationFn: userApiClient.updateUser
  });

  return { updateUser: mutate, isLoading };
}
