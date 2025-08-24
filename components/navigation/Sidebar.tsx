"use client";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar({ currentUser }: { currentUser: User }) {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <Link href="/">
                <Image src="/assets/icons/logo-full-brand.svg" width={160} height={50} alt="logo" className="hidden lg:block h-auto" />
            </Link>
            <Image src="/assets/icons/logo-brand.svg" width={52} height={52} alt="logo" className="lg:hidden h-auto" />
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((page, index) => (
                        <li key={index}>
                            <Link className={cn("sidebar-nav-item", pathname === page.url && "shad-active")} href={page.url}>
                                <Image
                                    src={`${page.icon}`}
                                    width={24}
                                    height={24}
                                    alt={page.name}
                                    className={cn("nav-icon", pathname === page.url && "nav-icon-active")}
                                />
                                <p className="capitalize hidden lg:block">{page.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Image
                src="/assets/images/files-2.png"
                alt="logo"
                width={506}
                height={418}
                className="transition-all duration-300 hover:rotate-2 hover:scale-105 w-full"
            />
            <div className="sidebar-user-info">
                <Image src={currentUser.avatar} alt="avatar" width={44} height={44} className="sidebar-user-avatar" />
                <div className="hidden lg:block body-2 text-light-100">
                    <p className="subtitle-2 capitalize">{currentUser.fullName}</p>
                    <p className="caption">{currentUser.email}</p>
                </div>
            </div>
        </aside>
    );
}
