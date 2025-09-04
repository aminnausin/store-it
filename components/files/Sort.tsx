"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortTypes } from "@/constants";

export default function Sort() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const sortQuery = searchParams.get("sort") || "";

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        router.push(`${path}?${params.toString()}`);
    };

    return (
        <Select onValueChange={handleSort} defaultValue={sortTypes[0].value} value={sortQuery || undefined}>
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
