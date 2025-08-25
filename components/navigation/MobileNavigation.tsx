"use client";

import React, { useState } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { destroySession } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { navItems } from "@/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import FileUploader from "../files/FileUploader";
import Image from "next/image";
import Link from "next/link";

export default function MobileNavigation({ currentUser, ownerId }: { currentUser: User; ownerId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    return (
        <header className="mobile-header">
            <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={120} height={52} className="h-auto" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Image src="/assets/icons/menu.svg" alt="search" width={24} height={24} />
                </SheetTrigger>
                <SheetContent className="shad-sheet h-screen px-3">
                    <SheetTitle>
                        <div className="header-user">
                            <Image src={currentUser.avatar} alt="avatar" width={44} height={44} className="header-user-avatar" />
                            <div className="sm:hidden lg:block body-2 text-light-100">
                                <p className="subtitle-2 capitalize">{currentUser.fullName}</p>
                                <p className="caption">{currentUser.email}</p>
                            </div>
                        </div>
                        <Separator className="mb-4 bg-light-200/20" />
                    </SheetTitle>
                    <nav className="mobile-nav">
                        <ul>
                            {navItems.map((page, index) => (
                                <li key={index}>
                                    <Link className={cn("mobile-nav-item", pathname === page.url && "shad-active")} href={page.url}>
                                        <Image
                                            src={`${page.icon}`}
                                            width={24}
                                            height={24}
                                            alt={page.name}
                                            className={cn("nav-icon", pathname === page.url && "nav-icon-active")}
                                        />
                                        <p>{page.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Separator className="my-5 bg-light-200/20" />
                    <div className="flex flex-col justify-between gap-5">
                        <FileUploader ownerId={ownerId} accountId={currentUser.accountId} className="w-full" />
                        <Button variant={"ghost"} className="mobile-sign-out-button" type="submit" onClick={async () => await destroySession()}>
                            <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className="rotate-180" />
                            <p>Logout</p>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
