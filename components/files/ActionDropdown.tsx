"use client";

import { Dialog } from "@/components/ui/dialog";
import { Models } from "node-appwrite";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState } from "react";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import FileDetailsModal from "../modals/FileDetailsModal";
import DeleteFileModal from "../modals/DeleteFileModal";
import RenameFileModal from "../modals/RenameFileModal";
import ShareFileModal from "../modals/ShareFileModal";

export default function ActionDropdown({ file }: { file: Models.Document }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [action, setAction] = useState<ActionType | null>(null);

    const renderDialogContent = () => {
        switch (action?.value) {
            case "share":
                return <ShareFileModal action={action} />;
            case "rename":
                return <RenameFileModal />;
            case "delete":
                return <DeleteFileModal />;
            case "details":
                return <FileDetailsModal />;
            default:
                return <></>;
        }

        return <FileDetailsModal />;
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
                                    className="flex items-center gap-2"
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
