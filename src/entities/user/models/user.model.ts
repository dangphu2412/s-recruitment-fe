import { OperationFee } from '../../monthly-money/models';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../../shared/config';
import { DEFAULT_PAGINATION, Pagination } from '../../../shared/models';
import {
  CombineSearchFilter,
  Filter,
  FilterParam
} from '../../../shared/models/filter.api';
import { useDispatch, useSelector } from 'react-redux';
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
import { AppStorage, createStoreModel } from '../../../shared/models/store';
import { UserStatus } from '../config';

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

export const selectOverviewState = (
  state: AppStorage<'UserDomain', UserDomain>
) => state.UserDomain.overview;

export const selectCurrentUser = (
  state: AppStorage<'UserDomain', UserDomain>
) => state.UserDomain.currentUser;

export const selectSubmission = createSelector(
  selectOverviewState,
  state => state.submission
);

export const selectPagination = createSelector(
  selectOverviewState,
  state => state.pagination
);

export const selectFilters = createSelector(
  selectOverviewState,
  state => state.filters
);

export const selectUserStatus = createSelector(
  selectOverviewState,
  state => state.filters.userStatus
);

export const selectDepartmentIds = createSelector(
  selectOverviewState,
  state => state.filters.departmentIds
);
export const selectPeriodIds = createSelector(
  selectOverviewState,
  state => state.filters.periodIds
);

export const selectPaymentUserId = createSelector(
  selectOverviewState,
  state => state.selectedPaymentUserId
);

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

const userSlice = createSlice({
  name: 'UserDomain',
  initialState: getInitialUserState(),
  reducers: {
    setPagination: (state, action: PayloadAction<Partial<Pagination>>) => {
      state.overview.pagination = {
        ...state.overview.pagination,
        ...action.payload
      };
      state.overview.submission = {
        pagination: state.overview.pagination,
        filters: state.overview.filters
      };
    },
    setFilter: (state, action: PayloadAction<FilterParam<AdminFilter>>) => {
      if (action.payload.query !== undefined) {
        state.overview.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
        return;
      }

      if (action.payload.joinedIn) {
        state.overview.filters.joinedIn = {
          type: FilterKey.RANGE,
          value: action.payload.joinedIn
        };
      }

      if (action.payload.userStatus !== undefined) {
        state.overview.filters.userStatus = {
          type: FilterKey.EXACT,
          value: action.payload.userStatus
        };
      }

      if (action.payload.departmentIds !== undefined) {
        state.overview.filters.departmentIds = {
          type: FilterKey.EXACT,
          value: action.payload.departmentIds
        };
      }

      if (action.payload.periodIds !== undefined) {
        state.overview.filters.periodIds = {
          type: FilterKey.EXACT,
          value: action.payload.periodIds
        };
      }
    },
    toggleUserStatus: (state, action: PayloadAction<UserStatus>) => {
      if (action.payload !== undefined) {
        const currentStatus = state.overview.filters.userStatus;

        if (currentStatus.value.includes(action.payload)) {
          state.overview.filters.userStatus = {
            type: FilterKey.EXACT,
            value: currentStatus.value.filter(
              status => status !== action.payload
            )
          };
          return;
        }

        state.overview.filters.userStatus = {
          type: FilterKey.EXACT,
          value: [...currentStatus.value, action.payload]
        };
      }
    },
    toggleDepartment: (state, action: PayloadAction<string>) => {
      if (action.payload !== undefined) {
        const currentDepartmentIds = state.overview.filters.departmentIds;

        if (currentDepartmentIds.value.includes(action.payload)) {
          state.overview.filters.departmentIds = {
            type: FilterKey.EXACT,
            value: currentDepartmentIds.value.filter(
              id => id !== action.payload
            )
          };
          return;
        }

        state.overview.filters.departmentIds = {
          type: FilterKey.EXACT,
          value: [...currentDepartmentIds.value, action.payload]
        };
      }
    },
    togglePeriod: (state, action: PayloadAction<string>) => {
      if (action.payload !== undefined) {
        const currentPeriodIds = state.overview.filters.periodIds;

        if (currentPeriodIds.value.includes(action.payload)) {
          state.overview.filters.periodIds = {
            type: FilterKey.EXACT,
            value: currentPeriodIds.value.filter(id => id !== action.payload)
          };
          return;
        }

        state.overview.filters.periodIds = {
          type: FilterKey.EXACT,
          value: [...currentPeriodIds.value, action.payload]
        };
      }
    },
    setIsSubmitted: state => {
      state.overview.submission = {
        pagination: state.overview.pagination,
        filters: state.overview.filters
      };
    },
    submitWithFilter: (
      state,
      action: PayloadAction<FilterParam<AdminFilter>>
    ) => {
      if (action.payload.query !== undefined) {
        state.overview.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
      }

      if (action.payload.joinedIn) {
        state.overview.filters.joinedIn = {
          type: FilterKey.RANGE,
          value: action.payload.joinedIn
        };
      }

      state.overview.submission = {
        pagination: state.overview.pagination,
        filters: state.overview.filters
      };
    },
    resetFilter: state => {
      state.overview.filters = getInitialOverviewState().filters;
    },
    saveCurrentUser: (state, action: PayloadAction<UserDetail>) => {
      state.currentUser = action.payload;
    },
    setSelectedPaymentUserId: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.overview.selectedPaymentUserId = action.payload;
    }
  }
});

export const userActions = userSlice.actions;

export const userStorage = createStoreModel('UserDomain', userSlice.reducer);

type UserSession = {
  user?: UserDetail;
  sessionStatus: 'authenticated' | 'unauthenticated' | 'verifying';
};

export function useUserSession(): UserSession {
  const dispatch = useDispatch();
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

      dispatch(userActions.saveCurrentUser(profile));
    },
    [dispatch, profile, status]
  );

  return {
    user: profile,
    sessionStatus: getSessionStatus()
  };
}

export function useMutateCreateUser() {
  const dispatch = useDispatch();
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

      dispatch(userActions.setIsSubmitted());
    },
    onError: handle
  });
}

export function useMutateUserActive() {
  const toast = useNotify();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: userApiClient.toggleActive,
    mutationKey: 'MUTATION_TOGGLE_USER_STATUS',
    onSuccess() {
      toast({
        title: 'Toggle user active successfully',
        status: 'success'
      });

      dispatch(userActions.setIsSubmitted());
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
  const { filters, pagination } = useSelector(selectSubmission);

  return useQueryUsers({
    filters,
    pagination
  });
}

export function useProbationUsers({
  domainId,
  periodId
}: {
  domainId: string;
  periodId: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['users-probation', domainId, periodId],
    queryFn: () =>
      userApiClient.getProbationUsers({
        filters: parseFilterQuery({
          domainId: { type: FilterKey.EXACT, value: domainId },
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
