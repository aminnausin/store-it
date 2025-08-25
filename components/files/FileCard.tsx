import { convertFileSize, formatDateTime, getFileType } from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import Link from "next/link";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

export default function FileCard({ file }: { file: Models.Document }) {
    const { type, extension } = getFileType(file.name);
    return (
        <Link href={file.url} className="file-card" target="_blank">
            <div className="flex justify-between">
                <Thumbnail type={type} extension={extension} url={file.url} className="!size-20" imageClassName="!size-11" />
                <div className="flex flex-col items-end justify-between">
                    <ActionDropdown file={file} />
                    <p className="body-1">{convertFileSize(file.size)}</p>
                </div>
            </div>
            <div className="truncate flex-1 file-card-details">
                <p className="subtitle-2 truncate line-clamp-1">{file.name}</p>
                <FormattedDateTime rawDate={file.$createdAt} className="body-2 text-light-100" />
                <p className="caption line-clamp-1 text-light-200">By: {file.owner.fullName}</p>
            </div>
        </Link>
    );
}
