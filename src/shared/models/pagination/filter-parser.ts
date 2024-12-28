import { Filter, FilterKeeper, FilterQuery } from '../filter.api';
import { FilterKey } from '../../config';

export function isFilterType<T extends FilterKey>(
  filter: Partial<FilterKeeper<T, any>>,
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
  filters: Record<string, FilterKeeper<FilterKey, unknown>>
): FilterQuery {
  const query: FilterQuery = {};

  Object.keys(filters).forEach(filterKey => {
    const filter = filters[filterKey];
    if (isFilterType(filter, FilterKey.EXACT)) {
      if (filter.value) {
        if (Array.isArray(filter.value)) {
          if (filter.value.length > 0) {
            query[filterKey] = filter.value.join(',');
          }
        } else {
          query[filterKey] = filter.value;
        }
      }
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

export function encodeMultiQueryParams(values: string[]): string {
  return values.join(',');
}
