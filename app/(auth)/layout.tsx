import Image from "next/image";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <section className="hidden w-1/2 flex-col items-center justify-center gap-12 bg-brand p-10 lg:flex xl:w-2/5 2xl:w-1/4">
                <div className="flex flex-col justify-between gap-12">
                    <Image src="/assets/icons/logo-full.svg" alt="logo" width={224} height={82} className=""></Image>
                    <div className="space-y-5 text-white">
                        <h1 className="h1">Manage your files the best way</h1>
                        <p className="body-1">This is a place where you can store all your documents.</p>
                    </div>
                    <Image
                        src="/assets/images/files.png"
                        alt="files"
                        width={342}
                        height={342}
                        className="ransition-all mx-auto duration-300 hover:rotate-2 hover:scale-105"
                    />
                </div>
            </section>
            <section className="flex flex-1 flex-col items-center p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-16 lg:hidden">
                    <Image src="/assets/icons/logo-full-brand.svg" width={224} height={82} alt="logo" className="h-auto w-[200px] " />
                </div>
                {children}
            </section>
        </div>
    );
}

export default layout;
