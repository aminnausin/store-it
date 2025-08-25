import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Thumbnail({
    extension,
    type,
    url = "",
    imageClassName = "",
    className = "",
}: {
    extension: string;
    type: string;
    url?: string;
    imageClassName?: string;
    className?: string;
}) {
    const isImage = type === "image" && extension !== "svg";
    const thumbnail = getFileIcon(extension, type);
    return (
        <figure className={cn("thumbnail", className)}>
            <Image
                src={isImage ? url : thumbnail}
                alt="thumbnail"
                width={128}
                height={128}
                className={cn("size-8 object-contain", imageClassName, isImage && "thumbnail-image")}
            />
        </figure>
    );
}
