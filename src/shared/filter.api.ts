import { FilterKey } from './config/constants';

/**
 * @deprecated no longer use
 */
export type DateRange<T = Date> = {
  fromDate: T;
  toDate: T;
};

/**
 * @deprecated no longer use
 */
type EnumFilter<T> = {
  enumerable: T;
  value: string;
};

/**
 * @deprecated no longer use
 */
export type FilterKeeper<K extends FilterKey, V> = {
  type: K;
  value: V;
};

/**
 * @deprecated no longer use
 */
export type Filter<T extends FilterKey, V = string> = T extends FilterKey.EXACT
  ? FilterKeeper<T, V>
  : T extends FilterKey.RANGE
  ? FilterKeeper<T, DateRange<V>>
  : T extends FilterKey.BOOLEAN
  ? FilterKeeper<T, boolean>
  : T extends FilterKey.ENUMERABLE
  ? FilterKeeper<T, EnumFilter<V>>
  : FilterKeeper<T, string>;

/**
 * @deprecated no longer use
 */
export type FilterQuery = Record<string, unknown>;
