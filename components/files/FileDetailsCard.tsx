import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Models } from "node-appwrite";

import Thumbnail from "./Thumbnail";
import React from "react";

export default function FileDetailsCard({ file }: { file: Models.Document }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-light-200/40 p-3">
            <Thumbnail type={file.type} extension={file.extension} url={file.url} imageClassName="!size-10" className="!size-16" />
            <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                <p className="subtitle-2 truncate ">{file.name}</p>
                <p className="caption text-light-200">
                    {convertFileSize(file.size)} - {formatDateTime(file.$createdAt)}
                </p>
            </div>
        </div>
    );
}
