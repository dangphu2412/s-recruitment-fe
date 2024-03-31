import { Pagination } from 'src/shared/models';
import {
  CombineSearchFilter,
  Filter
} from '../../../../shared/models/filter.api';
import { FilterKey } from '../../../../shared/config/constants';

export type AdminFilter = CombineSearchFilter<{
  joinedIn: Filter<FilterKey.RANGE>;
  memberType: Filter<FilterKey.EXACT>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};
