"use client";

import { cn, convertFileSize, convertFileToUrl, getFileType } from "@/lib/utils";
import { useCallback, useState } from "react";
import { MAX_FILE_SIZE } from "@/constants";
import { usePathname } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "@/lib/actions/file.actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

import Thumbnail from "./Thumbnail";
import Image from "next/image";

export default function FileUploader({ ownerId, accountId, className }: { ownerId: string; accountId: string; className?: string }) {
    const [files, setFiles] = useState<File[]>([]);

    const { toast } = useToast();

    const path = usePathname();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setFiles(acceptedFiles);
            const uploadPromises = acceptedFiles.map(async (file) => {
                if (file.size > MAX_FILE_SIZE) {
                    setFiles((prev) => prev.filter((f) => f.name !== file.name));

                    return toast({
                        description: (
                            <p className="body-2 text-white">
                                <span className="break-all font-semibold">{file.name}</span> is too large. Max file size is {convertFileSize(MAX_FILE_SIZE)}.
                            </p>
                        ),
                        className: "error-toast",
                    });
                }

                return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
                    if (!uploadedFile) {
                        return toast({
                            description: (
                                <p className="body-2 text-white">
                                    Failed to upload <span className="break-all font-semibold">{file.name}</span>.
                                </p>
                            ),
                            className: "error-toast",
                        });
                    }

                    setFiles((prev) => prev.filter((f) => f.name !== uploadedFile.name));

                    return toast({
                        description: (
                            <p className="body-2 text-white">
                                <span className="break-all font-semibold">{file.name}</span> successfully uploaded.
                            </p>
                        ),
                        className: "success-toast",
                    });
                });
            });

            await Promise.all(uploadPromises);
        },
        [ownerId, accountId, path, toast]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fileName: string) => {
        e.preventDefault();
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    return (
        <>
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <Button className={cn("uploader-button", className)} type="button">
                    <Image src="/assets/icons/upload.svg" alt="upload" width={24} height={24} />
                    <p>Upload</p>
                </Button>
            </div>
            {files.length > 0 && (
                <ul className="uploader-preview-list">
                    <h4 className="h4 text-light-100">Uploading</h4>
                    {files.map((file, index) => {
                        const { type, extension } = getFileType(file.name);

                        return (
                            <li key={`${file.name}-${index}`} className="uploader-preview-item">
                                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
                                <div className="flex-1 truncate">
                                    <p className="subtitle-2 preview-item-name truncate">{file.name}</p>
                                    <p className="caption">5 Mins Remaining</p>
                                </div>
                                <Image src={"/assets/icons/file-loader.gif"} alt="loader" width={80} height={26} />
                                <Button
                                    className="p-0 hover:!bg-transparent"
                                    title="Cancel Upload"
                                    variant={"ghost"}
                                    onClick={(e) => handleRemoveFile(e, file.name)}
                                >
                                    <Image src={"/assets/icons/remove.svg"} alt="remove" width={24} height={24} className="opacity-75 hover:opacity-100" />
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
