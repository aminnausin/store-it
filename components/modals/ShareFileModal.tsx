"use client";

import { updateFileUsers } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Models } from "node-appwrite";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { toast } from "sonner";

import FileDetailsCard from "../files/FileDetailsCard";
import FileActionModal from "./FileActionModal";
import Image from "next/image";

export default function ShareFileModal({ file, action, onClose }: { onClose: () => void; action: ActionType; file: Models.Document }) {
    const [emails, setEmails] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const path = usePathname();

    const handleAction = async () => {
        setIsLoading(true);

        try {
            const success = await updateFileUsers({ fileId: file.$id, emails, path });

            if (!success) {
                throw new Error("Unable to share file");
            }

            toast.success(`Shared ${file.name} with ${emails.join(", ")}`);

            onClose();
            return;
        } catch (error: any) {
            toast.error(error.message);
        }

        setIsLoading(false);
    };

    const handleRemoveUser = async (email: string) => {
        setIsLoading(true);

        const updatedEmails = emails.filter((e) => e !== email);
        const success = await updateFileUsers({ fileId: file.$id, emails: updatedEmails, path });

        if (success) {
            setEmails(updatedEmails);
        } else {
            toast.error(`Failed to remove ${email} from shared users`);
        }

        setIsLoading(false);
    };

    const footer = (
        <Button className="modal-submit-button" onClick={handleAction}>
            <p className="capitalize">Share Now</p>
            {isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={16} height={16} className="animate-spin" />}{" "}
        </Button>
    );

    return (
        <FileActionModal action={action} footer={footer}>
            <FileDetailsCard file={file} />
            <div className="space-y-2">
                <Label htmlFor="shareEmail" className="subtitle-2 pl-1 text-light-100">
                    Share file with other users:
                </Label>
                <Input
                    id="shareEmail"
                    placeholder="Enter email address"
                    className="share-input-field"
                    type="email"
                    onChange={(e) => setEmails(e.target.value.trim().split(","))}
                />
            </div>
            <div className="pt-4">
                <div className="flex justify-between">
                    <p className="subtitle-2 text-light-100">Shared with</p>
                    <p className="subtitle-2 text-light-200">{file.users.length} users</p>
                </div>

                <ul>
                    {file.users.map((email: string) => (
                        <li key={email} className="flex items-center justify-between gap-2">
                            <p className="subtitle-2">{email}</p>
                            <Button onClick={() => handleRemoveUser(email)} className="share-remove-user">
                                <Image src={"/assets/icons/remove.svg"} alt="remove" width={24} height={24} className="remove-icon" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </FileActionModal>
    );
}
