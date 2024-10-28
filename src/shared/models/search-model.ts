import { useState } from 'react';
import { useDebounceValue } from './debounce';

export function useSearch() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounceValue(search);

  return {
    search: debouncedSearch,
    setSearch
  };
}
