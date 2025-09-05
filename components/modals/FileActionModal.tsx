"use client";

import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function FileActionModal({ action, footer, children }: { action: ActionType; children: React.ReactNode; footer?: React.ReactNode }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="h3 text-center text-light-100">{action.label}</DialogTitle>
            </DialogHeader>
            <div className="flex !min-w-full flex-col gap-4">{children}</div>

            {footer && <DialogFooter className="flex flex-col gap-3 md:flex-row">{footer}</DialogFooter>}
        </DialogContent>
    );
}
