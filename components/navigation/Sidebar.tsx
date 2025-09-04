"use client";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ currentUser }: { currentUser: User }) {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <Link href="/">
                <Image src="/assets/icons/logo-full-brand.svg" width={160} height={50} alt="logo" className="hidden h-auto lg:block" />
            </Link>
            <Image src="/assets/icons/logo-brand.svg" width={52} height={52} alt="logo" className="h-auto lg:hidden" />
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((page, index) => (
                        <li key={index}>
                            <Link
                                className={cn(
                                    "sidebar-nav-item transition-colors",
                                    pathname === page.url ? "shad-active hover:!bg-brand-100" : "hover:!text-brand"
                                )}
                                href={page.url}
                            >
                                <Image
                                    src={`${page.icon}`}
                                    width={24}
                                    height={24}
                                    alt={page.name}
                                    className={cn("nav-icon", pathname === page.url && "nav-icon-active")}
                                />
                                <p className="hidden capitalize lg:block">{page.name}</p>
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
                className="w-full transition-all duration-300 hover:rotate-2 hover:scale-105"
            />
            <div className="sidebar-user-info">
                <Image src={currentUser.avatar} alt="avatar" width={44} height={44} className="sidebar-user-avatar" />
                <div className="body-2 hidden text-light-100 lg:block">
                    <p className="subtitle-2 capitalize">{currentUser.fullName}</p>
                    <p className="caption">{currentUser.email}</p>
                </div>
            </div>
        </aside>
    );
}
