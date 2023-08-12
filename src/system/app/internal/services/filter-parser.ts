import { Filter, FilterQuery } from '../../../domain/clients/filter.api';
import { FilterKey } from '../../../domain/constants';

export function isFilterType<T extends FilterKey>(
  filter: Partial<Filter<any>>,
  typeCompare: T
): filter is Filter<T> {
  if (filter.type !== typeCompare) {
    return false;
  }

  if (
    [FilterKey.EXACT, FilterKey.LIKE, FilterKey.BOOLEAN].includes(filter.type)
  ) {
    return !!filter.value;
  }

  if (filter.type === FilterKey.RANGE) {
    return (
      !!filter.value &&
      !!(filter as Filter<FilterKey.RANGE>).value.fromDate &&
      !!(filter as Filter<FilterKey.RANGE>).value.toDate
    );
  }

  return false;
}

export function parseFilterQuery(
  filters: Record<string, Filter<any>>
): FilterQuery {
  const query: FilterQuery = {};

  Object.keys(filters).forEach(filterKey => {
    const filter = filters[filterKey];
    if (isFilterType(filter, FilterKey.EXACT)) {
      query[filterKey] = filter.value;
    } else if (isFilterType(filter, FilterKey.LIKE)) {
      query.search = filter.value;
    } else if (isFilterType(filter, FilterKey.RANGE)) {
      query[filterKey] = filter.value;
    } else if (isFilterType(filter, FilterKey.BOOLEAN)) {
      query[filterKey] = filter.value;
    }
  });

  return query;
}
