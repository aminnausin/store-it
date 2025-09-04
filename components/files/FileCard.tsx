import { convertFileSize, getFileType } from "@/lib/utils";
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
            <div className="flex justify-between gap-1 overflow-hidden">
                <Thumbnail type={type} extension={extension} url={file.url} className="!size-20 shrink-0" imageClassName="!size-11" />
                <div className="flex flex-col items-end justify-between">
                    <ActionDropdown file={file} />
                    <p className="body-2 sm:body-1">{convertFileSize(file.size)}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <p className="subtitle-2 line-clamp-1 w-full break-all">{file.name}</p>
                <FormattedDateTime rawDate={file.$createdAt} className="caption flex-1 text-nowrap text-light-100/70" />
                <p className="caption line-clamp-1 text-light-100/70">By: {file.owner.fullName}</p>
            </div>
        </Link>
    );
}
