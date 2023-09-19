import { Pagination } from 'src/system/domain/clients';
import {
  CombineSearchFilter,
  Filter
} from '../../../system/domain/clients/filter.api';
import { FilterKey } from '../../../system/domain/constants';

export type AdminFilter = CombineSearchFilter<{
  joinedIn: Filter<FilterKey.RANGE>;
  memberType: Filter<FilterKey.EXACT>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};
