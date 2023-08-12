import {
  CombineSearchFilter,
  Filter,
  FilterKey
} from 'src/shared/common/filter';
import { Pagination } from 'src/shared/clients';

export type AdminFilter = CombineSearchFilter<{
  joinedIn: Filter<FilterKey.RANGE>;
  memberType: Filter<FilterKey.EXACT>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};
