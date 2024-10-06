import { OperationFee } from '../../monthly-money/models';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../../shared/config';
import { Pagination } from '../../../shared/models';
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
  memberType: Filter<FilterKey.EXACT>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};

export const selectOverviewState = (
  state: AppStorage<'UserDomain', UserDomain>
) => state.UserDomain.overview;

export const selectJoinedInDates = createSelector(
  selectOverviewState,
  state => state.filters.joinedIn
);

export const selectMemberType = createSelector(
  selectOverviewState,
  state => state.filters.memberType
);

export function getInitialOverviewState(): AdminState {
  return {
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
      memberType: {
        type: FilterKey.EXACT,
        value: ''
      }
    },
    isSubmitted: true
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
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.overview.isSubmitted = true;
      state.overview.pagination = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterParam<AdminFilter>>) => {
      if (action.payload.query) {
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

      if (action.payload.memberType !== undefined) {
        state.overview.filters.memberType = {
          type: FilterKey.EXACT,
          value: action.payload.memberType
        };
      }
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.overview.isSubmitted = action.payload;
    },
    submitWithFilter: (
      state,
      action: PayloadAction<FilterParam<AdminFilter>>
    ) => {
      state.overview.isSubmitted = true;
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
    },
    resetFilter: state => {
      state.overview.filters = getInitialOverviewState().filters;
    },
    saveCurrentUser: (state, action: PayloadAction<UserDetail>) => {
      state.currentUser = action.payload;
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

      dispatch(userActions.setIsSubmitted(true));
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

      dispatch(userActions.setIsSubmitted(true));
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

export function useQueryUserProfile(id: string) {
  const { data, status } = useQuery({
    queryKey: 'QUERY_USER_DETAIL',
    queryFn: () => userApiClient.getUserDetail(id),
    enabled: !!id
  });

  return {
    userDetail: data,
    status
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
  const { data, isLoading } = useQuery({
    queryKey: QUERY_USERS_KEY,
    queryFn: () =>
      userApiClient.getMany({
        filters: parseFilterQuery(filters),
        pagination: parsePagination(pagination.page, pagination.size)
      }),
    ...options
  });

  return { data, isLoading };
}

export function useUserOverview() {
  const dispatch = useDispatch();
  const { isSubmitted, filters, pagination } = useSelector(selectOverviewState);

  return useQueryUsers({
    filters,
    pagination,
    enabled: isSubmitted,
    onSuccess() {
      dispatch(userActions.setIsSubmitted(false));
    }
  });
}

export function useMutateSaveUserRoles() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_SAVE_USER_ROLES',
    mutationFn: userApiClient.updateUserRoles
  });

  return { saveUserRoles: mutate, isLoading };
}
