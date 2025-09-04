import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { Separator } from "../ui/separator";

import FormattedDateTime from "../files/FormattedDateTime";
import Image from "next/image";
import Link from "next/link";
export default function UsageSummary({ usageSummary }: { usageSummary: ReturnType<typeof getUsageSummary> }) {
    return (
        <ul className="dashboard-summary-list">
            {usageSummary.map((summary) => (
                <Link href={summary.url} key={summary.title} className="dashboard-summary-card space-y-4 text-center">
                    <div className="flex justify-between gap-3">
                        <Image src={summary.icon} width={100} height={100} alt="uploaded image" className="summary-type-icon" />
                        <h4 className="summary-type-size">{convertFileSize(summary.size) || 0}</h4>
                    </div>

                    <h5 className="summary-type-title">{summary.title}</h5>
                    <Separator className="bg-light-400" />
                    <p className="body-1 text-light-200">Last Update</p>
                    <FormattedDateTime rawDate={summary.latestDate} className="" />
                </Link>
            ))}
        </ul>
    );
}
