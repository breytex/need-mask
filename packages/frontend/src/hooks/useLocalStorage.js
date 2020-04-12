import { useState, useEffect } from "react";

// https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to localStorage.
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const reset = () => {
    setValue(initialValue);
  };

  const isDirty = initialValue !== storedValue;

  return [storedValue, setValue, isDirty, reset];
}

export const useDebouncedLocaleStorage = (key, initialValue, delay = 100) => {
  const [
    debouncedValue,
    setDebouncedValue,
    isDirty,
    resetStorage,
  ] = useLocalStorage(key, initialValue);
  const [tempValue, setTempValue] = useState(debouncedValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(tempValue || initialValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [initialValue, delay, tempValue]);

  const reset = () => {
    resetStorage();
    setTempValue(initialValue);
  };

  return [debouncedValue, tempValue, setTempValue, isDirty, reset];
};
