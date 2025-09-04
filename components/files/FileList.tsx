"use client";

import { useView } from "@/app/context/ViewContext";
import { Models } from "node-appwrite";

import FileCard from "./FileCard";

export default function FileList({ files }: { files: Models.Document[] }) {
    const { view, ready } = useView();

    if (!ready) {
        return <section className="grid min-h-16 grid-cols-3 gap-4" />;
    }

    return (
        <>
            {files.length > 0 ? (
                <section className={view === "grid" ? "file-list" : "flex w-full flex-col gap-6"}>
                    {files.map((file: Models.Document) => (
                        <FileCard file={file} key={file.$id} />
                    ))}
                </section>
            ) : (
                <p className="empty-list file-list">No files found</p>
            )}
        </>
    );
}
