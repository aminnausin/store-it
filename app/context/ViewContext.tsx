"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = {
    view: ViewMode;
    setView: (v: ViewMode) => void;
    ready: boolean; // true after we read localStorage on the client
};

const ViewContext = createContext<Ctx | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
    const [view, setView] = useState<ViewMode>("grid"); // safe default for SSR
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("viewMode");
            if (saved === "list" || saved === "grid") setView(saved);
            setReady(true);
        } catch (error: unknown) {
            console.log(`Unable to start context: ${error}`);
        }
    }, []);

    useEffect(() => {
        if (!ready) return;

        localStorage.setItem("viewMode", view);
    }, [view, ready]);

    return <ViewContext.Provider value={{ view, setView, ready }}>{children}</ViewContext.Provider>;
}

export function useView() {
    const ctx = useContext(ViewContext);
    if (!ctx) throw new Error("useView must be used inside <ViewProvider>");
    return ctx;
}
