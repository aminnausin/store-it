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
                    <svg
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isDropdownOpen ? "stroke-brand" : "stroke-light-200"} hover:stroke-brand-100`}
                    >
                        <path
                            d="M14.166 26.9167C14.166 28.475 15.441 29.75 16.9993 29.75C18.5577 29.75 19.8327 28.475 19.8327 26.9167C19.8327 25.3583 18.5577 24.0833 16.9993 24.0833C15.441 24.0833 14.166 25.3583 14.166 26.9167Z"
                            stroke="current-color"
                            stroke-width="1.50667"
                        />
                        <path
                            d="M14.166 7.08268C14.166 8.64102 15.441 9.91602 16.9993 9.91602C18.5577 9.91602 19.8327 8.64102 19.8327 7.08268C19.8327 5.52435 18.5577 4.24935 16.9993 4.24935C15.441 4.24935 14.166 5.52435 14.166 7.08268Z"
                            stroke="current-color"
                            stroke-width="1.50667"
                        />
                        <path
                            d="M14.166 17.0007C14.166 18.559 15.441 19.834 16.9993 19.834C18.5577 19.834 19.8327 18.559 19.8327 17.0007C19.8327 15.4423 18.5577 14.1673 16.9993 14.1673C15.441 14.1673 14.166 15.4423 14.166 17.0007Z"
                            stroke="current-color"
                            stroke-width="1.50667"
                        />
                    </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="w-[200px] truncate">{file.name}</DropdownMenuLabel>
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
                                    className="flex w-full items-center gap-2"
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
