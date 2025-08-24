import { Button } from "../ui/button";

import FileUploader from "./FileUploader";
import Image from "next/image";
import React from "react";
import Search from "./Search";

export default function MainHeader() {
    return (
        <header className="w-full flex header">
            <Search />
            <div className="header-wrapper">
                <FileUploader />
                <form>
                    <Button variant={"ghost"} className="sign-out-button" type="submit">
                        <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className="w-6 rotate-180" />
                    </Button>
                </form>
            </div>
        </header>
    );
}
