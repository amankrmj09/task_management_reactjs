import { useCallback, useMemo, useState } from "react";

const getStoredValue = (key, initialValue) => {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(
      "Failed to read localStorage value",
      error
    );
    return initialValue;
  }
};

export const useLocalStorage = (key, initialValue) => {
  const storedFromStorage = useMemo(
    () => getStoredValue(key, initialValue),
    [key, initialValue]
  );

  const [override, setOverride] = useState({
    key,
    value: storedFromStorage,
  });

  const storedValue =
    override.key === key
      ? override.value
      : storedFromStorage;

  const setValue = useCallback(
    (value) => {
      const valueToStore =
        value instanceof Function
          ? value(storedValue)
          : value;

      setOverride({
        key,
        value: valueToStore,
      });

      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            key,
            JSON.stringify(valueToStore)
          );
        } catch (error) {
          console.error(
            "Failed to write localStorage value",
            error
          );
        }
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};
