import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { ViewProvider } from "@/app/context/ViewContext";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

import FileList from "@/components/files/FileList";
import React from "react";
import Sort from "@/components/files/Sort";
import View from "@/components/navigation/View";

export default async function page({ searchParams, params }: SearchParamProps) {
    const searchQuery = ((await searchParams)?.query as string) || "";
    const sortQuery = ((await searchParams)?.sort as string) || "";

    const type = ((await params)?.type as string) || "";
    const files = await getFiles({ types: getFileTypesParams(type), searchText: searchQuery, sort: sortQuery });

    return (
        <div className="page-container">
            <ViewProvider>
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
                            <p className="body-1 hidden text-light-100 sm:block">Sort by:</p>
                            <Sort />
                            <View />
                        </div>
                    </div>
                </section>
                <FileList files={files.documents} />
            </ViewProvider>
        </div>
    );
}
