"use client";

import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Models } from "node-appwrite";

import FileDetailsCard from "../files/FileDetailsCard";
import FileActionModal from "./FileActionModal";

export default function RenameFileModal({ file, action, onClose }: { onClose: () => void; action: ActionType; file: Models.Document }) {
    const DetailRow = ({ label, value }: { label: string; value: string }) => (
        <div className="flex">
            <p className="file-details-label">{label}</p>
            <p className="file-details-value">{value}</p>
        </div>
    );
    return (
        <FileActionModal action={action}>
            <FileDetailsCard file={file} />
            <DetailRow label="Format:" value={file.extension} />
            <DetailRow label="Size:" value={convertFileSize(file.size)} />
            <DetailRow label="Owner:" value={file.owner.fullName} />
            <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
        </FileActionModal>
    );
}
