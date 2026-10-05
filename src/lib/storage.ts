"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const EVENT_NAME = "maki-storage";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT_NAME, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT_NAME, cb);
  };
}

/** A localStorage-backed list that stays in sync across components and tabs. */
export function useStoredList<T>(key: string, seed: T[] = []) {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(key) ?? "";
      } catch {
        return "";
      }
    },
    () => "",
  );

  const items = useMemo<T[]>(() => {
    if (!raw) return seed;
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return seed;
    }
    // seed is a stable module-level constant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const add = useCallback(
    (item: T) => {
      const next = [item, ...items];
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable (private mode) */
      }
      window.dispatchEvent(new Event(EVENT_NAME));
    },
    [items, key],
  );

  return [items, add] as const;
}
