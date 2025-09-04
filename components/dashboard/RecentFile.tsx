import { Models } from "node-appwrite";

import FormattedDateTime from "../files/FormattedDateTime";
import ActionDropdown from "../files/ActionDropdown";
import TypeThumbnail from "../files/TypeThumbnail";
import Link from "next/link";

export default function RecentFile({ file }: { file: Models.Document }) {
    return (
        <li>
            <Link className="group flex gap-3 rounded-xl" href={file.url} target="_blank">
                <TypeThumbnail type={file.type} />
                <div className="flex-1">
                    <p className="subtitle-2 line-clamp-1 break-all text-light-100 group-hover:text-brand">{file.name}</p>
                    <FormattedDateTime rawDate={file.$createdAt} className="body-2 text-light-200" />
                </div>
                <ActionDropdown file={file} />
            </Link>
        </li>
    );
}
