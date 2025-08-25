import { destroySession } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";

import FileUploader from "./FileUploader";
import Search from "./Search";
import Image from "next/image";
import React from "react";

export default function MainHeader() {
    return (
        <header className="w-full flex header">
            <Search />
            <div className="header-wrapper">
                <FileUploader />
                <form
                    action={async () => {
                        "use server";
                        await destroySession();
                    }}
                >
                    <Button variant={"ghost"} className="sign-out-button" type="submit">
                        <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className="w-6 rotate-180" />
                    </Button>
                </form>
            </div>
        </header>
    );
}
