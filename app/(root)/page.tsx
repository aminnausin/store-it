import { getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";

import RecentFiles from "@/components/dashboard/RecentFiles";
import StorageChart from "@/components/dashboard/StorageChart";
import UsageSummary from "@/components/dashboard/UsageSummary";

export default async function Dashboard() {
    const totalSpace = await getTotalSpaceUsed();

    // Get usage summary
    const usageSummary = getUsageSummary(totalSpace);

    return (
        <div className="dashboard-container text-light-100">
            <section>
                <StorageChart spaceUsed={totalSpace.used} />
                <UsageSummary usageSummary={usageSummary} />
            </section>

            <RecentFiles />
        </div>
    );
}
