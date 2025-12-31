import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const isDebounced = delayMs > 0

  useEffect(() => {
    if (delayMs > 0) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delayMs);

      return () => clearTimeout(handler);
    }
    return
  }, [value, delayMs]);

  return isDebounced ? debouncedValue : value;
}

export default useDebounce;