"use client";

import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

export default function ShareFileModal({ action }: { action: ActionType }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{action.label}</DialogTitle>
                <Input type="text" />
            </DialogHeader>
        </DialogContent>
    );
}
