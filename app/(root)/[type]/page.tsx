import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { getFiles } from "@/lib/actions/file.actions";
import { Button } from "@/components/ui/button";
import { Models } from "node-appwrite";

import FileCard from "@/components/files/FileCard";
import Image from "next/image";
import React from "react";
import Sort from "@/components/files/Sort";

export default async function page({ searchParams, params }: SearchParamProps) {
    const searchQuery = ((await searchParams)?.query as string) || "";
    const sortQuery = ((await searchParams)?.sort as string) || "";

    const type = ((await params)?.type as string) || "";

    const files = await getFiles({ types: getFileTypesParams(type), searchText: searchQuery, sort: sortQuery });
    return (
        <div className="page-container">
            <section className="w-full text-light-100">
                <h1 className="h1 capitalize">{type}</h1>
                <div className="total-size-section">
                    <p className="body-1">
                        Total:{" "}
                        <span className="h5">
                            {convertFileSize(
                                files.documents.reduce((total: number, file: Models.Document) => {
                                    return total + file.size;
                                }, 0)
                            )}
                        </span>
                    </p>
                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-100">Sort by:</p>
                        <Sort />
                        <Button className="">
                            <Image src="/assets/icons/grid.svg" width={24} height={24} alt="grid" />
                        </Button>
                        <Button>
                            <Image src="/assets/icons/menu.svg" width={24} height={24} alt="list" />
                        </Button>
                    </div>
                </div>
            </section>
            {files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <FileCard file={file} key={file.$id} />
                    ))}
                </section>
            ) : (
                <p className="empty-list">No files found</p>
            )}
        </div>
    );
}
