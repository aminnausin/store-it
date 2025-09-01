"use client";

import { usePathname } from "next/navigation";
import { renameFile } from "@/lib/actions/user.actions";
import { useState } from "react";
import { Models } from "node-appwrite";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";

import Image from "next/image";
import FileActionModal from "./FileActionModal";

export default function RenameFileModal({ file, action, onClose }: { onClose: () => void; action: ActionType; file: Models.Document }) {
    const [name, setName] = useState((file.name as string).replace(`.${file.extension}`, ""));
    const [isLoading, setIsLoading] = useState(false);

    const path = usePathname();

    const cancelAction = () => {
        setName(file.name.replace(`.${file.extension}`, ""));
        setIsLoading(false);
        onClose();
    };
    const handleAction = async () => {
        setIsLoading(true);
        const success = await renameFile({ fileId: file.$id, name, extension: file.extension, path });

        if (success) {
            onClose();
            return;
        }

        toast.error("Failed to rename file");

        setIsLoading(false);
    };

    const footer = (
        <>
            <Button className="modal-cancel-button" onClick={cancelAction}>
                Cancel
            </Button>
            <Button className="modal-submit-button" onClick={handleAction}>
                <p className="capitalize">{action.value}</p>
                {isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={16} height={16} className="animate-spin" />}{" "}
            </Button>
        </>
    );

    return (
        <FileActionModal action={action} footer={footer}>
            <Input className="rename-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FileActionModal>
    );
}
