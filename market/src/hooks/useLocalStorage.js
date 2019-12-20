import React, { useState } from "react";

export default function useLocalStorage(key, intialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    let item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : intialValue;
  });
  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
