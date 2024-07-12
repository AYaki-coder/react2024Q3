import { Dispatch, useEffect, useState } from 'react';

export function useLocalStorage(initialValue: string, key: string): [string, Dispatch<string>] {
  const getValue = (): string => {
    try {
      const storage = localStorage.getItem(key);

      if (storage) {
        return JSON.parse(storage);
      }
    } catch {
      //
    }

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    return () => {
      localStorage.setItem(key, JSON.stringify(value)); // for crosscheck
    };
  }, [key, value]);

  return [value, setValue];
}
