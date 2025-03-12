'use client';

import { useEffect, useRef, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Create a ref to track if this is the first render
  const isFirstRender = useRef(true);

  // State to store our value
  // Pass initial value directly during SSR
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Effect to load the value from localStorage once on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [key]);

  // Update local storage when the state changes
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
