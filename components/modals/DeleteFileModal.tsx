"use client";

import { DialogDescription } from "../ui/dialog";
import { usePathname } from "next/navigation";
import { deleteFile } from "@/lib/actions/user.actions";
import { useState } from "react";
import { Models } from "node-appwrite";
import { Button } from "../ui/button";
import { toast } from "sonner";

import FileActionModal from "./FileActionModal";
import Image from "next/image";

export default function DeleteFileModal({ file, action, onClose }: { onClose: () => void; action: ActionType; file: Models.Document }) {
    const [isLoading, setIsLoading] = useState(false);

    const path = usePathname();

    const cancelAction = () => {
        setIsLoading(false);
        onClose();
    };

    const handleAction = async () => {
        setIsLoading(true);
        const success = await deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path });

        if (success) {
            onClose();
            toast.success(`${file.name} was deleted`);
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
            <DialogDescription className="delete-confirmation">
                Are you sure you delete <span className="delete-file-name font-bold">{file.name}</span>?
            </DialogDescription>
        </FileActionModal>
    );
}
