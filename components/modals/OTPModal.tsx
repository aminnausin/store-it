"use client";

import React, { useState } from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

import Image from "next/image";

export default function OTPModal({ email, accountId }: { email: string; accountId: string }) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const sessionId = await verifySecret({ accountId, otp });
            if (sessionId) {
                router.push("/");
            }

            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        try {
            await sendEmailOTP({ email });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="h2 relative text-center">
                        Enter OTP
                        <div className="absolute right-0 top-0 flex h-full cursor-pointer items-center" onClick={() => setIsOpen(false)}>
                            <Image src="/assets/icons/close-dark.svg" alt="close" width={16} height={16} />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        We&apos;ve sent a code to<span className="pl-1 text-brand">{email}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="shad-otp">
                        {Array.from({ length: 6 }, (_, index) => (
                            <InputOTPSlot index={index} className="shad-otp-slot" key={index} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                <AlertDialogFooter className="flex w-full !flex-col gap-4">
                    <AlertDialogAction className="shad-submit-btn h-12" onClick={handleSubmit} type="button">
                        Submit
                        {isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={16} height={16} className="ml-2 animate-spin" />}
                    </AlertDialogAction>
                    <div className="subtitle-2 flex justify-center text-light-100">
                        Didn&apos;t get a code?
                        <Button variant={"link"} className="ml-1 h-full p-0 font-medium text-brand" onClick={handleResendOTP}>
                            Click to resend.
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
