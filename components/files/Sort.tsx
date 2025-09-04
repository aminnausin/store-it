"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortTypes } from "@/constants";

export default function Sort() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const searchQuery = searchParams.get("query") || "";

    const handleSort = (value: string) => {
        router.push(`${path}${searchQuery ? `?query=${searchQuery.toString()}&` : "?"}sort=${value}`);
    };

    return (
        <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
            <SelectTrigger className="sort-select flex-1 truncate [&>*]:truncate">
                <SelectValue placeholder={sortTypes[0].label} />
            </SelectTrigger>
            <SelectContent className="sort-select-content">
                {sortTypes.map((sort) => (
                    <SelectItem key={sort.label} value={sort.value} className="shad-select-item">
                        {sort.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
