import * as React from 'react';

export function useDebounceValue<V>(value: V, delay: number = 500): V {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState<V>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
