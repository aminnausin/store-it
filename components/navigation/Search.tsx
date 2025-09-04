"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { Input } from "../ui/input";

import FormattedDateTime from "../files/FormattedDateTime";
import Thumbnail from "../files/Thumbnail";
import Image from "next/image";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Models.Document[]>([]);
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);

    const searchParams = useSearchParams();
    const router = useRouter();

    const searchQuery = searchParams.get("query") || "";

    const handleClickItem = (file: Models.Document) => {
        setIsOpen(false);
        setResults([]);

        router.push(`/${["video", "audio"].includes(file.type) ? "media" : file.type + "s"}?query=${query}`);
    };

    useEffect(() => {
        const fetchFiles = async () => {
            if (debouncedQuery.length === 0) {
                setIsOpen(false);
                setResults([]);
                return;
            }

            const files = await getFiles({ searchText: debouncedQuery, types: [], limit: 10 });

            setResults(files.documents);
            setIsOpen(true);
        };

        fetchFiles();
    }, [debouncedQuery]);

    useEffect(() => {
        if (!searchQuery) setQuery("");
    }, [searchQuery]);

    return (
        <div className="search">
            <div className="search-input-wrapper">
                <Image src="/assets/icons/search.svg" alt="Searc" width={24} height={24} />
                <Input placeholder="Search..." className="search-input flex-1" value={query} onChange={(e) => setQuery(e.target.value)} />

                {isOpen && (
                    <ul className="search-result">
                        {results.length > 0 ? (
                            results.map((file) => (
                                <li
                                    key={file.$id}
                                    className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-2 hover:bg-light-400"
                                    onClick={() => handleClickItem(file)}
                                >
                                    <div className="flex flex-1 items-center gap-4 overflow-hidden">
                                        <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-9 min-w-9" />
                                        <p className="subtitle-2 truncate text-light-100 ">{file.name}</p>
                                    </div>
                                    <FormattedDateTime rawDate={file.$createdAt} className="caption ms-auto line-clamp-1 text-light-200" />
                                </li>
                            ))
                        ) : (
                            <p className="empty-result p-2">No files found</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
