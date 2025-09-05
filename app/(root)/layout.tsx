import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

import MobileNavigation from "@/components/navigation/MobileNavigation";
import MainHeader from "@/components/navigation/MainHeader";
import Sidebar from "@/components/navigation/Sidebar";

export const dynamic = "force-dynamic";

export default async function layout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return redirect("/sign-in");

    return (
        <main className="flex h-screen">
            <Sidebar currentUser={currentUser} />
            <section className="flex h-full flex-1 flex-col">
                <MobileNavigation currentUser={currentUser} ownerId={currentUser.$id} />
                <MainHeader currentUser={currentUser} ownerId={currentUser.$id} />
                <div className="main-content">{children}</div>
            </section>
        </main>
    );
}
