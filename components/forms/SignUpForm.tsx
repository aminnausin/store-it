"use client";

import React, { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createAccount, createSession } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import Image from "next/image";
import Link from "next/link";
import OTPModal from "../modals/OTPModal";

export default function AuthForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [accountId, setAccountId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = z.object({
        email: z.string().email(),
        fullName: z.string().min(2).max(50), // haha this is such a tape together way of doing this I hate this why are you coding so low quality for no reason
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const user = await createAccount({
                fullName: values.fullName || "",
                email: values.email,
            });

            setAccountId(user.accountId);
        } catch (error) {
            setErrorMessage(`Failed to create account. ${error}`);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">Create Account</h1>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" className="shad-input" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="shad-input" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message " />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="form-submit-button" disabled={isLoading}>
                        Create Account
                        {isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={16} height={16} className="animate-spin" />}
                    </Button>

                    {errorMessage && <p className="error-message">*{errorMessage}</p>}
                    <div className="body-2 flex justify-center">
                        <p className="text-light-100">Already have an account</p>
                        <Link href="/sign-in" className="ml-1 font-medium text-brand">
                            Sign In
                        </Link>
                    </div>
                </form>
            </Form>
            {accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />}
        </>
    );
}
