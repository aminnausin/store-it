"use client";

import { useEffect, useState } from "react";

export function usePersistentState<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(initial);
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            setValue(JSON.parse(stored) as T);
        }
        setHydrated(true);
    }, [key]);

    // Persist whenever it changes
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value, hydrated]);

    return [value, setValue] as const;
}
