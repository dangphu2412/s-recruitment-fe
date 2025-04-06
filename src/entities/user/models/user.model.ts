import { OperationFee } from '../../monthly-money/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../../shared/config';
import { DEFAULT_PAGINATION, Pagination } from '../../../shared/models';
import {
  CombineSearchFilter,
  Filter,
  FilterParam
} from '../../../shared/models/filter.api';
import { useEffect } from 'react';
import { useNotify } from '../../../shared/models/notify';
import { AppError, useHandleError } from '../../../shared/models/error';
import { ClientErrorCode } from '../../../shared/config/constants/client-code';
import { useMutation, useQuery } from 'react-query';
import { userApiClient } from '../api';
import {
  parseFilterQuery,
  parsePagination
} from '../../../shared/models/pagination';
import { createStoreModel } from '../../../shared/models/store';
import { UserStatus } from '../config';
import { create } from 'zustand';

export type UserDomain = {
  currentUser: UserDetail | null;
  sessionStatus: 'authenticated' | 'unauthenticated' | 'verifying';
  overview: AdminState;
};

export type UserDetail = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
};

export type AdminFilter = CombineSearchFilter<{
  joinedIn: Filter<FilterKey.RANGE, Date | null>;
  userStatus: Filter<FilterKey.EXACT, string[]>;
  departmentIds: Filter<FilterKey.EXACT, string[]>;
  periodIds: Filter<FilterKey.EXACT, string[]>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  submission: Pick<AdminState, 'pagination' | 'filters'>;
  selectedPaymentUserId?: string;
};

export function getInitialOverviewState(): AdminState {
  return {
    pagination: DEFAULT_PAGINATION,
    filters: {
      query: {
        type: FilterKey.LIKE,
        value: ''
      },
      joinedIn: {
        type: FilterKey.RANGE,
        value: {
          fromDate: null,
          toDate: null
        }
      },
      userStatus: {
        type: FilterKey.EXACT,
        value: []
      },
      departmentIds: {
        type: FilterKey.EXACT,
        value: []
      },
      periodIds: {
        type: FilterKey.EXACT,
        value: []
      }
    },
    submission: {
      pagination: {
        page: 1,
        size: 10
      },
      filters: {
        query: {
          type: FilterKey.LIKE,
          value: ''
        },
        joinedIn: {
          type: FilterKey.RANGE,
          value: {
            fromDate: null,
            toDate: null
          }
        },
        userStatus: {
          type: FilterKey.EXACT,
          value: []
        },
        departmentIds: {
          type: FilterKey.EXACT,
          value: []
        },
        periodIds: {
          type: FilterKey.EXACT,
          value: []
        }
      }
    },
    selectedPaymentUserId: undefined
  };
}

export function getInitialUserState(): UserDomain {
  return {
    overview: getInitialOverviewState(),
    currentUser: null,
    sessionStatus: 'unauthenticated'
  };
}

type UserStore = {
  currentUser?: UserDetail;
  overview: {
    pagination: Pagination;
    filters: AdminFilter;
    submission: {
      pagination: Pagination;
      filters: AdminFilter;
    };
    selectedPaymentUserId?: string;
  };
  setPagination: (pagination: Partial<Pagination>) => void;
  setFilter: (filter: FilterParam<AdminFilter>) => void;
  toggleUserStatus: (status: UserStatus) => void;
  toggleDepartment: (id: string) => void;
  togglePeriod: (id: string) => void;
  setIsSubmitted: () => void;
  submitWithFilter: (filter: FilterParam<AdminFilter>) => void;
  resetFilter: () => void;
  saveCurrentUser: (user: UserDetail) => void;
  setSelectedPaymentUserId: (id?: string) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: undefined,
  overview: {
    pagination: getInitialUserState().overview.pagination,
    filters: getInitialUserState().overview.filters,
    submission: {
      pagination: getInitialUserState().overview.pagination,
      filters: getInitialUserState().overview.filters
    },
    selectedPaymentUserId: undefined
  },
  setPagination: pagination => {
    const { overview } = get();
    const updatedPagination = { ...overview.pagination, ...pagination };
    set(state => ({
      overview: {
        ...state.overview,
        pagination: updatedPagination,
        submission: {
          ...state.overview.submission,
          pagination: updatedPagination
        }
      }
    }));
  },
  setFilter: filter => {
    set(state => {
      const updatedFilters = { ...state.overview.filters };

      if (filter.query !== undefined) {
        updatedFilters.query = { type: FilterKey.LIKE, value: filter.query };
      }
      if (filter.joinedIn) {
        updatedFilters.joinedIn = {
          type: FilterKey.RANGE,
          value: filter.joinedIn
        };
      }
      if (filter.userStatus !== undefined) {
        updatedFilters.userStatus = {
          type: FilterKey.EXACT,
          value: filter.userStatus
        };
      }
      if (filter.departmentIds !== undefined) {
        updatedFilters.departmentIds = {
          type: FilterKey.EXACT,
          value: filter.departmentIds
        };
      }
      if (filter.periodIds !== undefined) {
        updatedFilters.periodIds = {
          type: FilterKey.EXACT,
          value: filter.periodIds
        };
      }

      return {
        overview: {
          ...state.overview,
          filters: updatedFilters
        }
      };
    });
  },
  toggleUserStatus: status => {
    set(state => {
      const current = state.overview.filters.userStatus.value || [];
      const exists = current.includes(status);
      const updated = exists
        ? current.filter(s => s !== status)
        : [...current, status];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            userStatus: {
              type: FilterKey.EXACT,
              value: updated
            }
          }
        }
      };
    });
  },
  toggleDepartment: id => {
    set(state => {
      const current = state.overview.filters.departmentIds.value || [];
      const exists = current.includes(id);
      const updated = exists ? current.filter(v => v !== id) : [...current, id];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            departmentIds: {
              type: FilterKey.EXACT,
              value: updated
            }
          }
        }
      };
    });
  },
  togglePeriod: id => {
    set(state => {
      const current = state.overview.filters.periodIds.value || [];
      const exists = current.includes(id);
      const updated = exists ? current.filter(v => v !== id) : [...current, id];

      return {
        overview: {
          ...state.overview,
          filters: {
            ...state.overview.filters,
            periodIds: {
              type: FilterKey.EXACT,
              value: updated
            }
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
          pagination: state.overview.pagination,
          filters: state.overview.filters
        }
      }
    }));
  },
  submitWithFilter: filter => {
    set(state => {
      const newFilters = { ...state.overview.filters };
      if (filter.query !== undefined) {
        newFilters.query = { type: FilterKey.LIKE, value: filter.query };
      }
      if (filter.joinedIn) {
        newFilters.joinedIn = {
          type: FilterKey.RANGE,
          value: filter.joinedIn
        };
      }

      return {
        overview: {
          ...state.overview,
          filters: newFilters,
          submission: {
            pagination: state.overview.pagination,
            filters: newFilters
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
  filters: AdminFilter;
  pagination: Pagination;
  enabled?: boolean;
  onSuccess?: () => void;
};

export function useQueryUsers({
  filters,
  pagination,
  ...options
}: QueryUserOptions) {
  const { query, ...restFilters } = filters;
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_USERS_KEY, pagination, restFilters, query],
    queryFn: () =>
      userApiClient.getMany({
        filters: parseFilterQuery(filters),
        pagination: parsePagination(pagination.page, pagination.size)
      }),
    ...options
  });

  return { data, isLoading, isFetching };
}

export function useUserOverview() {
  const { filters, pagination } = useUserStore(
    user => user.overview.submission
  );

  return useQueryUsers({
    filters,
    pagination
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
