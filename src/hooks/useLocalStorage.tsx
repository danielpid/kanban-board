import { useEffect, useRef, useState } from 'react';

export function useLocalStorageState<K, V>(key: string, initial: Map<K, V>) {
  const [state, setState] = useState<Map<K, V>>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (new Map(JSON.parse(raw)) as Map<K, V>) : initial;
    } catch {
      return initial;
    }
  });
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    localStorage.setItem(key, JSON.stringify(Array.from(state.entries())));
  }, [key, state]);

  return [state, setState] as const;
}
