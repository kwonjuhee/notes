import { useSyncExternalStore } from "react";

export const useLocalStorage = <T extends string>(key: string, initialValue?: T) => {
  const getSnapshot = () => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  };

  const store = useSyncExternalStore<T | undefined>(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => {
        window.addEventListener("storate", callback);
      };
    },
    getSnapshot,
    () => initialValue
  );

  const setItem = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = () => {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
  };

  return { value: store, set: setItem, remove: removeItem };
};
