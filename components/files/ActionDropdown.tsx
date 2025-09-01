"use client";

import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import { Models } from "node-appwrite";

import React, { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import FileDetailsModal from "../modals/FileDetailsModal";
import DeleteFileModal from "../modals/DeleteFileModal";
import RenameFileModal from "../modals/RenameFileModal";
import ShareFileModal from "../modals/ShareFileModal";
import Image from "next/image";
import Link from "next/link";

export default function ActionDropdown({ file }: { file: Models.Document }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [action, setAction] = useState<ActionType | null>(null);

    const closeModal = () => {
        setAction(null);
        setIsDropdownOpen(false);
        setIsModalOpen(false);
    };

    const renderDialogContent = () => {
        if (!action) return null;

        switch (action.value) {
            case "share":
                return <ShareFileModal action={action} file={file} onClose={closeModal} />;
            case "rename":
                return <RenameFileModal action={action} file={file} onClose={closeModal} />;
            case "delete":
                return <DeleteFileModal action={action} file={file} onClose={closeModal} />;
            case "details":
                return <FileDetailsModal action={action} file={file} onClose={closeModal} />;
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger className="shad-no-focus">
                    <Image src={"/assets/icons/dots.svg"} alt="actions" width={34} height={34} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsDropdownItems.map((actionItem) => (
                        <DropdownMenuItem key={actionItem.value} className="shad-dropdown-item">
                            {actionItem.value === "download" ? (
                                <Link href={constructDownloadUrl(file.bucketFileId)} download={file.name} className="flex items-center gap-2">
                                    <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
                                    {actionItem.label}
                                </Link>
                            ) : (
                                <div
                                    className="flex items-center gap-2 w-full"
                                    onClick={() => {
                                        setAction(actionItem);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
                                    {actionItem.label}
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {renderDialogContent()}
        </Dialog>
    );
}
