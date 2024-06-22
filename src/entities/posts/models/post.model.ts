import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../../shared/config';
import { Pagination } from '../../../shared/models';
import {
  CombineSearchFilter,
  Filter,
  FilterParam
} from '../../../shared/models/filter.api';
import { isNil } from '../../../shared/models/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { parsePagination } from '../../../shared/models/pagination';
import { AppStorage, createStoreModel } from '../../../shared/models/store';
import { postApiClient } from '../api';

export type PostDomain = {
  overview: PostOverviewState;
};

export type PostOverviewFilter = CombineSearchFilter<{
  category: Filter<FilterKey.EXACT>;
}>;

export type PostOverviewState = {
  pagination: Pagination;
  filters: PostOverviewFilter;
  isSubmitted: boolean;
};

export const selectOverviewState = (
  state: AppStorage<'PostDomain', PostDomain>
) => state.PostDomain.overview;

export function getInitialOverviewState(): PostOverviewState {
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
      category: {
        type: FilterKey.EXACT,
        value: ''
      }
    },
    isSubmitted: true
  };
}

export function getInitialPostState(): PostDomain {
  return {
    overview: getInitialOverviewState()
  };
}

const postSlice = createSlice({
  name: 'PostDomain',
  initialState: getInitialPostState(),
  reducers: {
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.overview.isSubmitted = true;
      state.overview.pagination = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<FilterParam<PostOverviewFilter>>
    ) => {
      if (action.payload.query) {
        state.overview.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
        return;
      }

      if (action.payload.category !== undefined) {
        state.overview.filters.category = {
          type: FilterKey.EXACT,
          value: action.payload.category
        };
      }
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.overview.isSubmitted = action.payload;
    },
    submitWithFilter: (
      state,
      action: PayloadAction<FilterParam<PostOverviewFilter>>
    ) => {
      state.overview.isSubmitted = true;
      if (isNil(action.payload.query)) {
        state.overview.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
      }
    },
    resetFilter: state => {
      state.overview.filters = getInitialOverviewState().filters;
    }
  }
});

export const postActions = postSlice.actions;

export const postStorage = createStoreModel('PostDomain', postSlice.reducer);

export const QUERY_POSTS_KEY = 'QUERY_POSTS';

type QueryPostOptions = {
  pagination: Pagination;
  enabled?: boolean;
  onSuccess?: () => void;
};

export function useQueryPosts({ pagination, ...options }: QueryPostOptions) {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_POSTS_KEY,
    queryFn: () =>
      postApiClient.getMany({
        pagination: parsePagination(pagination.page, pagination.size),
        filters: {}
      }),
    ...options
  });

  return { data, isLoading };
}

export function usePostOverview() {
  const dispatch = useDispatch();
  const { isSubmitted, pagination } = useSelector(selectOverviewState);

  return useQueryPosts({
    pagination,
    enabled: isSubmitted,
    onSuccess() {
      dispatch(postActions.setIsSubmitted(false));
    }
  });
}
