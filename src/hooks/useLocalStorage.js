import { useState, useEffect } from 'react';

/**
 * Hook para persistir estado en localStorage
 * @param {string} key - Clave de almacenamiento
 * @param {*} initialValue - Valor inicial
 * @returns {[any, Function]} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error leyendo localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue((currentValue) => {
      try {
        return value instanceof Function ? value(currentValue) : value;
      } catch (error) {
        console.error(`Error guardando localStorage key "${key}":`, error);
        return currentValue;
      }
    });
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error guardando localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Sincronizar si cambia la key
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;