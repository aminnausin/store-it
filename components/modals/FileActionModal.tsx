"use client";

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function FileActionModal({ action, footer, children }: { action: ActionType; children: React.ReactNode; footer?: React.ReactNode }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center h3 text-light-100">{action.label}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 !min-w-full">{children}</div>

            {footer && <DialogFooter className="flex flex-col gap-3 md:flex-row">{footer}</DialogFooter>}
        </DialogContent>
    );
}
